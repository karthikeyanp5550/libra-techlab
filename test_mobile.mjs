import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/ in mobile viewport...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Scroll to services
  await page.evaluate(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(600);

  // Check service cards
  const serviceCards = await page.$$('.service-card');
  console.log(`Mobile: Found ${serviceCards.length} service card elements`);

  for (let i = 0; i < serviceCards.length; i++) {
    const isVisible = await serviceCards[i].isVisible();
    const box = await serviceCards[i].boundingBox();
    console.log(`Mobile Card ${i + 1}: visible=${isVisible}, bbox=${JSON.stringify(box)}`);
  }

  // Take screenshot of mobile Services section
  const servicesEl = await page.$('#services');
  if (servicesEl) {
    await servicesEl.screenshot({
      path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/mobile_services_screenshot.png',
    });
    console.log('Saved mobile services screenshot.');
  }

  // Take mobile full page screenshot
  await page.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/mobile_full_screenshot.png',
    fullPage: true,
  });
  console.log('Saved mobile full page screenshot.');

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
