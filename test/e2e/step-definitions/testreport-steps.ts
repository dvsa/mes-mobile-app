import { When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { browser, by, element } from 'protractor';

// This needs to be correctly re-implemented with the Test Report page
When('I complete the test', () => {
  // Click all the legal requirements - having to go native as normal find and click not working. Not sure why.
  browser.driver.getCurrentContext().then((webviewContext) => {
    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP');

    const legalRequirements = element.all(by.xpath('//XCUIElementTypeImage[@label="checkmark"]'));
    legalRequirements.each((legalRequirement) => {
      legalRequirement.click();
    });

    // Switch back to WEBVIEW context
    browser.driver.selectContext(webviewContext);
  });

  // Select a manouveure
  completeManouveure();

  // End the test
  const endTestButton = getElement(by.id('end-test-button'));
  clickElement(endTestButton);

  // Continue to debrief
  const continueToDebriefButton = getElement(by.xpath('//button[span[h3[text() = "Continue to debrief"]]]'));
  clickElement(continueToDebriefButton);
});

const completeManouveure = () => {
  const manoeuvresButton = getElement(
    by.xpath('//manoeuvres/button'));

  clickElement(manoeuvresButton);

  const reverseRightRadio = getElement(by.id('manoeuvres-reverse-right-radio'));
  clickElement(reverseRightRadio);

  clickElement(manoeuvresButton);
};
