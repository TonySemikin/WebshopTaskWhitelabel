describe('User sign up', () => {
  beforeEach(() => {
    cy.visit('/');

    // Delete the "userId" from localStorage and refresh the page
    if (window.localStorage.getItem('currentUser')) {
      window.localStorage.removeItem('currentUser');
      cy.reload();
    }
  });

  it('should open the sign up form, submit the form and store currentUser in the localStorage', () => {
    // Check if the user modal is visible
    cy.get('[data-testid=user-form]').should('be.visible');

    // Fill out the form and submit it
    cy.get('[data-testid=username-input]').type('testUser');
    cy.get('[data-testid=password-input]').type('testPassword');
    cy.get('[data-testid=sign-up-button]').click();

    // Check if the user modal is hidden after submission
    cy.get('[data-testid=user-form]').should('not.be.visible');

    // Check if the "userId" is stored in the localStorage
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'currentUser')
      .should('not.be.null');
  });
});
