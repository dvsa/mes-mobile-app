import { Then, When } from 'cucumber';
import { BackToOfficePage } from '../pages/backToOfficePage';

const backToOfficePage: BackToOfficePage = new BackToOfficePage();
Then('I am on the back to office page', () => {
  // todo:do we need to return this?  What is picking it up?
  // todo what happens if it isn't the current page?
 // return backToOfficePage.isCurrentPage();
});

When('I continue to the office write up', () => {
  backToOfficePage.clickContinueToWriteUpButton();
});
