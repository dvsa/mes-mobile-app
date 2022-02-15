import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryWhiteListProvider {
  /**
   * Function to check if the passed in Category exists in the category whitelist
   * @param category
   * @param whitelist
   */
  isWhiteListed(category: TestCategory, whitelist: TestCategory[]): boolean {
    return whitelist.some((cat) => {
      return cat === category;
    });
  }
}
