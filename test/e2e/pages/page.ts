import { browser, ExpectedConditions, element, by, Key } from 'protractor';
import { TEST_CONFIG } from '../test.config';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

export default class Page {
/**
 * A framework safe click method.
 * @param fieldElement the element to click
 */
// todo: check what type fieldElement is
  clickElement(fieldElement) {
    browser.wait(ExpectedConditions.elementToBeClickable(fieldElement));
    fieldElement.click().then((promise) => {
      return this.isReady(promise);
    });
  }

  clickElementById(elementId) {
    const element = this.getElementById(elementId);
    this.waitForPresenceOfElement(element);
    this.clickElement(element);
  }

  clickElementByXPath(xpath) {
    const element = this.getElementByXPath(xpath);
    this.waitForPresenceOfElement(element);
    this.clickElement(element);
  }

  getElementByXPath(xpath) {
    // return this.getAndAwaitElement(by.xpath(xpath));
    return element(by.xpath(xpath)); // used to stop ali campbell debrieffrom working
  }

  getElementById(elementId) {
    return element(by.id(elementId));
  }

  getElementByClassName(elementClassName) {
    return element(by.className(elementClassName));
  }

/**
 * Waits for the element to exist on the page before returning it.
 * @param elementBy the element finder
 */
  getAndAwaitElement(elementBy) {
    const foundElement = element(elementBy);
    browser.wait(ExpectedConditions.presenceOf(foundElement));
    return foundElement;
  }

  /**
  * Checks whether the page is ready to be interacted with.
  * Ionic adds an overlay preventing clicking until the page is ready so we need to wait for that to disappear.
  * @param promise the promise to return when the page is ready
  */
  isReady(promise) {
    // There is a 200ms transition duration we have to account for
    browser.sleep(TEST_CONFIG.ACTION_WAIT);
    // Then wait for the page to become active again
    browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
    // Then return the original promise
    return promise;
  }

  getParentContext(currentContext: string) {
    return `${currentContext.substring(0, currentContext.indexOf('.'))}.1`;
  }

  textFieldInputViaNativeMode(xpathString: string, searchTerm) {
    browser.driver.getCurrentContext().then((webviewContext) => {
    // Switch to NATIVE context
      browser.driver.selectContext('NATIVE_APP').then(() => {
        const nativeField = element(by.xpath(xpathString));
        nativeField.sendKeys(searchTerm);
      // Switch back to WEBVIEW context
        browser.driver.selectContext(this.getParentContext(webviewContext)).then(() => {
          browser.driver.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
        });
      });
    });
  }

  getPageTitle(pageTitle) {
    // return this.getElementByXPath(
    // `//div[contains(@class, 'toolbar-title')][normalize-space(text()) = '${pageTitle}']`);
    return this.getAndAwaitElement(by.xpath(
      `//div[contains(@class, 'toolbar-title')][normalize-space(text()) = '${pageTitle}']`));
  }

  // todo: kc only used in healthdeclaration-steps.ts and waitingroom-steps.ts, so could potentially be moved elsewhere.
  getPassCodeField() {
    const element = this.getElementByXPath('//XCUIElementTypeSecureTextField[@label="Passcode field"]');
    this.waitForPresenceOfElement(element);
    return element;
  }

  /**
   * Send the fake passcode using native browser actions
   */
  sendFakePasscode() {
    browser.actions().sendKeys('PASSWORD').sendKeys(Key.ENTER).perform();
  }

  /**
   * Enters a generic password into the iOS passcode field.
   * Note: This will not work on the physical device but the simulator will accept any code.
   */
  // todo: kc only used in healthdeclaration-steps.ts and waitingroom-steps.ts, so could potentially be moved elsewhere.
  enterPasscode() {
    // To be able to fill in the passcode we need to switch to NATIVE context then switch back to WEBVIEW after
    browser.driver.getCurrentContext().then((webviewContext) => {
      // Switch to NATIVE context
      browser.driver.selectContext('NATIVE_APP').then(() => {
        // Get the passcode field
        this.getPassCodeField();
        this.sendFakePasscode();

        // Switch back to WEBVIEW context
        browser.driver.selectContext(this.getParentContext(webviewContext)).then(() => {
          browser.driver.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
        });
      });
    });
  }

  /**
   * Checks whether the user is logged in.
   * @param staffNumber the staff number of the user we wish to be logged in
   */
  loggedInAs(staffNumber) {
    browser.wait(ExpectedConditions.presenceOf(element(by.xpath('//ion-app'))));
    const staffNumberField = element(by.xpath(`//span[@class="employee-id" and text()="${staffNumber}"]`));
    return staffNumberField.isPresent();
  }

  scrollToElement(element) {
    browser.executeScript('arguments[0].scrollIntoView(true);', element).then(() => {
      expect(element.isPresent()).to.eventually.be.true;
    });
  }

  waitForPresenceOfElement(element) {
    browser.wait(ExpectedConditions.presenceOf(element));
  }
}