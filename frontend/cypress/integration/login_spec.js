import user from '../fixtures/login_user.json';

describe('Login Page', () => {
  it('login with wrong inputs', () => {
    cy.visit('/login');
    cy.get('input[id="username"]').type('wrong_user');
    cy.get('input[id="password"]').type('wrong_password');
    cy.get('span[type="submit"]').click();
    cy.get('div[type="error"]').should('be.visible');
  });
  it('login with correct inputs', () => {
    cy.visit('/login');
    cy.get('input[id="username"]').type(user.username);
    cy.get('input[id="password"]').type(user.password);
    cy.get('span[type="submit"]').click();
    cy.location('pathname').should('eq', '/');
  });
});
