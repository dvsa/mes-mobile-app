import { Injectable } from '@angular/core';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { getTestData as getTestDataC } from '../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import { getTestData as getTestDataC1 } from '../../modules/tests/test-data/cat-c/test-data.cat-c1.reducer';
import { getTestData as getTestDataCE } from '../../modules/tests/test-data/cat-c/test-data.cat-ce.reducer';
import { getTestData as getTestDataC1E } from '../../modules/tests/test-data/cat-c/test-data.cat-c1e.reducer';

@Injectable()
export class TestDataByCategoryProvider {
  public getTestDataByCategoryCode(category: CategoryCode) {
    switch (category) {
      case TestCategory.C: return getTestDataC;
      case TestCategory.C1: return getTestDataC1;
      case TestCategory.CE: return getTestDataCE;
      case TestCategory.C1E: return getTestDataC1E;
      default: return getTestDataC;
    }
  }
}
