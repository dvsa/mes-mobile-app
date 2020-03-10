import { Then, When, Before } from 'cucumber';
import { by, element } from 'protractor';
import TempPage from '../pages/tempPage';
import TestReportPage from '../pages/testReportPage';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

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

Before({ tags: '@catce' }, () => {
  this.testCategory = 'ce';
});

Before({ tags: '@catc1e' }, () => {
  this.testCategory = 'ce';
});

When('I end the test', () => {
  endTest();
});

When('I continue to debrief', () => {
  const continueToDebriefButton = TempPage.getAndAwaitElement(
    by.xpath('//button[span[h3[text() = "Continue to debrief"]]]'));
  TempPage.clickElement(continueToDebriefButton);
});

When('I end and terminate the test', () => {
  endTest();
  const terminateTestButton = TempPage.getAndAwaitElement(by.xpath('//button[span[text() = "Terminate test"]]'));
  TempPage.clickElement(terminateTestButton);
});

When('I complete the test', () => {
  completeLegalRequirements();
  TestReportPage.completeManouveure(this.testCategory);
  completeEco();
  if (this.testCategory === 'b') {
    completeShowMe();
  }
  if (this.testCategory === 'be' || this.testCategory === 'ce') {
    TestReportPage.completeUncoupleRecouple();
  }
  endTest();
});

When('I complete the test with uncouple recouple', () => {
  completeLegalRequirements();
  TestReportPage.completeManouveure(this.testCategory);
  completeEco();
  TestReportPage.completeUncoupleRecouple();
  endTest();
});

When('I complete the test with controlled stop', () => {
  completeLegalRequirements();
  TestReportPage.completeManouveure(this.testCategory);
  completeEco();
  completeShowMe();
  completeControlledStop();
  endTest();
});

When('I add a Show me / Tell me driver fault', () => {
  TestReportPage.longPressButton(TempPage.getAndAwaitElement(by.className('vehicle-check-competency')));
});

When('I add a Controlled Stop driver fault', () => {
  TestReportPage.longPressButton(TempPage.getAndAwaitElement(by.className('controlled-stop-competency')));
});

When('I add a {string} driver fault', (competency) => {
  longPressCompetency(competency);
});

When('I add a {string} serious fault', (competency) => {
  clickSeriousMode();
  TestReportPage.clickCompetency(competency);
});

When('I add a {string} serious fault with a long press', (competency: string) => {
  clickSeriousMode();
  longPressCompetency(competency);
});

Then('the competency {string} driver fault count is not displayed', (competency: string) => {
  const driverBadge = TempPage.getAndAwaitElement(by.xpath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/driving-faults-badge`));
  expect(driverBadge.getAttribute('ng-reflect-count')).to.eventually.equal(null);
});

When('I add an ETA with type {string}', (etaType: 'Verbal' | 'Physical') => {
  const etaText = `ETA: ${etaType}`;
  const etaButton = TempPage.getAndAwaitElement(by.xpath(`//competency-button/div/div/span[text() = '${etaText}']`));
  TestReportPage.longPressButton(etaButton);
});

When('I add a {string} dangerous fault', (competency) => {
  const dangerousButton = TempPage.getAndAwaitElement(by.id('dangerous-button'));
  TempPage.clickElement(dangerousButton);
  TestReportPage.clickCompetency(competency);
});

When('I close the ETA modal', () => {
  TempPage.clickElement(TempPage.getAndAwaitElement(by.className('modal-return-button')));
});

Then('the ETA invalid modal is shown', () => {
  const modalTitle = TempPage.getAndAwaitElement(by.className('modal-alert-header'));
  expect(modalTitle.getText()).to.eventually.equal('ETA recorded');
});

Then('the {string} button displays the serious badge', (competency: string) => {
  const seriousBadge = TempPage.getAndAwaitElement(by.xpath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/div/serious-fault-badge//span[@class = 'label']`));
  expect(seriousBadge.isPresent()).to.eventually.be.true;
});

Then('the {string} button displays the dangerous badge', (competency: string) => {
  const dangerousBadge = TempPage.getAndAwaitElement(by.xpath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/div/dangerous-fault-badge//span[@class = 'label']`));
  expect(dangerousBadge.isPresent()).to.eventually.be.true;
});

Then('the {string} button does not display the serious badge', (competency: string) => {
  const button = TestReportPage.getCompetencyButton(competency);
  const seriousBadge = button.element(by.tagName('serious-fault-badge'));
  expect(seriousBadge.isPresent()).to.eventually.be.false;
});

When('I open the reversing diagram', () => {
  reverseDropDown();
  const reversingDiagramLink = TempPage.getAndAwaitElement(by.xpath('//*[@id="reverse-diagram-link"]/span'));
  TempPage.waitForPresenceOfElement(reversingDiagramLink);
  TempPage.clickElement(reversingDiagramLink);
});

Then('I should see the reversing diagram modal', () => {
  const diagramModalTitle = TempPage.getAndAwaitElement(by.xpath('//reverse-diagram-modal-cat-c//div[2]'));
  TempPage.waitForPresenceOfElement(diagramModalTitle);
  expect(diagramModalTitle.getText()).to.eventually.equal('Reversing diagram - articulated vehicle');
});

When('I close the reversing diagram modal', () => {
  const reverseModalCloseButton = TempPage.getAndAwaitElement(
    by.xpath('//*[@id="closeReverseDiagramModal"]/span/ion-icon'));
  TempPage.clickElement(reverseModalCloseButton);
});

Then('I close the revresing diagram drop down', () => {
  reverseDropDown();
  TempPage.waitForPresenceOfElement(TestReportPage.getCompetencyButton('Control'));
});

When('I remove a driver fault for {string} with a tap', (competency: string) => {
  clickRemove();
  TestReportPage.clickCompetency(competency);
});

When('I remove a driver fault for {string} with a long press', (competency: string) => {
  clickRemove();
  longPressCompetency(competency);
});

When('I remove a serious fault for {string} with a tap', (competency: string) => {
  clickRemove();
  clickSeriousMode();
  TestReportPage.clickCompetency(competency);
});

When('I remove a serious fault for {string} with a long press', (competency: string) => {
  clickSeriousMode();
  clickRemove();
  longPressCompetency(competency);
});

When('I add a manoeuvre', () => {
  clickManoeuvresButton();
  const reverseRightRadio = TempPage.getAndAwaitElement(by.id('manoeuvres-reverse-right-radio'));
  TempPage.clickElement(reverseRightRadio);
});

When('I click the manoeuvres button', () => {
  clickManoeuvresButton();
});

When('I mark the manoeuvre as a {string} driver fault', (faultName: 'Control' | 'Observation') => {
  const button = TempPage.getAndAwaitElement(by.xpath(`//manoeuvre-competency/div/span[text() = '${faultName}']`));
  TestReportPage.longPressButton(button);
});

Then('the controlled stop requirement is ticked', () => {
  const controlledStopTick = TempPage.getAndAwaitElement(by.css('.controlled-stop-tick.checked'));
  expect(controlledStopTick.isPresent()).to.eventually.be.true;
});

Then('the driver fault count is {string}', (driverFaultCount) => {
  const summaryCountField = TempPage.getAndAwaitElement(by.id('summary-count'));
  return expect(summaryCountField.getText()).to.eventually.equal(driverFaultCount);
});

Then('a serious fault is present along the driver fault count of {string}', (driverFaultCount) => {
  // tslint:disable-next-line:max-line-length
  expect(TempPage.getAndAwaitElement(by.xpath('//vehicle-checks//serious-fault-badge//span')).isPresent()).to.eventually.be.true;
  const summaryCountField = TempPage.getAndAwaitElement(by.id('summary-count'));
  return expect(summaryCountField.getText()).to.eventually.equal(driverFaultCount);
});

Then('the competency {string} driver fault count is {string}', (competency, driverFaultCount) => {
  const competencyCountField =
    TempPage.getAndAwaitElement(by.xpath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/driving-faults-badge//span[@class = 'count']`));
  return expect(competencyCountField.getText()).to.eventually.equal(driverFaultCount);
});

When('I terminate the test from the test report page', () => {
  const endTestButton = TempPage.getAndAwaitElement(by.id('end-test-button'));
  TempPage.clickElement(endTestButton);
  const terminateTestButton = TempPage.getAndAwaitElement(by.xpath('//button/span[text() = "Terminate test"]'));
  TempPage.clickElement(terminateTestButton);
});

Then('the legal requirements pop up is present', () => {
  const legalRequirementPopUp = TempPage.getAndAwaitElement(by.xpath('//div/legal-requirements-modal'));
  expect(legalRequirementPopUp.isPresent()).to.eventually.be.true;
});

When('the required test observation is present {string}', (legalRequirement: string) => {
  expect(TempPage.getAndAwaitElement(by.xpath(`//legal-requirements-modal//div//ul/li[text() = '${legalRequirement}']`)).isPresent()).to.eventually.be.true;
});

Then('I return to the test report page', () =>   {
  const returnToTestBtn =
    TempPage.getAndAwaitElement(by.xpath('//div/legal-requirements-modal//modal-return-button//span'));
  TempPage.clickElement(returnToTestBtn);
});

When('I enter the legal requirements', () => {
  completeLegalRequirements();
  TestReportPage.completeManouveure(this.testCategory);
  completeEco();
});

When('I add the Uncouple and Recouple fault', () => {
  const uncoupleRecoupleFault =
    TempPage.getAndAwaitElement(by.xpath('//uncouple-recouple//competency-button/div/div[1]'));
  TestReportPage.longPressButton(uncoupleRecoupleFault);
});

const endTest = () => {
  const endTestButton = TempPage.getAndAwaitElement(by.id('end-test-button'));
  TempPage.clickElement(endTestButton);
};

const completeLegalRequirements = () => {
  const legalRequirements = element.all(by.xpath('//legal-requirement/competency-button[@class="legal-button"]'));
  legalRequirements.each((legalRequirement) => {
    TestReportPage.longPressButton(legalRequirement);
  });
};

const completeEco = () => {
  const ecoCheckmark = TempPage.getAndAwaitElement(by.xpath('//competency-button[contains(@class, "eco-tick")]'));
  TestReportPage.longPressButton(ecoCheckmark);
};

const completeShowMe = () => {
  // tslint:disable-next-line:max-line-length
  const showMeCheckmark = TempPage.getAndAwaitElement(by.xpath('//competency-button[contains(@class, "show-me-question-tick")]'));
  TestReportPage.longPressButton(showMeCheckmark);
};

const completeControlledStop = () => {
  // tslint:disable-next-line:max-line-length
  const controlledStopCheckmark = TempPage.getAndAwaitElement(by.xpath('//competency-button[contains(@class, "controlled-stop-tick")]'));
  TestReportPage.longPressButton(controlledStopCheckmark);
};

const reverseDropDown = () => {
  const reverseButton = TempPage.getAndAwaitElement(by.xpath('//*[@id="reverse-left-label"]'));
  TempPage.clickElement(reverseButton);
};

const clickRemove = () => {
  TempPage.clickElement(TempPage.getAndAwaitElement(by.id('remove-button')));
};

const clickSeriousMode = () => {
  TempPage.clickElement(TempPage.getAndAwaitElement(by.id('serious-button')));
};

const longPressCompetency = (competency: string) => {
  const competencyButton = TestReportPage.getCompetencyButton(competency);
  TestReportPage.longPressButton(competencyButton);
};

const clickManoeuvresButton = () => {
  const manoeuvresButton = TempPage.getAndAwaitElement(by.xpath('//manoeuvres/button'));
  TempPage.clickElement(manoeuvresButton);
};
