import { Page } from '../../utilities/page';
import { WaitingRoomToCarPageObject } from './waitingRoomToCarPage.po';
import { PageHelper } from '../PageHelper/pageHelper';
import { UI_TEST_DATA } from '../../../test_data/ui_test_data';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

export class WaitingRoomToCarPage extends Page {

  waitingRoomToCarPageElement: WaitingRoomToCarPageObject = new WaitingRoomToCarPageObject();
  pageHelper: PageHelper = new PageHelper();

  async eyeSightResultPass() {
    await this.clickElement(this.waitingRoomToCarPageElement.eyeSightResultPass);
  }

  async orditTrainerResultPass() {
    await this.clickElement(this.waitingRoomToCarPageElement.orditTrainerResultPass);
  }

  async orditTrainerResultFail() {
    await this.clickElement(this.waitingRoomToCarPageElement.orditTrainerResultFail);
  }

  async trainigRecordsPass() {
    await this.clickElement(this.waitingRoomToCarPageElement.trainigRecordsPass);
  }

  async trainigRecordsFail() {
    await this.clickElement(this.waitingRoomToCarPageElement.trainigRecordsFail);
  }

  async eyeSightResultFail() {
    await this.clickElement(this.waitingRoomToCarPageElement.eyeSightResultFail);
  }

  async selectTranmissionType(transmissionType: string) {
    if (transmissionType === 'Manual') {
      await this.clickElement('transmission-manual');
    } else {
      await this.clickElement('transmission-automatic');
    }
  }

  async clickEyesightFailureConfirmButton() {
    await this.clickElement(this.waitingRoomToCarPageElement.eyesightFailureConfirmButton);
  }

  async clickTellMeSelector() {
    await this.clickElement(this.waitingRoomToCarPageElement.tellMeSelectr);
  }

  async clickTellMeQuestion(tellMeQuestion: string) {
    await this.clickElement(this.waitingRoomToCarPageElement.TellMeQuestion(tellMeQuestion));
  }

  async clickSubmitButton() {
    await this.clickElement(this.waitingRoomToCarPageElement.submitButton);
  }

  async selectTellMeQuestion(tellMeQuestion: string) {
    await this.clickTellMeSelector();
    await this.clickTellMeQuestion(tellMeQuestion);
    await this.clickSubmitButton();
  }

  async clickVehicleCheck(showMeQuestionsArray, index) {
    await this.clickElement(this.waitingRoomToCarPageElement.VehicleCheck(showMeQuestionsArray, index));
  }

  async clickVehicleAnswer(resultFromQuestions, index) {
    await this.clickElement(this.waitingRoomToCarPageElement.VehicleAnswer(resultFromQuestions, index));
  }

  showMeQuestionsForDifferentAnswers(questions, questionResult) {
    const showMeQuestionsArray = [questions, questionResult];
    const elements = this.waitingRoomToCarPageElement.vehicleChecksQuestions;
    let count = 0;
    elements.each(async (element, index) => {
      await this.clickElement(element);
      await this.clickVehicleCheck(showMeQuestionsArray, index);
      // const submitDialog = TempPage.getAndAwaitElement(by.xpath('//ion-alert//button[span[text() =  "Submit"]]'));
      // TempPage.clickElement(submitDialog);
      await this.clickSubmitButton();
      let resultFromQuestions;
      if (questionResult[count] === 'true') {
        resultFromQuestions = 'vehicleChecksCorrect';
      } else {
        resultFromQuestions = 'vehicleChecksFault';
      }
      await this.clickVehicleAnswer(resultFromQuestions, index);
      count = count + 1;
    });
  }

  showMeQuestions(questions, questionResult) {
    const showMeQuestionsArray = [questions, questionResult];
    const elements = this.waitingRoomToCarPageElement.vehicleChecksQuestions;
    let count = 0;
    elements.each(async (element, index) => {
      await this.clickElement(element);
      await this.clickVehicleCheck(showMeQuestionsArray, index);
      // const submitDialog = TempPage.getAndAwaitElement(by.xpath('//ion-alert//button[span[text() =  "Submit"]]'));
      // TempPage.clickElement(submitDialog);
      await this.clickSubmitButton();
      let resultFromQuestions;
      if (questionResult === true || questionResult[count] === 'false') {
        resultFromQuestions = 'vehicleChecksCorrect';
      } else {
        resultFromQuestions = 'vehicleChecksFault';
      }
      count = count + 1;
      await this.clickVehicleAnswer(resultFromQuestions, index);
    });
  }

  async clickTellMeFault() {
    await this.clickElement(this.waitingRoomToCarPageElement.tellMeFault);
  }

  async clickTellMeCorrect() {
    await this.clickElement(this.waitingRoomToCarPageElement.tellMeCorrect);
  }

  async clickManualTransmission() {
    await this.clickElement(this.waitingRoomToCarPageElement.manualTransmission);
  }

  async clickAutomaticTransmission() {
    await this.clickElement(this.waitingRoomToCarPageElement.automaticTransmission);
  }

  async standardUserJourney(withDriverFault: boolean, manualTransmission: boolean, tellMeQuestion: string) {
    await this.selectTellMeQuestion(tellMeQuestion);

    if (!withDriverFault) {
      await this.clickTellMeFault();
    } else {
      await this.clickTellMeCorrect();
    }

    if (manualTransmission) {
      await this.clickManualTransmission();
    } else {
      await this.clickAutomaticTransmission();
    }
  }

  async openSelectQuestionsOverlay() {
    // @ts-ignore
    const selectQuestionsButton = this.waitingRoomToCarPageElement.selectQuestionsButton();
    expect(selectQuestionsButton.isPresent()).to.eventually.be.true;
    await this.clickElement(selectQuestionsButton);
  }

  async submitVehicleChecksButton() {
    await this.clickElement(this.waitingRoomToCarPageElement.vehicleChecksButton);
  }

  async multiShowAndTell(questions, questionResult) {
    await this.openSelectQuestionsOverlay();
    await this.showMeQuestions(questions, questionResult);
    await this.submitVehicleChecksButton();
  }

  // todo: kc is this similar to SearchPage?
  async enterSearchTerm(searchTerm) {
    await this.textFieldInputViaNativeMode(
      '//XCUIElementTypeOther[XCUIElementTypeOther[@name="Vehicle registration number"]]/' +
      'following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeTextField', searchTerm);
  }

  async submitWRTC() {
    await this.clickElement(this.waitingRoomToCarPageElement.wRTC);
  }

  async completeWaitingRoomPage(testCategory, questionResult, manualTransmission: boolean, tellMeQuestion?: string) {
    if (testCategory === 'be') {
      await this.eyeSightResultPass();
      await this.multiShowAndTell(UI_TEST_DATA.testData.be, questionResult);
    } else if (testCategory === 'c' || testCategory === 'c1') {
      await this.multiShowAndTell(UI_TEST_DATA.testData.c, questionResult);
    } else if (testCategory === 'd') {
      await this.multiShowAndTell(UI_TEST_DATA.testData.c, questionResult);
    } else if (testCategory === 'ce') {
      await this.multiShowAndTell(UI_TEST_DATA.testData.ce, questionResult);
    } else if (testCategory === 'a-mod1') {
      await this.modCatConfirmation(tellMeQuestion);
      const transmissionSelector = (manualTransmission) ? 'transmission-manual' : 'transmission-automatic';
      const manualElement = this.getElementById(transmissionSelector);
      await this.clickElement(manualElement);
    } else if (testCategory === 'a-mod2') {
      await this.eyeSightResultPass();
      await this.modCatConfirmation(tellMeQuestion);
      const transmissionSelector = (manualTransmission) ? 'transmission-manual' : 'transmission-automatic';
      const automaticElement = this.getElementById(transmissionSelector);
      await this.clickElement(automaticElement);
      // this is using for Selecting Safety and Balance Questions as well.
      await this.multiShowAndTell(UI_TEST_DATA.testData.mod2, questionResult);
    } else {
      await this.eyeSightResultPass();
      await this.standardUserJourney(questionResult, manualTransmission, tellMeQuestion);
    }
    await this.enterSearchTerm('AB12CDE');
    await this.submitWRTC();
  }

  async selectSafetyAndBalanceQuestions(table, pageTitle) {
    await this.openSelectQuestionsOverlay();
    // Wait for the page title to exist
    await this.pageHelper.getPageTitle(pageTitle);

    // Check that it is the last page title i.e. the displayed one
    expect(this.pageHelper.getDisplayedPageTitle().getText(), `Expected displayedPageTitle to equal ${pageTitle}`)
      .to.eventually.equal(pageTitle);
    await this.showMeQuestionsForDifferentAnswers(table.raw()[0], table.raw()[1]);
    await this.submitVehicleChecksButton();
  }

  async enterRegistrationNumber(registrationNumber) {
    await this.enterSearchTerm(registrationNumber);
  }

  async selectTransmissionType(transmissionType) {
    const transmissionSelector = (transmissionType === 'Manual') ? 'transmission-manual' : 'transmission-automatic';
    const manualTransmission = await this.getElementById(transmissionSelector);
    await this.clickElement(manualTransmission);
  }

  async selectEyeSight(result) {
    if (result === 'Pass') {
      await this.eyeSightResultPass();
    } else {
      this.eyeSightResultFail();
    }
  }

  async selectOrditTrainerOutcome(result) {
    if (result === 'Pass') {
      this.orditTrainerResultPass();
    } else {
      await this.orditTrainerResultFail();
    }
  }

  async selectTrainningRecordOutcome(result) {
    if (result === 'Pass') {
      await this.trainigRecordsPass();
    } else {
      await this.trainigRecordsFail();
    }
  }

  async modCatConfirmation(catType) {
    await this.openConfirmCatType();
    await this.selectCatType(catType);
    await this.clickElement(this.waitingRoomToCarPageElement.confirm);
  }

  async openConfirmCatType() {
    await this.clickElement(this.waitingRoomToCarPageElement.openConfirmCatType);
  }

  async selectCatType(catType) {
    await this.clickElement(this.waitingRoomToCarPageElement.selectCatType(catType));
  }

  async completeSafetyQuestions() {
    await this.openSelectQuestionsOverlay();
    await this.clickElement(this.waitingRoomToCarPageElement.safetyQuestionsCorrect_14);
    await this.clickElement(this.waitingRoomToCarPageElement.safetyQuestionsCorrect_15);
    await this.clickElement(this.waitingRoomToCarPageElement.safetyQuestionsCorrect_16);
    await this.submitVehicleChecksButton();
  }

  selectVehicleDetails() {
    this.clickElement(this.waitingRoomToCarPageElement.selectVehicleDetails);
  }

  async selectCombination(value) {
    await this.clickElement(this.waitingRoomToCarPageElement.itemCover);
    // this.clickElement(`//ion-alert[contains(@class,'single-select-alert')]//div[contains(text(),'${value}')]/../..`);
    await this.clickElement(this.waitingRoomToCarPageElement.alertInput);
    // ion-alert[contains(@class,'single-select-alert')]//div[contains(text(),'L')]
    await this.clickSubmitButton();
  }
}
