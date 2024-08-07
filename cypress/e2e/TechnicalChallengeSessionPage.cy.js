// cypress/integration/playground.spec.js

describe('Playground Component Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/technical/2/check-palindrome/97e80836-0685-44d1-8692-377cc1e7b524'); 
  });

  it('should fetch and display problem description', () => {
    cy.intercept('/api/challenge/*', { fixture: 'challenge.json' }).as('getChallenge');

    cy.wait('@getChallenge').then(({ response }) => {
      cy.get('.problem-description').should('contain.text', response.body.title);
      cy.get('.problem-description').should('contain.text', response.body.description);
    });
  });

  it('should render code editor with correct props', () => {
    cy.intercept('/api/challenge/*', { fixture: 'challenge.json' }).as('getChallenge');

    cy.wait('@getChallenge').then(({ response }) => {
      cy.get('.code-editor').should('exist');
      cy.get('.code-editor').should('have.attr', 'language', 'python');
      cy.get('.code-editor').should('have.attr', 'question', response.body.content);
    });
  });

  it('should simulate user input in chat input', () => {
    cy.wait(5000);
    cy.get('.initialbtn').click();  

    cy.get('.chat .chatinput')
      .type('Hello, this is a test message{enter}');

    // Assert on the chat output or any expected behavior
    cy.get('.chat-output').should('contain.text', 'Hello, this is a test message');
  });

  it('should handle error when challengeId is missing', () => {
    cy.intercept('/api/challenge/*', {
      statusCode: 404,
      body: 'Challenge not found',
    }).as('getChallenge');

    // cy.location('pathname').should('not.eq', '/playground');
  });
});
