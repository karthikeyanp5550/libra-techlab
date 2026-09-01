import { chromium } from 'playwright';

async function testApi() {
  console.log('--- Testing /api/contact API endpoint ---');

  // Test 1: Empty body
  const res1 = await fetch('http://localhost:5173/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  const data1 = await res1.json();
  console.log('1. Empty Body Status:', res1.status, data1);

  // Test 2: Invalid Email
  const res2 = await fetch('http://localhost:5173/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alex Rivera', email: 'invalid-email', details: 'Need an AI website.' }),
  });
  const data2 = await res2.json();
  console.log('2. Invalid Email Status:', res2.status, data2);

  // Test 3: Short message
  const res3 = await fetch('http://localhost:5173/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alex Rivera', email: 'alex@example.com', details: 'Hi' }),
  });
  const data3 = await res3.json();
  console.log('3. Short Details Status:', res3.status, data3);

  // Test 4: Honeypot bot submission
  const res4 = await fetch('http://localhost:5173/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Spam Bot', email: 'spam@bot.com', details: 'Spam message details', botField: 'i am a bot' }),
  });
  const data4 = await res4.json();
  console.log('4. Honeypot Bot Status:', res4.status, data4);
}

async function testUi() {
  console.log('--- Testing Contact Form UI with Playwright ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to contact section
  const contactElem = page.locator('#contact');
  await contactElem.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // 1. Click submit with empty form to test client-side validation
  console.log('Submitting empty form...');
  const submitBtn = page.locator('#contact button[type="submit"]');
  await submitBtn.click();
  await page.waitForTimeout(500);

  // Check that inline validation errors appeared
  const nameErr = await page.locator('#name-error').isVisible();
  const emailErr = await page.locator('#email-error').isVisible();
  const detailsErr = await page.locator('#details-error').isVisible();
  console.log('Validation errors displayed:', { nameErr, emailErr, detailsErr });

  // Take screenshot of validation errors
  await page.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/contact_validation_screenshot.png',
  });
  console.log('Saved contact_validation_screenshot.png');

  // 2. Fill in valid details
  console.log('Filling form with project details...');
  await page.locator('#contact-name').fill('Sarah Chen');
  await page.locator('#contact-email').fill('sarah.chen@innovate.co');
  await page.locator('#contact-details').fill('We are looking to develop an AI-powered luxury ecommerce experience with custom 3D interactions.');
  await page.waitForTimeout(300);

  // 3. Submit form
  console.log('Submitting form...');
  await submitBtn.click();
  await page.waitForTimeout(1200);

  // Take screenshot of submitted form
  await page.screenshot({
    path: 'C:/Users/karth/.gemini/antigravity/brain/052000a8-3352-427d-a56f-7a0f7dac410a/contact_submitted_screenshot.png',
  });
  console.log('Saved contact_submitted_screenshot.png');

  await browser.close();
}

async function run() {
  await testApi();
  await testUi();
}

run().catch(console.error);
