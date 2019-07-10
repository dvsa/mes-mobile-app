import { Component, Input } from '@angular/core';
import { TestSummaryCardModel } from './test-summary-card-model';

@Component({
  selector: 'test-summary-card',
  templateUrl: 'test-summary-card.html',
})
export class TestSummaryCardComponent {

  @Input()
  data: TestSummaryCardModel;

  constructor() {}

  shouldHideCard() : boolean {
    return (
      !this.data.accompaniment &&
      !this.data.provisionalLicenceProvided &&
      !this.data.passCertificateNumber &&
      !this.data.routeNumber &&
      !this.data.independentDriving &&
      !this.data.candidateDescription &&
      !this.data.debriefWitnessed &&
      !this.data.weatherConditions &&
      !this.data.D255
    );
  }

  flattenArray(array: string[]): string {
    let result = '';

    array.forEach((value, index) => {
      if (index === 0) {
        result = result.concat(value);
        return;
      }

      if (index === array.length - 1) {
        result = result.concat(` and ${ value }`);
        return;
      }
      result = result.concat(`, ${value}`);
    });

    return result;
  }

  convertBooleanToString(value: boolean): string {
    return value ? 'Yes' : 'No';
  }

}
