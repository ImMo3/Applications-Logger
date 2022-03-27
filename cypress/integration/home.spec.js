context('Logger Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it("Logger card exist", () => {
        cy.get('h2').contains('Logger')
    })
})
