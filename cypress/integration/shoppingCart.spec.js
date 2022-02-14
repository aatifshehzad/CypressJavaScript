/// <reference types="Cypress" />

import ProductPage from '../support/pageObjects/productPage'
import HomePage from '../support/pageObjects/homePage'

describe('Shopping Cart Validation Suite', () => {

    var finalTotal = 0
    let testData
    const homepage = new HomePage()
    const productpage = new ProductPage()

    before(() => {
        cy.log(Cypress.env('url'))
        cy.visit(Cypress.env('url') + '/angularpractice/')
        // root-level hook
        // runs once before all tests
        cy.fixture('example').then(function (data) {
            testData = data
            return testData
        })
    })


    it('Verify Product Selection', () => {

        homepage.getShopTab().click()
        if (Array.isArray(testData.product)) {
            testData.product.forEach(function (prodName) {
                cy.selectProduct(prodName)
            })

        }
        else {
            cy.selectProduct(testData.product)
        }

    })

    it('Verify Checkout Functionality', () => {

        productpage.getCheckOut().click()
        productpage.getProducts().should('have.length', 2)
        productpage.getTotaleachrow()
            .each(($el, index, $list) => {
                const actualText = $el.text()
                var res = actualText.split(" ")
                res = res[1].trim()
                finalTotal = Number(finalTotal) + Number(res)
            }).then(function () {
                cy.log(finalTotal)
            })
        productpage.getTotal().then(function ($el) {
            const actualTotalText = $el.text()
            var actualTotal = actualTotalText.split(" ")
            actualTotal = actualTotal[1].trim()
            expect(actualTotal).to.equal(String(finalTotal))
        })
        productpage.getCheckoutFinal().click()
        productpage.getCountry().type(testData.country)
        productpage.getCountrySuggestion()
            .each(($el, index, $list) => {
                if ($el.text().includes(testData.country)) {
                    //wrap resolves the promise
                    cy.wrap($el).click()
                }
            })

        productpage.getCountry().should('have.value', testData.country)
        productpage.getCheckBoxTerms().check({ force: true }).should('be.checked')
        productpage.getPurchase().click()
        productpage.getSuccessAlert().should('contain', 'Success! Thank you! Your order will be delivered in next few weeks :-).')

    })
})