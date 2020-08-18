import { When, Then, Before } from 'cucumber';
import HealthDeclarationPage from '../pages/healthDeclarationPage';
import PageHelper from '../pages/pageHelper';

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

Before({ tags: '@catc1e' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catce' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@cata' }, () => {
  this.testCategory = 'a-mod1';
});

Before({ tags: '@catm2' }, () => {
  this.testCategory = 'a-mod2';
});

Before({ tags: '@catd' }, () => {
  this.testCategory = 'd';
});

Before({ tags: '@catHome' }, () => {
  this.testCategory = 'home-test';
});

Before({ tags: '@catADI2' }, () => {
  this.testCategory = 'adi-part2';
});

Before({ tags: '@catcpc' }, () => {
  this.testCategory = 'cpc';
});

Then('the pass certificate number should be {string}', (certificateNumber) => {
  const passCertificateNumber = HealthDeclarationPage.getPassCertificateNumber();
  passCertificateNumber.getText().then((textValue) => {
    expect(textValue.trim().endsWith(`: ${certificateNumber}`)).to.be.true;
  });
});

When('I try to confirm the health declaration', () => {
  HealthDeclarationPage.confirmHealthDeclaration(this.testCategory);
});

When('I complete the health declaration', () => {
  if (this.testCategory !== 'cpc') {
    HealthDeclarationPage.clickHealthDeclarationCheckbox();
  }
  HealthDeclarationPage.clickReceiptDeclarationCheckbox();
  HealthDeclarationPage.clickHealthSignatureField(this.testCategory);
  HealthDeclarationPage.confirmHealthDeclaration(this.testCategory);
  PageHelper.enterPasscode();
});
