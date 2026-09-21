export async function checkRendering({ browser, url, report, checkpoint }) {
  const { cdp } = browser;
  report.rendering = [];
  for (const timezone of ['UTC', 'America/New_York', 'Europe/Berlin', 'America/Santiago', 'Pacific/Apia']) {
    const page = await browser.page(`${url}/checks`);
    try {
      await cdp.send('Emulation.setTimezoneOverride', { timezoneId: timezone }, page.sessionId);
      const result = await cdp.evaluate(page.sessionId, 'window.checkRendering()');
      report.rendering.push({ timezone, ...result });
      console.log(`Rendering: ${result.cases.length} cases passed in ${timezone}.`);
      await checkpoint();
    } finally {
      await cdp.send('Target.closeTarget', { targetId: page.targetId });
    }
  }
}
