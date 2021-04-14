import {browser, ExpectedConditions, element, by, ElementFinder} from 'protractor';
import { TEST_CONFIG } from '../test.config';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const buttonPadding = 30;
const request = require('request');

export default class Page {
  /**
   * A framework safe click method.
   * @param fieldElement the element to click
   */
  // todo: check what type fieldElement is
  async clickElement(fieldElement) {
    await browser.wait(ExpectedConditions.elementToBeClickable(fieldElement));
    await fieldElement.click();
  }

  getElementByXPath(xpath, waitForPresenceOfElement = true) {
    const elementBy = element(by.xpath(xpath));
    if (waitForPresenceOfElement) {
      this.waitForPresenceOfElement(elementBy);
    }
    return elementBy;
  }

  getElementById(elementId, waitForPresenceOfElement = true) {
    const elementBy = element(by.id(elementId));
    if (waitForPresenceOfElement) {
      this.waitForPresenceOfElement(elementBy);
    }
    return elementBy;
  }

  getElementByClassName(elementClassName, waitForPresenceOfElement = true) {
    const elementBy = element(by.className(elementClassName));
    if (waitForPresenceOfElement) {
      this.waitForPresenceOfElement(elementBy);
    }
    return elementBy;
  }

  getElementByCss(css, waitForPresenceOfElement = true) {
    const elementBy = element(by.css(css));
    if (waitForPresenceOfElement) {
      this.waitForPresenceOfElement(elementBy);
    }
    return elementBy;
  }

  getElementByCssId(cssId) {
    return this.getElementByCss(`#${cssId}`);
  }

  /**
   * Checks whether the page is ready to be interacted with.
   * Ionic adds an overlay preventing clicking until the page is ready so we need to wait for that to disappear.
   * @param promise the promise to return when the page is ready
   */
  async isReady(promise) {
    // There is a 200ms transition duration we have to account for
    await browser.sleep(TEST_CONFIG.ACTION_WAIT);
    // Then wait for the page to become active again
    await browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
    // Then return the original promise
    return promise;
  }

  getParentContext(currentContext: string) {
    return `${currentContext.substring(0, currentContext.indexOf('.'))}.1`;
  }

  async textFieldInputViaNativeMode(xpathString: string, searchTerm) {
    const webviewContext = await browser.driver.getCurrentContext();
    // Switch to NATIVE context
    await browser.driver.selectContext('NATIVE_APP');
    const nativeField = element(by.xpath(xpathString));
    await nativeField.sendKeys(searchTerm);
    // Switch back to WEBVIEW context
    await browser.driver.selectContext(this.getParentContext(webviewContext));
    await browser.driver.sleep(TEST_CONFIG.ACTION_WAIT);

  }

  getPageTitle(pageTitle) {
    return this.getElementByXPath(
      `//div[contains(@class, 'toolbar-title')][normalize-space(text()) = '${pageTitle}']`);
  }

  /**
   *  Get the last page title i.e. the displayed one
   */
  getDisplayedPageTitle() {
    return element.all(by.className('toolbar-title')).last();
  }

  async scrollToElement(element) {
    await browser.executeScript('arguments[0].scrollIntoView(true);', element);
    await expect(element.isPresent(), `Expected element ${element} to be present`).to.eventually.be.true;
  }

  // todo: kc how to keep default timeout
  async waitForPresenceOfElement(element) {
    await browser.wait(ExpectedConditions.presenceOf(element));
  }

  async waitForAngularToFinishRendering() {
    await browser.waitForAngular();
  }

  /**
   * Performs the long press action on the competency to add a driver fault.
   * The long press does not appear to have been implemented so calling appiums touch perform action directly.
   * @param button The button to longpress
   */
  async longPressButton(button) {
    const config = await browser.getProcessedConfig();
    const session = await browser.driver.getSession();
    button.getLocation().then((buttonLocation) => {
      request.post(`${config.seleniumAddress}/session/${session.getId()}/touch/perform`, {
        json: {
          actions: [
            {
              action: 'longPress',
              options: {
                x: Math.ceil(buttonLocation.x) + buttonPadding,
                y: Math.ceil(buttonLocation.y) + buttonPadding,
              },
            },
            {
              action: 'release',
            },
          ],
        },
      }, (error) => {
        if (error) {
          console.error(error);
          return;
        }
      });
    });

  }

  async longPressElement(element: ElementFinder) {
    await this.longPressButton(element);
  }

  /**
   * Small wait to make sure the action has initiated
   */
  async waitForActionToInitiate() {
    await browser.driver.sleep(TEST_CONFIG.ACTION_WAIT);
  }

  getCandidateNameElement(pageName, testCategory) {
    return this.getElementByXPath(
      `//div[contains(@class, '${this.getPageType(pageName, testCategory)}')]//h2[@id = 'candidate-name']`);
  }

  getCandidateDriveNumberElement(pageName, testCategory) {
    return this.getElementByXPath(
      `//div[contains(@class, '${this.getPageType(pageName, testCategory)}')]//h3[@id = 'candidate-driver-number']`);
  }

  getPageType(pageName: string, testCategory: string) {
    switch (pageName) {
      case 'communication page':
        return `communication-cat-${testCategory}-page`;
      case 'debrief':
        return `pass-finalisation-cat-${testCategory}-page`;
      case 'health declaration':
        return `health-declaration-cat-${testCategory}-page`;
      default:
        return `waiting-room-cat-${testCategory}-page`;
    }
  }

  async waitForOverlay(elementName: string) {
    await browser.wait(ExpectedConditions.stalenessOf(element(by.className(elementName))));
  }
}
