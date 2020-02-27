import { browser, ExpectedConditions, element, by , Key } from 'protractor';
import { TEST_CONFIG } from '../../test/e2e/test.config';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

export const waitForOverlay = (elementName: string) =>  {
  browser.wait(ExpectedConditions.stalenessOf(element(by.className(elementName))));
};

export const scrollToElement = (element) => {
  browser.executeScript('arguments[0].scrollIntoView(true);', element).then(() => {
    expect(element.isPresent()).to.eventually.be.true;
  });
};

export const waitForPresenceOfElement = (element) => {
  browser.wait(ExpectedConditions.presenceOf(element));
};
