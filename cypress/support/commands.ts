// /// <reference types="cypress" />
// // ***********************************************
// Cypress.Commands.add('monacoEditorType', (selector, text) => {
//   cy.get(selector).then((editor) => {
//     const monacoEditor = editor[0].__monaco_editor__;
//     if (monacoEditor) {
//       monacoEditor.setValue(text);
//     }
//   });
// });

// Cypress.Commands.add('monacoEditorTriggerKeybinding', (selector, keybinding) => {
//   cy.get(selector).then((editor) => {
//     const monacoEditor = editor[0].__monaco_editor__;
//     if (monacoEditor) {
//       const { KeyMod, KeyCode } = monacoEditor.constructor;
//       const keys = keybinding.split('+').map((key) => {
//         if (key === 'Ctrl') return KeyMod.CtrlCmd;
//         if (key === 'G') return KeyCode.KeyG;
//         return null;
//       }).filter(Boolean);

//       const keyCode = keys.reduce((acc, key) => acc | key, 0);

//       monacoEditor.trigger('keyboard', 'editor.action.triggerSuggest', { keyCode });
//     }
//   });
// });


