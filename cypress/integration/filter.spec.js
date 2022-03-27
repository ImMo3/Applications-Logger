const actionTypes = [
    "",
    "ADD_EMPLOYEE",
    "DARI_APP_LOGIN",
    "DARI_REFRESH_TOKEN",
    "INITIATE_APPLICATION",
    "SUBMIT_APPLICATION",
]
const applicationTypes = [
    "",
    "ADD_COMPANY",
    "ADD_COMPANY_EMPLOYEE",
    "ADD_POA",
    "CERT_PROP_OWNERSHIP",
    "CERT_TITLE_DEED_PLOT",
    "LEASE_CLOSURE",
    "LEASE_REGISTRATION",
]

context('Logger Page Filter', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/administration/logger')
    })

    it("check our action types", () => {
        cy.get('.actionTypes-list > option').each((item, index) => {
            if (index > 0)
                cy.wrap(item).should("contain.text", actionTypes[index])
        })
    })

    it("check our application types", () => {
        cy.get('.applicationTypes-list > option').each((item, index) => {
            console.log(item);
            cy.wrap(item).should("contain.text", applicationTypes[index])
        })
    })
})