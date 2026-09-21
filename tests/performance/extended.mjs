import { statistics as stats } from './timing.mjs';

export async function extended({ browser, url, config, report: overall, checkpoint }) {
  const { cdp } = browser;
  const sampleCount = config.samples;
  const groups = config.groups;
  const report = (overall.extended = { failures: [] });
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const withPage = async (fn, rate = 1) => {
    const page = await browser.page(`${url}/extended`, rate);
    try {
      return await fn(page);
    } finally {
      await cdp.send('Target.closeTarget', { targetId: page.targetId });
    }
  };
  for (const group of groups) {
    console.log(`Extended audit: ${group}...`);
    try {
      if (group === 'memory') {
        report.memory = await withPage(async ({ sessionId }) => {
          const collect = async () => {
            await cdp.send('HeapProfiler.collectGarbage', {}, sessionId);
            const heap = await cdp.send('Runtime.getHeapUsage', {}, sessionId);
            const dom = await cdp.send('Memory.getDOMCounters', {}, sessionId);
            const refs = await cdp.evaluate(sessionId, 'window.checkCollected()');
            return { usedSize: heap.usedSize, embedderHeapUsedSize: heap.embedderHeapUsedSize, ...dom, ...refs };
          };
          await cdp.evaluate(sessionId, 'window.runCycles({count:20})');
          const samples = [{ cycle: 0, ...(await collect()) }];
          for (let i = 1; i <= 6; i++) {
            await cdp.evaluate(sessionId, 'window.runCycles({count:50})');
            samples.push({ cycle: i * 50, ...(await collect()) });
            console.log(`  ${i * 50}/300 cycles: heap ${samples.at(-1).usedSize}, nodes ${samples.at(-1).nodes}, retained probes ${samples.at(-1).alive}`);
          }
          const result = {
            samples,
            heapGrowthBytes: samples.at(-1).usedSize - samples[0].usedSize,
            nodeGrowth: samples.at(-1).nodes - samples[0].nodes,
            listenerGrowth: samples.at(-1).jsEventListeners - samples[0].jsEventListeners,
          };
          report.memory = result;
          await checkpoint();
          assert(
            samples.every((sample) => sample.alive === 0),
            'Destroyed calendars or nodes remain reachable after GC',
          );
          assert(result.heapGrowthBytes < 1024 * 1024, 'Retained JS heap grows by >=1 MiB after 300 cycles');
          assert(result.nodeGrowth <= 20, 'DOM node count grows by >20 after 300 cycles');
          assert(result.listenerGrowth <= 0, 'DOM event listener count grows after 300 cycles');
          return result;
        });
        report.resources = await withPage(({ sessionId }) => cdp.evaluate(sessionId, 'window.runCycles({count:40,tracked:true})'));
      }
      if (group === 'multiple') report.multiple = await withPage(({ sessionId }) => cdp.evaluate(sessionId, 'window.checkMultiple()'));
      if (group === 'rapid') {
        report.rapid = [];
        for (const rate of config.rates)
          report.rapid.push(
            await withPage(async ({ sessionId }) => {
              const run = (action) => cdp.evaluate(sessionId, `window.rapid(${JSON.stringify(action)})`);
              const prepare = () => cdp.evaluate(sessionId, 'window.prepareRapid()');
              const pointer = (type, x, y) =>
                cdp.send(
                  'Input.dispatchMouseEvent',
                  { type, x, y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: type === 'mouseMoved' ? 0 : 1 },
                  sessionId,
                );
              await prepare();
              const burst = await run('burst');
              const paced = await run('paced');
              const cases = [];
              for (const interrupt of ['set', 'destroy']) {
                const { x, y, distance } = await run('start');
                await pointer('mousePressed', x, y);
                await pointer('mouseMoved', x - 20, y);
                await pointer('mouseMoved', x - distance, y);
                const native = await run('dragging');
                await run(interrupt);
                await pointer('mouseReleased', x - distance, y);
                await run(`verify-${interrupt}`);
                cases.push({ name: `native swipe during animation interrupted by ${interrupt}`, ...native });
              }
              for (const interrupt of ['set', 'destroy']) {
                await prepare();
                const { x, y, distance } = await run('start-collapse');
                await pointer('mousePressed', x, y);
                await pointer('mouseMoved', x, y - 20);
                await pointer('mouseMoved', x, y - distance);
                const native = await run('dragging');
                await run(interrupt);
                await pointer('mouseReleased', x, y - distance);
                await run(`verify-${interrupt}`);
                cases.push({ name: `native collapse interrupted by ${interrupt}`, ...native });
                if (interrupt === 'set') {
                  await run('update-animation');
                  await run('destroy');
                }
              }
              const input = await run('input-burst');
              return { cpuRate: rate, burst, paced, cases, input };
            }, rate),
          );
      }
      if (group === 'startup') {
        report.startup = [];
        for (const rate of config.rates)
          for (const scenario of ['month', 'input', 'rich']) {
            const variants = ['baseline', 'current'];
            const captures = Object.fromEntries(variants.map((variant) => [variant, []]));
            for (let sample = 0; sample < sampleCount; sample++) {
              // Interleave revisions, reverse order on alternate samples to reduce drift.
              for (const variant of sample % 2 ? [...variants].reverse() : variants) {
                const { browserContextId } = await cdp.send('Target.createBrowserContext');
                try {
                  const page = await browser.page(`${url}/startup`, rate, { browserContextId, cold: true });
                  const result = await cdp.evaluate(page.sessionId, `window.runStartup(${JSON.stringify({ variant, scenario })})`);
                  assert(
                    result.resources.length === 2 && result.resources.every((resource) => resource.transferSize > 0),
                    'Startup used a cached or missing module/CSS resource',
                  );
                  captures[variant].push(result);
                } finally {
                  await cdp.send('Target.disposeBrowserContext', { browserContextId });
                }
              }
            }
            for (const variant of variants) {
              const samples = captures[variant];
              const summary = Object.fromEntries(
                ['totalMs', 'createToReadyMs', 'moduleMs', 'cssMs', 'constructorMs', 'initCallMs', 'deferredMs'].map((key) => [
                  key,
                  stats(samples.map((sample) => sample[key])),
                ]),
              );
              report.startup.push({ cpuRate: rate, scenario, variant, summary, samples });
              console.log(
                `  ${scenario}, ${variant}, CPU ${rate}x: total ${summary.totalMs.medianMs.toFixed(1)} ms, create→ready ${summary.createToReadyMs.medianMs.toFixed(1)} ms (${samples.length} samples)`,
              );
            }
            await checkpoint();
          }
      }
    } catch (error) {
      report.failures.push({ group, error: error.stack ?? String(error) });
      console.error(`${group} failed: ${error.message}`);
    }
    await checkpoint();
  }

  if (report.failures.length) throw new Error(`Extended checks failed: ${report.failures.map((item) => item.group).join(', ')}`);
}
