/// <reference types="cypress" />

describe("Test Forms on Demo QA site", () => {

    it("Should be able to fill and submit the form", () => {
        
        cy.visit("https://demoqa.com/automation-practice-form");
        
        cy.xpath("//input[@id='firstName']").type("Lainey");

        cy.xpath("//input[@id='lastName']").type("Ross");
        
        cy.xpath("//input[@id='userEmail']").type("nullchar@demoqa.com");

        cy.xpath("//input[@type='radio']").check('Male', {force: true});

        cy.xpath("//input[@id='userNumber']").type("4865596142");

        cy.xpath("//input[@id='dateOfBirthInput']").click();

        cy.xpath("//select[@class='react-datepicker__month-select']").select('July');

        cy.xpath("//select[@class='react-datepicker__year-select']").select('2020');

        cy.xpath("//div[@class='react-datepicker__week']//div[contains(@aria-label,'July 7th')]").click();

        cy.xpath("//input[@id='subjectsInput']").type("Maths");

        cy.xpath("//div[contains(@class,'subjects-auto-complete__option') and text()='Maths']").click();

        cy.xpath("//label[contains(text(),'Sports')]").prev().check({force: true});

        cy.xpath("//label[contains(text(),'Music')]").prev().check({force: true});

        cy.fixture('testPicture.png').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'testPicture.png',
                mimeType: 'image/png'
            });
        });

        cy.xpath("//textarea[@id='currentAddress']").type("768 Gainsway Street Lawrenceville, GA 30043");

        cy.xpath("//div[@id='state']").click();

        cy.xpath("//*[contains(@tabindex,'-1')]").contains('NCR').click();

        cy.xpath("//div[@id='city']").click();

        cy.xpath("//*[contains(@tabindex,'-1')]").contains('Noida').click();

        cy.xpath("//button[@id='submit']").click();

        cy.get('table').contains('td', 'Student Name').next().contains('td', 'Lainey Ross').should('be.visible');
        cy.get('table').contains('td', 'Student Email').next().contains('td', 'nullchar@demoqa.com').should('be.visible');
        cy.get('table').contains('td', 'Gender').next().contains('td', 'Male').should('be.visible');
        cy.get('table').contains('td', 'Mobile').next().contains('td', '4865596142').should('be.visible');
        cy.get('table').contains('td', 'Date of Birth').next().contains('td', '7 July,2020').should('be.visible');
        cy.get('table').contains('td', 'Subjects').next().contains('td', 'Maths').should('be.visible');
        cy.get('table').contains('td', 'Hobbies').next().contains('td', 'Sports, Music').should('be.visible');
        cy.get('table').contains('td', 'Picture').next().contains('td', 'testPicture.png').should('be.visible');
        cy.get('table').contains('td', 'Address').next().contains('td', '768 Gainsway Street Lawrenceville, GA 30043').scrollIntoView().should('be.visible');
        cy.get('table').contains('td', 'State and City').next().contains('td', 'NCR Noida').should('be.visible');
    });
});