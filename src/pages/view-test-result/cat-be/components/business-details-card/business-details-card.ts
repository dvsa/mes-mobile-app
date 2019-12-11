import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { Address } from '@dvsa/mes-test-schema/categories/Common';

@Component({
  selector: 'business-details-card',
  templateUrl: 'business-details-card.html',
})
export class BusinessDetailsCardComponent {

  @Input()
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
