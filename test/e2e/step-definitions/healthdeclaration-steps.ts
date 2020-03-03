import { When, Then, Before } from 'cucumber';
import HealthDeclarationPage from '../pages/healthDeclarationPage';

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
  HealthDeclarationPage.clickHealthDeclarationCheckbox();
  HealthDeclarationPage.clickReceiptDeclarationCheckbox();
  HealthDeclarationPage.clickHealthSignatureField(this.testCategory);
  HealthDeclarationPage.confirmHealthDeclaration(this.testCategory);
  HealthDeclarationPage.enterPasscode();
});
