import { Injectable } from '@angular/core';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

@Injectable()
export class BikeCategoryIconProvider {
  public getBikeIcon(category: string): string {
    const basePath = 'src/assets/imgs/bike-category-icons/';
    switch (category) {
      case TestCategory.EUA1M1:
        return `${basePath}A1.png`;
      case TestCategory.EUA2M1:
        return `${basePath}A2.png`;
      case TestCategory.EUAM1:
        return `${basePath}A.png`;
      case TestCategory.EUAMM1:
        return `${basePath}AM.png`;
    }
  }
}
