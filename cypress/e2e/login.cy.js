describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    it('should display the login form', () => {
        cy.get('h3').should('contain', 'Sign in to Wanderer');
        cy.get('form').should('exist');
    });

    it('should allow login with valid credentials', () => {
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
       
        cy.visit('http://localhost:3000/challenges');
    });

    it('should show error messages for invalid credentials', () => {
        cy.get('input[name="email"]').type('invalidemail');
        cy.get('input[name="password"]').type('short');
        cy.get('button[type="submit"]').click();

        cy.contains('Please enter a valid email').should('exist');
        cy.contains('Password must be at least 8 characters long').should('exist');
    });

    it('should redirect to sign up page when Sign Up link is clicked', () => {
        cy.contains('Don\'t have an account?').find('a').click();
        cy.url().should('include', '/register');
    });
});
