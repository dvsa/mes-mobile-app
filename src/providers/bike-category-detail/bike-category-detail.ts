import { Injectable } from '@angular/core';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { BikeCategoryDetail, BikeTestType } from './bike-category-detail.model';
//import bikeCategoryConstants from '../../shared/constants/bike-category-details/bike-category-details';
const bikeCategoryConstants: BikeCategoryDetail[] = [
  {
    testType: 'MOD1',
    categoryCode: 'EUA1M1',
    displayId: 'A1',
    displayName: 'Motorcycle',
    imageUrl: 'assets/imgs/bike-category-icons/A1.png'
  },
  {
    testType: 'MOD1',
    categoryCode: 'EUA2M1',
    displayId: 'A2',
    displayName: 'Motorcycle',
    imageUrl: 'assets/imgs/bike-category-icons/A2.png'
  },
  {
    testType: 'MOD1',
    categoryCode: 'EUAM1',
    displayId: 'A',
    displayName: 'Motorcycle',
    imageUrl: 'assets/imgs/bike-category-icons/A.png'
  },
  {
    testType: 'MOD1',
    categoryCode: 'EUAMM1',
    displayId: 'AM',
    displayName: 'Moped',
    imageUrl: 'assets/imgs/bike-category-icons/AM.png'
  },
];

@Injectable()
export class BikeCategoryDetailProvider {


  public getBikeDetail(category: CategoryCode): BikeCategoryDetail {
    return bikeCategoryConstants.find(item => item.categoryCode === category);
  }

  public getCategoryDetailsByTestType(testType: BikeTestType): BikeCategoryDetail[] {
    let bikeCategoryDetails: BikeCategoryDetail[] = [];
    bikeCategoryConstants.forEach((bikeCategory) => {
      if (testType === bikeCategory.testType) {
        bikeCategoryDetails.push(bikeCategory);
      }
    });
    return bikeCategoryDetails;
  }
}
