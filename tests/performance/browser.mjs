import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';

export async function serve(resources) {
  const server = createServer((request, response) => {
    const entry = resources[new URL(request.url, 'http://localhost').pathname];
    response.writeHead(entry ? 200 : 404, { 'Content-Type': entry?.type ?? 'text/plain', 'Cache-Control': 'no-store' });
    response.end(entry?.body ?? 'Not found');
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((resolve) => server.close(resolve)) };
}

export class CDP {
  #socket;
  #sequence = 0;
  #pending = new Map();
  constructor(socket) {
    this.#socket = socket;
    socket.addEventListener('close', () => {
      for (const pending of this.#pending.values()) {
        clearTimeout(pending.timer);
        pending.reject(new Error('Chrome connection closed.'));
      }
      this.#pending.clear();
    });
    socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);
      const pending = this.#pending.get(message.id);
      if (!pending) return;
      this.#pending.delete(message.id);
      clearTimeout(pending.timer);
      if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
      else pending.resolve(message.result);
    });
  }
  static async connect(url) {
    const socket = new WebSocket(url);
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true });
      socket.addEventListener('error', reject, { once: true });
    });
    return new CDP(socket);
  }
  send(method, params = {}, sessionId) {
    const id = ++this.#sequence;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.#pending.delete(id);
        reject(new Error(`CDP timeout: ${method}`));
      }, 120000);
      this.#pending.set(id, { resolve, reject, timer });
      this.#socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }
  async evaluate(session, expression) {
    const result = await this.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, session);
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
    return result.result.value;
  }
  close() {
    this.#socket.close();
  }
}

export async function launchChrome() {
  const candidates = process.env.CHROME_PATH
    ? [process.env.CHROME_PATH]
    : [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium',
        '/usr/bin/chromium-browser',
      ];
  let executable;
  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      executable = candidate;
      break;
    } catch {
      /* Try the next installed browser. */
    }
  }
  if (!executable) throw new Error('Chrome not found. Set CHROME_PATH to a Chromium executable.');
  const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'vcp-audit-chrome-'));
  const child = spawn(
    executable,
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  );
  let log = '';
  let endpoint;
  try {
    endpoint = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Chrome startup timeout: ${log.slice(-1500)}`)), 20000);
      child.once('error', (error) => {
        clearTimeout(timer);
        reject(error);
      });
      child.once('exit', (code) => {
        clearTimeout(timer);
        reject(new Error(`Chrome exited ${code}: ${log.slice(-1500)}`));
      });
      child.stderr.on('data', (chunk) => {
        log += chunk;
        const match = log.match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (match) {
          clearTimeout(timer);
          resolve(match[1]);
        }
      });
    });
    const cdp = await CDP.connect(endpoint);
    return {
      cdp,
      executable,
      async page(url, cpuRate = 1, { browserContextId, cold = false } = {}) {
        const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank', ...(browserContextId ? { browserContextId } : {}) });
        const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
        await cdp.send('Page.enable', {}, sessionId);
        await cdp.send('Runtime.enable', {}, sessionId);
        if (cold) {
          await cdp.send('Network.enable', {}, sessionId);
          await cdp.send('Network.setCacheDisabled', { cacheDisabled: true }, sessionId);
        }
        await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpuRate }, sessionId);
        await cdp.send('Emulation.setTimezoneOverride', { timezoneId: 'Europe/Moscow' }, sessionId);
        await cdp.send('Page.navigate', { url }, sessionId);
        // Runtime context is replaced during navigation; probe readiness from Node.
        for (let attempt = 0; attempt < 100; attempt++) {
          try {
            if (await cdp.evaluate(sessionId, 'Boolean(window.auditReady)')) return { sessionId, targetId };
          } catch {
            /* Navigation replaced the execution context. */
          }
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        throw new Error('Audit page did not become ready.');
      },
      async close() {
        try {
          await cdp.send('Browser.close');
        } catch {
          /* Browser may close before acknowledging. */
        }
        cdp.close();
        if (child.exitCode === null) {
          await Promise.race([new Promise((resolve) => child.once('exit', resolve)), new Promise((resolve) => setTimeout(resolve, 2000))]);
          if (child.exitCode === null) child.kill('SIGTERM');
        }
        await fs.rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
      },
    };
  } catch (error) {
    child.kill('SIGTERM');
    await fs.rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    throw error;
  }
}
