import { Injectable } from '@angular/core';
import { VehicleChecksQuestion } from './vehicle-checks-question.model';
import { SafetyQuestion } from './safety-question.model';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

import tellMeQuestionsCatBConstants from '../../shared/constants/tell-me-questions/tell-me-questions.cat-b.constants';
import showMeQuestionsCatBConstants from '../../shared/constants/show-me-questions/show-me-questions.cat-b.constants';
import tellMeQuestionsCatBeConstants from '../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
import showMeQuestionsCatBeConstants from '../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';
import tellMeQuestionsVocationalConstants
  from '../../shared/constants/tell-me-questions/tell-me-questions.vocational.constants';
import tellMeQuestionsVocationalTrailerConstants
  from '../../shared/constants/tell-me-questions/tell-me-questions.vocational-trailer.constants';
import showMeQuestionsVocationalConstants
  from '../../shared/constants/show-me-questions/show-me-questions.vocational.constants';
import showMeQuestionsVocationalTrailerConstants
  from '../../shared/constants/show-me-questions/show-me-questions.vocational-trailer.constants';
import safetyQuestionsCatAMod2Constants from '../../shared/constants/safety-questions.cat-a-mod2.constants';
import balanceQuestionsCatAMod2Constants from '../../shared/constants/balance-questions.cat-a-mod2.constants';
import safetyQuestionsCatDConstants from '../../shared/constants/safety-questions.cat-d.constants';

@Injectable()
export class QuestionProvider {

  getTellMeQuestions(testCategory: TestCategory): VehicleChecksQuestion[] {
    switch (testCategory) {
      case TestCategory.B:
        return tellMeQuestionsCatBConstants;
      case TestCategory.BE:
        return tellMeQuestionsCatBeConstants;
      case TestCategory.C:
      case TestCategory.C1:
      case TestCategory.D:
      case TestCategory.D1:
        return tellMeQuestionsVocationalConstants;
      case TestCategory.CE:
      case TestCategory.C1E:
      case TestCategory.DE:
      case TestCategory.D1E:
        return tellMeQuestionsVocationalTrailerConstants;
      default:
        return [];
    }
  }
  getShowMeQuestions(testCategory: TestCategory): VehicleChecksQuestion[] {
    switch (testCategory) {
      case TestCategory.B:
        return showMeQuestionsCatBConstants;
      case TestCategory.BE:
        return showMeQuestionsCatBeConstants;
      case TestCategory.C:
      case TestCategory.C1:
      case TestCategory.D:
      case TestCategory.D1:
        return showMeQuestionsVocationalConstants;
      case TestCategory.CE:
      case TestCategory.C1E:
      case TestCategory.DE:
      case TestCategory.D1E:
        return showMeQuestionsVocationalTrailerConstants;
      default:
        return [];
    }
  }

  getSafetyQuestions(testCategory: TestCategory): VehicleChecksQuestion[] {
    switch (testCategory) {
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAM2:
      case TestCategory.EUAMM2:
        return safetyQuestionsCatAMod2Constants;
      default:
        return [];
    }
  }
  getBalanceQuestions(testCategory: TestCategory): VehicleChecksQuestion[] {
    switch (testCategory) {
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAM2:
      case TestCategory.EUAMM2:
        return balanceQuestionsCatAMod2Constants;
      default:
        return [];
    }
  }

  getVocationalSafetyQuestions(testCategory: TestCategory): SafetyQuestion[] {
    switch (testCategory) {
      case TestCategory.D:
      case TestCategory.D1:
      case TestCategory.DE:
      case TestCategory.D1E:
        return safetyQuestionsCatDConstants;
      default:
        return [];
    }
  }
}
