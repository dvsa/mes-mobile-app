import { Then, When } from 'cucumber';
import { BackToOfficePage } from '../helper/backToOfficePage/backToOfficePage';
import { BackToOfficePageObject } from '../helper/backToOfficePage/backToOfficePage.po';

const backToOfficePageElement: BackToOfficePageObject = new BackToOfficePageObject();
const backToOfficePage: BackToOfficePage = new BackToOfficePage();

Then('I am on the back to office page', async () => {
  // todo:do we need to return this?  What is picking it up?
  // todo what happens if it isn't the current page?
  // @ts-ignore
  return await backToOfficePageElement.isCurrentPage();
});

When('I continue to the office write up', async () => {
  await backToOfficePage.clickContinueToWriteUpButton();
});
