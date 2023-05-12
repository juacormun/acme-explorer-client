export class SearchPage {

  getTripsByKeyword(keyword: string) {
    cy.get("#keyword").clear().type(keyword);
    cy.get("body > app-root > div > div > app-trip-list > div.row.mt-2.mb-3 > form > div.col-3.col-lg-1 > button").click();
  }

  getTrip() {
    return cy.get("body > app-root > div > div > app-trip-list > div:nth-child(2) > div:nth-child(1) > div");
  }

}
