import { Injectable } from '@angular/core';
import { VehicleChecksQuestion } from './vehicle-checks-question.model';
import { TestCategory } from '../../shared/models/test-category';

import tellMeQuestionsCatBConstants  from '../../shared/constants/tell-me-questions/tell-me-questions.cat-b.constants';
import showMeQuestionsCatBConstants  from '../../shared/constants/show-me-questions/show-me-questions.cat-b.constants';
// tslint:disable-next-line: import-name
import tellMeQuestionsCatBEConstants from '../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
// tslint:disable-next-line: import-name
import showMeQuestionsCatBEConstants from '../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';

@Injectable()
export class QuestionProvider {

  getTellMeQuestions(testCategory: TestCategory): VehicleChecksQuestion[] {
    switch (testCategory) {
      case TestCategory.B :
        return tellMeQuestionsCatBConstants;
      case TestCategory.BE :
        return tellMeQuestionsCatBEConstants;
      default :
        return [];
    }
  }
  getShowMeQuestions(testCategory: TestCategory): VehicleChecksQuestion[] {
    switch (testCategory) {
      case TestCategory.B :
        return showMeQuestionsCatBConstants;
      case TestCategory.BE :
        return showMeQuestionsCatBEConstants;
      default :
        return [];
    }
  }
}
