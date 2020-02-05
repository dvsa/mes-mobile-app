import { Injectable } from '@angular/core';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { getTestData as getTestDataC } from '../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import { getTestData as getTestDataC1 } from '../../modules/tests/test-data/cat-c/test-data.cat-c1.reducer';
import { getTestData as getTestDataCE } from '../../modules/tests/test-data/cat-c/test-data.cat-ce.reducer';
import { getTestData as getTestDataC1E } from '../../modules/tests/test-data/cat-c/test-data.cat-c1e.reducer';
import { getTestData as getTestDataCatBE } from '../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';
import { getTestData as getTestDataCatD } from '../../modules/tests/test-data/cat-d/test-data.cat-d.reducer';
@Injectable()
export class TestDataByCategoryProvider {

  static getTestDataByCategoryCodeErrMsg: string = 'Error getting test category';

  public getTestDataByCategoryCode(category: CategoryCode) {
    switch (category) {
      case TestCategory.BE: return getTestDataCatBE;
      case TestCategory.C: return getTestDataC;
      case TestCategory.C1: return getTestDataC1;
      case TestCategory.CE: return getTestDataCE;
      case TestCategory.C1E: return getTestDataC1E;
      case TestCategory.D: return getTestDataCatD;
      default: throw new Error(TestDataByCategoryProvider.getTestDataByCategoryCodeErrMsg);
    }
  }
}
