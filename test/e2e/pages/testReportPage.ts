import Page from './page';
import TempPage from './tempPage';
import { browser, by } from 'protractor';

const buttonPadding = 30;
const request = require('request');

class TestReportPage extends Page {
  /**
   * Performs the long press action on the competency to add a driver fault.
   * The long press does not appear to have been implemented so calling appiums touch perform action directly.
   * @param driverFault The competency to apply the driver fault to
   */
  longPressButton(button) {
    browser.getProcessedConfig().then((config) => {
      browser.driver.getSession().then((session) => {
        button.getLocation().then((buttonLocation) => {
          request.post(`${config.seleniumAddress}/session/${session.getId()}/touch/perform`, {
            json: {
              actions: [
                {
                  action: 'longPress',
                  options: {
                    x: Math.ceil(buttonLocation.x) + buttonPadding,
                    y: Math.ceil(buttonLocation.y) + buttonPadding,
                  },
                },
                {
                  action: 'release',
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

  longPressElementByXPath(xpath) {
    const element = this.getElementByXPath(xpath);
    this.waitForPresenceOfElement(element);
    this.longPressButton(element);
  }

  completeUncoupleRecouple () {
    this.longPressElementByXPath('//competency-button[contains(@class, "uncouple-recouple-tick")]');
  }

  completeManouveure(testCategory) {
    if (testCategory === 'be' || testCategory === 'c' || testCategory === 'c1') {
      this.longPressElementByXPath('//competency-button[contains(@class, "reverse-left-tick")]');
    } else {
      const manoeuvresButton = TempPage.getAndAwaitElement(by.xpath('//manoeuvres/button'));
      TempPage.clickElement(manoeuvresButton);
      const reverseRightRadio = TempPage.getAndAwaitElement(by.id('manoeuvres-reverse-right-radio'));
      TempPage.clickElement(reverseRightRadio);
      TempPage.clickElement(manoeuvresButton);
    }
  }
}
export default new TestReportPage();
