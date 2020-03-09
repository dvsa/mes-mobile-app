import {
  CatCManoeuvres, CatCTestData,
  getManoeuvres as getManoeuvresC,
} from '../../modules/tests/test-data/cat-c/test-data.cat-c.selector';
import {
  CatDManoeuvres, CatDTestData,
  getManoeuvres as getManoeuvresD,
} from '../../modules/tests/test-data/cat-d/test-data.cat-d.selector';
import { getManoeuvres as getManoeuvresBE } from '../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Injectable } from '@angular/core';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { getManoeuvresADI2 } from '../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.selector';

export type TestDataUnion =
  | CatADI2UniqueTypes.TestData
  | CatBUniqueTypes.TestData
  | CatBEUniqueTypes.TestData
  | CatCTestData
  | CatDTestData;

export type ManoeuvreUnion =
  | CatADI2UniqueTypes.Manoeuvres[]
  | CatBEUniqueTypes.Manoeuvres
  | CatCManoeuvres
  | CatDManoeuvres;

@Injectable()
export class ManoeuvresByCategoryProvider {

  static getManoeuvresByCategoryCodeErrMsg: string = 'Error getting test category manoeuvres';

  public getManoeuvresByCategoryCode(category: CategoryCode): (testData: TestDataUnion) => ManoeuvreUnion {
    switch (category) {
      case TestCategory.ADI2: return getManoeuvresADI2;
      case TestCategory.BE: return getManoeuvresBE;
      case TestCategory.C:
      case TestCategory.C1:
      case TestCategory.CE:
      case TestCategory.C1E: return getManoeuvresC;
      case TestCategory.D:
      case TestCategory.D1:
      case TestCategory.DE:
      case TestCategory.D1E: return getManoeuvresD;
      default: throw new Error(ManoeuvresByCategoryProvider.getManoeuvresByCategoryCodeErrMsg);
    }
  }
}
