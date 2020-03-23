import Page from './page';

class PostDebriefHoldingPage extends Page {
  isCurrentPage(testCategory) {
    // No page title so need to check something else exists that exists on the page
    const selector = `post-debrief-holding-cat-${testCategory}-page`;
    const postDebriefHoldingPage = this.getElementById(selector);
    return this.waitForPresenceOfElement(postDebriefHoldingPage, selector);
  }

  clickContinueToNonPassFinalisationButton() {
    this.clickElementById('continue-to-non-pass-finalisation');
  }
}

export default new PostDebriefHoldingPage();
