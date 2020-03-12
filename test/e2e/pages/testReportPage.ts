import Page from './page';
import { browser, by, element } from 'protractor';

const buttonPadding = 30;
const request = require('request');

class TestReportPage extends Page {
  public ETA: ETA;
  public driverFaults: DriverFaults;
  public reversingDiagramModal: ReversingDiagramModal;
  public legalRequirements: LegalRequirements;
  public competency: Competency;

  constructor() {
    super();
    this.ETA = new ETA();
    this.driverFaults = new DriverFaults();
    this.reversingDiagramModal = new ReversingDiagramModal();
    this.legalRequirements = new LegalRequirements();
    this.competency = new Competency();
  }

  completeUncoupleRecouple() {
    this.longPressElementByXPath('//competency-button[contains(@class, "uncouple-recouple-tick")]');
  }

  addUncoupleRecoupleFault() {
    this.longPressElementByXPath('//uncouple-recouple//competency-button/div/div[1]');
  }

  completeManouveure(testCategory) {
    if (testCategory === 'be' || testCategory === 'c' || testCategory === 'c1') {
      this.longPressElementByXPath('//competency-button[contains(@class, "reverse-left-tick")]');
    } else {
      this.clickManoeuvresButton();
      this.clickReverseRightRadio();
      this.clickManoeuvresButton();
    }
  }

  clickReverseRightRadio() {
    this.clickElementById('manoeuvres-reverse-right-radio');
  }

  clickManoeuvresButton() {
    this.clickElementByXPath('//manoeuvres/button');
  }

  clickSeriousMode() {
    this.clickElementById('serious-button');
  }

  clickRemove() {
    this.clickElementById('remove-button');
  }

  reverseDropDown() {
    this.clickElementByXPath('//*[@id="reverse-left-label"]');
  }

  completeControlledStop() {
    this.longPressElementByXPath('//competency-button[contains(@class, "controlled-stop-tick")]');
  }

  completeShowMe() {
    this.longPressElementByXPath('//competency-button[contains(@class, "show-me-question-tick")]');
  }

  completeEco() {
    this.longPressElementByXPath('//competency-button[contains(@class, "eco-tick")]');
  }

  async getSummaryCountField() {
    const element = this.getElementById('summary-count');
    this.waitForPresenceOfElement(element);
    return element.getText();
  }

  getControlledStopTick() {
    const element =  this.getElementByCss('.controlled-stop-tick.checked');
    this.waitForPresenceOfElement(element);
    return element;
  }

  clickEndTestButton() {
    this.clickElementById('end-test-button');
  }

  clickLastEndTestButton() {
    const lastEndTestButton = element.all(by.xpath('//end-test-link/button/span[text() = "End test"]')).last();
    this.clickElement(lastEndTestButton);
  }

  clickLastExitPracticeButton() {
    const lastExitPracticeButton = element.all(by.className('exit-text')).last();
    this.clickElement(lastExitPracticeButton);
  }

  clickTerminateTestButton() {
    this.clickElementByXPath('//button/span[text() = "Terminate test"]');
  }

  endAndTerminateTest() {
    this.clickEndTestButton();
    this.clickTerminateTestButton();
  }

  clickReturnToTestButton() {
    this.clickElementByXPath('//div/legal-requirements-modal//modal-return-button//span');
  }

  clickDangerousButton() {
    this.clickElementById('dangerous-button');
  }

  clickContinueToDebriefbutton() {
    this.clickElementByXPath('//button[span[h3[text() = "Continue to debrief"]]]');
  }

  getPracticeModeBanner() {
    const element = this.getElementByClassName('practice-mode-top-banner');
    this.waitForPresenceOfElement(element);
    return element;
  }
}

class ETA extends Page {
  getETAModalTitle() {
    const element = this.getElementByClassName('modal-alert-header');
    this.waitForPresenceOfElement(element);
    return element;
  }

  closeETAModal() {
    this.clickElementByClassName('modal-return-button');
  }

  longPressETAButton(etaText) {
    this.longPressElementByXPath(`//competency-button/div/div/span[text() = '${etaText}']`);
  }
}

class DriverFaults extends Page {
  markDriverFault(faultName) {
    this.longPressElementByXPath(`//manoeuvre-competency/div/span[text() = '${faultName}']`);
  }

  getDrivingFaults(driverBadge) {
    return driverBadge.getAttribute('ng-reflect-count');
  }

  addShowMeTellMeDriverFault() {
    this.longPressElementByClassName('vehicle-check-competency');
  }

  addControlledStopDriverFault() {
    this.longPressElementByClassName('controlled-stop-competency');
  }

  getSeriousFaultBadgeForVehicleChecks() {
    const element = this.getElementByXPath('//vehicle-checks//serious-fault-badge//span');
    this.waitForPresenceOfElement(element);
    return element;
  }

  getSeriousFaultBadge(competency) {
    const element =  this.getElementByXPath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/div/serious-fault-badge//span[@class = 'label']`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getSeriousFaultBadgeByTagName(button) {
    return button.element(by.tagName('serious-fault-badge'));
  }

  getDangerousFaultBadge(competency) {
    return this.getElementByXPath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/div/dangerous-fault-badge//span[@class = 'label']`);
  }

  getCompetencyCountField(competency) {
    const element = this.getElementByXPath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/driving-faults-badge//span[@class = 'count']`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getDriverBadge(competency) {
    const element = this.getElementByXPath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/driving-faults-badge`);
    this.waitForPresenceOfElement(element);
    return element;
  }
}

class ReversingDiagramModal extends Page {
  getReversingDiagramModalTitle() {
    const element = this.getElementByXPath('//reverse-diagram-modal-cat-c//div[2]');
    this.waitForPresenceOfElement(element);
    return element;
  }

  closeReversingDialogModal() {
    this.clickElementByXPath('//*[@id="closeReverseDiagramModal"]/span/ion-icon');
  }

  openReversingDiagramModal() {
    this.clickElementByXPath('//*[@id="reverse-diagram-link"]/span');
  }
}

class LegalRequirements extends Page {

  getLegalRequrementsPopup() {
    const element = this.getElementByXPath('//div/legal-requirements-modal');
    this.waitForPresenceOfElement(element);
    return element;
  }

  getLegalRequirement(legalRequirement) {
    const element = this.getElementByXPath(`//legal-requirements-modal//div//ul/li[text() = '${legalRequirement}']`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getLegalRequirements() {
    return element.all(by.xpath('//legal-requirement/competency-button[@class="legal-button"]'));
  }

  completeLegalRequirements() {
    const legalRequirements = this.getLegalRequirements();
    legalRequirements.each((legalRequirement) => {
      this.longPressButton(legalRequirement);
    });
  }
}

class Competency extends Page {
  /**
   * Clicks the competency to add a fault or remove where the relevant S/D/Remove has been selected in advance.
   * Note: not for use with driver faults as this requires a long press
   * @param competency The competency to add the fault to
   */
  clickCompetency(competency) {
    browser.getProcessedConfig().then((config) => {
      browser.driver.getSession().then((session) => {
        const competencyButton = this.getCompetencyButton(competency);
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

  getCompetencyButton(competency: string) {
    const element = this.getElementByXPath(`//competency-button/div/span[text() = '${competency}']`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  longPressCompetency (competency: string) {
    const competencyButton = this.getCompetencyButton(competency);
    this.longPressButton(competencyButton);
  }
}

export default new TestReportPage();
