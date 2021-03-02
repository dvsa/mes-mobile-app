import { Then, When, Before } from 'cucumber';
import { PostDebriefHoldingPage } from '../helper/postDebriefHoldingPage/postDebriefHoldingPage';
import { PostDebriefHoldingPageObject } from '../helper/postDebriefHoldingPage/postDebriefHoldingPage.po';

const postDebriefHoldingPage : PostDebriefHoldingPage = new PostDebriefHoldingPage();
const postDebriefHoldingPageElement : PostDebriefHoldingPageObject = new PostDebriefHoldingPageObject;

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

Then('I am on the post debrief holding page', () => {
  // No page title so need to check something else exists that exists on the page
  return postDebriefHoldingPageElement.isCurrentPage(this.testCategory);
});

When('I continue to the non pass finalisation page', async () => {
  await postDebriefHoldingPage.clickContinueToNonPassFinalisationButton();
});
