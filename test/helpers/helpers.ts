import { browser, ExpectedConditions, element, by , Key } from 'protractor';
import { TEST_CONFIG } from '../../test/e2e/test.config';

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
    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP').then(() => {
      const nativeField = element(by.xpath(xpathString));
      nativeField.sendKeys(searchTerm);
      // Switch back to WEBVIEW context
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

export const schemaValidator = () => {
  browser.executeScript('return window.store;').then((result) => {
    console.log(result);
  });
};
