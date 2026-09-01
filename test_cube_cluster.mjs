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

  // Wait for entrance assembly animation
  await page.waitForTimeout(1600);

  // Test mouse interaction across the 3D cube canvas
  console.log('Testing mouse parallax on 3D cube cluster canvas...');
  await page.mouse.move(950, 380);
  await page.waitForTimeout(300);
  await page.mouse.move(1150, 480);
  await page.waitForTimeout(300);
  await page.mouse.move(850, 280);
  await page.waitForTimeout(500);

  // Capture Hero section screenshot
  const heroEl = await page.$('#hero');
  if (heroEl) {
    await heroEl.screenshot({
      path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/cube_hero_screenshot.png',
    });
    console.log('Saved cube hero screenshot.');
  }

  // Scroll through sections
  const scrollSteps = [600, 1400, 2200, 3000, 3800, 4500];
  for (const pos of scrollSteps) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'smooth' }), pos);
    await page.waitForTimeout(300);
  }

  // Take full page screenshot
  await page.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/full_page_cube_screenshot.png',
    fullPage: true,
  });
  console.log('Saved updated full page screenshot with cube cluster.');

  // Test mobile viewport
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);

  const mobileHero = await mobilePage.$('#hero');
  if (mobileHero) {
    await mobileHero.screenshot({
      path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/mobile_cube_hero_screenshot.png',
    });
    console.log('Saved mobile cube hero screenshot.');
  }

  console.log('Console Errors:', errors);

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
