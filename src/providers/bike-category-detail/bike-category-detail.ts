import { Injectable } from '@angular/core';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { BikeCategoryDetail, BikeTestType } from './bike-category-detail.model';
import bikeCategoryConstants from '../../shared/constants/bike-category-details/bike-category-details';

@Injectable()
export class BikeCategoryDetailProvider {

  public getDetailByCategoryCode(category: CategoryCode): BikeCategoryDetail {
    return bikeCategoryConstants.find(item => item.categoryCode === category);
  }

  public getAllDetailsByTestType(testType: BikeTestType): BikeCategoryDetail[] {
    const bikeCategoryDetails: BikeCategoryDetail[] = [];
    bikeCategoryConstants.forEach((bikeCategory) => {
      if (testType === bikeCategory.testType) {
        bikeCategoryDetails.push(bikeCategory);
      }
    });
    return bikeCategoryDetails;
  }
}
