/// <reference types="Cypress" />

describe("Reqres API Test Suite", () =>{

    let baseURL;
    before(() => {
        baseURL = Cypress.env('reqres_url');
        cy.log(baseURL)
    })

    it('Verify Create User API', () => {

        const apiEndPoint = baseURL + '/api/users'
        const payload = {"name":"morpheus","job":"leader"}

        cy.request('POST', apiEndPoint, payload)
            .then(function(response) {
                expect(response.status).to.equal(201)
                expect(response.body).to.have.property('name', 'morpheus')
                expect(response.body).to.not.be.oneOf([null, ""])
                expect(response.body).to.have.property('createdAt').to.not.be.oneOf([null, ""])
                expect(response.body).to.have.property('job', 'leader')
            })
    })
})