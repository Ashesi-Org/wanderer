import React from 'react';
import { RecoilRoot } from 'recoil';
import ProblemDescription from '../../src/components/problems-list/problem-description';
import '../../src/app/global.css';
import { ProblemSkeleton } from '../../src/components/problems-list/problem-skeleton';
describe('ProblemDescription Component', () => {
  const testData = {
    title: 'Reverse a String',
    description: '<p>Write a function to reverse a given string. The input string is provided as a single word without spaces.</p>',
    content: 'Write a function to reverse a given string. The input string is provided as a single word without spaces.',
    difficulty: 'Easy',
    constraints: '<ul><li>The length of the string is between <b>1</b> and <b>1000</b>.</li></ul>',
    assumptions: ['The input will always be a valid string.', 'The string will not contain any spaces.'],
    sampleTestCase: [
      { input: 'hello', output: 'olleh', explanation: 'The reverse of \'hello\' is \'olleh\'. This involves reversing the order of the characters.' },
      { input: 'world', output: 'dlrow', explanation: 'The reverse of \'world\' is \'dlrow\'. Reversing the characters results in the output.' }
    ],
    loading: false
  };

  beforeEach(() => {
    cy.mount(
      <RecoilRoot>
        <ProblemDescription {...testData} />
      </RecoilRoot>
    );
  });

  it('renders the ProblemDescription component correctly', () => {
    cy.contains('strong', testData.title).should('be.visible');

    cy.get('.badge').contains(testData.difficulty).should('be.visible');

    cy.get('.desc').within(() => {
      cy.contains('p', 'Write a function to reverse a given string. The input string is provided as a single word without spaces.').should('be.visible');
      testData.assumptions.forEach((assumption, index) => {
        cy.contains('p', `Assumption ${index + 1}:`).should('be.visible');
        cy.contains('span', assumption).should('be.visible');
      });
    });

    testData.sampleTestCase.forEach((example, index) => {
      cy.get('.examples').within(() => {
        cy.contains('p', `Example ${index + 1}:`).should('be.visible');
        cy.contains('pre span', example.input).should('be.visible');
        cy.contains('span', example.output).should('be.visible');
        cy.contains('span', example.explanation).should('be.visible');
      });
    });

    cy.contains('div', 'Constraints:').should('be.visible');
    cy.contains('li', 'The length of the string is between 1 and 1000.').should('be.visible');
  });

  it('shows loading skeleton when loading prop is true', () => {
    cy.mount(
      <RecoilRoot>
        <ProblemSkeleton {...testData} loading={true} />
      </RecoilRoot>
    );

    cy.get('.skeleton').should('be.visible');
  });
});
