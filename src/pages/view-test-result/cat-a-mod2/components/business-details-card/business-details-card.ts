import { Component, Input } from '@angular/core';
import { get } from 'lodash';
// todo: PREP-AMOD2 change to CatAmod2UniqueTypes when schema changes are ready
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { Address } from '@dvsa/mes-test-schema/categories/common';

@Component({
  selector: 'business-details-card',
  templateUrl: 'business-details-card.html',
})
export class BusinessDetailsCardComponent {

  @Input()
  // todo: PREP-AMOD2 change to CatAmod2UniqueTypes when schema changes are ready
  data: CatBEUniqueTypes.Candidate;

  constructor() {}

  public shouldHideCard(): boolean {
    return (
      !get(this.data, 'businessName') &&
      !get(this.data, 'businessTelephone') &&
      !get(this.data, 'businessAddress')
    );
  }

  public getBusinessName(): string {
    return get(this.data, 'businessName', 'Not supplied');
  }

  public getPhoneNumber(): string {
    return get(this.data, 'businessTelephone' , 'Not supplied');
  }

  public getAddress(): Address {
    return get(this.data, 'businessAddress');
  }

}
