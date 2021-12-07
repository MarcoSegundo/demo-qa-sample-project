const { chromium, test, expect } = require("@playwright/test");

test.describe("Test Alerts, Frames and Windows on Demo QA site", () => {

    test('Should be able to interact with alerts 1  - Click Button to see alert', async ({ page }) => {

        await page.goto("https://demoqa.com/alerts");

        page.on('dialog', async dialog => {
            await expect(dialog.message().includes("You clicked a button")).toBeTruthy();
            await dialog.accept();
        });

        await page.click("//button[@id='alertButton']");
    });

    test('Should be able to interact with alerts 2 - Alert appears after 5 seconds', async ({ page }) => {
        
        await page.goto("https://demoqa.com/alerts");
    
        page.on('dialog', async dialog => {
            await expect(dialog.message().includes("This alert appeared after 5 seconds")).toBeTruthy();
            await dialog.accept();
        });
    
        await page.click("//button[@id='timerAlertButton']");
    
        await page.waitForTimeout(6000);
    });

    test('Should be able to interact with alerts 3 - Select Cancel on confirm box', async ({ page }) => {
        
        await page.goto("https://demoqa.com/alerts");
    
        page.on('dialog', async dialog => {
            await dialog.dismiss();
        });
    
        await page.click("//button[@id='confirmButton']");
    
        await expect(page.locator("//span[@id='confirmResult']")).toHaveText(/You selected Cancel/);
    });

    test('Should be able to interact with alerts 4 - Select Ok on confirm box', async ({ page }) => {
        
        await page.goto("https://demoqa.com/alerts");
    
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
    
        await page.click("//button[@id='confirmButton']");
    
        await expect(page.locator("//span[@id='confirmResult']")).toHaveText(/You selected Ok/);
    });

    test('Should be able to interact with alerts 5 - Fill prompt box', async ({ page }) => {
        
        await page.goto("https://demoqa.com/alerts");
    
        page.on('dialog', async dialog => {
            await dialog.accept("Cristiano Ronaldo dos Santos Aveiro");
        });
    
        await page.click("//button[@id='promtButton']");
    
        await expect(page.locator("//span[@id='promptResult']")).toHaveText(/You entered Cristiano Ronaldo dos Santos Aveiro/);
    });

    test('Should be able to interact with modals - Small and Large modals', async ({ page }) => {
        
        await page.goto("https://demoqa.com/modal-dialogs");
    
        await page.click("//button[@id='showSmallModal']");
    
        await expect(page.locator("//div[@class='modal-body']")).toHaveText(/This is a small modal. It has very less content/);
    
        await page.click("//button[@id='closeSmallModal']");
    
        await page.click("//button[@id='showLargeModal']");
    
        await expect(page.locator("//div[@class='modal-body']")).toHaveText(/Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum./);
    });

    test('Should be able to interact with browser windows', async () => {

        const browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto("https://demoqa.com/browser-windows");
    
        const [newTab] = await Promise.all([ context.waitForEvent('page'),  page.click("//button[@id='tabButton']")]);
        await newTab.waitForLoadState();
    
        await expect(newTab.locator("//h1[@id='sampleHeading']")).toContainText("This is a sample page");
    
        const [newWindow] = await Promise.all([ context.waitForEvent('page'),  page.click("//button[@id='windowButton']")]);
        await newWindow.waitForLoadState();
    
        await expect(newWindow.locator("//h1[@id='sampleHeading']")).toContainText("This is a sample page");
    
        const [newMessageWindow] = await Promise.all([ context.waitForEvent('page'),  page.click("//button[@id='messageWindowButton']")]);
        await newMessageWindow.waitForLoadState();
    
        await expect(newMessageWindow.locator("body")).toContainText("Knowledge increases by sharing but not by saving");
        
        await page.close();
    });
});