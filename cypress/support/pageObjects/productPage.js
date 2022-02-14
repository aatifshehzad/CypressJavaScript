/// <reference types="Cypress" />

class ProductPage {

    getCheckOut() {
        return cy.get('a.nav-link.btn.btn-primary, Checkout')
    }

    getProducts() {
        return cy.get('h4.media-heading a')
    }

    getCheckoutFinal() {
        return cy.get('button.btn.btn-success, Checkout')
    }

    getContueShopping() {
        return cy.get('button.btn.btn-default, Continue Shopping')
    }

    getCountry() {
        return cy.get('#country')
    }

    getCountrySuggestion() {
        return cy.get('div.suggestions li')
    }

    getPurchase() {
        return cy.get('input[value="Purchase"]')
    }

    getCheckBoxTerms() {
        return cy.get('div.checkbox.checkbox-primary label, I agree with the').prev()
    }

    getSuccessAlert() {
        return cy.get('.alert')
    }

    getTotaleachrow() {
        return cy.get('tr td:nth-child(4) strong')
    }

    getTotal() {
        return cy.get('h3 > strong')
    }

}

export default ProductPage;