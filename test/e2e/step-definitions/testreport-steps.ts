import { Then, When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { browser, by, element } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const buttonPadding = 30;
const request = require('request');

// This needs to be correctly re-implemented with the Test Report page
When('I complete the test', () => {
  // Click all the legal requirements - having to go native as normal find and click not working. Not sure why.
  browser.driver.getCurrentContext().then((webviewContext) => {
    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP').then(() => {
      const legalRequirements = element.all(by.xpath('//XCUIElementTypeImage[@label="checkmark"]'));
      legalRequirements.each((legalRequirement) => {
        legalRequirement.click();
      });

      // Switch back to WEBVIEW context
      browser.driver.selectContext(webviewContext);
    });
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

When('I add a {string} driver fault', (competency) => {
  addDriverFault(competency);
});

When('I add a {string} serious fault', (competency) => {
  const seriousButton = getElement(by.id('serious-button'));
  clickElement(seriousButton);
  clickCompetency(competency);
});

When('I add a {string} dangerous fault', (competency) => {
  const dangerousButton = getElement(by.id('dangerous-button'));
  clickElement(dangerousButton);
  clickCompetency(competency);
});

Then('the driver fault count is {string}', (driverFaultCount) => {
  const summaryCountField = getElement(by.id('summary-count'));
  return expect(summaryCountField.getText()).to.eventually.equal(driverFaultCount);
});

Then('the competency {string} driver fault count is {string}', (competency, driverFaultCount) => {
  const competencyCountField = getElement(by.xpath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/driving-faults-badge//span[@class = 'count']`));
  return expect(competencyCountField.getText()).to.eventually.equal(driverFaultCount);
});

/**
 * Performs the long press action on the competency to add a driver fault.
 * The long press does not appear to have been implemented so calling appiums touch perform action directly.
 * @param driverFault The competency to apply the driver fault to
 */
const addDriverFault = (competency) => {
  browser.getProcessedConfig().then((config) => {
    browser.driver.getSession().then((session) => {
      const competencyButton = getElement(by.xpath(`//competency-button/div/span[text() = '${competency}']`));
      competencyButton.getLocation().then((buttonLocation) => {
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
        }, (error, res, body) => {
          if (error) {
            console.error(error);
            return;
          }
        });
      });
    });
  });
};

/**
 * Clicks the competency to add a fault or remove where the relevant S/D/Remove has been selected in advance.
 * Note: not for use with driver faults as this requires a long press
 * @param competency The competency to add the fault to
 */
const clickCompetency = (competency) => {
  browser.getProcessedConfig().then((config) => {
    browser.driver.getSession().then((session) => {
      const competencyButton = getElement(by.xpath(`//competency-button/div/span[text() = '${competency}']`));
      competencyButton.getLocation().then((buttonLocation) => {
        request.post(`${config.seleniumAddress}/session/${session.getId()}/touch/perform`, {
          json: {
            actions: [
              {
                action: 'tap',
                options: {
                  x: Math.ceil(buttonLocation.x) + buttonPadding,
                  y: Math.ceil(buttonLocation.y) + buttonPadding,
                },
              },
            ],
          },
        }, (error, res, body) => {
          if (error) {
            console.error(error);
            return;
          }
        });
      });
    });
  });
};

const completeManouveure = () => {
  const manoeuvresButton = getElement(
    by.xpath('//manoeuvres/button'));

  clickElement(manoeuvresButton);

  const reverseRightRadio = getElement(by.id('manoeuvres-reverse-right-radio'));
  clickElement(reverseRightRadio);

  clickElement(manoeuvresButton);
};
