const { chromium, test, expect } = require("@playwright/test");

test.describe("Test Widgets on Demo QA site", () => {
    test.beforeEach(async () => {
        const browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
    });
    
    test.afterEach(async () => {
        await page.close();
    });

    test('Should be able to interact with Accordion Widgets', async () => {

        await page.goto("https://demoqa.com/accordian");

        await expect(page.locator("//div[@id='section1Heading']")).toHaveText(/What is Lorem Ipsum?/);
        let section1HeadingShow = await page.$$("//div[@id='section1Heading']/following-sibling::div[@class = 'collapse show']");
        expect(section1HeadingShow.length > 0).toBeTruthy();

        await expect(page.locator("//div[@id='section2Heading']")).toHaveText(/Where does it come from?/);
        let section2Heading = await page.$$("//div[@id='section2Heading']/following-sibling::div[@class = 'collapse']");
        expect(section2Heading.length > 0).toBeTruthy();

        await expect(page.locator("//div[@id='section3Heading']")).toHaveText(/Why do we use it?/);
        let section3Heading = await page.$$("//div[@id='section3Heading']/following-sibling::div[@class = 'collapse']");
        expect(section3Heading.length > 0).toBeTruthy();

        await expect(page.locator("//div[@id='section1Content']")).toHaveText(/Lorem Ipsum is simply dummy text of the printing and typesetting industry./);

        await page.click(("//div[@id='section2Heading']"));

        await expect(page.locator("//div[@id='section1Heading']")).toHaveText(/What is Lorem Ipsum?/);
        await page.waitForTimeout(1000);
        let section1Heading = await page.$$("//div[@id='section1Heading']/following-sibling::div[@class = 'collapse']");
        expect(section1Heading.length > 0).toBeTruthy();

        await expect(page.locator("//div[@id='section2Heading']")).toHaveText(/Where does it come from?/);
        let section2HeadingShow = await page.$$("//div[@id='section2Heading']/following-sibling::div[@class = 'collapse show']");
        expect(section2HeadingShow.length > 0).toBeTruthy();

        await expect(page.locator("//div[@id='section3Heading']")).toHaveText(/Why do we use it?/);
        section3Heading = await page.$$("//div[@id='section3Heading']/following-sibling::div[@class = 'collapse']");
        expect(section3Heading.length > 0).toBeTruthy();

        await expect(page.locator("//div[@id='section2Content']")).toHaveText(/Contrary to popular belief, Lorem Ipsum is not simply random text./);

        await page.click(("//div[@id='section3Heading']"));

        await expect(page.locator("//div[@id='section1Heading']")).toHaveText(/What is Lorem Ipsum?/);
        section1Heading = await page.$$("//div[@id='section1Heading']/following-sibling::div[@class = 'collapse']");
        expect(section1Heading.length > 0).toBeTruthy();

        await expect(page.locator("//div[@id='section2Heading']")).toHaveText(/Where does it come from?/);
        await page.waitForTimeout(1000);
        section2Heading = await page.$$("//div[@id='section2Heading']/following-sibling::div[@class = 'collapse']");
        expect(section2Heading.length > 0).toBeTruthy();

        await expect(page.locator("//div[@id='section3Heading']")).toHaveText(/Why do we use it?/);
        let section3HeadingShow = await page.$$("//div[@id='section3Heading']/following-sibling::div[@class = 'collapse show']");
        expect(section3HeadingShow.length > 0).toBeTruthy();

        await expect(page.locator("//div[@id='section3Content']")).toHaveText(/It is a long established fact that a reader will be distracted by the readable content/);

        await page.click(("//div[@id='section3Heading']"));

        await expect(page.locator("//div[@id='section1Heading']")).toHaveText(/What is Lorem Ipsum?/);
        section1Heading = await page.$$("//div[@id='section1Heading']/following-sibling::div[@class = 'collapse']");
        expect(section1Heading.length > 0).toBeTruthy();

        await expect(page.locator("//div[@id='section2Heading']")).toHaveText(/Where does it come from?/);
        section2Heading = await page.$$("//div[@id='section2Heading']/following-sibling::div[@class = 'collapse']");
        expect(section2Heading.length > 0).toBeTruthy();

        await expect(page.locator("//div[@id='section3Heading']")).toHaveText(/Why do we use it?/);
        await page.waitForTimeout(1000);
        section3Heading = await page.$$("//div[@id='section3Heading']/following-sibling::div[@class = 'collapse']");
        expect(section3Heading.length > 0).toBeTruthy();
    });

    test('Should be able to interact with Auto Complete Widgets', async () => {
        
        await page.goto("https://demoqa.com/auto-complete");
    
        await page.fill("//*[@id='autoCompleteMultipleContainer']//input", 'r');
    
        await page.click(("//*[contains(@class,'auto-complete__option')][contains(text(),'Green')]"));
    
        await page.fill("//*[@id='autoCompleteMultipleContainer']//input", 'r');
    
        await page.click(("//*[contains(@class,'auto-complete__option')][contains(text(),'Red')]"));
    
        await expect(page.locator("//*[contains(@class,'auto-complete__multi-value__label')][contains(text(),'Green')]")).toBeVisible();
        await expect(page.locator("//*[contains(@class,'auto-complete__multi-value__label')][contains(text(),'Red')]")).toBeVisible();
    
        await page.fill("//*[@id='autoCompleteSingleContainer']//input", 'r');
    
        await page.click(("//*[contains(@class,'auto-complete__option')][contains(text(),'Purple')]"));
    
        await expect(page.locator("//*[contains(@class,'auto-complete__single-value')][contains(text(),'Purple')]")).toBeVisible();
    
        await page.fill("//*[@id='autoCompleteSingleContainer']//input", 'r');
    
        await page.click(("//*[contains(@class,'auto-complete__option')][contains(text(),'Green')]"));
    
        await expect(page.locator("//*[contains(@class,'auto-complete__single-value')][contains(text(),'Purple')]")).toHaveCount(0);
        await expect(page.locator("//*[contains(@class,'auto-complete__single-value')][contains(text(),'Green')]")).toBeVisible();
    });

    test('Should be able to interact with Date Picker Widgets', async () => {
        
        await page.goto("https://demoqa.com/date-picker");
    
        await page.click(("//input[@id='datePickerMonthYearInput']"));
    
        await page.selectOption("//select[@class='react-datepicker__month-select']", { label: 'July' });
    
        await page.selectOption("//select[@class='react-datepicker__year-select']", { label: '1993' });
    
        await page.click(("//div[@class='react-datepicker__week']//div[contains(@aria-label,'July 7th')]"));
    
        await expect(page.locator("//input[@id='datePickerMonthYearInput']")).toHaveAttribute("value", "07/07/1993");
    
        await page.click(("//input[@id='dateAndTimePickerInput']"));
    
        await page.click(("//div[contains(@class,'react-datepicker__month-dropdown-container')]"));
    
        await page.click(("//div[@class='react-datepicker__month-option' and text()='July']"));
    
        await page.click(("//div[contains(@class,'react-datepicker__year-dropdown-container')]"));
    
        for(let i = 0; i < 30; i++){
            await page.click(("//a[contains(@class,'react-datepicker__navigation--years-previous')]"));
        }
    
        await page.click(("//div[@class='react-datepicker__year-option' and text()='1993']"));
    
        await page.click(("//div[@class='react-datepicker__week']//div[contains(@aria-label,'July 7th')]"));
    
        await page.click(("//div[@class='react-datepicker__time-box']//li[contains(text(),'22:00')]"));
    
        await expect(page.locator("//input[@id='dateAndTimePickerInput']")).toHaveAttribute("value", "July 7, 1993 10:00 PM");
    });

    test('Should be able to interact with Slider Widgets', async () => {
        
        await page.goto("https://demoqa.com/slider");
    
        const const1 = await page.$("//input[@type='range']");
        await const1.evaluate((a) => a.setAttribute('value', '80'));
        await const1.evaluate((a) => a.setAttribute('style', '--value:80;'));
    
        const const2 = await page.$("//div[contains(@class,'range-slider__tooltip--auto')]");
        await const2.evaluate((a) => a.setAttribute('style', 'left: calc(80% + -6px);'));
    
        const const3 = await page.$("//input[contains(@id,'sliderValue')]");
        await const3.evaluate((a) => a.setAttribute('value', '80'));
    
        await expect(page.locator("//input[contains(@id,'sliderValue')]")).toHaveAttribute("value", "80");
    });

    test('Should be able to interact with Progress Bar Widgets', async () => {
        
        await page.goto("https://demoqa.com/progress-bar");
    
        await page.click(("//button[@id='startStopButton']"));
    
        await page.waitForTimeout(5000);
    
        await page.click(("//button[@id='startStopButton']"));
    
        await expect(page.locator("//div[@aria-valuenow]")).toHaveAttribute("aria-valuenow", "50");
        await expect(page.locator("//div[@aria-valuenow]")).toHaveText(/50%/);
        await expect(page.locator("//div[@aria-valuenow]")).toHaveAttribute("style", "width: 50%;");
    
        await page.click(("//button[@id='startStopButton']"));
    
        await page.waitForTimeout(5000);
    
        await expect(page.locator("//div[@aria-valuenow]")).toHaveAttribute("aria-valuenow", "100");
        await expect(page.locator("//div[@aria-valuenow]")).toHaveText(/100%/);
        await expect(page.locator("//div[@aria-valuenow]")).toHaveAttribute("style", "width: 100%;");
    
        await page.click(("//button[@id='resetButton']"));
    
        await expect(page.locator("//div[@aria-valuenow]")).toHaveAttribute("aria-valuenow", "0");
        await expect(page.locator("//div[@aria-valuenow]")).toHaveText(/0%/);
        await expect(page.locator("//div[@aria-valuenow]")).toHaveAttribute("style", "width: 0%;");
    });

    test('Should be able to interact with Tabs Widgets', async () => {
        
        await page.goto("https://demoqa.com/tabs");
    
        await expect(page.locator("//a[@id='demo-tab-what']")).toHaveText(/What/);
        await expect(page.locator("//a[@id='demo-tab-what']")).toHaveAttribute("aria-selected", "true");
        await expect(page.locator("//a[@id='demo-tab-what']")).toHaveClass("nav-item nav-link active");
    
        await expect(page.locator("//a[@id='demo-tab-origin']")).toHaveText(/Origin/);
        await expect(page.locator("//a[@id='demo-tab-origin']")).toHaveAttribute("aria-selected", "false");
        await expect(page.locator("//a[@id='demo-tab-origin'][contains(@class,'nav-link active')]")).toHaveCount(0);
    
        await expect(page.locator("//a[@id='demo-tab-use']")).toHaveText(/Use/);
        await expect(page.locator("//a[@id='demo-tab-use']")).toHaveAttribute("aria-selected", "false");
        await expect(page.locator("//a[@id='demo-tab-use'][contains(@class,'nav-link active')]")).toHaveCount(0);
    
        await expect(page.locator("//a[@id='demo-tab-more']")).toHaveText(/More/);
        await expect(page.locator("//a[@id='demo-tab-more']")).toHaveAttribute("aria-selected", "false");
        await expect(page.locator("//a[@id='demo-tab-more']")).toHaveAttribute("aria-disabled", "true");
        await expect(page.locator("//a[@id='demo-tab-more']")).toHaveClass("nav-item nav-link disabled");
    
        await expect(page.locator("//div[@id='demo-tabpane-what']")).toContainText(/Lorem Ipsum is simply dummy text of the printing and typesetting industry./);
        await expect(page.locator("//div[@id='demo-tabpane-what']")).toHaveAttribute("aria-hidden", "false");
        await expect(page.locator("//div[@id='demo-tabpane-what']")).toHaveClass("fade tab-pane active show");
    
        await expect(page.locator("//div[@id='demo-tabpane-origin']")).toHaveAttribute("aria-hidden", "true");
        await expect(page.locator("//div[@id='demo-tabpane-origin'][contains(@class,'active show')]")).toHaveCount(0);
    
        await expect(page.locator("//div[@id='demo-tabpane-use']")).toHaveAttribute("aria-hidden", "true");
        await expect(page.locator("//div[@id='demo-tabpane-use'][contains(@class,'active show')]")).toHaveCount(0);
    
        await expect(page.locator("//div[@id='demo-tabpane-more']")).toHaveAttribute("aria-hidden", "true");
        await expect(page.locator("//div[@id='demo-tabpane-more'][contains(@class,'active show')]")).toHaveCount(0);
    
        await page.click(("//a[@id='demo-tab-origin']"));
    
        await expect(page.locator("//a[@id='demo-tab-what']")).toHaveText(/What/);
        await expect(page.locator("//a[@id='demo-tab-what']")).toHaveAttribute("aria-selected", "false");
        await expect(page.locator("//a[@id='demo-tab-what'][contains(@class,'nav-link active')]")).toHaveCount(0);
        
        await expect(page.locator("//a[@id='demo-tab-origin']")).toHaveText(/Origin/);
        await expect(page.locator("//a[@id='demo-tab-origin']")).toHaveAttribute("aria-selected", "true");
        await expect(page.locator("//a[@id='demo-tab-origin']")).toHaveClass("nav-item nav-link active");
    
        await expect(page.locator("//a[@id='demo-tab-use']")).toHaveText(/Use/);
        await expect(page.locator("//a[@id='demo-tab-use']")).toHaveAttribute("aria-selected", "false");
        await expect(page.locator("//a[@id='demo-tab-use'][contains(@class,'nav-link active')]")).toHaveCount(0);
    
        await expect(page.locator("//a[@id='demo-tab-more']")).toHaveText(/More/);
        await expect(page.locator("//a[@id='demo-tab-more']")).toHaveAttribute("aria-selected", "false");
        await expect(page.locator("//a[@id='demo-tab-more']")).toHaveAttribute("aria-disabled", "true");
        await expect(page.locator("//a[@id='demo-tab-more']")).toHaveClass("nav-item nav-link disabled");
    
        await expect(page.locator("//div[@id='demo-tabpane-origin']")).toContainText(/Contrary to popular belief, Lorem Ipsum is not simply random text./);
        
        await expect(page.locator("//div[@id='demo-tabpane-what']")).toHaveAttribute("aria-hidden", "true");
        await expect(page.locator("//div[@id='demo-tabpane-what'][contains(@class,'active show')]")).toHaveCount(0);
    
        await expect(page.locator("//div[@id='demo-tabpane-origin']")).toHaveAttribute("aria-hidden", "false");
        await expect(page.locator("//div[@id='demo-tabpane-origin']")).toHaveClass("fade tab-pane active show");
    
        await expect(page.locator("//div[@id='demo-tabpane-use']")).toHaveAttribute("aria-hidden", "true");
        await expect(page.locator("//div[@id='demo-tabpane-use'][contains(@class,'active show')]")).toHaveCount(0);
    
        await expect(page.locator("//div[@id='demo-tabpane-more']")).toHaveAttribute("aria-hidden", "true");
        await expect(page.locator("//div[@id='demo-tabpane-more'][contains(@class,'active show')]")).toHaveCount(0);
    
        await page.click(("//a[@id='demo-tab-use']"));
    
        await expect(page.locator("//a[@id='demo-tab-what']")).toHaveText(/What/);
        await expect(page.locator("//a[@id='demo-tab-what']")).toHaveAttribute("aria-selected", "false");
        await expect(page.locator("//a[@id='demo-tab-what'][contains(@class,'nav-link active')]")).toHaveCount(0);
        
        await expect(page.locator("//a[@id='demo-tab-origin']")).toHaveText(/Origin/);
        await expect(page.locator("//a[@id='demo-tab-origin']")).toHaveAttribute("aria-selected", "false");
        await expect(page.locator("//a[@id='demo-tab-origin'][contains(@class,'nav-link active')]")).toHaveCount(0);
    
        await expect(page.locator("//a[@id='demo-tab-use']")).toHaveText(/Use/);
        await expect(page.locator("//a[@id='demo-tab-use']")).toHaveAttribute("aria-selected", "true");
        await expect(page.locator("//a[@id='demo-tab-use']")).toHaveClass("nav-item nav-link active");
    
        await expect(page.locator("//a[@id='demo-tab-more']")).toHaveText(/More/);
        await expect(page.locator("//a[@id='demo-tab-more']")).toHaveAttribute("aria-selected", "false");
        await expect(page.locator("//a[@id='demo-tab-more']")).toHaveAttribute("aria-disabled", "true");
        await expect(page.locator("//a[@id='demo-tab-more']")).toHaveClass("nav-item nav-link disabled");
    
        await expect(page.locator("//div[@id='demo-tabpane-use']")).toContainText(/It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout./);
        
        await expect(page.locator("//div[@id='demo-tabpane-what']")).toHaveAttribute("aria-hidden", "true");
        await expect(page.locator("//div[@id='demo-tabpane-what'][contains(@class,'active show')]")).toHaveCount(0);
    
        await expect(page.locator("//div[@id='demo-tabpane-origin']")).toHaveAttribute("aria-hidden", "true");
        await expect(page.locator("//div[@id='demo-tabpane-origin'][contains(@class,'active show')]")).toHaveCount(0);
    
        await expect(page.locator("//div[@id='demo-tabpane-use']")).toHaveAttribute("aria-hidden", "false");
        await expect(page.locator("//div[@id='demo-tabpane-use']")).toHaveClass("fade tab-pane active show");
    
        await expect(page.locator("//div[@id='demo-tabpane-more']")).toHaveAttribute("aria-hidden", "true");
        await expect(page.locator("//div[@id='demo-tabpane-more'][contains(@class,'active show')]")).toHaveCount(0);
    });

    test('Should be able to interact with Tool Tips Widgets', async () => {
        
        await page.goto("https://demoqa.com/tool-tips");
    
        let mouseOverElement = await page.locator("//button[@id='toolTipButton']").boundingBox();
        await page.mouse.move(mouseOverElement.x + mouseOverElement.width / 2, mouseOverElement.y + mouseOverElement.height / 2);
    
        await expect(page.locator("//div[@class='tooltip-inner']")).toHaveText(/You hovered over the Button/);
    
        mouseOverElement = await page.locator("//input[@id='toolTipTextField']").boundingBox();
        await page.mouse.move(mouseOverElement.x + mouseOverElement.width / 2, mouseOverElement.y + mouseOverElement.height / 2);
    
        await page.waitForTimeout(1000);
    
        await expect(page.locator("//div[@class='tooltip-inner']")).toHaveText(/You hovered over the text field/);
    
        mouseOverElement = await page.locator("//a[@href='javascript:void(0)' and contains(text(),'Contrary')]").boundingBox();
        await page.mouse.move(mouseOverElement.x + mouseOverElement.width / 2, mouseOverElement.y + mouseOverElement.height / 2);
    
        await page.waitForTimeout(1000);
    
        await expect(page.locator("//div[@class='tooltip-inner']")).toHaveText(/You hovered over the Contrary/);
    
        mouseOverElement = await page.locator("//a[@href='javascript:void(0)' and contains(text(),'1.10.32')]").boundingBox();
        await page.mouse.move(mouseOverElement.x + mouseOverElement.width / 2, mouseOverElement.y + mouseOverElement.height / 2);
    
        await page.waitForTimeout(1000);
    
        await expect(page.locator("//div[@class='tooltip-inner']")).toHaveText(/You hovered over the 1.10.32/);
    });

    test('Should be able to interact with Menu Widgets', async () => {
        
        await page.goto("https://demoqa.com/menu");
    
        await expect(page.locator("//div[@class='nav-menu-container']//a[contains(text(),'Main Item 1')]")).toBeVisible();
        await expect(page.locator("//div[@class='nav-menu-container']//a[contains(text(),'Main Item 2')]")).toBeVisible();
        await expect(page.locator("//div[@class='nav-menu-container']//a[contains(text(),'Main Item 3')]")).toBeVisible();
    
        let mouseOverElement = await page.locator("//div[@class='nav-menu-container']//a[contains(text(),'Main Item 2')]").boundingBox();
        await page.mouse.move(mouseOverElement.x + mouseOverElement.width / 2, mouseOverElement.y + mouseOverElement.height / 2);
    
        const menusSubItem = await page.$$("//div[@class='nav-menu-container']//a[text()='Sub Item']");
        await expect(menusSubItem.length > 0).toBeTruthy();
    
        await expect(page.locator("//div[@class='nav-menu-container']//a[contains(text(),'SUB SUB LIST')]")).toBeVisible();
    
        mouseOverElement = await page.locator("//div[@class='nav-menu-container']//a[contains(text(),'SUB SUB LIST')]").boundingBox();
        await page.mouse.move(mouseOverElement.x + mouseOverElement.width / 2, mouseOverElement.y + mouseOverElement.height / 2);
    
        await expect(page.locator("//div[@class='nav-menu-container']//a[contains(text(),'Sub Item 1')]")).toBeVisible();
        await expect(page.locator("//div[@class='nav-menu-container']//a[contains(text(),'Sub Item 2')]")).toBeVisible();
    });

    test('Should be able to interact with Select Menu Widgets', async () => {
        
        await page.goto("https://demoqa.com/select-menu");
    
        await page.click("//*[@id='withOptGroup']");
    
        await page.click("//*[@tabindex='-1' and text()='A root option']");
    
        await expect(page.locator("//*[@id='withOptGroup']//*[text()='A root option']")).toBeVisible();
    
        await page.click("//*[@id='selectOne']");
    
        await page.click("//*[@tabindex='-1' and text()='Mrs.']");
    
        await expect(page.locator("//*[@id='selectOne']//*[text()='Mrs.']")).toBeVisible();
    
        await page.selectOption("//select[@id='oldSelectMenu']", { label: 'Black' });
    
        let selectedValue = await page.$eval("//select[@id='oldSelectMenu']", sel => sel.options[sel.options.selectedIndex].textContent);
    
        expect(selectedValue == 'Black').toBeTruthy();
    
        await page.click("//b[text()='Multiselect drop down']/parent::p/following-sibling::div");
    
        await page.click("//*[@tabindex='-1' and text()='Red']");
        await page.click("//*[@tabindex='-1' and text()='Green']");
    
        await expect(page.locator("//b[text()='Multiselect drop down']/parent::p/following-sibling::div//*[text()='Red']")).toBeVisible();
        await expect(page.locator("//b[text()='Multiselect drop down']/parent::p/following-sibling::div//*[text()='Green']")).toBeVisible();
    
        let listSelectedValue = await page.selectOption("//select[@id='cars']", ['volvo', 'opel']);
    
        expect(listSelectedValue.includes('volvo')).toBeTruthy();
        expect(listSelectedValue.includes('opel')).toBeTruthy();
    });
});