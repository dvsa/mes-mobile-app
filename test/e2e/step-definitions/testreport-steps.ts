import { Then, When, Before } from 'cucumber';
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
  TestReportPage.clickEndTestButton();
});

When('I continue to debrief', () => {
  TestReportPage.clickContinueToDebriefbutton();
});

When('I end and terminate the test', () => {
  TestReportPage.endAndTerminateTest();
});

When('I complete the test', () => {
  TestReportPage.legalRequirements.completeLegalRequirements();
  TestReportPage.completeManouveure(this.testCategory);
  TestReportPage.completeEco();
  if (this.testCategory === 'b') {
    TestReportPage.completeShowMe();
  }
  if (this.testCategory === 'be' || this.testCategory === 'ce') {
    TestReportPage.completeUncoupleRecouple();
  }
  TestReportPage.clickEndTestButton();
});

When('I complete the test with uncouple recouple', () => {
  TestReportPage.legalRequirements.completeLegalRequirements();
  TestReportPage.completeManouveure(this.testCategory);
  TestReportPage.completeEco();
  TestReportPage.completeUncoupleRecouple();
  TestReportPage.clickEndTestButton();
});

When('I complete the test with controlled stop', () => {
  TestReportPage.legalRequirements.completeLegalRequirements();
  TestReportPage.completeManouveure(this.testCategory);
  TestReportPage.completeEco();
  TestReportPage.completeShowMe();
  TestReportPage.completeControlledStop();
  TestReportPage.clickEndTestButton();
});

When('I add a Show me / Tell me driver fault', () => {
  TestReportPage.driverFaults.addShowMeTellMeDriverFault();
});

When('I add a Controlled Stop driver fault', () => {
  TestReportPage.driverFaults.addControlledStopDriverFault();
});

When('I add a {string} driver fault', (competency) => {
  TestReportPage.competency.longPressCompetency(competency);
});

When('I add a {string} serious fault', (competency) => {
  TestReportPage.clickSeriousMode();
  TestReportPage.competency.clickCompetency(competency);
});

When('I add a {string} serious fault with a long press', (competency: string) => {
  TestReportPage.clickSeriousMode();
  TestReportPage.competency.longPressCompetency(competency);
});

Then('the competency {string} driver fault count is not displayed', (competency: string) => {
  const driverBadge = TestReportPage.driverFaults.getDriverBadge(competency);
  expect(TestReportPage.driverFaults.getDrivingFaults(driverBadge)).to.eventually.equal(null);
});

When('I add an ETA with type {string}', (etaType: 'Verbal' | 'Physical') => {
  const etaText = `ETA: ${etaType}`;
  TestReportPage.ETA.longPressETAButton(etaText);
});

When('I add a {string} dangerous fault', (competency) => {
  TestReportPage.clickDangerousButton();
  TestReportPage.competency.clickCompetency(competency);
});

When('I close the ETA modal', () => {
  TestReportPage.ETA.closeETAModal();
});

Then('the ETA invalid modal is shown', () => {
  const modalTitle = TestReportPage.ETA.getETAModalTitle();
  expect(modalTitle.getText()).to.eventually.equal('ETA recorded');
});

Then('the {string} button displays the serious badge', (competency: string) => {
  const seriousBadge = TestReportPage.driverFaults.getSeriousFaultBadge(competency);
  expect(seriousBadge.isPresent()).to.eventually.be.true;
});

Then('the {string} button displays the dangerous badge', (competency: string) => {
  const dangerousBadge = TestReportPage.driverFaults.getDangerousFaultBadge(competency);
  expect(dangerousBadge.isPresent()).to.eventually.be.true;
});

Then('the {string} button does not display the serious badge', (competency: string) => {
  const button = TestReportPage.competency.getCompetencyButton(competency);
  const seriousBadge = TestReportPage.driverFaults.getSeriousFaultBadgeByTagName(button);
  expect(seriousBadge.isPresent()).to.eventually.be.false;
});

When('I open the reversing diagram', () => {
  TestReportPage.reverseDropDown();
  TestReportPage.reversingDiagramModal.openReversingDiagramModal();
});

Then('I should see the reversing diagram modal', () => {
  const diagramModalTitle = TestReportPage.reversingDiagramModal.getReversingDiagramModalTitle();
  expect(diagramModalTitle.getText()).to.eventually.equal('Reversing diagram - articulated vehicle');
});

When('I close the reversing diagram modal', () => {
  TestReportPage.reversingDiagramModal.closeReversingDialogModal();
});

Then('I close the revresing diagram drop down', () => {
  TestReportPage.reverseDropDown();
  TestReportPage.waitForPresenceOfElement(TestReportPage.competency.getCompetencyButton('Control'));
});

When('I remove a driver fault for {string} with a tap', (competency: string) => {
  TestReportPage.clickRemove();
  TestReportPage.competency.clickCompetency(competency);
});

When('I remove a driver fault for {string} with a long press', (competency: string) => {
  TestReportPage.clickRemove();
  TestReportPage.competency.longPressCompetency(competency);
});

When('I remove a serious fault for {string} with a tap', (competency: string) => {
  TestReportPage.clickRemove();
  TestReportPage.clickSeriousMode();
  TestReportPage.competency.clickCompetency(competency);
});

When('I remove a serious fault for {string} with a long press', (competency: string) => {
  TestReportPage.clickSeriousMode();
  TestReportPage.clickRemove();
  TestReportPage.competency.longPressCompetency(competency);
});

When('I add a manoeuvre', () => {
  TestReportPage.clickManoeuvresButton();
  TestReportPage.clickReverseRightRadio();
});

When('I click the manoeuvres button', () => {
  TestReportPage.clickManoeuvresButton();
});

When('I mark the manoeuvre as a {string} driver fault', (faultName: 'Control' | 'Observation') => {
  TestReportPage.driverFaults.markDriverFault(faultName);
});

Then('the controlled stop requirement is ticked', () => {
  const controlledStopTick = TestReportPage.getControlledStopTick();
  expect(controlledStopTick.isPresent()).to.eventually.be.true;
});

Then('the driver fault count is {string}', (driverFaultCount) => {
  const summaryCountField = TestReportPage.getSummaryCountField();
  return expect(summaryCountField.getText()).to.eventually.equal(driverFaultCount);
});

Then('a serious fault is present along the driver fault count of {string}', (driverFaultCount) => {
  expect(TestReportPage.driverFaults.getSeriousFaultBadgeForVehicleChecks().isPresent()).to.eventually.be.true;
  const summaryCountField = TestReportPage.getSummaryCountField();
  return expect(summaryCountField.getText()).to.eventually.equal(driverFaultCount);
});

Then('the competency {string} driver fault count is {string}', (competency, driverFaultCount) => {
  const competencyCountField = TestReportPage.driverFaults.getCompetencyCountField(competency);
  return expect(competencyCountField.getText()).to.eventually.equal(driverFaultCount);
});

When('I terminate the test from the test report page', () => {
  TestReportPage.clickEndTestButton();
  TestReportPage.clickTerminateTestButton();
});

Then('the legal requirements pop up is present', () => {
  const legalRequirementPopUp = TestReportPage.legalRequirements.getLegalRequrementsPopup();
  expect(legalRequirementPopUp.isPresent()).to.eventually.be.true;
});

When('the required test observation is present {string}', (legalRequirement: string) => {
  expect(TestReportPage.legalRequirements.getLegalRequirement(legalRequirement).isPresent()).to.eventually.be.true;
});

Then('I return to the test report page', () =>   {
  TestReportPage.clickReturnToTestButton();
});

When('I enter the legal requirements', () => {
  TestReportPage.legalRequirements.completeLegalRequirements();
  TestReportPage.completeManouveure(this.testCategory);
  TestReportPage.completeEco();
});

When('I add the Uncouple and Recouple fault', () => {
  TestReportPage.addUncoupleRecoupleFault();
});
