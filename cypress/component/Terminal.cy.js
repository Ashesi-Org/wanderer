import React from 'react';
import { RecoilRoot } from 'recoil';
import OutputSection from '../../src/components/output-section';

describe('OutputSection Component', () => {
  const testCases = [
    { input: 'input1', output: 'output1', explanation: 'explanation1' },
    { input: 'input2', output: 'output2', explanation: 'explanation2' },
  ];

  beforeEach(() => {
    cy.mount(
      <RecoilRoot>
        <OutputSection testCases={testCases} />
      </RecoilRoot>
    );
  });

  it('renders the OutputSection component with TestCases as default', () => {
    cy.get('.tabs [value="cases"]').should('be.visible').and('have.class', 'active');
    cy.get('.tabs [value="terminal"]').should('not.be.visible');
  });

  it('toggles to Terminal tab when clicked', () => {
    cy.get('.tabs [value="terminal"]').click();
    cy.get('.tabs [value="terminal"]').should('be.visible');
    cy.get('.tabs [value="cases"]').should('not.be.visible');
  });

  it('displays TestCases content', () => {
    cy.get('.tabs [value="cases"]').click();
    cy.get('.tabs [value="cases"]').within(() => {
      cy.contains('input1').should('be.visible');
      cy.contains('output1').should('be.visible');
      cy.contains('explanation1').should('be.visible');
      cy.contains('input2').should('be.visible');
      cy.contains('output2').should('be.visible');
      cy.contains('explanation2').should('be.visible');
    });
  });

  it('displays Terminal content', () => {
    cy.get('.tabs [value="terminal"]').click();
    cy.get('.tabs [value="terminal"]').within(() => {
      cy.contains('Terminal').should('be.visible'); // Adjust this to match your terminal content
    });
  });
});
