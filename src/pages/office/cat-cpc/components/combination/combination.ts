import { Component, Input } from '@angular/core';

import {
  Combination, questionCombinations,
} from '../../../../../shared/constants/cpc-questions/cpc-question-combinations.constants';

@Component({
  selector: 'combination',
  templateUrl: 'combination.html',
})
export class CombinationComponent {

  combinationAdditionalTest: any;

  @Input()
  combination: Combination;
  constructor() { }

  ngOnInit(): void {
    this.combinationAdditionalTest = this.getCombinationAdditionalText(this.combination);
  }

  getCombinationAdditionalText(code) {
    const question: Combination = questionCombinations.find((question) => {
      return question.code === code;
    });

    return question.additionalText;
  }

}
