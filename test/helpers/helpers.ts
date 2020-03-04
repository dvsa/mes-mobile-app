import { browser, ExpectedConditions, element, by } from 'protractor';

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
