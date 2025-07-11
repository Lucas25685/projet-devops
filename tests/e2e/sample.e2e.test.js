const puppeteer = require('puppeteer');

describe('Création de ticket et vérification dans la liste', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('soumet un ticket via le formulaire et vérifie sa présence sur /tickets', async () => {

    const testEmail = `user${Date.now()}@test.com`;
    const message = 'Test message';
    const type = '1';

    await page.goto('http://localhost:3000');

    await page.type('input[name="email"]', testEmail);
    await page.select('select[name="type_id"]', type);
    await page.type('textarea[name="message"]', message);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('button[type="submit"]')
    ]);

    await page.authenticate({
      username: 'admin',
      password: 'admin123'
    });

    await page.goto('http://localhost:3000/tickets', );

    const ticketVisible = await page.evaluate((email) => {
      /* eslint-disable-next-line no-undef */
      return Array.from(document.querySelectorAll('*')).some(el =>
        el.textContent.includes(email)
      );
    }, testEmail);

    expect(ticketVisible).toBe(true);
  });
});
