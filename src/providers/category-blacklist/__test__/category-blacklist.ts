import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryBlackListProvider {
  /**
   * Function to check if the passed in Category exists in the category blacklist
   * @param category
   */
  isBlackListed(category: TestCategory, blackList: TestCategory[]): boolean {
    return blackList.some((cat) => {
      return cat === category;
    });
  }
}
