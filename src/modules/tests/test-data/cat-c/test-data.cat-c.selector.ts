import { Competencies, LegalRequirements } from '../test-data.constants';
import { get } from 'lodash';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { QuestionProvider } from '../../../../providers/question/question';
import { VehicleChecksQuestion } from '../../../../providers/question/vehicle-checks-question.model';
import { NUMBER_OF_SHOW_ME_QUESTIONS }
  from '../../../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';
import { NUMBER_OF_TELL_ME_QUESTIONS }
  from '../../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export const getDrivingFaultCount = (
  data: CatCUniqueTypes.TestData, competency: Competencies) => data.drivingFaults[competency];

export const getManoeuvres = (data: CatCUniqueTypes.TestData): CatCUniqueTypes.Manoeuvres => data.manoeuvres;

// TODO - We should pass a Manoeuvre object here instead of TestData
export const hasManoeuvreBeenCompletedCatC = (data: CatCUniqueTypes.TestData) => {
  return (
    get(data.manoeuvres, 'reverseLeft.selected')
  );
};

export const hasLegalRequirementBeenCompleted = (
  data: CatCUniqueTypes.TestRequirements, legalRequirement: LegalRequirements) => {
  return data[legalRequirement];
};

export const getVehicleChecks = (
  state: CatCUniqueTypes.TestData): CatCUniqueTypes.VehicleChecks => state.vehicleChecks;

export const getTellMeQuestion = (state: CatCUniqueTypes.VehicleChecks): VehicleChecksQuestion => {
  const questionProvider: QuestionProvider = new QuestionProvider();
  return questionProvider
    .getTellMeQuestions(TestCategory.C)
    .find(question => question.code === get(state, 'tellMeQuestion.code'));
};

export const areTellMeQuestionsSelected = (
  state: CatCUniqueTypes.VehicleChecks) => typeof get(state, 'tellMeQuestions') !== 'undefined';

export const areTellMeQuestionsCorrect = (state: CatCUniqueTypes.VehicleChecks) => {
  const tellMeQuestions = get(state, 'tellMeQuestions');
  let correct = true;

  if (typeof tellMeQuestions === 'undefined' || tellMeQuestions === null || !(tellMeQuestions instanceof Array)) {
    correct = false;
  } else {
    tellMeQuestions.forEach((question) => {
      if (question.outcome !== CompetencyOutcome.P) {
        correct = false;
      }
    });
  }

  return correct;
};

// TODO - We should really pass a Vehicle Checks object here and not Test Data
// TODO - Also this has to go into a provider
export const hasVehicleChecksBeenCompletedCatC = (data: CatCUniqueTypes.TestData): boolean => {
  let showMeQuestionComplete = true;
  let tellMeQuestionComplete = true;

  if (
    !(data.vehicleChecks && data.vehicleChecks.showMeQuestions instanceof Array) ||
    data.vehicleChecks.showMeQuestions.length !== NUMBER_OF_SHOW_ME_QUESTIONS
  ) {
    showMeQuestionComplete = false;
  } else {
    data.vehicleChecks.showMeQuestions.forEach((element) => {
      if (element.outcome == null) {
        showMeQuestionComplete = false;
      }
    });
  }

  if (
    !(data.vehicleChecks && data.vehicleChecks.tellMeQuestions instanceof Array) ||
    data.vehicleChecks.tellMeQuestions.length !== NUMBER_OF_TELL_ME_QUESTIONS
  ) {
    tellMeQuestionComplete = false;
  } else {
    data.vehicleChecks.tellMeQuestions.forEach((element) => {
      if (element.outcome == null) {
        tellMeQuestionComplete = false;
      }
    });
  }

  return (showMeQuestionComplete && tellMeQuestionComplete);
};
