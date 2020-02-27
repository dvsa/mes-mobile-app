import { browser, ExpectedConditions, element, by } from 'protractor';
import { TEST_CONFIG } from '../test.config';

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
  };

  clickElementById(elementId){
    this.clickElement(this.getElement(by.id(elementId)));
  }

  clickElementByXPath(xpath){
    //this.clickElement(this.getElement(by.xpath(xpath)));
    this.clickElementByXPath(this.getElementByXPath(xpath));
  }

  getElementByXPath(xpath){
    return this.getElement(by.xpath(xpath));
  }

/**
 * Waits for the element to exist on the page before returning it.
 * @param elementBy the element finder
 */
getElement(elementBy) {
  const foundElement = element(elementBy);
  browser.wait(ExpectedConditions.presenceOf(foundElement));
  return foundElement;
};

  /**
 * Checks whether the page is ready to be interacted with.
 * Ionic adds an overlay preventing clicking until the page is ready so we need to wait for that to disappear.
 * @param promise the promise to return when the page is ready
 */
// todo: check what type promise is
 isReady(promise) {
    // There is a 200ms transition duration we have to account for
    browser.sleep(TEST_CONFIG.ACTION_WAIT);
    // Then wait for the page to become active again
    browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
    // Then return the original promise
    return promise;
  };

getParentContext(currentContext: string) {
  return `${currentContext.substring(0, currentContext.indexOf('.'))}.1`;
};

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
};

getPageTitle(pageTitle){
  return this.getElementByXPath(`//div[contains(@class, 'toolbar-title')][normalize-space(text()) = '${pageTitle}']`);
}
}