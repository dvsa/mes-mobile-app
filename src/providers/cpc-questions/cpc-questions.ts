import { Injectable } from '@angular/core';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Question, Question5 } from '@dvsa/mes-test-schema/categories/CPC';

import { lgvQuestion5, lgvQuestions } from '../../shared/constants/cpc-questions/cpc-lgv-questions.constants';
import { pcvQuestion5, pcvQuestions } from '../../shared/constants/cpc-questions/cpc-pcv-questions.constants';
import {
  Combination,
  questionCombinations,
} from '../../shared/constants/cpc-questions/cpc-question-combinations.constants';

@Injectable()
export class CPCQuestionProvider {

  constructor() {
  }

  private getQuestionCombination = (combinationCode: string): Combination => {
    return questionCombinations.find((question: Combination) => question.code === combinationCode);
  }

  private getQuestionsByVehicleType = (combinationCode: string): Question[] => {
    return combinationCode.includes('LGV') ? lgvQuestions : pcvQuestions;
  }

  getQuestion5ByVehicleType = (combinationCode: string): Question5 => {
    return combinationCode.includes('LGV') ? lgvQuestion5 : pcvQuestion5;
  }

  getQuestionsBank = (combinationCode: string): Question[] => {
    const { questions } = this.getQuestionCombination(combinationCode);

    return this.getQuestionsByVehicleType(combinationCode)
      .filter((item: Question) => questions.includes(item.questionCode))
      .sort((a: Question, b: Question) =>
        questions.indexOf(a.questionCode) - questions.indexOf(b.questionCode));
  }

  getCombinations = (testCategory: TestCategory): Combination[] => {
    switch (testCategory) {
      case TestCategory.CCPC:
        return questionCombinations.filter((questions: Combination) => questions.code.includes('LGV'));
      case TestCategory.DCPC:
        return questionCombinations.filter((questions: Combination) => questions.code.includes('PCV'));
      default:
        return [];
    }
  }
}
