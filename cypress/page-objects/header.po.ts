export class HeaderPage {

  getLoginLink() {
    return cy.get("#navbarNavDropdown > div > div > a");
  }

  getProfileLink() {
    cy.get("#dropdownActor").click();
    return cy.get("#navbarNavDropdown > ul > li:nth-child(3) > ul > li:nth-child(1) > a");
  }

  getSearchTripsLink() {
    cy.get("#dropdownTrips").click();
    return cy.get("#navbarNavDropdown > ul > li:nth-child(1) > ul > li:nth-child(1) > a");
  }

}
