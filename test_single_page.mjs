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

  console.log('1. Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Check all section IDs exist in order
  const sectionIds = ['hero', 'services', 'process', 'about', 'security', 'contact'];
  for (const id of sectionIds) {
    const elem = await page.$(`#${id}`);
    console.log(`Section #${id} exists:`, !!elem);
  }

  // Test navbar clicking "SECURITY"
  console.log('2. Clicking SECURITY navbar link...');
  const secLink = page.getByRole('link', { name: 'SECURITY', exact: true });
  await secLink.click();
  await page.waitForTimeout(1000);

  // Verify security section is in view
  const secElem = page.locator('#security');
  await secElem.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // Take screenshot of Security section in single-page context
  await page.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/single_page_security_screenshot.png',
  });
  console.log('Saved single_page_security_screenshot.png');

  // Test "GET MAINTENANCE SUPPORT" button
  console.log('3. Clicking GET MAINTENANCE SUPPORT button...');
  const maintBtn = page.getByRole('button', { name: /GET MAINTENANCE SUPPORT/i });
  await maintBtn.click();
  await page.waitForTimeout(1000);

  // Take full page screenshot
  console.log('4. Capturing full page screenshot...');
  await page.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/single_page_full_screenshot.png',
    fullPage: true,
  });
  console.log('Saved single_page_full_screenshot.png');

  // Test Mobile view
  console.log('5. Testing mobile view (375x812)...');
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1200);

  await mobilePage.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/mobile_single_page_screenshot.png',
    fullPage: true,
  });
  console.log('Saved mobile_single_page_screenshot.png');

  console.log('Console Errors:', errors);

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
