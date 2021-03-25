import { by, element } from 'protractor';
import Page from '../../utilities/page';

export class LoginPageObject extends Page {
  microsoftOnlineContinue =
    element(by.xpath(`//XCUIElementTypeButton[@name="Continue"]`));

  nextButtonElement =
    element(by.xpath('(//XCUIElementTypeButton[@name="Next"])[1]'));

  signinForOrgAccount =
    element(by.xpath(`//XCUIElementTypeButton[@name="Sign in"]`));

  passwordForOrgAccount =
    element(by.xpath(`//XCUIElementTypeOther[@name="Sign In"]/XCUIElementTypeOther[4]/XCUIElementTypeSecureTextField`));

  authCContinue =
    element(by.xpath(`//XCUIElementTypeButton[@name="Continue"]`));

  employeeId =
    element(by.xpath('//span[@class="employee-id"]'));

  logout =
    element(by.xpath('//button/span/span[contains(text(), "Logout")]'));

  logoutPopup =
    element(by.xpath('//button[@ion-button="alert-button"]/span[text()=\'Logout\']'));

  selectUserToSignOut =
    element(by.xpath(`//XCUIElementTypeOther[@name="Sign out"]/XCUIElementTypeOther[4]`));

  cancelButton =
    element(by.xpath(`//XCUIElementTypeButton[@name="Cancel"]`));

  signInLink =
    element(by.xpath(`//XCUIElementTypeStaticText[@name="Sign in"]`));
}

export const getUsernameField = element(by.xpath('//XCUIElementTypeTextField[@label="Enter your email, phone, or Skype."]'));
export const getToSignInPopUp = element(by.xpath('//XCUIElementTypeButton[@name="Continue"]'));
