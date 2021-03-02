import { When, Then, Before } from 'cucumber';
import { HealthDeclarationPage } from '../helper/healthDeclarationPage/healthDeclaration';
import { HealthDeclarationObject } from '../helper/healthDeclarationPage/healthDeclarationPage.po';
import { PageHelper } from '../helper/PageHelper/pageHelper';

const healthDeclarationPage : HealthDeclarationPage  = new HealthDeclarationPage();
const healthDeclarationPageElement : HealthDeclarationObject = new HealthDeclarationObject();
const pageHelper : PageHelper = new PageHelper();

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
  const passCertificateNumber = healthDeclarationPageElement.passCertificateNumber;
  passCertificateNumber.getText().then((textValue) => {
    expect(textValue.trim().endsWith(`: ${certificateNumber}`)).to.be.true;
  });
});

When('I try to confirm the health declaration', async () => {
  await healthDeclarationPage.confirmHealthDeclaration(this.testCategory);
});

When('I complete the health declaration', async () => {
  if (this.testCategory !== 'cpc') {
    await healthDeclarationPage.clickHealthDeclarationCheckbox();
  }
  await healthDeclarationPage.clickReceiptDeclarationCheckbox();
  await healthDeclarationPage.clickHealthSignatureField(this.testCategory);
  await healthDeclarationPage.confirmHealthDeclaration(this.testCategory);
  await pageHelper.enterPasscode();
});
