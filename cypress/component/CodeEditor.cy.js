import React from 'react';
import CodeEditor from '../../src/components/editor/code-editor';
import { RecoilRoot } from 'recoil';

describe('CodeEditor Component', () => {
  const props = {
    language: 'python',
    problemId: 1,
    driverCode: 'def hello_world():\n  print("Hello, world!")',
    question: 'Write a function to print "Hello, world!"',
  };

  it('renders the CodeEditor component', () => {
    cy.mount(
      <RecoilRoot>
        <CodeEditor {...props} />
      </RecoilRoot>
    );
    cy.get('.overlay').should('be.visible');
  });

  it('shows the dialog when Ctrl+G is pressed', () => {
    cy.mount(
      <RecoilRoot>
        <CodeEditor {...props} />
      </RecoilRoot>
    );

    cy.window().should((win) => {
      expect(win.monaco).to.not.be.undefined;
    }).then(() => {
      cy.get('.monaco-editor').should('exist');
      cy.monacoEditorTriggerKeybinding('.monaco-editor', 'Ctrl+G');
    //   cy.get('.dialogAi').should('be.visible'); 
    });
  });

});