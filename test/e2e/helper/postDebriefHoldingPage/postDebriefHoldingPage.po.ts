import Page from '../../utilities/page';

export class PostDebriefHoldingPageObject extends Page {

  continueToNonPassFinalisationButton =
    this.getElementById('continue-to-non-pass-finalisation');

  isCurrentPage(testCategory) {
    return this.getElementById(`post-debrief-holding-cat-${testCategory}-page`);
  }
}
