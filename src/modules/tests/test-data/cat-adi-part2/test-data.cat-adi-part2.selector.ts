import { Competencies, LegalRequirements } from '../test-data.constants';
import { get } from 'lodash';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { QuestionProvider } from '../../../../providers/question/question';
import { VehicleChecksQuestion } from '../../../../providers/question/vehicle-checks-question.model';
import { NUMBER_OF_TELL_ME_QUESTIONS }
  from '../../../../shared/constants/tell-me-questions/tell-me-questions.cat-adi-part2.constants';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export const getDrivingFaultCount = (
  data: CatADI2UniqueTypes.TestData, competency: Competencies) => data.drivingFaults[competency];

export const getManoeuvresADI2 = (data: CatADI2UniqueTypes.TestData) : CatADI2UniqueTypes.Manoeuvres[] =>
  data.manoeuvres;

// TODO - We should pass a Manoeuvre object here instead of TestData
export const hasManoeuvreBeenCompletedCatADIPart2 = (data: CatADI2UniqueTypes.TestData) => (data.manoeuvres.length > 0);

export const hasEyesightTestBeenCompleted = (data: CatADI2UniqueTypes.TestData) => data.eyesightTest.complete;

export const hasEyesightTestGotSeriousFault = (data: CatADI2UniqueTypes.TestData) => data.eyesightTest.seriousFault;

export const hasLegalRequirementBeenCompleted = (
  data: CatADI2UniqueTypes.TestRequirements, legalRequirement: LegalRequirements) => {
  return data[legalRequirement];
};

export const getVehicleChecks = (
  state: CatADI2UniqueTypes.TestData): CatADI2UniqueTypes.VehicleChecks => state.vehicleChecks;

export const getTellMeQuestion = (state: CatADI2UniqueTypes.VehicleChecks): VehicleChecksQuestion => {
  const questionProvider: QuestionProvider = new QuestionProvider();
  return questionProvider
    .getTellMeQuestions(TestCategory.BE)
    .find(question => question.code === get(state, 'tellMeQuestion.code'));
};

export const areTellMeQuestionsSelected = (
  state: CatADI2UniqueTypes.VehicleChecks) => typeof get(state, 'tellMeQuestions') !== 'undefined';

export const areTellMeQuestionsCorrect = (state: CatADI2UniqueTypes.VehicleChecks) => {
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
export const hasVehicleChecksBeenCompletedCatADI2 = (data: CatADI2UniqueTypes.TestData): boolean => {

  if (
    !(data.vehicleChecks && data.vehicleChecks.tellMeQuestions instanceof Array) ||
    data.vehicleChecks.tellMeQuestions.length !== NUMBER_OF_TELL_ME_QUESTIONS
  ) {
    return false;
  }

  data.vehicleChecks.tellMeQuestions.forEach((element) => {
    if (element.outcome == null) {
      return false;
    }
  });
  return true;
};
