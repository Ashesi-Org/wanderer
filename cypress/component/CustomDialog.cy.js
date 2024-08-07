import React from 'react';
import EnvironmentSettings from '../../src/components/shared/environment-settings';
import '../../src/app/global.css';

describe('EnvironmentSettings Component', () => {
  beforeEach(() => {
    cy.mount(<EnvironmentSettings />);
  });

it('renders Interview Persona select with options', () => {
    cy.contains('Interview Persona').should('be.visible');
    cy.get('.rounded-md').first().click();
    cy.contains('Justin (Male)').should('be.visible');
    cy.contains('Lisa (Female)').should('be.visible');
  });

  it('renders Editor theme select with options', () => {
    cy.contains('Editor theme').should('be.visible');
    cy.get('.rounded-md').eq(1).click(); 
    cy.contains('Light').should('be.visible');
    cy.contains('Vscode dark').should('be.visible');
  });

  it('renders Change programming language select with options', () => {
    cy.contains('Change programming language').should('be.visible');
    cy.get('.rounded-md').eq(2).click(); 
    cy.contains('Python').should('be.visible');
    cy.contains('JavaScript').should('be.visible');
    cy.contains('Java').should('be.visible');
  });

  it('renders Font size input with default value', () => {
    cy.contains('Font size').should('be.visible');
    cy.get('input[type="number"]').should('have.value', '14');
  });



});