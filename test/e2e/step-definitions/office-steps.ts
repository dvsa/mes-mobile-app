import {Before, Then, When} from 'cucumber';
import {OfficePage} from '../helper/office/office';
import {OfficePageObject} from '../helper/office/office.po';

let officePage: OfficePage = new OfficePage();
let officePageObject: OfficePageObject = new OfficePageObject();

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
  this.testCategory = 'c';
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

When('I complete the office write up', async () => {
  if (this.testCategory === 'cpc') {
    await officePage.enterCandidateDescription();
  } else {
    if (this.testCategory !== 'home-test') {
      if (!(this.testCategory === 'a-mod1')) {
        await officePage.enterRouteNumber('2');
        if (this.testCategory === 'be' || this.testCategory === 'c' || this.testCategory === 'c1' ||
          this.testCategory === 'ce' || this.testCategory === 'd') {
          await officePage.enterIndependentDriving('diagram');
        } else if (this.testCategory === 'a-mod2') {
          await officePage.enterTestConductedOn('cartobike');
          await officePage.enterIndependentDriving('diagram');
        } else if (this.testCategory === 'adi-part2') {
          await officePage.enterIndependentDriving('satnav');
          await officePage.selectShowMeQuestion('1', 'A20 - Front demister');
          await officePage.selectShowMeQuestion('2', 'A21 - Side window');
        } else {
          await officePage.enterShowMe('S5 - Horn');
          await officePage.enterIndependentDriving('satnav');
          await officePage.enterShowMe('S1 - Rear windscreen');
        }
      } else {
        await officePage.clickCircuit('left');
      }
    }
    await officePage.enterCandidateDescription();
    await officePage.enterWeatherConditions();
  }
});

When('I complete the office write up with Not applicable to independent driving and show me question', async () => {
  await officePage.enterRouteNumber('4');
  await officePage.enterIndependentDriving('na');
  await officePage.enterCandidateDescription();
  await officePage.enterShowMe('N/A - Not applicable');
  await officePage.enterWeatherConditions();
});

When('I upload the test', async () => {
  await officePage.uploadTest();
});

When('I try to upload the test', async () => {
  await officePage.clickUploadButton();
});

When('I enter a candidate description', async () => {
  await officePage.enterCandidateDescription();
});

When('I enter assessment report description', async () => {
  await officePage.enterAssessmentReport();
});

When('I complete the weather conditions', async () => {
  await officePage.enterWeatherConditions();
});

When('I complete the {string} circuit', async (circuitType) => {
  await officePage.clickCircuit(circuitType);
});
When('I enter a comment for {string} fault {string}', async (faultSeverity, faultLabel) => {
  const commentsField = officePageObject.CommentsField(faultSeverity, faultLabel);
  await commentsField.sendKeys(`Comment for ${faultSeverity} fault: ${faultLabel}`);
});

Then('the office activity code should be {string}', async (activityCode) => {
  const activityCodeField = officePageObject.ActivityCodeField(this.testCategory);
  return expect(await activityCodeField.getText()).to.eventually.equal(activityCode);
});

Then('I have a {string} fault for {string} requiring a comment', async (faultSeverity, faultLabel) => {
  const commentsValidationText = officePageObject.CommentsValidationText(faultSeverity, faultLabel);
  expect(commentsValidationText.getText()).to.eventually.equal('Provide a comment');
  return expect(await commentsValidationText.getAttribute('class')).to.eventually.contain('ng-invalid');
});

Then('the tell me question should be {string}', async (tellMeQuestion: string) => {
  const tellMeQuestionField = officePageObject.getTellMeQuestionField();
  return expect(await tellMeQuestionField.getText()).to.eventually.equal(tellMeQuestion);
});

Then('the office page test outcome is {string}', async (testOutcome: string) => {
  const testOutcomeField = officePageObject.testOutcomeField();
  return expect(await testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

Then(/^there (?:is|are) \"(.+)\" driver faults? listed for \"(.+)\"$/, async (faultCount: string, faultTest: string) => {
  const driverFault = officePageObject.DriverFault(faultCount, faultTest);
  return expect(await driverFault.isPresent()).to.eventually.be.true;
});

When('I complete the rekey', async () => {
  await officePage.completeRekey(this.testCategory);
});

Then('the rekey is successfully uploaded', async () => {
  const uploadRekeyMessage = officePageObject.uploadRekeyMessage();
  return expect(await uploadRekeyMessage.getText()).to.eventually.equal('Rekeyed test uploaded successfully');
});

When('I return to the journal', async () => {
  await officePage.clickReturnToJournalButton();
});
