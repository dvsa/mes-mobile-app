import { Component, Input } from '@angular/core';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';

@Component({
  selector: 'vehicle-checks-data-row',
  templateUrl: 'vehicle-checks-data-row.html',
})
export class VehicleChecksDataRowComponent {

  @Input()
  label: string;

  @Input()
  data: QuestionResult[];

  @Input()
  shouldHaveSeperator: boolean = true;

  public shouldShowFault(outcome: QuestionOutcome): boolean {
    return outcome === 'DF';
  }
}
