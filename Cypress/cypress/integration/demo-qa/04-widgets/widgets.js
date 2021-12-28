/// <reference types="cypress" />

describe("Test Widgets on Demo QA site", () => {

    it("Should be able to interact with Accordion Widgets", () => {

        cy.visit("https://demoqa.com/accordian");

        cy.xpath("//div[@id='section1Heading']").should('have.text','What is Lorem Ipsum?').next().should('have.attr', 'class','collapse show');
        cy.xpath("//div[@id='section2Heading']").should('have.text','Where does it come from?').next().should('have.attr', 'class','collapse');
        cy.xpath("//div[@id='section3Heading']").should('have.text','Why do we use it?').next().should('have.attr', 'class','collapse');
        cy.xpath("//div[@id='section1Content']").should('contains.text','Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

        cy.xpath("//div[@id='section2Heading']").should('have.text','Where does it come from?').click();
        cy.xpath("//div[@id='section1Heading']").should('have.text','What is Lorem Ipsum?').next().should('have.attr', 'class','collapse');
        cy.xpath("//div[@id='section2Heading']").should('have.text','Where does it come from?').next().should('have.attr', 'class','collapse show');
        cy.xpath("//div[@id='section3Heading']").should('have.text','Why do we use it?').next().should('have.attr', 'class','collapse');
        cy.xpath("//div[@id='section2Content']").should('contains.text','Contrary to popular belief, Lorem Ipsum is not simply random text.');

        cy.xpath("//div[@id='section3Heading']").should('have.text','Why do we use it?').click();
        cy.xpath("//div[@id='section1Heading']").should('have.text','What is Lorem Ipsum?').next().should('have.attr', 'class','collapse');
        cy.xpath("//div[@id='section2Heading']").should('have.text','Where does it come from?').next().should('have.attr', 'class','collapse');
        cy.xpath("//div[@id='section3Heading']").should('have.text','Why do we use it?').next().should('have.attr', 'class','collapse show');
        cy.xpath("//div[@id='section3Content']").should('contains.text','It is a long established fact that a reader will be distracted by the readable content');

        cy.xpath("//div[@id='section3Heading']").should('have.text','Why do we use it?').click();
        cy.xpath("//div[@id='section1Heading']").should('have.text','What is Lorem Ipsum?').next().should('have.attr', 'class','collapse');
        cy.xpath("//div[@id='section2Heading']").should('have.text','Where does it come from?').next().should('have.attr', 'class','collapse');
        cy.xpath("//div[@id='section3Heading']").should('have.text','Why do we use it?').next().should('have.attr', 'class','collapse');
    });

    it("Should be able to interact with Auto Complete Widgets", () => {

        cy.visit("https://demoqa.com/auto-complete");

        cy.xpath('//*[@id="autoCompleteMultipleContainer"]').type('r')
        cy.xpath("//*[contains(@class,'auto-complete__option')]").contains('Green').click();
        cy.xpath('//*[@id="autoCompleteMultipleContainer"]').type('r')
        cy.xpath("//*[contains(@class,'auto-complete__option')]").contains('Red').click();

        cy.xpath("//*[contains(@class,'auto-complete__multi-value__label')]").contains('Green').should('be.visible');
        cy.xpath("//*[contains(@class,'auto-complete__multi-value__label')]").contains('Red').should('be.visible');

        cy.xpath('//*[@id="autoCompleteSingleContainer"]').type('r')
        cy.xpath("//*[contains(@class,'auto-complete__option')]").contains('Purple').click();

        cy.xpath("//*[contains(@class,'auto-complete__single-value')]").contains('Purple').should('be.visible');

        cy.xpath('//*[@id="autoCompleteSingleContainer"]').type('r')
        cy.xpath("//*[contains(@class,'auto-complete__option')]").contains('Green').click();

        cy.xpath("//*[contains(@class,'auto-complete__single-value')]").contains('Purple').should('not.exist');
        cy.xpath("//*[contains(@class,'auto-complete__single-value')]").contains('Green').should('be.visible');
    });
    
    it("Should be able to interact with Date Picker Widgets", () => {

        cy.visit("https://demoqa.com/date-picker");

        cy.xpath("//input[@id='datePickerMonthYearInput']").click();

        cy.xpath("//select[@class='react-datepicker__month-select']").select("July");

        cy.xpath("//select[@class='react-datepicker__year-select']").select("1993");

        cy.xpath("//div[@class='react-datepicker__week']//div[contains(@aria-label,'July 7th')]").click();

        cy.xpath("//input[@id='datePickerMonthYearInput']").should('have.attr', 'value', '07/07/1993');

        cy.xpath("//input[@id='dateAndTimePickerInput']").click();

        cy.xpath("//div[contains(@class,'react-datepicker__month-dropdown-container')]").click();
        
        cy.xpath("//div[@class='react-datepicker__month-option']").contains("July").click();

        cy.xpath("//div[contains(@class,'react-datepicker__year-dropdown-container')]").click();

        for(let i = 0; i < 30; i++){
            cy.xpath("//a[contains(@class,'react-datepicker__navigation--years-previous')]").click();
        }

        cy.xpath("//div[@class='react-datepicker__year-option']").contains("1993").click();

        cy.xpath("//div[@class='react-datepicker__week']//div[contains(@aria-label,'July 7th')]").click();

        cy.xpath("//div[@class='react-datepicker__time-box']").contains('22:00').scrollIntoView().click();

        cy.xpath("//input[@id='dateAndTimePickerInput']").should('have.attr', 'value', 'July 7, 1993 10:00 PM');
    });

    it("Should be able to interact with Slider Widgets", () => {

        cy.visit("https://demoqa.com/slider");

        cy.xpath("//input[@type='range']").invoke('val', 80).trigger('change');

        cy.xpath("//input[@type='range']").invoke('attr', 'style', "--value:80;").trigger('change');

        cy.xpath("//input[@type='range']").invoke('attr', 'value', "80").trigger('change');

        cy.xpath("//div[contains(@class,'range-slider__tooltip--auto')]").invoke('attr', 'style', "left: calc(80% - 6px);");

        cy.xpath("//input[contains(@id,'sliderValue')]").invoke('attr', 'value', '80').trigger('change');

        cy.xpath("//input[contains(@id,'sliderValue')]").should('have.attr', 'value', '80');

    });

    it("Should be able to interact with Tabs Widgets", () => {

        cy.visit("https://demoqa.com/tabs");

        cy.xpath("//a[@id='demo-tab-what']").should('have.text','What').should('have.attr', 'aria-selected', 'true').and('have.class', 'nav-link active');
        cy.xpath("//a[@id='demo-tab-origin']").should('have.attr', 'aria-selected', 'false').and('not.have.class', 'nav-link active');
        cy.xpath("//a[@id='demo-tab-use']").should('have.text','Use').should('have.attr', 'aria-selected', 'false').and('not.have.class', 'nav-link active');
        cy.xpath("//a[@id='demo-tab-more']").should('have.text','More').should('have.attr', 'aria-selected', 'false').should('have.class', 'nav-link disabled').and('have.attr','aria-disabled', 'true');
        cy.xpath("//div[@id='demo-tabpane-what']").should('contains.text','Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
        cy.xpath("//div[@id='demo-tabpane-what']").should('have.attr', 'aria-hidden', 'false').and('have.class', 'active show');
        cy.xpath("//div[@id='demo-tabpane-origin']").should('have.attr', 'aria-hidden', 'true').and('not.have.class', 'active show');
        cy.xpath("//div[@id='demo-tabpane-use']").should('have.attr', 'aria-hidden', 'true').and('not.have.class', 'active show');
        cy.xpath("//div[@id='demo-tabpane-more']").should('have.attr', 'aria-hidden', 'true').and('not.have.class', 'active show');

        cy.xpath("//a[@id='demo-tab-origin']").should('have.text', 'Origin').click();
        cy.xpath("//a[@id='demo-tab-origin']").should('have.text','Origin').should('have.attr', 'aria-selected', 'true').and('have.class', 'nav-link active');
        cy.xpath("//a[@id='demo-tab-what']").should('have.text', 'What').should('have.attr', 'aria-selected', 'false').and('not.have.class', 'nav-link active');
        cy.xpath("//a[@id='demo-tab-use']").should('have.text', 'Use').should('have.attr', 'aria-selected', 'false').and('not.have.class', 'nav-link active');
        cy.xpath("//a[@id='demo-tab-more']").should('have.text','More').should('have.attr', 'aria-selected', 'false').should('have.class', 'nav-link disabled').and('have.attr','aria-disabled', 'true');
        cy.xpath("//div[@id='demo-tabpane-origin']").should('contains.text','Contrary to popular belief, Lorem Ipsum is not simply random text.');
        cy.xpath("//div[@id='demo-tabpane-origin']").should('have.attr', 'aria-hidden', 'false').and('have.class', 'active show');
        cy.xpath("//div[@id='demo-tabpane-what']").should('have.attr', 'aria-hidden', 'true').and('not.have.class', 'active show');
        cy.xpath("//div[@id='demo-tabpane-use']").should('have.attr', 'aria-hidden', 'true').and('not.have.class', 'active show');
        cy.xpath("//div[@id='demo-tabpane-more']").should('have.attr', 'aria-hidden', 'true').and('not.have.class', 'active show');

        cy.xpath("//a[@id='demo-tab-use']").should('have.text', 'Use').click();
        cy.xpath("//a[@id='demo-tab-use']").should('have.text','Use').should('have.attr', 'aria-selected', 'true').and('have.class', 'nav-link active');
        cy.xpath("//a[@id='demo-tab-what']").should('have.text', 'What').should('have.attr', 'aria-selected', 'false').and('not.have.class', 'nav-link active');
        cy.xpath("//a[@id='demo-tab-origin']").should('have.text', 'Origin').should('have.attr', 'aria-selected', 'false').and('not.have.class', 'nav-link active');
        cy.xpath("//a[@id='demo-tab-more']").should('have.text','More').should('have.attr', 'aria-selected', 'false').should('have.class', 'nav-link disabled').and('have.attr','aria-disabled', 'true');
        cy.xpath("//div[@id='demo-tabpane-use']").should('contains.text','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.');
        cy.xpath("//div[@id='demo-tabpane-use']").should('have.attr', 'aria-hidden', 'false').and('have.class', 'active show');
        cy.xpath("//div[@id='demo-tabpane-what']").should('have.attr', 'aria-hidden', 'true').and('not.have.class', 'active show');
        cy.xpath("//div[@id='demo-tabpane-origin']").should('have.attr', 'aria-hidden', 'true').and('not.have.class', 'active show');
        cy.xpath("//div[@id='demo-tabpane-more']").should('have.attr', 'aria-hidden', 'true').and('not.have.class', 'active show');

    });

    it("Should be able to interact with Tool Tips Widgets", () => {

        cy.visit("https://demoqa.com/tool-tips");

        cy.xpath("//button[@id='toolTipButton']")
            .invoke('show')
            .trigger('mouseover')
            .wait(1000)
            .should('have.attr', 'aria-describedby', 'buttonToolTip')
            .should('contains.text', 'Hover me to see')
            .trigger('mouseleave');

        cy.xpath("//div[@id='buttonToolTip']").should('have.text','You hovered over the Button');

        cy.xpath("//input[@id='toolTipTextField']")
        .invoke('show')
        .trigger('mouseover')
        .wait(1000)
        .should('have.attr', 'aria-describedby', 'textFieldToolTip')
        .should('have.attr', 'placeholder', 'Hover me to see')
        .trigger('mouseleave');

        cy.xpath("//div[@id='textFieldToolTip']").should('have.text','You hovered over the text field');

        cy.xpath("//a[@href='javascript:void(0)' and contains(text(),'Contrary')]")
        .invoke('show')
        .trigger('mouseover')
        .wait(1000)
        .should('have.attr', 'aria-describedby', 'contraryTexToolTip')
        .should('contains.text', 'Contrary')
        .trigger('mouseleave');

        cy.xpath("//div[@id='contraryTexToolTip']").should('have.text','You hovered over the Contrary');

        cy.xpath("//a[@href='javascript:void(0)' and contains(text(),'1.10.32')]")
        .invoke('show')
        .trigger('mouseover')
        .wait(1000)
        .should('have.attr', 'aria-describedby', 'sectionToolTip')
        .should('contains.text', '1.10.32')
        .trigger('mouseleave');

        cy.xpath("//div[@id='sectionToolTip']").should('have.text','You hovered over the 1.10.32');

    });

    it("Should be able to interact with Progress Bar Widgets", () => {

        cy.visit("https://demoqa.com/progress-bar");

        cy.xpath("//button[@id='startStopButton']").click();

        cy.wait(5000);

        cy.xpath("//div[@aria-valuenow]").should('have.attr', 'aria-valuenow', "50");
        cy.xpath("//div[@aria-valuenow]").should('have.text', "50%");
        cy.xpath("//div[@aria-valuenow]").should('have.attr', 'style', "width: 50%;");

        cy.xpath("//button[@id='startStopButton']").click({force: true});
        cy.xpath("//button[@id='startStopButton']").click({force: true});

        cy.wait(5000);

        cy.xpath("//div[@aria-valuenow]").should('have.attr', 'aria-valuenow', "100");
        cy.xpath("//div[@aria-valuenow]").should('have.text', "100%");
        cy.xpath("//div[contains(@class,'bg-success')]").should('have.text', "100%");
        cy.xpath("//div[@aria-valuenow]").should('have.attr', 'style', "width: 100%;");

        cy.xpath("//button[@id='resetButton']").click();

        cy.xpath("//div[@aria-valuenow]").invoke('attr', 'aria-valuenow', "50").trigger('change', { force: true });
        cy.xpath("//div[@aria-valuenow]").invoke('text', '50%').trigger('change',{ force: true });
        cy.xpath("//div[@aria-valuenow]").invoke('attr', 'style', "width: 50%;").trigger('change',{ force: true });

        cy.xpath("//div[@aria-valuenow]").should('have.attr', 'aria-valuenow', "50");
        cy.xpath("//div[@aria-valuenow]").should('have.text', "50%");
        cy.xpath("//div[@aria-valuenow]").should('have.attr', 'style', "width: 50%;");

    });

    it("Should be able to interact with Menu Widgets", () => {

        cy.visit("https://demoqa.com/menu");

        cy.xpath("//div[@class='nav-menu-container']").contains('Main Item 1').should('be.visible');
        cy.xpath("//div[@class='nav-menu-container']").contains('Main Item 2').should('be.visible');
        cy.xpath("//div[@class='nav-menu-container']").contains('Main Item 1').should('be.visible');

        cy.xpath("//div[@class='nav-menu-container']").contains('Main Item 2').realHover();
        cy.xpath("//div[@class='nav-menu-container']").contains('Sub Item').should('be.visible');
        cy.xpath("//div[@class='nav-menu-container']").contains('SUB SUB LIST »').should('be.visible');
        
        cy.xpath("//div[@class='nav-menu-container']").contains('SUB SUB LIST »').realHover();
        cy.xpath("//div[@class='nav-menu-container']").contains('Sub Sub Item 1').should('be.visible');
        cy.xpath("//div[@class='nav-menu-container']").contains('Sub Sub Item 2').should('be.visible');
    });

    it("Should be able to interact with Select Menu Widgets", () => {

        cy.visit("https://demoqa.com/select-menu");

        cy.xpath("//div[@id='withOptGroup']//div[contains(@class,'placeholder')]").should('have.text','Select Option');
        cy.xpath("//div[@id='withOptGroup']//div[contains(@class,'placeholder')]").click();
        cy.xpath("//*[contains(@tabindex,'-1')]").contains('A root option').click();

        cy.xpath("//div[@id='selectOne']//div[contains(@class,'placeholder')]").should('have.text','Select Title');
        cy.xpath("//div[@id='selectOne']//div[contains(@class,'placeholder')]").click();
        cy.xpath("//*[contains(@tabindex,'-1')]").contains('Mrs.').click();

        cy.xpath("//select[@id='oldSelectMenu']").select('Black');

        cy.xpath("//div[contains(@class,'control')]//div[contains(@class,'placeholder')]").should('not.have.id').should('have.text','Select...');
        cy.xpath("//div[contains(@class,'control')]//div[contains(@class,'placeholder')]").click();
        cy.xpath("//*[contains(@tabindex,'-1')]").contains('Red').click();
        cy.xpath("//*[contains(@tabindex,'-1')]").contains('Green').click();

        cy.xpath("//select[@id='cars']")
        .select(['Volvo', 'Opel'])
        .invoke('val')
        .should('deep.equal', ['volvo', 'opel']);

    });
});