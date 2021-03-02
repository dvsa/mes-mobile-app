import { Page } from '../../utilities/page';
import { by, element } from 'protractor';

export class TestReportPageObject extends Page {

  nextButton =
    this.getElementById(`next-page-button`);

  viewTestSummary =
    this.getElementById(`view-summary-button`);

  completeUncoupleRecouple =
    this.getElementByXPath('//competency-button[contains(@class, "uncouple-recouple-tick")]');

  completeHomeTestCodeSafety =
    this.getElementByCss('.highway-code-safety-tick');

  completeAdi2SMTM =
    this.getElementByXPath('//competency-button[contains(@class, "show-me-question-tick")]');

  completeHomeTestControlledStop =
    this.getElementByCss('.controlled-stop-tick');

  addUncoupleRecoupleFault =
    this.getElementByXPath('//uncouple-recouple//competency-button/div/div[1]');

  competencyButton =
    this.getElementByXPath('//competency-button[contains(@class, "reverse-left-tick")]');

  reverseRightRadio =
    this.getElementById('manoeuvres-reverse-right-radio');

  reverseRightRadioAdi2 =
    this.getElementById('manoeuvres-reverse-right-radio1');

  reverseParkRadio =
    this.getElementById('manoeuvres-reverse-park-road-radio2');

  manoeuvresButton =
    this.getElementByXPath('//manoeuvres/button');

  manoeuvresButtonForAdi2 =
    this.getElementByCss('ion-icon[name="md-arrow-dropright"]');

  seriousMode =
    this.getElementById('serious-button');

  remove =
    this.getElementById('remove-button');

  reverseDropDown =
    this.getElementByXPath('//*[@id="reverse-left-label"]');

  completeControlledStop =
    this.getElementByXPath('//competency-button[contains(@class, "controlled-stop-tick")]');

  completeShowMe =
    this.getElementByXPath('//competency-button[contains(@class, "show-me-question-tick")]');

  completeEco =
    this.getElementByXPath('//competency-button[contains(@class, "eco-tick")]');

  // tslint:disable-next-line:variable-name
  summaryCountField =
    this.getElementById('summary-count');

  getControlledStopTick =
    this.getElementByCss('.controlled-stop-tick.checked');

  endTestButton =
    this.getElementById('end-test-button');

  endTestButtonSpeedRequirements =
    this.getElementByClassName('end-test-button');

  lastEndTestButton =
    element.all(by.xpath('//end-test-link/button/span[text() = "End test"]'));

  lastExitPracticeButton =
    element.all(by.className('exit-text'));

  terminateTestButton =
    this.getElementByXPath('//button/span[text() = "Terminate test"]');

  returnToTestButton =
    this.getElementByXPath('//div/legal-requirements-modal//modal-return-button//span');

  dangerousButton =
    this.getElementById('dangerous-button');

  continueToDebriefbutton =
    this.getElementByXPath('//button[span[h3[text() = "Continue to debrief"]]]');

  practiceModeBanner =
    this.getElementByClassName('practice-mode-top-banner');

  emergencyStop =
    this.getElementByXPath('/html/body/ion-app/ng-component/ion-nav/div[2]/ion-content/' +
      'div[2]/ion-grid/speed-check[1]/ion-row[1]/ion-col[2]/input[1]');

  avoidencyStop =
    this.getElementByXPath('/html/body/ion-app/ng-component/ion-nav/div[2]/ion-content/' +
      'div[2]/ion-grid/speed-check[2]/ion-row[1]/ion-col[2]/input[1]');

}

export class ETAObject extends Page {
  getETAModalTitle =
    this.getElementByClassName('modal-alert-header');

  eTAModal =
    this.getElementByClassName('modal-return-button');

  // tslint:disable-next-line:function-name
  ETAButton(etaText) {
    return this.getElementByXPath(`//competency-button/div/div/span[text() = '${etaText}']`);
  }
}

export class DriverFaultsObject extends Page {

  showMeTellMeDriverFault =
    this.getElementByClassName('vehicle-check-competency');
  controlledStopDriverFault =
    this.getElementByClassName('controlled-stop-competency');
  seriousFaultBadgeForVehicleChecks =
    this.getElementByXPath('//vehicle-checks//serious-fault-badge//span');

  markDriverFault(faultName: string) {
    return this.getElementByXPath(`//manoeuvre-competency/div/span[text() = '${faultName}']`);
  }

  // tslint:disable-next-line:function-name
  SeriousFaultBadge(competency: string) {
    return this.getElementByXPath(`//competency-button[div/*[@class = 'competency-label'
      and text() = '${competency}']]/div/div/serious-fault-badge//span[@class = 'label']`);
  }

  // tslint:disable-next-line:function-name
  SeriousFaultBadgeByTagName(button: any) {
    return button.element(by.tagName('serious-fault-badge'));
  }

  // tslint:disable-next-line:function-name
  DangerousFaultBadge(competency: string) {
    return this.getElementByXPath(`//competency-button[div/*[@class = 'competency-label'
      and text() = '${competency}']]/div/div/dangerous-fault-badge//span[@class = 'label']`);
  }

  // tslint:disable-next-line:function-name
  CompetencyCountField(competency: string) {
    return this.getElementByXPath(`//competency-button[div/*[@class = 'competency-label'
      and text() = '${competency}']]/div/driving-faults-badge//span[@class = 'count']`);
  }

  // tslint:disable-next-line:function-name
  CompetencyCountFieldForSMTM(competency: string) {
    return this.getElementByXPath(`//competency-button[div/*[@class = 'show-me-tell-me-label'
      and text() = '${competency}']]/div/driving-faults-badge//span[@class = 'count']`);
  }

  // tslint:disable-next-line:function-name
  DriverBadge(competency: string) {
    return this.getElementByXPath(`//competency-button[div/*[@class = 'competency-label'
      and text() = '${competency}']]/div/driving-faults-badge`);
  }
}

export class ReversingDiagramModalObject extends Page {
  reversingDiagramModalTitle =
    this.getElementByXPath('//reverse-diagram-modal//div[2]');

  closeReversingDialogModal =
    this.getElementByXPath('//*[@id="closeReverseDiagramModal"]/span/ion-icon');

  openReversingDiagramModal =
    this.getElementByXPath('//*[@id="reverse-diagram-link"]/span');
}

export class LegalRequirementsObject extends Page {

  legalRequrementsPopup =
    this.getElementByXPath('//div/legal-requirements-modal');
  legalRequirements =
    element.all(by.xpath('//legal-requirement/competency-button[@class="legal-button"]'));

  // tslint:disable-next-line:function-name
  LegalRequirement(legalRequirement) {
    return this.getElementByXPath(`//legal-requirements-modal//div//ul/li[text() = '${legalRequirement}']`);
  }
}

export class CompetencyObject extends Page {

  // tslint:disable-next-line:function-name
  CompetencyButton(competency: string) {
    return this.getElementByXPath(`//competency-button/div/span[text() = '${competency}']`);
  }
}

export class BikeControlStopsObject extends Page {
  firstElement =
    this.getElementById('speedCheckEmergencyFirstAttempt');

  secondElement =
    this.getElementById('speedCheckEmergencySecondAttempt');

  firstAvoidanveElement =
    this.getElementById('speedCheckAvoidanceFirstAttempt');

  secondAvoidanceElement =
    this.getElementById('speedCheckAvoidanceSecondAttempt');

  competencyButton =
    this.getElementByXPath(`//span[@id="speedCheckAvoidanceMet"]`);

  getCompetencyButton(competency: string) {
    return this.getElementByXPath(`//competency-button/div/span[@id='${competency}']`);
  }
}
