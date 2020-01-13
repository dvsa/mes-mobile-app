import { browser, ExpectedConditions, element, by , Key } from 'protractor';
import { getElement, clickElement, nativeTextEntry } from './generic-steps';
export function waitForOverlay(elementName: string);


function waitForOverlay(elementName: string) {
    browser.wait(ExpectedConditions.stalenessOf(element(by.className(elementName))));
}
