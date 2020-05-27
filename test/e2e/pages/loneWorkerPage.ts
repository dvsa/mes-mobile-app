import Page from './page';
import { browser, element, by, ExpectedConditions } from 'protractor';
import { TEST_CONFIG } from '../test.config';
import { number } from '@hapi/joi';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const request = require('request');

class LoneWorker extends Page {

  raiseAlert(incident: string) {
    this.longPressElementByClassName(`${incident}`, 4000);
    this.acceptLocationModal();
  }

  loneWorkerModal() {
    const alertModal = element(by.xpath('/html/body/ion-app/ion-modal/div/lw-raise-alert-modal'));
    expect(alertModal.isPresent()).to.eventually.be.true;
  }

  acceptLocationModal() {
    ExpectedConditions.alertIsPresent();
    const alert = browser.driver.switchTo().alert();
    alert.accept();
  }

  closeTheIncidentModlal() {
    this.clickElementByXPath('//lw-raise-alert-modal/ion-header/ion-navbar/ion-buttons/button');
  }

  incidentStatus(status: string) {
    browser.driver.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
    this.assertTextIsPresentInASingleElement('//ion-header/ion-navbar/ion-buttons[1]/lw-sos-button/div/button[2]',
    status);
  }

  loneWorkerIncidentModalText() {
    this.assertTextIsPresentInASingleElement('//lw-raise-alert-modal/ion-header/ion-navbar/div[2]/ion-title/div',
    'Send an alert');
  }

  sosButtonIsNotPresent() {
    const sosButton =  element(by.xpath('//ion-header/ion-navbar/ion-buttons[1]/lw-sos-button/div/button'))
    expect(sosButton.isPresent()).to.eventually.be.false;
  }
}

export default new LoneWorker();
