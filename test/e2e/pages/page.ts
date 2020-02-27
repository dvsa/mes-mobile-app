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
}