const { chromium, test, expect } = require("@playwright/test");

test.describe("Test Forms on Demo QA site", () => {
    test.beforeEach(async () => {
        const browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
    });
    
    test.afterEach(async () => {
        await page.close();
    });

    test('Should be able to fill and submit the form', async () => {

        await page.goto("https://demoqa.com/automation-practice-form");

        await page.fill("//input[@id='firstName']", 'Lainey');

        await page.fill("//input[@id='lastName']", 'Ross');

        await page.fill("//input[@id='userEmail']", 'nullchar@demoqa.com');

        await page.click("//label[contains(text(),'Male')]");

        await page.fill("//input[@id='userNumber']", '4865596142');

        await page.click("//input[@id='dateOfBirthInput']");

        await page.selectOption("//select[@class='react-datepicker__month-select']", { label: 'July' });

        await page.selectOption("//select[@class='react-datepicker__year-select']", { label: '2020' });

        await page.click("//div[@class='react-datepicker__week']//div[contains(@aria-label,'July 7th')]");

        await page.fill("//input[@id='subjectsInput']", 'Maths');

        await page.click("//div[contains(@class,'subjects-auto-complete__option') and text()='Maths']");

        await page.check("//label[contains(text(),'Sports')]", {force:true});

        await page.check("//label[contains(text(),'Music')]", {force:true});

        await page.setInputFiles('input[type="file"]', './fixtures/testPicture.png');

        await page.fill("//textarea[@id='currentAddress']", '768 Gainsway Street Lawrenceville, GA 30043');

        await page.click("//div[@id='state']");

        await page.click("//*[contains(@tabindex,'-1')]");

        await page.click("//div[@id='city']");

        await page.click("//*[contains(@tabindex,'-1')]");

        await page.click("//button[@id='submit']");

        await expect(page.locator("//td[contains(text(),'Student Name')]/following-sibling::td")).toHaveText(/Lainey Ross/);
        await expect(page.locator("//td[contains(text(),'Student Email')]/following-sibling::td")).toHaveText(/nullchar@demoqa.com/);
        await expect(page.locator("//td[contains(text(),'Gender')]/following-sibling::td")).toHaveText(/Male/);
        await expect(page.locator("//td[contains(text(),'Mobile')]/following-sibling::td")).toHaveText(/4865596142/);
        await expect(page.locator("//td[contains(text(),'Date of Birth')]/following-sibling::td")).toHaveText(/7 July,2020/);
        await expect(page.locator("//td[contains(text(),'Subjects')]/following-sibling::td")).toHaveText(/Maths/);
        await expect(page.locator("//td[contains(text(),'Hobbies')]/following-sibling::td")).toHaveText(/Sports, Music/);
        await expect(page.locator("//td[contains(text(),'Picture')]/following-sibling::td")).toHaveText(/testPicture.png/);
        await expect(page.locator("//td[contains(text(),'Address')]/following-sibling::td")).toHaveText(/768 Gainsway Street Lawrenceville, GA 30043/);
        await expect(page.locator("//td[contains(text(),'State and City')]/following-sibling::td")).toHaveText(/NCR Delhi/);
    });
});