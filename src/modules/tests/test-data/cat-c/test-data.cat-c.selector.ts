import { Competencies, LegalRequirements } from '../test-data.constants';
import { get } from 'lodash';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { NUMBER_OF_SHOW_ME_QUESTIONS }
  from '../../../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';
import { NUMBER_OF_TELL_ME_QUESTIONS }
  from '../../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';

export type CatCTestData =
  | CatCUniqueTypes.TestData
  | CatC1UniqueTypes.TestData
  | CatCEUniqueTypes.TestData
  | CatC1EUniqueTypes.TestData;

export type CatCManoeuvres =
  | CatCUniqueTypes.Manoeuvres
  | CatC1UniqueTypes.Manoeuvres
  | CatCEUniqueTypes.Manoeuvres
  | CatC1EUniqueTypes.Manoeuvres;

export type CatCTestRequirements =
  | CatCUniqueTypes.TestRequirements
  | CatC1UniqueTypes.TestRequirements
  | CatCEUniqueTypes.TestRequirements
  | CatC1EUniqueTypes.TestRequirements;

export type CatCVehicleChecks =
  | CatCUniqueTypes.VehicleChecks
  | CatC1UniqueTypes.VehicleChecks
  | CatCEUniqueTypes.VehicleChecks
  | CatC1EUniqueTypes.VehicleChecks;

export const getDrivingFaultCount = (
  data: CatCTestData, competency: Competencies) => data.drivingFaults[competency];

export const getManoeuvres = (data: CatCTestData): CatCManoeuvres => data.manoeuvres;

// TODO - We should pass a Manoeuvre object here instead of TestData
export const hasManoeuvreBeenCompletedCatC = (data: CatCTestData) => {
  return (
    get(data.manoeuvres, 'reverseLeft.selected')
  );
};

export const hasLegalRequirementBeenCompleted = (
  data: CatCTestRequirements, legalRequirement: LegalRequirements) => {
  return data[legalRequirement];
};

export const getVehicleChecks = (
  state: CatCTestData): CatCVehicleChecks => state.vehicleChecks;

export const areTellMeQuestionsSelected = (
  state: CatCVehicleChecks) => typeof get(state, 'tellMeQuestions') !== 'undefined';

export const areTellMeQuestionsCorrect = (state: CatCVehicleChecks) => {
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
export const hasVehicleChecksBeenCompletedCatC = (data: CatCTestData): boolean => {
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
