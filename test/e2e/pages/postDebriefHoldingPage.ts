import BasePage from './basePage';

class PostDebriefHoldingPage extends BasePage {
  isCurrentPage(testCategory) {
    // No page title so need to check something else exists that exists on the page
    const postDebriefHoldingPage = this.getElementById(`post-debrief-holding-cat-${testCategory}-page`);
    return this.waitForPresenceOfElement(postDebriefHoldingPage);
  }

  clickContinueToNonPassFinalisationButton() {
    this.clickElementById('continue-to-non-pass-finalisation');
  }
}

export default new PostDebriefHoldingPage();
