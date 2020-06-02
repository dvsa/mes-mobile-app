import { Component, Input } from '@angular/core';

import { CPCQuestionProvider } from '../../../../../providers/cpc-questions/cpc-questions';
import { CombinationCodes } from '../../../../../shared/constants/cpc-questions/cpc-question-combinations.constants';

@Component({
  selector: 'question-footer',
  templateUrl: 'question-footer.html',
})
export class QuestionFooterComponent {

  @Input()
  combination: CombinationCodes;

  @Input()
  questionCode: string;

  constructor(private cpcQuestionProvider: CPCQuestionProvider) {
  }

  showPreviousPageButton = (combination: CombinationCodes, questionCode: string): boolean => {
    const index = this.cpcQuestionProvider.getQuestionNumber(combination, questionCode);

    return index > 0;
  }

  showNextPageButton = (combination: CombinationCodes, questionCode: string): boolean => {
    const index = this.cpcQuestionProvider.getQuestionNumber(combination, questionCode);

    return index < 3;
  }

}
