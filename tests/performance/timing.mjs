export function statistics(samples) {
  const sorted = [...samples].sort((a, b) => a - b);
  return {
    samples,
    minMs: sorted[0],
    medianMs: sorted[Math.floor(sorted.length / 2)],
    p90Ms: sorted[Math.ceil(sorted.length * 0.9) - 1],
    maxMs: sorted.at(-1),
  };
}

export async function measure({ browser, url, config, report, save, checkpoint }) {
  const { cdp } = browser;
  report.timings = [];
  report.profiles = [];
  for (const rate of config.rates) {
    const page = await browser.page(`${url}/timing`, rate);
    try {
      const available = await cdp.evaluate(page.sessionId, 'window.scenarioNames');
      const names = config.only ?? available;
      for (const name of names) if (!available.includes(name)) throw new Error(`Unknown scenario: ${name}. Available: ${available.join(', ')}`);
      for (const name of names) {
        console.log(`${config.profile ? 'Profile' : 'Measure'} ${name}, CPU ${rate}x`);
        const sample = (variant, repeat = 1, settled = true) =>
          cdp.evaluate(page.sessionId, `window.sampleScenario(${JSON.stringify({ variant, name, repeat, settled })})`);
        if (config.profile) {
          for (const variant of ['baseline', 'current']) {
            await sample(variant, 3, false);
            await cdp.send('Profiler.enable', {}, page.sessionId);
            await cdp.send('Profiler.setSamplingInterval', { interval: 500 }, page.sessionId);
            await cdp.send('Profiler.start', {}, page.sessionId);
            await sample(variant, 6, false);
            const { profile } = await cdp.send('Profiler.stop', {}, page.sessionId);
            const file = `profile-${variant}-${name}-${rate}x.cpuprofile`;
            await save(file, profile);
            report.profiles.push({ variant, name, rate, file });
          }
        } else {
          const samples = { baseline: [], current: [] };
          for (let index = -3; index < config.samples; index++) {
            for (const variant of index % 2 ? ['baseline', 'current'] : ['current', 'baseline']) {
              const [duration] = await sample(variant);
              if (index >= 0) samples[variant].push(duration);
            }
          }
          const baseline = statistics(samples.baseline);
          const current = statistics(samples.current);
          const speedup = baseline.medianMs / current.medianMs;
          report.timings.push({ name, rate, baseline, current, speedup });
          console.log(`${baseline.medianMs.toFixed(2)} → ${current.medianMs.toFixed(2)} ms (${speedup.toFixed(2)}x)`);
        }
        await checkpoint();
      }
    } finally {
      await cdp.send('Target.closeTarget', { targetId: page.targetId });
    }
  }
}
