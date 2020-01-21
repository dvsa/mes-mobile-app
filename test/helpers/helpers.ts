import { browser, ExpectedConditions, element, by , Key } from 'protractor';

export const waitForOverlay = (elementName: string) =>  {
    browser.wait(ExpectedConditions.stalenessOf(element(by.className(elementName))));
};
