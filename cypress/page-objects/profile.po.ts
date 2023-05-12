export class ProfilePage {

  enableEdition() {
    cy.get("body > app-root > div > div > app-profile > div > div > div.row > button").click();
  }

  changeActorName(newName: string) {
    cy.get("#name").clear().type(newName);
    cy.get("body > app-root > div > div > app-profile > div > div > form > div > div:nth-child(10) > button").click();
  }

  getActorName() {
    return cy.get("#name");
  }

}
