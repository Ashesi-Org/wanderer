describe('Problems Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/challenges');
  });

  it('should fetch and display the problem list correctly', () => {
    // Verify the title and description
    cy.get('h2').should('contain.text', 'Problem List');
    cy.get('p').should(
      'contain.text',
      'Select a problem from the list for your interview'
    );

    // Verify the table headers
    cy.get('thead th').should('have.length', 5); 
    cy.get('thead th').eq(2).should('contain.text', 'Title');
    cy.get('thead th').eq(3).should('contain.text', 'Difficulty');

    // Verify loading state
    cy.get('.loader').should('not.exist');

    // Verify table rows
    cy.get('tbody tr').should('have.length.gt', 0); 
  });

  it('should handle challenge selection, session creation and dialog interaction', () => {
    // Mock API response
    cy.intercept('GET', '/api/challenges', { fixture: 'challenges.json' });

    // Click on a row to select a challenge
    cy.get('tbody tr').first().click();


    // Verify dialog appears
    cy.get('[id^="radix-"]').should('be.visible');

    // Verify dialog content
    cy.get('[id^="radix-"]').get('leading-nonetracking-tight').should('contain.text', 'Rules and Guidelines');
    cy.get('[id^="radix-"]').get('p').should(
      'contain.text',
      'Please read and accept the rules before proceeding.'
    );

    // Accept rules and guidelines
    cy.contains('Accept').click();

    // Verify session creation loading state
    cy.get('.dialog-content').should('contain.text', 'Creating');

    // Ensure session creation completes successfully
    cy.wait(2000); 

    // Verify redirection after session creation
    cy.location('pathname').should('include', '/technical');
  });
});
