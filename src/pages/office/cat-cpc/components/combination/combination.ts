import { Component, Input } from '@angular/core';

import {
  Combination,
} from '../../../../../shared/constants/cpc-questions/cpc-question-combinations.constants';

@Component({
  selector: 'combination',
  templateUrl: 'combination.html',
})
export class CombinationComponent {

  // combinationAdditionalText: any;

  @Input()
  combination: Combination;

  @Input()
  combinationAdditionalText: string;

  constructor() { }

  // ngOnInit(): void {
  //   this.combinationAdditionalText = this.getCombinationAdditionalText(this.combination);
  // }
  //
  // getCombinationAdditionalText(code) {
  //   const question: Combination = questionCombinations.find((question) => {
  //     return question.code === code;
  //   });
  //
  //   return question.additionalText;
  // }

}
