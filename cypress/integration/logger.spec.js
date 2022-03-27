context('Logger Page', () => {
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

  it("check if API request is valid", () => {
    cy.request({
      method: 'GET',
      url: 'https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f',
      headers: { 'Accept-Language': 'en-us', },
    });
  })
})
