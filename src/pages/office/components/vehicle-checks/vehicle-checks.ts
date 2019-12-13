import { Component, Input } from '@angular/core';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/Common';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';

@Component({
  selector: 'vehicle-checks',
  templateUrl: 'vehicle-checks.html',
})
export class VehicleChecksComponent {
  @Input()
    display: boolean;

  @Input()
    checks: QuestionResult[];

  questionHasFault = (result: QuestionResult): boolean => result.outcome !== CompetencyOutcome.P;
}
