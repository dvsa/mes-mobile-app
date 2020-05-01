import { Then, When, Before } from 'cucumber';
import WaitingRoomPage from '../pages/waitingRoomPage';
import PageHelper from '../pages/pageHelper';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

//Set default category to be cat b
this.testCategory = 'b';

When('the candidate enters a new email address', () => {
  WaitingRoomPage.clickNewEmailRadioButton();
  WaitingRoomPage.enterNewEmail('testemail@example.com');
});

