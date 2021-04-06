import { Page } from '../../utilities/page';
import {browser} from 'protractor';

import {
  BikeControlStopsObject,
  CompetencyObject,
  DriverFaultsObject,
  ETAObject,
  LegalRequirementsObject,
  ReversingDiagramModalObject,
  TestReportPageObject,
} from './testReportPage.po';
import { TEST_CONFIG } from '../../test.config';

const buttonPadding = 30;
const request = require('request');

export class TestReportPage extends Page {
  testReportPageElement: TestReportPageObject = new TestReportPageObject();
  public ETA: ETA;
  public driverFaults: DriverFaults;
  public reversingDiagramModal: ReversingDiagramModal;
  public legalRequirements: LegalRequirements;
  public competency: Competency;
  public bikeControlStops: BikeControlStops;

  constructor() {
    super();
    this.ETA = new ETA();
    this.driverFaults = new DriverFaults();
    this.reversingDiagramModal = new ReversingDiagramModal();
    this.legalRequirements = new LegalRequirements();
    this.competency = new Competency();
    this.bikeControlStops = new BikeControlStops();

  }

  async clickCPCModuleAssessmentCheckBox(resultNumber) {
    const checkBox = this.getElementById(`answer${resultNumber}`);
    await checkBox.click();
  }

  async clickNextQuestion() {
    await this.testReportPageElement.nextButton.click();
  }

  async clickViewTestSummary() {
    await this.testReportPageElement.viewTestSummary.click();
  }

  async completeUncoupleRecouple() {
    await this.longPressElement(this.testReportPageElement.completeUncoupleRecouple);
  }

  async completeHomeTestCodeSafety() {
    await this.longPressElement(this.testReportPageElement.completeHomeTestCodeSafety);
  }

  async completeAdi2SMTM() {
    await this.longPressElement(this.testReportPageElement.completeAdi2SMTM);
  }

  async completeHomeTestControlledStop() {
    await this.longPressElement(this.testReportPageElement.completeHomeTestControlledStop);
  }

  async addUncoupleRecoupleFault() {
    await this.longPressElement(this.testReportPageElement.addUncoupleRecoupleFault);
  }

  async completeManouveure(testCategory) {
    if (testCategory === 'be' || testCategory === 'c' || testCategory === 'c1' || testCategory === 'ce' || testCategory === 'd' || testCategory === 'home-test') {
      await this.longPressElement(this.testReportPageElement.competencyButton);
    } else if (testCategory === 'adi-part2') {
      await this.clickManoeuvresButtonForAdi2();
      await this.clickReverseRightRadioAdi2();
      await this.clickReverseParkRadio();
      await this.clickManoeuvresButtonForAdi2();
    } else {
      await this.clickManoeuvresButton();
      await this.clickReverseRightRadio();
      await this.clickManoeuvresButton();
    }
  }

  async clickReverseRightRadio() {
    await this.clickElement(this.testReportPageElement.reverseRightRadio);
  }

  async clickReverseRightRadioAdi2() {
    await this.clickElement(this.testReportPageElement.reverseRightRadioAdi2);
  }

  async clickReverseParkRadio() {
    await this.clickElement(this.testReportPageElement.reverseParkRadio);
  }

  async clickManoeuvresButton() {
    await this.clickElement(this.testReportPageElement.manoeuvresButton);
  }

  async clickManoeuvresButtonForAdi2() {
    await this.clickElement(this.testReportPageElement.manoeuvresButtonForAdi2);
  }

  async clickSeriousMode() {
    await this.clickElement(this.testReportPageElement.seriousMode);
  }

  async clickRemove() {
    await this.clickElement(this.testReportPageElement.remove);
  }

  async reverseDropDown() {
    await this.clickElement(this.testReportPageElement.reverseDropDown);
  }

  async completeControlledStop() {
    await this.longPressElement(this.testReportPageElement.completeControlledStop);
  }

  async completeShowMe() {
    await this.longPressElement(this.testReportPageElement.completeShowMe);
  }

  async completeEco() {
    await this.longPressElement(this.testReportPageElement.completeEco);
  }

  async clickEndTestButton() {
    await this.clickElement(this.testReportPageElement.endTestButton);
  }

  async clickEndTestButtonSpeedRequirements() {
    await this.clickElement(this.testReportPageElement.endTestButtonSpeedRequirements);
  }

  async clickLastEndTestButton() {
    await this.clickElement(this.testReportPageElement.lastEndTestButton.last());
  }

  async clickLastExitPracticeButton() {
    await this.clickElement(this.testReportPageElement.lastExitPracticeButton.last());
  }

  async clickTerminateTestButton() {
    await this.clickElement(this.testReportPageElement.terminateTestButton);
  }

  async clickReturnToTestButton() {
    await this.clickElement(this.testReportPageElement.returnToTestButton);
  }

  async clickDangerousButton() {
    await this.clickElement(this.testReportPageElement.dangerousButton);
  }

  async waitForTerminateButton() {
    this.getElementByXPath('//button/span[contains(text(),"Terminate test")]');
    await browser.driver.sleep(TEST_CONFIG.ACTION_WAIT);
  }

  async clickContinueToDebriefbutton() {
    await this.clickElement(this.testReportPageElement.continueToDebriefbutton);
  }

  async emergencyStopClick() {
    await this.testReportPageElement.emergencyStop.sendKeys('55');
  }

  async avoidenceStopClick() {
    await this.testReportPageElement.avoidencyStop.sendKeys('66');
  }
}

export class ETA extends Page {

  eTAElement: ETAObject = new ETAObject();

  async closeETAModal() {
    await this.clickElement(this.eTAElement.eTAModal);
  }

  async longPressETAButton(etaText) {
    await this.longPressElement(this.eTAElement.ETAButton(etaText));
  }
}

export class DriverFaults extends Page {
  driverFaultsElement: DriverFaultsObject = new DriverFaultsObject();

  async markDriverFault(faultName) {
    await this.longPressElement(this.driverFaultsElement.markDriverFault(faultName));
  }

  getDrivingFaults(driverBadge) {
    return driverBadge.getAttribute('ng-reflect-count');
  }

  async addShowMeTellMeDriverFault() {
    await this.longPressElement(this.driverFaultsElement.showMeTellMeDriverFault);
  }

  async addControlledStopDriverFault() {
    await this.longPressElement(this.driverFaultsElement.controlledStopDriverFault);
  }
}

export class ReversingDiagramModal extends Page {
  reversingDiagramModelElement: ReversingDiagramModalObject = new ReversingDiagramModalObject();

  async closeReversingDialogModal() {
    await this.clickElement(this.reversingDiagramModelElement.closeReversingDialogModal);
  }

  async openReversingDiagramModal() {
    await this.clickElement(this.reversingDiagramModelElement.openReversingDiagramModal);
  }
}

export class LegalRequirements extends Page {

  legalRequirementsElement: LegalRequirementsObject = new LegalRequirementsObject();

  completeLegalRequirements() {
    const legalRequirements = this.legalRequirementsElement.legalRequirements;
    legalRequirements.each(async (legalRequirement) => {
      await this.longPressButton(legalRequirement);
    });
  }

  async completeLegalRequirementsForCategoryD() {
    await this.longPressButton(this.getElementById('BS'));
    await this.longPressButton(this.getElementById('BS'));
    await this.longPressButton(this.getElementById('NS'));
    await this.longPressButton(this.getElementById('NS'));
    await this.completeLegalRequirements();
  }
}

export class Competency extends Page {
  competencyElement: CompetencyObject = new CompetencyObject();

  /**
   * Clicks the competency to add a fault or remove where the relevant S/D/Remove has been selected in advance.
   * Note: not for use with driver faults as this requires a long press
   * @param competency The competency to add the fault to
   */
  clickCompetency(competency) {
    browser.getProcessedConfig().then((config) => {
      browser.driver.getSession().then((session) => {
        const competencyButton = this.competencyElement.CompetencyButton(competency);
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
          }, (error) => {
            if (error) {
              console.error(error);
              return;
            }
          });
        });
      });
    });
  }

  async longPressCompetency(competency: string) {
    await this.longPressButton(this.competencyElement.CompetencyButton(competency));
  }
}

export class BikeControlStops extends Page {

  bikeControlStopsElement: BikeControlStopsObject = new BikeControlStopsObject();

  async enterEmergencyStopFirstValue(firstValue: string) {
    await this.bikeControlStopsElement.firstElement.sendKeys(firstValue);
  }

  async enterEmergencyStopSecondValue(secondValue: string) {
    await this.bikeControlStopsElement.secondElement.sendKeys(secondValue);
  }

  async enterAvoidanceStopFirstValue(firstValue: string) {
    await this.bikeControlStopsElement.firstAvoidanveElement.sendKeys(firstValue);
  }

  async enterAvoidanceStopSecondValue(secondValue: string) {
    await this.bikeControlStopsElement.secondAvoidanceElement.sendKeys(secondValue);
  }

  async clickAvoidanceMetCondition() {
    await this.bikeControlStopsElement.competencyButton.click();
  }
}
