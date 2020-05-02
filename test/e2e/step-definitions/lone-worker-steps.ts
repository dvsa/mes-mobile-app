import { Then, When, Before } from 'cucumber';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

//Set default category to be cat b
this.testCategory = 'b';

When('I click the SOS button on the Test Report', () => {

});

Then('I click the SOS button on the Test Report', () => {

});

Then('I click and hold the {string} alert button', (incident: string) => {

});

When('I see the incident has been sent', () => {

});

When('I close the create incident modal', () => {

});

When('I can see the incident sent icon on the test report page', () => {

});

When('the SOS button is not present', () => {

});
