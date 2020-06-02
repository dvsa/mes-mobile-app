import { Component, Input } from '@angular/core';
import { CombinationCodes } from '../../../../../shared/constants/cpc-questions/cpc-question-combinations.constants';

@Component({
  selector: 'module-assessment',
  templateUrl: 'module-assessment.html',
})
export class ModuleAssessmentComponent {

  @Input()
  combinationCode: CombinationCodes;

}
