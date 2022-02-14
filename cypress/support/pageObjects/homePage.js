/// <reference types="Cypress" />

class HomePage {

    getEditBox() {
        return cy.get('input[name="name"]:nth-child(2)')
    }

    getTwoWayDataBinding() {
        return cy.get('input[name="name"]:nth-child(1)')
    }

    getGender() {
        return cy.get('select')
    }

    getEntrepreneur() {
        return cy.contains('Entrepreneur (disabled)').prev()
    }

    getShopTab() {
        return cy.get(':nth-child(2) > .nav-link')
    }

}

export default HomePage;