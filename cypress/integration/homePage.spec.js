/// <reference types="Cypress" />

import HomePage from '../support/pageObjects/homePage'

describe('Home Page Validation', () =>{

    let testData;
    const homepage = new HomePage();

    before(() => {
        cy.log(Cypress.env('url'));
        cy.visit(Cypress.env('url') + '/angularpractice/');
        // root-level hook
        // runs once before all tests
        cy.fixture('example').then(function (data) {
            testData = data;
            return testData;
        })
    })

    it('Verify Two Way Binding', () => {

        homepage.getEditBox().type(testData.name)
        homepage.getGender().select(testData.gender)
        homepage.getTwoWayDataBinding().should('have.value', testData.name)

    })

    it('Verify Minimum Length', () => {

        homepage.getEditBox().clear()

        homepage.getEditBox().should('have.attr', 'minlength', '2')

    })

    it('Verify Entrepreneur (disabled) is disabled', () => {

        homepage.getEntrepreneur().should('be.disabled')

    })


})
