import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    errors.push(err.message);
  });

  console.log('Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Wait for initial animation
  await page.waitForTimeout(1200);

  // Test mouse interaction across the hero canvas
  console.log('Testing mouse parallax on 3D Brain canvas...');
  await page.mouse.move(900, 350);
  await page.waitForTimeout(300);
  await page.mouse.move(1100, 450);
  await page.waitForTimeout(300);
  await page.mouse.move(800, 250);
  await page.waitForTimeout(500);

  // Capture Hero section screenshot
  const heroEl = await page.$('#hero');
  if (heroEl) {
    await heroEl.screenshot({
      path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/hero_screenshot.png',
    });
    console.log('Saved hero screenshot.');
  }

  // Scroll through all sections gradually
  const scrollSteps = [600, 1400, 2200, 3000, 3800, 4500];
  for (const pos of scrollSteps) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'smooth' }), pos);
    await page.waitForTimeout(300);
  }

  // Take full page screenshot
  await page.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/full_page_screenshot.png',
    fullPage: true,
  });
  console.log('Saved updated full page screenshot.');

  console.log('Console Errors:', errors);

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
