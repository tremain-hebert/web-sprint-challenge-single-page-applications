describe('form test', () => {
    it('test that the form is working properly', () => {
        cy.visit('localhost:3000/order')

        cy.get('[for="name"] > input')
        .type('Tremain')
        .should('have.value', 'Tremain')

        cy.get('[for="toppings"] > input')
        .click()
        .should('have.checked', true)

        cy.get('[for="toppings2"] > input')
        .click()
        .should('have.checked', true)

        cy.get('[for="toppings3"] > input')
        .click()
        .should('have.checked', true)

        cy.get('[for="toppings4"] > input')
        .click()
        .should('have.checked', true)

        cy.get('button#submit')
        .click()
    })
})