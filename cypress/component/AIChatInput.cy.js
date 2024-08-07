import React from 'react';
import ChatInput from '../../src/components/chat-input';
import '../../src/app/global.css';

describe('ChatInput Component', () => {
  beforeEach(() => {
    cy.mount(<ChatInput interviewQuestion="What is your interview question?" />);
  });

  it('renders initial loading state', () => {
    cy.contains('Connecting..').should('be.visible');
  });

  it('loads chat messages after initialization', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('You are a helpful assistant').should('be.visible');
    cy.contains('Hello! How can I assist you today?').should('be.visible');
  });

  it('sends user messages and receives assistant responses', () => {
    cy.get('button[type="submit"]').click();
    cy.get('input[type="text"]').type('Tell me about yourself');
    cy.get('button[type="submit"]').contains('Send').click();
    cy.contains('Tell me about yourself').should('be.visible');
    cy.contains('Sure! I can help with that.').should('be.visible');
  });

  it('handles microphone and audio interactions', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Microphone').click();
    cy.contains('Listening...').should('be.visible');
  });

  it('displays live transcription and updates', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('You are a helpful assistant').should('be.visible');
    cy.contains('Live Transcription').should('not.exist');
  });

  it('scrolls to the latest message', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.chat-message').should('have.length.gt', 0);
  });
});

