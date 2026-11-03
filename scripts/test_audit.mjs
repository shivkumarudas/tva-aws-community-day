import { spawn } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = path.resolve('./.chrome_test_profile');

if (!existsSync(USER_DATA_DIR)) {
  mkdirSync(USER_DATA_DIR, { recursive: true });
}

async function runTest() {
  console.log('⚡ Starting Vite preview server on production dist/ (port 4173)...');
  const serverProcess = spawn('npx.cmd', ['vite', 'preview', '--port', '4173', '--strictPort'], {
    stdio: 'pipe',
    shell: true,
  });

  serverProcess.stdout.on('data', (d) => {
    // console.log(`[Vite]: ${d}`);
  });
  serverProcess.stderr.on('data', (d) => {
    console.error(`[Vite Error]: ${d}`);
  });

  // Wait for port 4173 to be ready
  let serverReady = false;
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://127.0.0.1:4173/');
      if (res.ok || res.status === 200) {
        serverReady = true;
        break;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }

  if (!serverReady) {
    console.error('❌ Failed to start Vite preview server.');
    serverProcess.kill();
    process.exit(1);
  }
  console.log('✅ Vite preview server running on http://127.0.0.1:4173/');

  console.log('🚀 Starting Chrome in headless CDP mode...');
  const chromeProcess = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      '--remote-debugging-port=9222',
      `--user-data-dir=${USER_DATA_DIR}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      '--window-size=1920,1080',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  // Wait for Chrome CDP endpoint to be available
  let versionData = null;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version');
      if (res.ok) {
        versionData = await res.json();
        break;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }

  if (!versionData) {
    console.error('❌ Failed to connect to Chrome CDP.');
    serverProcess.kill();
    chromeProcess.kill();
    process.exit(1);
  }

  console.log('✅ Chrome CDP connected. Browser:', versionData.Browser);

  // Get or create page target
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  const wsUrl = pageTarget.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);

  let messageId = 1;
  const pendingRequests = new Map();
  const consoleMessages = [];
  const errors = [];

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = messageId++;
      pendingRequests.set(id, { resolve, reject, method });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise((resolve) => ws.addEventListener('open', resolve));

  let pageLoaded = false;
  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pendingRequests.has(msg.id)) {
      const { resolve, reject } = pendingRequests.get(msg.id);
      pendingRequests.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    } else if (msg.method === 'Page.loadEventFired') {
      pageLoaded = true;
    } else if (msg.method === 'Runtime.consoleAPICalled') {
      const type = msg.params.type;
      const text = msg.params.args.map((a) => a.value || JSON.stringify(a)).join(' ');
      if (type === 'error') {
        errors.push(text);
        console.error(`[Browser Error]:`, text);
      } else {
        consoleMessages.push(`[${type}] ${text}`);
      }
    } else if (msg.method === 'Runtime.exceptionThrown') {
      const desc = msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text;
      errors.push(desc);
      console.error(`[Browser Exception]:`, desc);
    }
  });

  await sendCommand('Runtime.enable');
  await sendCommand('Page.enable');
  await sendCommand('DOM.enable');

  async function evaluate(expression) {
    const res = await sendCommand('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      console.error('Eval error details:', JSON.stringify(res.exceptionDetails, null, 2));
      throw new Error(res.exceptionDetails.exception?.description || res.exceptionDetails.text || 'Eval error');
    }
    return res.result?.value;
  }

  async function navigateAndWait(url) {
    pageLoaded = false;
    await sendCommand('Page.navigate', { url });
    for (let i = 0; i < 50; i++) {
      if (pageLoaded) break;
      await new Promise((r) => setTimeout(r, 100));
    }
    await new Promise((r) => setTimeout(r, 600));
  }

  console.log('\n--- 1. TESTING CINEMATIC INTRO ---');
  await navigateAndWait('http://127.0.0.1:4173/');

  const introExists = await evaluate(
    `!!document.querySelector('[data-testid="cinematic-intro"]') || !!document.querySelector('.fixed.inset-0.z-50') || Array.from(document.querySelectorAll('button')).some(b => b.textContent?.includes('ENTER CHRONOVERSE'))`
  );
  console.log(`🎬 Cinematic Intro overlay mounted: ${introExists ? '✅ Yes' : '⚠️ No'}`);

  const skipBtnText = await evaluate(`
    Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('ENTER CHRONOVERSE'))?.textContent || ''
  `);
  console.log(`⏩ Skip button found: "${skipBtnText.trim()}"`);

  // Click Skip to transition directly to Hero
  console.log('👆 Clicking "ENTER CHRONOVERSE" to test transition...');
  await evaluate(`
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('ENTER CHRONOVERSE'));
    if (btn) btn.click();
  `);
  await new Promise((r) => setTimeout(r, 1500));

  console.log('\n--- 2. TESTING HERO & CENTRAL TIMEKEEPER ---');
  const heroCheck = await evaluate(`
    (() => {
      const hero = document.getElementById('home');
      const charImg = document.querySelector('img[alt="Loki - The Confident Timekeeper"]') || document.querySelector('img[alt*="Timekeeper"]');
      const timelineCanvas = document.querySelector('canvas');
      const romanDial = Array.from(document.querySelectorAll('div')).find(d => d.textContent?.includes('XII') && d.textContent?.includes('VI'));
      const chronoButtons = Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean);
      
      return {
        heroVisible: !!hero && hero.offsetHeight > 0,
        characterLoaded: !!charImg && charImg.naturalWidth > 0,
        characterSrc: charImg ? charImg.src : null,
        characterDimensions: charImg ? { w: charImg.naturalWidth, h: charImg.naturalHeight } : null,
        hasCanvas: !!timelineCanvas,
        romanDialPresent: !!romanDial,
        chronoModes: chronoButtons.filter(t => ['IDLE', 'POWER', 'TIMELINES', 'SURGE', 'AUTO'].some(m => t.includes(m))),
      };
    })()
  `);
  console.log('Hero Status:', JSON.stringify(heroCheck, null, 2));

  // Test Chrono Mode Buttons
  console.log('\n--- 3. TESTING CHRONO MODE CONTROLS ---');
  for (const mode of ['POWER', 'SURGE', 'TIMELINES', 'IDLE']) {
    const clicked = await evaluate(`
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('${mode}'));
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      })()
    `);
    console.log(`🔘 Clicked mode [${mode}]: ${clicked}`);
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log('\n--- 4. TESTING ALL SECTIONS & CONTENT INTEGRITY ---');
  const sections = [
    { id: 'home', name: 'Hero / Timekeeper' },
    { id: 'dashboard', name: 'TVA Quantum Telemetry Dashboard' },
    { id: 'about', name: 'About Sacred Timeline' },
    { id: 'agenda', name: 'Agenda & Tracks' },
    { id: 'speakers', name: 'Keynote & Community Speakers' },
    { id: 'workshops', name: 'Hands-on Workshops' },
    { id: 'sponsors', name: 'Sponsors & Ecosystem Partners' },
    { id: 'register', name: 'Registration / Variant Pass' },
    { id: 'gallery', name: 'Multiverse Gallery' },
    { id: 'faq', name: 'TVA Support FAQ' },
  ];

  for (const sec of sections) {
    const secStatus = await evaluate(`
      (() => {
        const el = document.getElementById('${sec.id}');
        if (!el) return { found: false };
        const rect = el.getBoundingClientRect();
        return {
          found: true,
          visible: rect.height > 50,
          textLength: el.textContent?.length || 0,
          childCount: el.childElementCount
        };
      })()
    `);
    console.log(
      `📌 Section [${sec.name}] (#${sec.id}):`,
      secStatus.found ? `✅ Found (${secStatus.textLength} chars)` : '❌ MISSING'
    );
  }

  console.log('\n--- 5. TESTING REGISTRATION & VARIANT PASS MODAL ---');
  const formTest = await evaluate(`
    (() => {
      const reg = document.getElementById('register');
      if (!reg) return { error: 'Register section missing' };
      
      const inputs = Array.from(reg.querySelectorAll('input'));
      const submitBtn = Array.from(reg.querySelectorAll('button')).find(b => 
        b.textContent?.toLowerCase().includes('generate') || 
        b.textContent?.toLowerCase().includes('pass') ||
        b.textContent?.toLowerCase().includes('register')
      );

      const fieldValues = ['Loki Odinson', 'loki@tva.temporal.cloud', '+91 98765 43210', 'Pune Institute of Computer Tech'];
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      inputs.forEach((input, idx) => {
        if (fieldValues[idx]) {
          nativeSetter.call(input, fieldValues[idx]);
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      
      if (submitBtn) {
        submitBtn.click();
        return { submitted: true, buttonText: submitBtn.textContent?.trim(), inputsSet: inputs.length };
      }
      return { submitted: false, inputsFound: inputs.length };
    })()
  `);
  console.log('Registration interaction result:', formTest);
  await new Promise((r) => setTimeout(r, 2000));

  const modalOpened = await evaluate(`
    (() => {
      const modal = document.querySelector('.fixed.inset-0.z-50') || document.querySelector('[role="dialog"]') || Array.from(document.querySelectorAll('div')).find(d => d.textContent?.includes('VARIANT ID:') || d.textContent?.includes('TEMPORAL ADMISSION PASS'));
      return !!modal;
    })()
  `);
  console.log(`🎫 Variant Pass Modal Generated: ${modalOpened ? '✅ Yes (Pass successfully generated)' : '⚠️ No modal'}`);

  console.log('\n--- 6. TESTING FAQ ACCORDIONS ---');
  const faqTest = await evaluate(`
    (() => {
      const faq = document.getElementById('faq');
      if (!faq) return false;
      const faqButtons = faq.querySelectorAll('button');
      if (faqButtons.length > 0) {
        faqButtons[0].click();
        return { count: faqButtons.length, clickedFirst: true };
      }
      return { count: 0 };
    })()
  `);
  console.log('FAQ interaction test:', faqTest);

  console.log('\n--- 7. TESTING MISS MINUTES MASCOT ---');
  const missMinutesTest = await evaluate(`
    (() => {
      const mm = Array.from(document.querySelectorAll('*')).find(el => el.textContent?.includes('MISS MINUTES') || el.textContent?.includes('Miss Minutes'));
      const img = Array.from(document.querySelectorAll('img')).find(img => img.src?.includes('clock') || img.alt?.includes('Minutes') || img.className?.includes('mascot'));
      return {
        foundElement: !!mm,
        foundImage: !!img,
      };
    })()
  `);
  console.log('Miss Minutes Status:', missMinutesTest);

  console.log('\n--- 8. CONSOLE & RUNTIME ERROR AUDIT ---');
  console.log(`Total Errors recorded: ${errors.length}`);
  if (errors.length > 0) {
    console.error('Errors details:', errors);
  } else {
    console.log('🎉 0 Console Errors, 0 Unhandled Exceptions!');
  }

  ws.close();
  try { chromeProcess.kill(); } catch {}
  try { serverProcess.kill(); } catch {}
  console.log('\n🏁 Automated Production Audit Complete.');
  if (errors.length > 0) process.exit(1);
  process.exit(0);
}

runTest().catch((e) => {
  console.error('Fatal test error:', e);
  process.exit(1);
});
