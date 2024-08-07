// import { RecoilRoot } from 'recoil';
// import Navbar from '../../src/app/ui/navbar';
// import '../../src/app/global.css';

// describe('Navbar Component', () => {
//   beforeEach(() => {
//     // cy.mockUsePathname('/technical/1/reverse-a-string/3987c5d1-a690-45a7-b822-66ca908462c7'); // Mock usePathname to return a valid path for testing

//     // Mount the Navbar component with RecoilRoot
//     cy.mount(
//       <RecoilRoot>
//         <Navbar />
//       </RecoilRoot>
//     );
//   });

//   it('renders the main navigation elements correctly', () => {
//     cy.get('header').should('be.visible');
//     cy.get('.flex.h-[48px]').should('be.visible');
//     cy.get('.flex.gap-4.items-center').should('exist');
//   });

//   it('renders the Problem List button and its dropdown correctly', () => {
//     cy.contains('button', 'Problem List').click();
//     cy.contains('h2', 'Problems List').should('be.visible');
//     cy.contains('span', 'Recommended questions').should('be.visible');
//     cy.contains('input[type="email"]').should('be.visible');
//     cy.contains('a', 'See all').should('be.visible');
//   });

//   it('runs code and submits code buttons are present and functional', () => {
//     cy.contains('button', 'Run').should('be.visible').click();
//     cy.contains('button', 'Submitting').should('not.exist');
//     cy.contains('button', 'Submit').should('be.visible').click();
//     cy.contains('button', 'Running').should('not.exist');
//   });

//   it('renders additional navigation icons and functionalities correctly', () => {
//     cy.get('.flex.gap-3.items-center').should('exist');
//     cy.contains('TooltipWrapper', 'Timer').should('be.visible');
//     cy.contains('button', 'Settings').click();
//     cy.contains('h3', 'Settings').should('be.visible');
//   });

//   it('displays user avatar and dropdown menu correctly', () => {
//     cy.contains('button', '@UserNav').click();
//     cy.contains('p', 'John').should('be.visible');
//     cy.contains('p', 'john@example.com').should('be.visible');
//     cy.contains('button', 'Log out').should('be.visible').click();
//     cy.url().should('include', '/login');
//   });
// });
