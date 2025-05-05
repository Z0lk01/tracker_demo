// Cypress test for the Personal Finance Tracker
describe('Personal Finance Tracker', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    
    // Visit the app
    cy.visit('/');
  });
  
  it('should display the main components of the app', () => {
    // Verify header is visible
    cy.contains('h1', 'Personal Finance Tracker').should('be.visible');
    cy.get('[data-testid="start-tour-button"]').should('be.visible');
    
    // Verify dashboard is visible
    cy.get('[data-testid="dashboard"]').should('be.visible');
    
    // Verify transaction form is visible
    cy.get('[data-testid="transaction-form"]').should('be.visible');
    
    // Verify transaction list is visible
    cy.get('[data-testid="transactions-list"]').should('be.visible');
    
    // Verify budget tracker is visible
    cy.get('[data-testid="budget-tracker"]').should('be.visible');
  });

  it('should add a new income transaction', () => {
    // Add an income transaction
    cy.get('[data-testid="description-input"]').type('Salary');
    cy.get('[data-testid="amount-input"]').type('2500');
    cy.get('[data-testid="category-select"]').select('Income');
    cy.get('[data-testid="add-transaction-button"]').click();
    
    // Verify transaction was added to the list
    cy.get('[data-testid="transactions-list"]').find('li').should('have.length', 1);
    cy.contains('Salary').should('be.visible');
    cy.contains('+$2500.00').should('be.visible');
    
    // Verify dashboard values were updated
    cy.get('[data-testid="income-amount"]').should('contain', '+$2500.00');
    cy.get('[data-testid="expense-amount"]').should('contain', '-$0.00');
  });
  
  it('should add a new expense transaction', () => {
    // Add an expense transaction
    cy.get('[data-testid="description-input"]').type('Rent');
    cy.get('[data-testid="amount-input"]').type('-1000');
    cy.get('[data-testid="category-select"]').select('Housing');
    cy.get('[data-testid="add-transaction-button"]').click();
    
    // Verify transaction was added to the list
    cy.get('[data-testid="transactions-list"]').find('li').should('have.length', 1);
    cy.contains('Rent').should('be.visible');
    cy.contains('-$1000.00').should('be.visible');
    
    // Verify dashboard values were updated
    cy.get('[data-testid="income-amount"]').should('contain', '+$0.00');
    cy.get('[data-testid="expense-amount"]').should('contain', '-$1000.00');
    
    // Verify budget tracker was updated
    cy.get('[data-testid="housing-progress-bar"]').should('be.visible');
  });
  
  it('should delete a transaction', () => {
    // Add a transaction
    cy.get('[data-testid="description-input"]').type('Groceries');
    cy.get('[data-testid="amount-input"]').type('-150');
    cy.get('[data-testid="category-select"]').select('Food');
    cy.get('[data-testid="add-transaction-button"]').click();
    
    // Verify transaction was added
    cy.get('[data-testid="transactions-list"]').find('li').should('have.length', 1);
    
    // Delete the transaction
    cy.get('[data-testid^="delete-btn-"]').click();
    
    // Verify transaction was removed
    cy.get('[data-testid="transactions-list"]').find('li').should('have.length', 0);
    cy.contains('No transactions yet. Add one above!').should('be.visible');
  });
  
  it('should edit budget values', () => {
    // Click edit budget button
    cy.get('[data-testid="edit-budget-button"]').click();
    
    // Change Housing budget
    cy.get('[data-testid="housing-budget-input"]').clear().type('1500');
    
    // Save changes
    cy.get('[data-testid="edit-budget-button"]').click();
    
    // Verify the budget was updated
    cy.contains('Housing').parent().contains('$1500.00').should('be.visible');
  });
  
  it('should track progress against budget after adding expenses', () => {
    // Add expense transactions for a specific category
    cy.get('[data-testid="description-input"]').type('Groceries');
    cy.get('[data-testid="amount-input"]').type('-200');
    cy.get('[data-testid="category-select"]').select('Food');
    cy.get('[data-testid="add-transaction-button"]').click();
    
    cy.get('[data-testid="description-input"]').clear().type('Restaurant');
    cy.get('[data-testid="amount-input"]').clear().type('-150');
    cy.get('[data-testid="category-select"]').select('Food');
    cy.get('[data-testid="add-transaction-button"]').click();
    
    // Verify budget progress is tracked
    cy.get('[data-testid="food-progress-bar"]')
      .should('have.attr', 'style')
      .and('include', 'width: 70%'); // 350 / 500 = 70%
  });
  
  it('should test intro.js tour', () => {
    // We can't directly test intro.js functionality in Cypress
    // But we can verify the button exists and clicks
    cy.get('[data-testid="start-tour-button"]').click();
    
    // We can check that intro.js elements appear
    cy.get('.introjs-tooltip').should('be.visible');
    cy.get('.introjs-nextbutton').should('be.visible');
    
    // Complete the tour by clicking "Next" and then "Done"
    cy.get('.introjs-nextbutton').click();
    cy.get('.introjs-nextbutton').click();
    cy.get('.introjs-nextbutton').click();
    cy.get('.introjs-donebutton').click();
    
    // Verify tour is closed
    cy.get('.introjs-tooltip').should('not.exist');
  });
});