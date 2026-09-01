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

  console.log('1. Testing direct navigation to /security-maintenance...');
  await page.goto('http://localhost:5173/security-maintenance', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  // Take screenshot of Security & Maintenance page
  await page.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/security_page_screenshot.png',
    fullPage: true,
  });
  console.log('Saved security_page_screenshot.png');

  // Test navigation from Security page to Home/Contact
  console.log('2. Testing "GET MAINTENANCE SUPPORT" button click...');
  const getSupportBtn = page.getByRole('button', { name: /GET MAINTENANCE SUPPORT/i });
  if (await getSupportBtn.isVisible()) {
    await getSupportBtn.click();
    await page.waitForTimeout(1000);
    console.log('Current URL after click:', page.url());
  }

  // Test navigation from Home navbar to Security
  console.log('3. Testing navbar "SECURITY" link from Home...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const secNavLink = page.getByRole('link', { name: 'SECURITY', exact: true });
  if (await secNavLink.isVisible()) {
    await secNavLink.click();
    await page.waitForTimeout(1000);
    console.log('Current URL after navbar click:', page.url());
  }

  // Test mobile viewport
  console.log('4. Testing mobile viewport (375x812)...');
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });
  await mobilePage.goto('http://localhost:5173/security-maintenance', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  await mobilePage.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/mobile_security_page_screenshot.png',
    fullPage: true,
  });
  console.log('Saved mobile_security_page_screenshot.png');

  console.log('Console Errors:', errors);

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
