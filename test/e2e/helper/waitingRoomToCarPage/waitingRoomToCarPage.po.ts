import { by, element } from 'protractor';
import Page from '../../utilities/page';

export class WaitingRoomToCarPageObject extends Page {
  eyeSightResultPass =
    this.getElementById('eyesight-pass');

  orditTrainerResultPass =
    this.getElementByCss('label[for="ordit-trained-yes"]');

  orditTrainerResultFail =
    this.getElementByCss('label[for="ordit-trained-no"]');

  trainigRecordsPass =
    this.getElementByCss('label[for="training-record-yes"]');

  trainigRecordsFail =
    this.getElementByCss('label[for="training-record-no"]');

  eyeSightResultFail =
    this.getElementById('eyesight-fail');

  transitionManual =
    this.getElementById('transmission-manual');

  transitionAutomatic =
    this.getElementById('transmission-automatic');

  eyesightFailureConfirmation =
    this.getElementById('eyesight-failure-confirmation');

  eyesightFailureConfirmButton =
    this.getElementById('confirm-eyesight-failure');

  tellMeSelectr =
    this.getElementById('tell-me-selector');

  submitButton =
    this.getElementByXPath('//button[span[text() = "Submit"]]');

  vehicleChecksQuestions =
    element.all(by.id('vehicle-checks-question-selector'));

  tellMeFault =
    this.getElementById('tellme-fault');

  tellMeCorrect =
    this.getElementById('tellme-correct');

  manualTransmission =
    this.getElementById('transmission-manual');

  automaticTransmission =
    this.getElementById('transmission-automatic');

  selectQuestionsButton =
    this.getElementByCss('input[value="Select questions"]');

  vehicleChecksButton =
    this.getElementById('submit-vehicle-checks');

  wRTC =
    this.getElementByXPath('//button[span[h3[text()="Continue to test report"]]]');

  confirm =
    this.getElementByXPath('//button[span[text() = "Confirm"]]');

  openConfirmCatType =
    this.getElementByXPath(`//*[@id="category-type"]/ion-col[2]/ion-row[2]/ion-col/input`);

  safetyQuestionsCorrect_14 =
    this.getElementById('safetyQuestionsCorrect_14');

  safetyQuestionsCorrect_15 =
    this.getElementById('safetyQuestionsCorrect_15');

  safetyQuestionsCorrect_16 =
    this.getElementById('safetyQuestionsCorrect_16');

  selectVehicleDetails =
    this.getElementById('configuration-rigid');

  itemCover =
    this.getElementByCss('button[ion-button="item-cover"]');

  alertInput =
    this.getElementById(`alert-input-0-3`);

  TellMeQuestion(tellMeQuestion: string) {
    return this.getElementByXPath(`//button/span/div[normalize-space(text()) = "${tellMeQuestion}"]`);
  }

  selectCatType(catType) {
    return this.getElementByXPath(`//span[contains(@class, 'bike-code') and
         normalize-space(text()) = '${catType}']`);
  }

  VehicleCheck(showMeQuestionsArray, index) {
    return this.getElementByXPath(`//button//div[normalize-space(text()) =  "${showMeQuestionsArray[0][index]}"]`);
  }

  VehicleAnswer(resultFromQuestions, index) {
    return this.getElementById(`${resultFromQuestions}_${index + 1}`);
  }
}
