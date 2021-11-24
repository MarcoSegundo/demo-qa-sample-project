const { chromium, test, expect } = require("@playwright/test");

test.describe("Test Elements on Demo QA site", () => {
  test.beforeEach(async () => {
    const browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
  });
  
  test.afterEach(async () => {
    await page.close();
  });

    test('Should be able to fill Text Box and submit the form', async () => {

        await page.goto("https://demoqa.com/text-box");

        await page.fill("//input[@id='userName']", 'Diamond Farley');

        await page.fill("//input[@id='userEmail']", 'dfarley@demoqa.com');
        
        await page.fill("//textarea[@id='currentAddress']", '986 Golden Star Ave.Oxford, MS 38655');
        
        await page.fill("//textarea[@id='permanentAddress']", '90 E. St Margarets St.Springfield, PA 19064');

        await page.click("//button[@id='submit']");

        await expect(page.locator("//p[@id='name']")).toHaveText(/Diamond Farley/);
        await expect(page.locator("//p[@id='email']")).toHaveText(/dfarley@demoqa.com/);
        await expect(page.locator("//p[@id='currentAddress']")).toHaveText(/986 Golden Star Ave.Oxford, MS 38655/);
        await expect(page.locator("//p[@id='permanentAddress']")).toHaveText(/90 E. St Margarets St.Springfield, PA 19064/);
    });

    test('Should be able to fill Checkbox', async () => {
        
        await page.goto("https://demoqa.com/checkbox");
    
        await page.click("//button[contains(@class,'option-expand-all')]");
    
        await page.click("//label[@for='tree-node-private']");
    
        await expect(page.locator("//div[@id='result']")).toHaveText(/private/);
    });

    test('Should be able to fill Radio Button', async () => {
        
        await page.goto("https://demoqa.com/radio-button");
    
        await page.check("text=Impressive", {force:true});
    
        await expect(page.locator("//span[@class='text-success']")).toHaveText(/Impressive/);
    });

    test('Should be able to read from Table', async () => {
        await page.goto("https://demoqa.com/webtables");
    
        await page.fill("//input[@id='searchBox']", '2000');
    
        const tableData = await page.$$eval("//div[@role='gridcell']", (rows) => {
            return Array.from(rows).map(row => row.textContent);
        });
    
        await expect(tableData.includes("Alden")).toBeTruthy();
        await expect(tableData.includes("12000")).toBeTruthy();
        await expect(tableData.includes("Kierra")).toBeTruthy();
        await expect(tableData.includes("2000")).toBeTruthy();
    
        await page.click("//button[@id='addNewRecordButton']");
    
        await page.fill("//input[@id='firstName']", 'Diamond');
    
        await page.fill("//input[@id='lastName']", 'Farley');
    
        await page.fill("//input[@id='userEmail']", 'dfarley@demoqa.com');
    
        await page.fill("//input[@id='age']", '45');
    
        await page.fill("//input[@id='salary']", '2000');
    
        await page.fill("//input[@id='department']", 'IT');
    
        await page.click("//button[@id='submit']");
    
        const tableDataAdded = await page.$$eval("//div[@role='gridcell']", (rows) => {
            return Array.from(rows).map(row => row.textContent);
        });
    
        await expect(tableDataAdded.includes("Farley")).toBeTruthy();
    
        await page.fill("//input[@id='searchBox']", '45');
    
        const tableDataUpdated = await page.$$eval("//div[@role='gridcell']", (rows) => {
            return Array.from(rows).map(row => row.textContent);
        });
    
        await expect(tableDataUpdated.includes("Kierra")).toBeFalsy();
    });

    test('Should be able to interact with Buttons (click, double-click and right-click)', async () => {
        
        await page.goto("https://demoqa.com/buttons");
    
        await page.dblclick("//button[@id='doubleClickBtn']");
    
        await expect(page.locator("//p[@id='doubleClickMessage']")).toHaveText(/You have done a double click/);
    
        await page.click("//button[@id='rightClickBtn']", { button: 'right' });
    
        await expect(page.locator("//p[@id='rightClickMessage']")).toHaveText(/You have done a right click/);
    
        await page.click("//button[@type='button' and (text()='Click Me')]");
    
        await expect(page.locator("//p[@id='dynamicClickMessage']")).toHaveText(/You have done a dynamic click/);
    });

    test('Should be able to interact with links with endpoint validation and changing tabs', async () => {

        await page.goto("https://demoqa.com/links");
        
        let routeCallbackCN;
        const routePromiseCN = new Promise(r => routeCallbackCN = r);

        await page.route('**/created', async route => {
            const response = await page.request.fetch(route.request());
            let status = await response.status();
            
            expect(status).toBe(201);
            routeCallbackCN();
        });
        await page.click("//a[@id='created']");

        await page.route('**/no-content', async route => {
            const response = await page.request.fetch(route.request());
            let status = await response.status();

            expect(status).toBe(204);
            routeCallbackCN();
        });
        await page.click("//a[@id='no-content']");

        await routePromiseCN;

        let routeCallbackMB;
        const routePromiseMB = new Promise(r => routeCallbackMB = r);

        await page.route('**/moved', async route => {
            const response = await page.request.fetch(route.request());
            let status = await response.status();

            expect(status).toBe(301);
            routeCallbackMB();
        });
        await page.click("//a[@id='moved']");

        await page.route('**/bad-request', async route => {
            const response = await page.request.fetch(route.request());
            let status = await response.status();

            expect(status).toBe(400);
            routeCallbackMB();
        });
        await page.click("//a[@id='bad-request']");

        await routePromiseMB;
        
        let routeCallbackUF;
        const routePromiseUF = new Promise(r => routeCallbackUF = r);

        await page.route('**/unauthorized', async route => {
            const response = await page.request.fetch(route.request());
            let status = await response.status();

            expect(status).toBe(401);
            routeCallbackUF();
        });
        await page.click("//a[@id='unauthorized']");

        await page.route('**/forbidden', async route => {
            const response = await page.request.fetch(route.request());
            let status = await response.status();

            expect(status).toBe(403);
            routeCallbackUF();
        });
        await page.click("//a[@id='forbidden']");

        await routePromiseUF;

        let routeCallbackI;
        const routePromiseI = new Promise(r => routeCallbackI = r);

        await page.route('**/invalid-url', async route => {
            const response = await page.request.fetch(route.request());
            let status = await response.status();

            expect(status).toBe(404);
            routeCallbackI();
        });
        await page.click("//a[@id='invalid-url']");

        await routePromiseI;
        
        const [newPage] = await Promise.all([ context.waitForEvent('page'),  page.click("//a[@id='simpleLink']")]);
        await newPage.waitForLoadState();

        await expect(newPage).toHaveURL("https://demoqa.com/");
        expect(newPage.url().includes("links")).toBeFalsy();

        const [newDynamicPage] = await Promise.all([ context.waitForEvent('page'),  page.click("//a[@id='dynamicLink']")]);
        await newDynamicPage.waitForLoadState();

        await expect(newDynamicPage).toHaveURL("https://demoqa.com/");
        expect(newDynamicPage.url().includes("links")).toBeFalsy();
    });

    test('Should be able to interact with the files upload and download', async () => {
        
        await page.goto("https://demoqa.com/upload-download");
    
        const [ download ] = await Promise.all([
            page.waitForEvent('download'),
            page.click("//a[@id='downloadButton']")
          ]);
        const nameFile = download.suggestedFilename();
        
        expect(nameFile.includes("sampleFile")).toBeTruthy();
    
        await page.setInputFiles("//input[@id='uploadFile']", './fixtures/testPicture.png');
    
        await expect(page.locator("//p[@id='uploadedFilePath']")).toContainText(/testPicture.png/);
    });
});