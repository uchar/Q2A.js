import user from '../fixtures/login_user.json';

describe('Main Page', () => {
  it('open main page', () => {
    cy.visit('/');
  });
});
