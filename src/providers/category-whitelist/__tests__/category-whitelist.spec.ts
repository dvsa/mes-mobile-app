import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { CategoryWhiteListProvider } from '../category-whitelist';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('CategoryWhiteListProvider', () => {
  let categoryWhitelistProvider: CategoryWhiteListProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryWhiteListProvider,
      ],
    });
  });

  beforeEach(() => {
    categoryWhitelistProvider = TestBed.get(CategoryWhiteListProvider);
  });

  describe('isWhiteListed', () => {
    it('should return true if category in whitelist',  () => {
      const outcome = categoryWhitelistProvider.isWhiteListed(TestCategory.B);
      expect(outcome).toEqual(true);
    });

    it('should return false if category in whitelist',  () => {
      const outcome = categoryWhitelistProvider.isWhiteListed(TestCategory.C);
      expect(outcome).toEqual(true);
    });
  });

});
