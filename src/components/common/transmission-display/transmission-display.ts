import { Component, Input } from '@angular/core';
import { GearboxCategory } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

enum GearBox {
  AUTOMATIC = 'Automatic - An automatic licence will be issued',
  MANUAL = 'Manual',
  CODE78 = 'Automatic - No code 78 - A manual licence will be issued',
}

@Component({
  selector: 'transmission-display',
  templateUrl: 'transmission-display.html',
})
export class TransmissionDisplayComponent {

  @Input()
  transmission: GearboxCategory;

  @Input()
  code78: boolean;

  @Input()
  category: TestCategory;

  constructor() {
  }

  getTransmissionText(gearbox: GearboxCategory, code78: boolean, category: TestCategory): GearBox {
    switch (category) {
      case TestCategory.C:
      case TestCategory.CE:
      case TestCategory.D:
      case TestCategory.DE:
        return gearbox === GearBox.MANUAL ? GearBox.MANUAL : !code78 ? GearBox.CODE78 : GearBox.AUTOMATIC;
      default:
        return gearbox === GearBox.MANUAL ? GearBox.MANUAL : GearBox.AUTOMATIC;
    }
  }
}
