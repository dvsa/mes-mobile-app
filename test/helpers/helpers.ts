import { browser, ExpectedConditions, element, by } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

export const waitForOverlay = (elementName: string) =>  {
  browser.wait(ExpectedConditions.stalenessOf(element(by.className(elementName))));
};
