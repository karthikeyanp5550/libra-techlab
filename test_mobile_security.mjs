import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();

  console.log('Navigating in mobile viewport...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to security
  const secElem = page.locator('#security');
  await secElem.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  await page.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/mobile_security_section_screenshot.png',
  });
  console.log('Saved mobile_security_section_screenshot.png');

  await browser.close();
}

run().catch(console.error);
