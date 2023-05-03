export class LoginPage {

  private credentials = {
    email: 'explorer@email.com',
    password: 'pass1234'
  }

  fillInLoginForm() {
    cy.get("#email").type(this.credentials.email);
    cy.get("#pwd").type(this.credentials.password);
    cy.get("body > app-root > div > div > div > app-login > div > form > button").click();
  }

}
