import { Page } from '../../utilities/page';
import { PostDebriefHoldingPageObject } from './postDebriefHoldingPage.po';

export class PostDebriefHoldingPage extends Page {

  postDebriefHoldingPageElement: PostDebriefHoldingPageObject = new PostDebriefHoldingPageObject();

  /**
   * No page title so need to check something else exists that exists on the page
   * @param testCategory
   */

  async clickContinueToNonPassFinalisationButton() {
    await this.clickElement(this.postDebriefHoldingPageElement.continueToNonPassFinalisationButton);
  }
}
