import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { DateTime } from '../../../../shared/helpers/date-time';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';

@Component({
  selector: 'rekey-details-card',
  templateUrl: 'rekey-details-card.html',
})
export class RekeyDetailsCardComponent {

  // TODO: MES-4287 Use category c type
  @Input()
  data: CatBEUniqueTypes.TestResult | CatBUniqueTypes.TestResult;

  public getScheduledStaffNumber (): string {
    return get(this.data, 'examinerBooked'.toString());
  }

  public getConductedStaffNumber (): string {
    return get(this.data, 'examinerConducted'.toString());
  }

  public getTestDate (): string {
    const testDate: DateTime = new DateTime(get(this.data, 'journalData.testSlotAttributes.start'));
    return testDate.format('dddd Do MMMM YYYY');
  }

  public getRekeyedStaffNumber (): string {
    return get(this.data, 'examinerKeyed'.toString());
  }

  public getRekeyDate(): string {
    const rekeyDate: DateTime = new DateTime(get(this.data, 'rekeyDate'));
    return rekeyDate.format('dddd Do MMMM YYYY');
  }
}
