context('Logger Page Table', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/administration/logger')
    })
  
    it("table is there", () => {
      cy.get('table').contains('Application Type')
      cy.get('table').contains('Log ID')
      cy.get('table').contains('Application ID')
      cy.get('table').contains('Action')
      cy.get('table').contains('Action Details')
      cy.get('table').contains('Date : Time')
    })
  })