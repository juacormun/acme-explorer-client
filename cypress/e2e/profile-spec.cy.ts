import { LoginPage } from "../page-objects/login.po";
import { HeaderPage } from "../page-objects/header.po";
import { HomePage } from "../page-objects/home.po";
import { ProfilePage } from "../page-objects/profile.po";

describe('template spec', () => {
  const loginPage = new LoginPage();
  const headerPage = new HeaderPage();
  const homePage = new HomePage();
  const profilePage = new ProfilePage();

  const now = new Date();

  it('login', () => {
    homePage.navigateTo();
    headerPage.getLoginLink().click();
    loginPage.fillInLoginForm();
    headerPage.getProfileLink().click();
    profilePage.enableEdition();
    profilePage.changeActorName('Explorer-' + now.getTime());
    profilePage.getActorName().should('have.value', 'Explorer-' + now.getTime());
  });
});
