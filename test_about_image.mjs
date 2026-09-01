import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log('1. Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to about section
  const aboutElem = page.locator('#about');
  await aboutElem.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // Take screenshot of desktop about section
  await page.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/about_founder_screenshot.png',
  });
  console.log('Saved about_founder_screenshot.png');

  // Test mobile view
  console.log('2. Testing mobile view...');
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobAboutElem = mobilePage.locator('#about');
  await mobAboutElem.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(600);

  await mobilePage.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/mobile_about_founder_screenshot.png',
  });
  console.log('Saved mobile_about_founder_screenshot.png');

  await browser.close();
}

run().catch(console.error);
