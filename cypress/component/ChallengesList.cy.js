import { RecoilRoot } from 'recoil';
import ProblemList from '../../src/components/problems-list/problem-list';
import '../../src/app/global.css';

describe('ProblemList Component', () => {
  beforeEach(() => {
    cy.mount(
      <RecoilRoot>
        <ProblemList />
      </RecoilRoot>
    );
  });

  it('renders the correct number of ProblemCard components', () => {
  cy.get('div.my-2').should('be.visible');

  cy.get('div.my-2').find('div[class*="card"]').should('have.length', 4);
});

  it('renders the problem title correctly in each ProblemCard', () => {
  cy.get('div.my-2').should('be.visible');

  cy.get('div.my-2')
    .find('div[class*="card"]')
    .each(($card, index) => {
      cy.wrap($card)
        .contains('p', `${1}. Add Two Numbers`)
        .should('be.visible');
    });
});


  it('renders the difficulty correctly in each ProblemCard', () => {
    cy.get('div.my-2').find('div[class*="card"]').each(($card) => {
      cy.wrap($card).contains('p', 'Medium').should('be.visible');
    });
  });

  it('renders the correct badges in each ProblemCard', () => {
    const badges = ['Array', 'Hash Table', 'Math'];
    
    cy.get('div.my-2').find('div[class*="card"]').each(($card) => {
      badges.forEach((badge) => {
        cy.wrap($card).contains('div[class*="bg-card"]', badge).should('be.visible');
      });
    });
  });

  it('renders the problem list container correctly', () => {
    cy.get('div.my-2').should('be.visible');
  });
});
