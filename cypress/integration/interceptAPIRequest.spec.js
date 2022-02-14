/// <reference types="Cypress" />

describe('API Intercept and Mocking Suite', () => {

    let baseURL;
    before(() => {
        baseURL = Cypress.env('url');
        cy.log(baseURL)
    })

    it('Verify Only One Book Message', () => {
        cy.visit(baseURL + '/angularAppdemo/')
        cy.intercept({
            method: 'GET',
            url: baseURL + '/Library/GetBook.php?AuthorName=shetty'
        },
            {
                statusCode: 200,
                body: [
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "RSU",
                        "aisle": "2301"
                    }
                ]
            }).as('bookRetrievals')
        cy.get("button.btn.btn-primary").click()
        cy.wait('@bookRetrievals')
        cy.get('p').should('have.text', 'Oops only 1 Book available')
    })

    it('Data Validation between API and Front End', () => {
        cy.visit(baseURL + '/angularAppdemo/')
        cy.intercept({
            method: 'GET',
            url: baseURL + '/Library/GetBook.php?AuthorName=shetty'
        },
            {
                statusCode: 200,
                body: [
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "RSU",
                        "aisle": "2301"
                    },
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "BSG",
                        "aisle": "2302"
                    },
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "LSA",
                        "aisle": "2303"
                    },
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "DSR",
                        "aisle": "2304"
                    },
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "RCD",
                        "aisle": "2305"
                    },
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "TSD",
                        "aisle": "2307"
                    },
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "TSD",
                        "aisle": "211"
                    }
                ]
            }).as('bookRetrievals')
        cy.get("button.btn.btn-primary").click()
        cy.wait('@bookRetrievals').should(({ request, response }) => {
            cy.get('tbody > tr').should('have.length', response.body.length)
        })
    })

    it('Verify Security Scenario by Mocking Request', () => {
        cy.visit(baseURL + '/angularAppdemo/')
        cy.intercept('GET', baseURL + '/Library/GetBook.php?AuthorName=shetty',
            (req) => {
                req.url = baseURL + '/Library/GetBook.php?AuthorName=malhotra'

                req.continue((res) => {
                    expect(res.statusCode).to.equal(403)
                })
            }
        ).as('dummyURL')
        cy.get("button.btn.btn-primary").click()
        cy.wait('@dummyURL')
    })
})