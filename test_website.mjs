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

  // Scroll through all sections gradually
  const scrollSteps = [400, 900, 1500, 2200, 2900, 3600, 4200];
  for (const pos of scrollSteps) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'smooth' }), pos);
    await page.waitForTimeout(350);
  }

  // Scroll to services
  await page.evaluate(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);

  // Check service cards
  const serviceCards = await page.$$('.service-card');
  console.log(`Found ${serviceCards.length} service card elements`);

  const cardTitles = await page.$$eval('.service-card-title', (els) => els.map((e) => e.textContent?.trim()));
  console.log('Service Card Titles:', cardTitles);

  for (let i = 0; i < serviceCards.length; i++) {
    const isVisible = await serviceCards[i].isVisible();
    const box = await serviceCards[i].boundingBox();
    console.log(`Card ${i + 1} (${cardTitles[i]}): visible=${isVisible}, bbox=${JSON.stringify(box)}`);
  }

  // Take screenshot of Services section
  const servicesEl = await page.$('#services');
  if (servicesEl) {
    await servicesEl.screenshot({
      path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/services_screenshot.png',
    });
    console.log('Saved services screenshot.');
  }

  // Take full page screenshot
  await page.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/full_page_screenshot.png',
    fullPage: true,
  });
  console.log('Saved full page screenshot.');

  console.log('Console Errors:', errors);

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
