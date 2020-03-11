import { browser, ExpectedConditions, element, by , Key } from 'protractor';
import { TEST_CONFIG } from '../../test/e2e/test.config';
import { logout, logInToApplication, loadApplication } from './../e2e/step-definitions/generic-steps';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

export const waitForOverlay = (elementName: string) =>  {
  browser.wait(ExpectedConditions.stalenessOf(element(by.className(elementName))));
};

export const getParentContext = (currentContext: string) => {
  return `${currentContext.substring(0, currentContext.indexOf('.'))}.1`;
};

export const textFieldInputViaNativeMode = (xpathString: string, searchTerm) => {
  browser.driver.getCurrentContext().then((webviewContext) => {
    browser.driver.selectContext('NATIVE_APP').then(() => {
      const nativeField = element(by.xpath(xpathString));
      nativeField.sendKeys(searchTerm);
      browser.driver.selectContext(getParentContext(webviewContext)).then(() => {
        browser.driver.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
      });
    });
  });
};

export const scrollToElement = (element) => {
  browser.executeScript('arguments[0].scrollIntoView(true);', element).then(() => {
    expect(element.isPresent()).to.eventually.be.true;
  });
};

export const waitForPresenceOfElement = (element) => {
  browser.wait(ExpectedConditions.presenceOf(element));
};

export const resetTestDataState = (username) => {
  waitForOverlay('click-block-active');
  clickBackButton();
  logout();
  logInToApplication(TEST_CONFIG.users[username].username, TEST_CONFIG.users[username].password);
  loadApplication().then(() => {
    browser.driver.sleep(TEST_CONFIG.ACTION_WAIT);
  });
};

export const clickBackButton = () => {
  const backButton = getElement(by.xpath('//page-journal//button//span[text()="Back"]'));
  clickElement(backButton);
};

export const getElement = (elementBy) => {
  const foundElement = element(elementBy);
  browser.wait(ExpectedConditions.presenceOf(foundElement));
  return foundElement;
};

/**
 * A framework safe click method.
 * @param fieldElement the element to click
 */
export const clickElement = (fieldElement) => {
  browser.wait(ExpectedConditions.elementToBeClickable(fieldElement));
  fieldElement.click().then((promise) => {
    return isReady(promise);
  });
};

/**
 * Checks whether the page is ready to be interacted with.
 * Ionic adds an overlay preventing clicking until the page is ready so we need to wait for that to disappear.
 * @param promise the promise to return when the page is ready
 */
export const isReady = (promise) => {
  // There is a 200ms transition duration we have to account for
  browser.sleep(TEST_CONFIG.ACTION_WAIT);
  // Then wait for the page to become active again
  browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
  // Then return the original promise
  return promise;
};
