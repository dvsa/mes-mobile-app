import { Component, Input } from '@angular/core';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';

@Component({
  selector: 'safety-and-balance-data-row',
  templateUrl: 'safety-and-balance-data-row.html',
})
export class SafetyAndBalanceDataRowComponent {

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
