import {Before, Then, When} from 'cucumber';
import {
  Competency,
  DriverFaults,
  ETA,
  LegalRequirements,
  ReversingDiagramModal,
  TestReportPage,
} from '../helper/testReportPage/testReportPage';
import {
  CompetencyObject,
  DriverFaultsObject,
  ETAObject,
  LegalRequirementsObject,
  ReversingDiagramModalObject,
  TestReportPageObject,
} from '../helper/testReportPage/testReportPage.po';

let testReportPage: TestReportPage = new TestReportPage();
let testReportPageElement: TestReportPageObject = new TestReportPageObject();
let driverFaults: DriverFaults = new DriverFaults();
let driverFaultsElement: DriverFaultsObject = new DriverFaultsObject();
let competency: Competency = new Competency();
let competencyElement: CompetencyObject = new CompetencyObject();
let legalRequirement: LegalRequirements = new LegalRequirements();
let legalRequirementObject: LegalRequirementsObject = new LegalRequirementsObject();
let eta: ETA = new ETA();
let etaElement: ETAObject = new ETAObject();
let reversingDiagramModal: ReversingDiagramModal = new ReversingDiagramModal();
let reversingDiagramModalElement: ReversingDiagramModalObject = new ReversingDiagramModalObject();

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

this.testCategory = 'b';

Before({tags: '@catbe'}, () => {
  this.testCategory = 'be';
});

Before({tags: '@catc'}, () => {
  this.testCategory = 'c';
});

Before({tags: '@catc1'}, () => {
  this.testCategory = 'c';
});

Before({tags: '@catce'}, () => {
  this.testCategory = 'ce';
});

Before({tags: '@catc1e'}, () => {
  this.testCategory = 'ce';
});

Before({tags: '@cata'}, () => {
  this.testCategory = 'a-mod1';
});

Before({tags: '@catm2'}, () => {
  this.testCategory = 'a-mod2';
});

Before({tags: '@catd'}, () => {
  this.testCategory = 'd';
});

Before({tags: '@catHome'}, () => {
  this.testCategory = 'home-test';
});

Before({tags: '@catADI2'}, () => {
  this.testCategory = 'adi-part2';
});

Before({tags: '@catcpc'}, () => {
  this.testCategory = 'cpc';
});

When('I end the test', async () => {
  await testReportPage.clickEndTestButton();
});

When('I end the test with the speed requirements not met', async () => {
  await testReportPage.clickEndTestButton();
  await testReportPage.clickEndTestButtonSpeedRequirements();
});

When('I continue to debrief', async () => {
  if (this.testCategory === 'cpc') {
    await testReportPage.waitForTerminateButton();
  }
  await testReportPage.clickContinueToDebriefbutton();
});

When('I end and terminate the test', async () => {
  await testReportPage.clickEndTestButton();
  await testReportPage.clickTerminateTestButton();
});

When('I complete the test', async () => {
  if (this.testCategory === 'a-mod2') {
    await legalRequirement.completeLegalRequirements();
    await testReportPage.completeEco();
  } else {
    await legalRequirement.completeLegalRequirements();
    await testReportPage.completeManouveure(this.testCategory);
    await testReportPage.completeEco();
    if (this.testCategory === 'b') {
      await testReportPage.completeShowMe();
    }
    if (this.testCategory === 'be' || this.testCategory === 'ce') {
      await testReportPage.completeUncoupleRecouple();
    }
    if (this.testCategory === 'adi-part2') {
      await testReportPage.completeAdi2SMTM();
      await testReportPage.completeHomeTestControlledStop();
    }
    if (this.testCategory === 'home-test') {
      await testReportPage.completeHomeTestCodeSafety();
      await testReportPage.completeHomeTestControlledStop();
    }
  }
  await testReportPage.clickEndTestButton();
});

When('I complete the test with uncouple recouple', async () => {
  await legalRequirement.completeLegalRequirements();
  await testReportPage.completeManouveure(this.testCategory);
  await testReportPage.completeEco();
  await testReportPage.completeUncoupleRecouple();
  await testReportPage.clickEndTestButton();
});

When('I complete the test with controlled stop', async () => {
  if (this.testCategory === 'd') {
    await legalRequirement.completeLegalRequirementsForCategoryD();
  } else {
    await legalRequirement.completeLegalRequirements();
    await testReportPage.completeShowMe();
    await testReportPage.completeControlledStop();
  }
  await testReportPage.completeManouveure(this.testCategory);
  await testReportPage.completeEco();
  await testReportPage.clickEndTestButton();
});

When('I add a Show me / Tell me driver fault', async () => {
  await driverFaults.addShowMeTellMeDriverFault();
});

When('I add a Controlled Stop driver fault', async () => {
  await driverFaults.addControlledStopDriverFault();
});

When('I add a {string} driver fault', async (competency) => {
  await competency.longPressCompetency(competency);
});

When('I add a {string} serious fault', async (competency) => {
  await testReportPage.clickSeriousMode();
  await competency.clickCompetency(competency);
});

When('I add a {string} serious fault with a long press', async (competency) => {
  await testReportPage.clickSeriousMode();
  await competency.longPressCompetency(competency);
});

Then('the competency {string} driver fault count is not displayed', async (competency: string) => {
  const driverBadge = driverFaultsElement.DriverBadge(competency);
  expect(await driverFaults.getDrivingFaults(driverBadge)).to.eventually.equal(null);
});

When('I add an ETA with type {string}', async (etaType: 'Verbal' | 'Physical') => {
  const etaText = `ETA: ${etaType}`;
  await eta.longPressETAButton(etaText);
});

When('I add a {string} dangerous fault', async (competency) => {
  await testReportPage.clickDangerousButton();
  await competency.clickCompetency(competency);
});

When('I close the ETA modal', async () => {
  await testReportPage.ETA.closeETAModal();
});

Then('the ETA invalid modal is shown', async () => {
  const modalTitle = etaElement.getETAModalTitle();
  expect(await modalTitle.getText()).to.eventually.equal('ETA recorded');
});

Then('the {string} button displays the serious badge', async (competency: string) => {
  const seriousBadge = driverFaultsElement.SeriousFaultBadge(competency);
  expect(await seriousBadge.isPresent()).to.eventually.be.true;
});

Then('the {string} button displays the dangerous badge', async (competency: string) => {
  const dangerousBadge = driverFaultsElement.DangerousFaultBadge(competency);
  expect(await dangerousBadge.isPresent()).to.eventually.be.true;
});

Then('the {string} button does not display the serious badge', async (competency: string) => {
  const button = competencyElement.CompetencyButton(competency);
  const seriousBadge = driverFaultsElement.SeriousFaultBadgeByTagName(button);
  expect(await seriousBadge.isPresent()).to.eventually.be.false;
});

When('I open the reversing diagram', async () => {
  await testReportPage.reverseDropDown();
  await reversingDiagramModal.openReversingDiagramModal();
});

Then('I should see the reversing diagram modal', async () => {
  const diagramModalTitle = reversingDiagramModalElement.reversingDiagramModalTitle;
  if (this.testCategory === 'ce') {
    expect(await diagramModalTitle.getText()).to.eventually.equal('Reversing diagram - articulated vehicle');
  }
  if (this.testCategory === 'c' || this.testCategory === 'd') {
    expect(await diagramModalTitle.getText()).to.eventually.equal('Reversing diagram - rigid vehicle');
  }
});

When('I close the reversing diagram modal', () => {
  reversingDiagramModal.closeReversingDialogModal();
});

Then('I close the reversing diagram drop down', async () => {
  await testReportPage.reverseDropDown();
  await competencyElement.CompetencyButton('Control');
});

When('I remove a driver fault for {string} with a tap', async (competency: string) => {
  await testReportPage.clickRemove();
  await testReportPage.competency.clickCompetency(competency);
});

When('I remove a driver fault for {string} with a long press', async (competency) => {
  await testReportPage.clickRemove();
  await competency.longPressCompetency(competency);
});

When('I remove a serious fault for {string} with a tap', async (competency) => {
  await testReportPage.clickRemove();
  await testReportPage.clickSeriousMode();
  await competency.clickCompetency(competency);
});

When('I remove a serious fault for {string} with a long press', async (competency) => {
  await testReportPage.clickSeriousMode();
  await testReportPage.clickRemove();
  await competency.longPressCompetency(competency);
});

When('I add a manoeuvre', async () => {
  await testReportPage.clickManoeuvresButton();
  await testReportPage.clickReverseRightRadio();
});

When('I click the manoeuvres button', async () => {
  await testReportPage.clickManoeuvresButton();
});

When('I mark the manoeuvre as a {string} driver fault', async (faultName: 'Control' | 'Observation') => {
  await driverFaults.markDriverFault(faultName);
});

Then('the controlled stop requirement is ticked', async () => {
  const controlledStopTick = testReportPageElement.getControlledStopTick;
  expect(await controlledStopTick.isPresent()).to.eventually.be.true;
});

Then('the driver fault count is {string}', async (driverFaultCount) => {
  const summaryCountField = testReportPageElement.summaryCountField;
  return expect(await summaryCountField.getText(), `Expected driver fault count to equal ${driverFaultCount}`)
    .to.eventually.equal(driverFaultCount);
});

Then('a serious fault is present along the driver fault count of {string}', async (driverFaultCount) => {
  expect(driverFaultsElement.seriousFaultBadgeForVehicleChecks().isPresent()).to.eventually.be.true;
  const summaryCountField = testReportPageElement.summaryCountField;
  return expect(await summaryCountField.getText()).to.eventually.equal(driverFaultCount);
});

Then('the competency {string} driver fault count is {string}', async (competency, driverFaultCount) => {
  const competencyCountField = driverFaultsElement.CompetencyCountField(competency);
  return expect(await competencyCountField.getText()).to.eventually.equal(driverFaultCount);
});

Then('the competency for Show me and Tell me driver fault count is {string}', async (driverFaultCount) => {
  const competencyCountField = driverFaultsElement.CompetencyCountFieldForSMTM('Show me / Tell me');
  return expect(await competencyCountField.getText()).to.eventually.equal(driverFaultCount);
});

When('I terminate the test from the test report page', async () => {
  await testReportPage.clickEndTestButton();
  await testReportPage.clickTerminateTestButton();
});

Then('the legal requirements pop up is present', async () => {
  const legalRequirementPopUp = legalRequirementObject.legalRequrementsPopup();
  expect(await legalRequirementPopUp.isPresent()).to.eventually.be.true;
});

When('the required test observation is present {string}', async (legalRequirement: string) => {
  expect(await legalRequirementObject.LegalRequirement(legalRequirement).isPresent()).to.eventually.be.true;
});

Then('I return to the test report page', async () => {
  await testReportPage.clickReturnToTestButton();
});

When('I enter the legal requirements', async () => {
  await legalRequirement.completeLegalRequirements();
  await testReportPage.completeManouveure(this.testCategory);
  await testReportPage.completeEco();
});

When('I add the Uncouple and Recouple fault', async () => {
  await testReportPage.addUncoupleRecoupleFault();
});

When('I add a number to emergency stop and avoidence stop', async () => {
  await testReportPage.emergencyStopClick();
  await testReportPage.avoidenceStopClick();
});

When('I enter {string} first value {string} and second value {string}', async (textBox: string, firstValue: string, secondValue: string) => {
  if (textBox === 'Emergency Stop') {
    if (!(firstValue === '-')) {
      await testReportPage.bikeControlStops.enterEmergencyStopFirstValue(firstValue);
    }
    if (!(secondValue === '-')) {
      await testReportPage.bikeControlStops.enterEmergencyStopSecondValue(secondValue);
    }
  } else {
    if (!(firstValue === '-')) {
      await testReportPage.bikeControlStops.enterAvoidanceStopFirstValue(firstValue);
    }
    if (!(secondValue === '-')) {
      await testReportPage.bikeControlStops.enterAvoidanceStopSecondValue(secondValue);
    }
  }
});

When('I click Emergency Stop Not Met', async () => {
  await testReportPage.competency.clickCompetency('Not met');
});

When('I click Avoidance Stop Not Met', async () => {
  await testReportPage.bikeControlStops.clickAvoidanceMetCondition();
});

When('I select CPC module assessment question {string}', async (question: string) => {
  await testReportPage.clickCPCModuleAssessmentCheckBox(question);
});

When('I click on Next Question button', async () => {
  await testReportPage.clickNextQuestion();
});

When('I click on View Test Summary button', async () => {
  await testReportPage.clickViewTestSummary();
});
