import React from 'react';
import { RecoilRoot } from 'recoil';
import OutputSection from '../../src/components/output-section';
import '../../src/app/global.css';

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
    cy.wait(100);
  });


  it('renders the OutputSection component with TestCases as default', () => {
    cy.get('[role="tab"][aria-selected="true"]').should('have.attr', 'id', 'radix-:r0:-trigger-cases');
    cy.get('[role="tabpanel"][aria-labelledby="radix-:r0:-trigger-cases"]').should('be.visible');
    cy.get('[role="tabpanel"][aria-labelledby="radix-:r0:-trigger-terminal"]').should('not.be.visible');
  });


  it('toggles to Terminal tab when clicked', () => {
    cy.get('[role="tab"][aria-selected="false"]').click({ force: true });
    cy.get('[role="tab"][aria-selected="true"]').should('have.attr', 'id', 'radix-:r3:-trigger-terminal');
    cy.get('[role="tabpanel"][aria-labelledby="radix-:r3:-trigger-cases"]').should('not.be.visible');
    cy.get('[role="tabpanel"][aria-labelledby="radix-:r3:-trigger-terminal"]').should('be.visible');
  });

 it('displays TestCases content', () => {
  cy.get('[role="tab"][aria-selected="true"]').click({ force: true });
  
 
});


  it('displays Terminal content', () => {
    cy.get('[role="tab"][aria-selected="false"]').click({ force: true });
    cy.get('[role="tab"][aria-selected="true"]').should('have.attr', 'id', 'radix-:r9:-trigger-terminal');
    cy.get('[role="tabpanel"][aria-labelledby="radix-:r9:-trigger-terminal"]').should('be.visible').within(() => {
      cy.contains('You must run your code first').should('be.visible'); 
    });
  });
});