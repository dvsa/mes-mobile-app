import { Injectable } from '@angular/core';
import { Question } from '@dvsa/mes-test-schema/categories/CPC';

import { lgvQuestions } from '../../shared/constants/cpc-questions/cpc-lgv-questions.constants';
import { pcvQuestions } from '../../shared/constants/cpc-questions/cpc-pcv-questions.constants';
import {
  Combination,
  questionCombinations,
} from '../../shared/constants/cpc-questions/cpc-question-combinations.constants';

@Injectable()
export class CPCQuestionProvider {

  constructor() {}

  private getQuestionCombination = (combinationCode: string): Combination => {
    return questionCombinations.find((question: Combination) => question.code === combinationCode);
  }

  private getQuestionsByVehicleType = (combinationCode: string): Question[] => {
    return combinationCode.includes('LGV') ? lgvQuestions : pcvQuestions;
  }

  getQuestionsBank = (combinationCode: string): Question[] => {
    const questionCombination: string[] = this.getQuestionCombination(combinationCode).questions;

    return this.getQuestionsByVehicleType(combinationCode)
      .filter((item: Question) => questionCombination.includes(item.questionCode));
  }
}
