import { LoginPage } from "../page-objects/login.po";
import { HeaderPage } from "../page-objects/header.po";
import { HomePage } from "../page-objects/home.po";
import { SearchPage } from "../page-objects/search.po";
import { DisplayPage } from "../page-objects/display.po";

describe('template spec', () => {
  const loginPage = new LoginPage();
  const headerPage = new HeaderPage();
  const homePage = new HomePage();
  const searchPage = new SearchPage();
  const displayPage = new DisplayPage();

  const keyword = 'Marchena';
  const title = 'Paseo a Marchena';

  it('login', () => {
    homePage.navigateTo();
    headerPage.getLoginLink().click();
    loginPage.fillInLoginForm();
    cy.wait(2000);
    headerPage.getSearchTripsLink().click();
    searchPage.getTripsByKeyword(keyword);
    cy.wait(2000);
    searchPage.getTrip().click();
    displayPage.getTripTitle().should('have.value', title);
  });
});
