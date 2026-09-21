export function markdown(report) {
  const lines = [
    '# Calendar performance',
    '',
    `Status: **${report.status}**. Generated: ${report.generatedAt}.`,
    '',
    `Baseline: ${report.provenance?.baselineCommit ?? report.config.baseline}. Current HEAD: ${report.provenance?.head ?? 'not built'} plus working-tree changes recorded in report.json.`,
    '',
    `Browser: ${report.environment.browser ?? 'not started'}. CPU: ${report.environment.cpu}. Node: ${report.environment.node}.`,
    '',
    'Production builds, identical layout CSS, interleaved revisions, 3 warmups. Synchronous operation plus forced layout; setup is excluded for interactions. Ratios compare medians. CPU throttling is relative to this host, not a physical phone. First rendering, memory and CPU profiles are measured separately.',
    '',
  ];
  if (report.config.quick || report.config.samples < 10) lines.push('**Smoke run:** too few samples for a performance conclusion.', '');
  if (report.error) lines.push('## Error', '', '```text', report.error, '```', '');
  if (report.timings?.length) {
    lines.push('| Scenario | CPU | Before, ms | After, ms | Speedup | p90 before → after, ms |', '|---|---:|---:|---:|---:|---:|');
    for (const { name, rate, baseline, current, speedup } of report.timings)
      lines.push(
        `| ${name} | ${rate}× | ${baseline.medianMs.toFixed(1)} | ${current.medianMs.toFixed(1)} | ${speedup.toFixed(2)}× | ${baseline.p90Ms.toFixed(1)} → ${current.p90Ms.toFixed(1)} |`,
      );
    lines.push('');
  }
  if (report.builds) {
    lines.push('## Bundle sizes', '', '| File | Raw bytes, before → after | gzip bytes | Brotli bytes |', '|---|---:|---:|---:|');
    for (const [file, a] of Object.entries(report.builds.baseline.artifacts)) {
      const b = report.builds.current.artifacts[file];
      lines.push(`| ${file} | ${a.bytes} → ${b.bytes} | ${a.gzip} → ${b.gzip} | ${a.brotli} → ${b.brotli} |`);
    }
    const changed = Object.keys(report.builds.baseline.declarations).filter(
      (name) => report.builds.baseline.declarations[name] !== report.builds.current.declarations[name],
    );
    lines.push('', `Public declaration/package files changed: ${changed.length ? changed.join(', ') : 'none'}.`, '');
  }
  if (report.rendering) {
    lines.push('## Rendering checks', '');
    for (const row of report.rendering) lines.push(`- ${row.timezone}: ${row.cases.length} cases passed, DOM reuse verified.`);
    lines.push('');
  }
  const extended = report.extended;
  if (extended?.memory) {
    const m = extended.memory;
    lines.push(
      '## Lifecycle',
      '',
      `300 cycles after 20 warmups: heap growth ${m.heapGrowthBytes} bytes, DOM node growth ${m.nodeGrowth}, listener growth ${m.listenerGrowth}. Remaining WeakRef probes: ${m.samples.at(-1).alive}.`,
      '',
    );
    if (extended.resources) lines.push(`40 instrumented cycles: ${JSON.stringify(extended.resources.resources)}.`, '');
  }
  if (extended?.multiple) lines.push(`Concurrent calendars: ${extended.multiple.passed.length} checks passed.`, '');
  if (extended?.rapid) lines.push(`Rapid interactions checked at CPU ${extended.rapid.map((row) => `${row.cpuRate}×`).join(', ')}.`, '');
  if (extended?.startup?.length) {
    lines.push(
      '## Cold startup',
      '',
      'Fresh browser context, disabled HTTP cache, localhost uncompressed resources. Browser process and OS caches remain warm. Readiness includes timers and two rendering opportunities, not physical screen presentation.',
      '',
      '| Scenario | CPU | Version | Load → ready, ms | Create → ready, ms | Samples |',
      '|---|---:|---|---:|---:|---:|',
    );
    for (const row of extended.startup)
      lines.push(
        `| ${row.scenario} | ${row.cpuRate}× | ${row.variant} | ${row.summary.totalMs.medianMs.toFixed(1)} | ${row.summary.createToReadyMs.medianMs.toFixed(1)} | ${row.samples.length} |`,
      );
    lines.push('');
  }
  if (report.profiles?.length) lines.push('## CPU profiles', '', ...report.profiles.map((row) => `- [${row.file}](${row.file})`), '');
  lines.push(
    'Raw samples, build/source hashes, dependency versions, options and failures are retained in report.json. Timings have no automatic pass/fail threshold; inspect regressions and repeat on the same environment before drawing conclusions.',
    '',
  );
  return lines.join('\n');
}
