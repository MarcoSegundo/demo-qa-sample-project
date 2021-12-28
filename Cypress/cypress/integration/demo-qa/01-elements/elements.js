/// <reference types="cypress" />

describe("Test Elements on Demo QA site", () => {

    it("Should be able to fill Text Box and submit the form", () => {

        cy.visit("https://demoqa.com/text-box");

        cy.xpath("//input[@id='userName']").type("Diamond Farley");

        cy.xpath("//input[@id='userEmail']").type("dfarley@demoqa.com");

        cy.xpath("//textarea[@id='currentAddress']").type("986 Golden Star Ave.Oxford, MS 38655");

        cy.xpath("//textarea[@id='permanentAddress']").type("90 E. St Margarets St.Springfield, PA 19064");

        cy.xpath("//button[@id='submit']").click();

        cy.xpath("//p[@id='name']").should('include.text', 'Diamond Farley');

        cy.xpath("//p[@id='email']").should('include.text', 'dfarley@demoqa.com');

        cy.xpath("//p[@id='currentAddress']").should('include.text', '986 Golden Star Ave.Oxford, MS 38655');

        cy.xpath("//p[@id='permanentAddress']").should('include.text', '90 E. St Margarets St.Springfield, PA 19064');

    });

    it("Should be able to fill Checkbox", () => {

        cy.visit("https://demoqa.com/checkbox");

        cy.xpath("//button[contains(@class,'option-expand-all')]").click();

        cy.xpath("//label[@for='tree-node-private']").click();

        cy.xpath("//div[@id='result']").should('include.text', 'private');

    });

    it("Should be able to fill Radio Button", () => {

        cy.visit("https://demoqa.com/radio-button");

        cy.xpath("//input[@id='impressiveRadio']").check({force: true});

        cy.xpath("//span[@class='text-success']").should('include.text', 'Impressive');

    });

    it("Should be able to read from Table", () => {

        cy.visit("https://demoqa.com/webtables");

        cy.xpath("//input[@id='searchBox']").type("2000");

        cy.xpath("//div[@role='gridcell']").should('include.text', 'Alden');

        cy.xpath("//div[@role='gridcell']").should('include.text', '12000');

        cy.xpath("//div[@role='gridcell']").should('include.text', 'Kierra');

        cy.xpath("//div[@role='gridcell']").should('include.text', '2000');

        cy.xpath("//button[@id='addNewRecordButton']").click();

        cy.xpath("//input[@id='firstName']").type("Diamond");

        cy.xpath("//input[@id='lastName']").type("Farley");

        cy.xpath("//input[@id='userEmail']").type("dfarley@demoqa.com");

        cy.xpath("//input[@id='age']").type("45");

        cy.xpath("//input[@id='salary']").type("2000");

        cy.xpath("//input[@id='department']").type("IT");

        cy.xpath("//button[@id='submit']").click();

        cy.xpath("//div[@role='gridcell']").should('include.text', 'Farley');

        cy.xpath("//input[@id='searchBox']").clear();

        cy.xpath("//input[@id='searchBox']").type("45");

        cy.xpath("//div[@role='gridcell']").should('not.contain.text', 'Kierra');

    });

    it("Should be able to interact with Buttons (click, double-click and right-click)", () => {

        cy.visit("https://demoqa.com/buttons");

        cy.xpath("//button[@id='doubleClickBtn']").dblclick();

        cy.xpath("//p[@id='doubleClickMessage']").should('include.text', 'You have done a double click');

        cy.xpath("//button[@id='rightClickBtn']").rightclick();

        cy.xpath("//p[@id='rightClickMessage']").should('include.text', 'You have done a right click');

        cy.xpath("//button[@type='button' and (text()='Click Me')]").click();

        cy.xpath("//p[@id='dynamicClickMessage']").should('include.text', 'You have done a dynamic click');

    });

    it("Should be able to interact with links", () => {

        cy.visit("https://demoqa.com/links");

        cy.xpath("//a[@id='simpleLink']").invoke('removeAttr', 'target');

        cy.xpath("//a[@id='simpleLink']").click();        

        cy.url().should('to.equal', 'https://demoqa.com/');

        cy.url().should('not.include', 'links');

        cy.visit("https://demoqa.com/links");

        cy.xpath("//a[@id='dynamicLink']").invoke('removeAttr', 'target');

        cy.xpath("//a[@id='dynamicLink']").click();        

        cy.url().should('to.equal', 'https://demoqa.com/');

        cy.url().should('not.include', 'links');

        cy.visit("https://demoqa.com/links");

        cy.intercept('GET', '/created').as('getCreated');
        cy.xpath("//a[@id='created']").click();
        cy.wait('@getCreated').its('response.statusCode').should('eq', 201);

        cy.intercept('GET', '/no-content').as('getNoContent');
        cy.xpath("//a[@id='no-content']").click();
        cy.wait('@getNoContent').its('response.statusCode').should('eq', 204);

        cy.intercept('GET', '/moved').as('getMoved');
        cy.xpath("//a[@id='moved']").click();
        cy.wait('@getMoved').its('response.statusCode').should('eq', 301);

        cy.intercept('GET', '/bad-request').as('getBadRequest');
        cy.xpath("//a[@id='bad-request']").click();
        cy.wait('@getBadRequest').its('response.statusCode').should('eq', 400);

        cy.intercept('GET', '/unauthorized').as('getUnauthorized');
        cy.xpath("//a[@id='unauthorized']").click();
        cy.wait('@getUnauthorized').its('response.statusCode').should('eq', 401);

        cy.intercept('GET', '/forbidden').as('getForbidden');
        cy.xpath("//a[@id='forbidden']").click();
        cy.wait('@getForbidden').its('response.statusCode').should('eq', 403);

        cy.intercept('GET', '/invalid-url').as('getInvalidUrl');
        cy.xpath("//a[@id='invalid-url']").click();
        cy.wait('@getInvalidUrl').its('response.statusCode').should('eq', 404);

    });

    it("Should be able to interact with the files upload and download", () => {

        cy.visit("https://demoqa.com/upload-download");

        cy.get('#downloadButton').click()

        cy.readFile('cypress/downloads/sampleFile.jpeg').should('exist')
        
        cy.fixture('testPicture.png').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'testPicture.png',
                mimeType: 'image/png'
            });
        });

        cy.xpath("//p[@id='uploadedFilePath']").contains('testPicture.png');

    });
    
});