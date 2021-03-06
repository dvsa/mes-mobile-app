import { Competencies, LegalRequirements } from '../test-data.constants';
import { get } from 'lodash';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import {
  CatCTestData,
  CatCManoeuvres,
  CatCTestRequirements,
  CatCVehicleChecks,
} from '../../../../shared/unions/test-schema-unions';
import {
  NUMBER_OF_SHOW_ME_QUESTIONS,
} from '../../../../shared/constants/show-me-questions/show-me-questions.vocational.constants';
import {
   NUMBER_OF_TELL_ME_QUESTIONS,
  } from '../../../../shared/constants/tell-me-questions/tell-me-questions.vocational.constants';

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
