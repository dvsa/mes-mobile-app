import { Injectable } from '@angular/core';
import { lgvQuestions } from '../../shared/constants/cpc-questions/cpc-lgv-questions.constants';
import { pcvQuestions } from '../../shared/constants/cpc-questions/cpc-pcv-questions.constants';
import { questionCombinations } from '../../shared/constants/cpc-questions/cpc-question-combinations.constants';
import { Question } from '@dvsa/mes-test-schema/categories/CPC';

@Injectable()
export class CPCQuestionProvider {
  constructor() {
  }

  getQuestionsByCombinationCode(combinationCode: string): Question[] {
    let questionCodes: string[] = [];
    const questions: Question[] = [];
    // get combinations
    questionCombinations.forEach((combination) => {
      if (combination.code === combinationCode) {
        questionCodes = combination.questions;
      }
    });
    // set question bank, based on vehicle type
    let questionBank: Question[];
    combinationCode.indexOf('LGV') === 0 ? questionBank = lgvQuestions : questionBank = pcvQuestions;
    // get questions
    questionBank.forEach((question) => {
      if (questionCodes.indexOf(question.questionCode) >= 0) {
        questions.push(question);
      }
    });
    return questions;
  }
}
