import { Then, When, Before } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { browser, by, element, ExpectedConditions } from 'protractor';
import { waitForPresenceOfElement } from '../../helpers/helpers';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const buttonPadding = 30;
const request = require('request');

this.testCategory = 'b';

Before({ tags: '@catbe' }, () => {
  this.testCategory = 'be';
});

Before({ tags: '@catc' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1' }, () => {
  this.testCategory = 'c';
});

When('I end the test', () => {
  endTest();
});

When('I continue to debrief', () => {
  const continueToDebriefButton = getElement(by.xpath('//button[span[h3[text() = "Continue to debrief"]]]'));
  clickElement(continueToDebriefButton);
});

When('I end and terminate the test', () => {
  endTest();
  const terminateTestButton = getElement(by.xpath('//button[span[text() = "Terminate test"]]'));
  clickElement(terminateTestButton);
});

When('I complete the test', () => {
  completeLegalRequirements();
  completeManouveure();
  completeEco();
  if (this.testCategory === 'b') {
    completeShowMe();
  }
  if (this.testCategory === 'be') {
    completeUncoupleRecouple();
  }
  endTest();
});

When('I complete the test with controlled stop', () => {
  completeLegalRequirements();
  completeManouveure();
  completeEco();
  completeShowMe();
  completeControlledStop();
  endTest();
});

When('I add a Show me / Tell me driver fault', () => {
  longPressButton(getElement(by.className('vehicle-check-competency')));
});

When('I add a Controlled Stop driver fault', () => {
  longPressButton(getElement(by.className('controlled-stop-competency')));
});

When('I add a {string} driver fault', (competency) => {
  longPressCompetency(competency);
});

When('I add a {string} serious fault', (competency) => {
  clickSeriousMode();
  clickCompetency(competency);
});

When('I add a {string} serious fault with a long press', (competency: string) => {
  clickSeriousMode();
  longPressCompetency(competency);
});

Then('the competency {string} driver fault count is not displayed', (competency: string) => {
  const driverBadge = getElement(by.xpath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/driving-faults-badge`));
  expect(driverBadge.getAttribute('ng-reflect-count')).to.eventually.equal(null);
});

When('I add an ETA with type {string}', (etaType: 'Verbal' | 'Physical') => {
  const etaText = `ETA: ${etaType}`;
  const etaButton = getElement(by.xpath(`//competency-button/div/div/span[text() = '${etaText}']`));
  longPressButton(etaButton);
});

When('I add a {string} dangerous fault', (competency) => {
  const dangerousButton = getElement(by.id('dangerous-button'));
  clickElement(dangerousButton);
  clickCompetency(competency);
});

When('I close the ETA modal', () => {
  clickElement(getElement(by.className('modal-return-button')));
});

Then('the ETA invalid modal is shown', () => {
  const modalTitle = getElement(by.className('modal-alert-header'));
  expect(modalTitle.getText()).to.eventually.equal('ETA recorded');
});

Then('the {string} button displays the serious badge', (competency: string) => {
  const seriousBadge = getElement(by.xpath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/div/serious-fault-badge//span[@class = 'label']`));
  expect(seriousBadge.isPresent()).to.eventually.be.true;
});

Then('the {string} button displays the dangerous badge', (competency: string) => {
  const dangerousBadge = getElement(by.xpath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/div/dangerous-fault-badge//span[@class = 'label']`));
  expect(dangerousBadge.isPresent()).to.eventually.be.true;
});

Then('the {string} button does not display the serious badge', (competency: string) => {
  const button = getCompetencyButton(competency);
  const seriousBadge = button.element(by.tagName('serious-fault-badge'));
  expect(seriousBadge.isPresent()).to.eventually.be.false;
});

When('I open the reversing diagram', () => {
  reverseDropDown();
  const reversingDiagramLink = getElement(by.xpath('//*[@id="reverse-diagram-link"]/span'));
  waitForPresenceOfElement(reversingDiagramLink);
  clickElement(reversingDiagramLink);
});

Then('I should see the reversing diagram modal', () => {
  const diagramModalTitle = getElement(by.xpath('//reverse-diagram-modal-cat-c//div[2]'));
  waitForPresenceOfElement(diagramModalTitle);
  expect(diagramModalTitle.getText()).to.eventually.equal('Reversing diagram - articulated vehicle');
});

When('I close the reversing diagram modal', () => {
  const reverseModalCloseButton = getElement(by.xpath('//*[@id="closeReverseDiagramModal"]/span/ion-icon'));
  clickElement(reverseModalCloseButton);
});

Then('I close the revresing diagram drop down', () => {
  reverseDropDown();
  waitForPresenceOfElement(getCompetencyButton('Control'));
});

When('I remove a driver fault for {string} with a tap', (competency: string) => {
  clickRemove();
  clickCompetency(competency);
});

When('I remove a driver fault for {string} with a long press', (competency: string) => {
  clickRemove();
  longPressCompetency(competency);
});

When('I remove a serious fault for {string} with a tap', (competency: string) => {
  clickRemove();
  clickSeriousMode();
  clickCompetency(competency);
});

When('I remove a serious fault for {string} with a long press', (competency: string) => {
  clickSeriousMode();
  clickRemove();
  longPressCompetency(competency);
});

When('I add a manoeuvre', () => {
  clickManoeuvresButton();
  const reverseRightRadio = getElement(by.id('manoeuvres-reverse-right-radio'));
  clickElement(reverseRightRadio);
});

When('I click the manoeuvres button', () => {
  clickManoeuvresButton();
});

When('I mark the manoeuvre as a {string} driver fault', (faultName: 'Control' | 'Observation') => {
  const button = getElement(by.xpath(`//manoeuvre-competency/div/span[text() = '${faultName}']`));
  longPressButton(button);
});

Then('the controlled stop requirement is ticked', () => {
  const controlledStopTick = getElement(by.css('.controlled-stop-tick.checked'));
  expect(controlledStopTick.isPresent()).to.eventually.be.true;
});

Then('the driver fault count is {string}', (driverFaultCount) => {
  const summaryCountField = getElement(by.id('summary-count'));
  return expect(summaryCountField.getText()).to.eventually.equal(driverFaultCount);
});

Then('a serious fault is present along the driver fault count of {string}', (driverFaultCount) => {
  expect(getElement(by.xpath('//vehicle-checks//serious-fault-badge//span')).isPresent()).to.eventually.be.true;
  const summaryCountField = getElement(by.id('summary-count'));
  return expect(summaryCountField.getText()).to.eventually.equal(driverFaultCount);
});

Then('the competency {string} driver fault count is {string}', (competency, driverFaultCount) => {
  const competencyCountField = getElement(by.xpath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/driving-faults-badge//span[@class = 'count']`));
  return expect(competencyCountField.getText()).to.eventually.equal(driverFaultCount);
});

When('I terminate the test from the test report page', () => {
  const endTestButton = getElement(by.id('end-test-button'));
  clickElement(endTestButton);
  const terminateTestButton = getElement(by.xpath('//button/span[text() = "Terminate test"]'));
  clickElement(terminateTestButton);
});

Then('the legal requirements pop up is present', () => {
  const legalRequirementPopUp = getElement(by.xpath('//div/legal-requirements-modal'));
  expect(legalRequirementPopUp.isPresent()).to.eventually.be.true;
});

When('the required test observation is present {string}', (legal_requirement: string) => {
  expect(getElement(by.xpath(`//legal-requirements-modal//div//ul/li[text() = '${legal_requirement}']`)).isPresent()).to.eventually.be.true;
});

Then('I return to the test report page', () =>   {
  const returnToTestBtn = getElement(by.xpath('//div/legal-requirements-modal//modal-return-button//span'));
  clickElement(returnToTestBtn);
});

When('I enter the legal requirements', () => {
  completeLegalRequirements();
  completeManouveure();
  completeEco();
});

When('I add the Uncouple and Recouple fault', () => {
  const uncoupleRecoupleFault = getElement(by.xpath('//uncouple-recouple//competency-button/div/div[1]'));
  longPressButton(uncoupleRecoupleFault);
});

const endTest = () => {
  const endTestButton = getElement(by.id('end-test-button'));
  clickElement(endTestButton);
};

const completeLegalRequirements = () => {
  const legalRequirements = element.all(by.xpath('//legal-requirement/competency-button[@class="legal-button"]'));
  legalRequirements.each((legalRequirement) => {
    longPressButton(legalRequirement);
  });
};

const completeEco = () => {
  const ecoCheckmark = getElement(by.xpath('//competency-button[contains(@class, "eco-tick")]'));
  longPressButton(ecoCheckmark);
};

const completeShowMe = () => {
  const showMeCheckmark = getElement(by.xpath('//competency-button[contains(@class, "show-me-question-tick")]'));
  longPressButton(showMeCheckmark);
};

const completeControlledStop = () => {
  const controlledStopCheckmark = getElement(by.xpath('//competency-button[contains(@class, "controlled-stop-tick")]'));
  longPressButton(controlledStopCheckmark);
};

const reverseDropDown = () => {
  const reverseButton = getElement(by.xpath('//*[@id="reverse-left-label"]'));
  clickElement(reverseButton);
};

const clickRemove = () => {
  clickElement(getElement(by.id('remove-button')));
};

const clickSeriousMode = () => {
  clickElement(getElement(by.id('serious-button')));
};

const getCompetencyButton = (competency: string) => {
  return getElement(by.xpath(`//competency-button/div/span[text() = '${competency}']`));
};

const longPressCompetency = (competency: string) => {
  const competencyButton = getCompetencyButton(competency);
  longPressButton(competencyButton);
};

const clickManoeuvresButton = () => {
  const manoeuvresButton = getElement(
    by.xpath('//manoeuvres/button'));
  clickElement(manoeuvresButton);
};

/**
 * Performs the long press action on the competency to add a driver fault.
 * The long press does not appear to have been implemented so calling appiums touch perform action directly.
 * @param driverFault The competency to apply the driver fault to
 */
const longPressButton = (button) => {
  browser.getProcessedConfig().then((config) => {
    browser.driver.getSession().then((session) => {
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
      const competencyButton = getCompetencyButton(competency);
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
  if (this.testCategory === 'be' || this.testCategory === 'c' || this.testCategory === 'c1') {
    const manoeuvresButton = getElement(by.xpath('//competency-button[contains(@class, "reverse-left-tick")]'));
    longPressButton(manoeuvresButton);
  } else {
    const manoeuvresButton = getElement(by.xpath('//manoeuvres/button'));
    clickElement(manoeuvresButton);
    const reverseRightRadio = getElement(by.id('manoeuvres-reverse-right-radio'));
    clickElement(reverseRightRadio);
    clickElement(manoeuvresButton);
  }
};

const completeUncoupleRecouple = () => {
  const uncoupleRecouple = getElement(by.xpath('//competency-button[contains(@class, "uncouple-recouple-tick")]'));
  longPressButton(uncoupleRecouple);
};
