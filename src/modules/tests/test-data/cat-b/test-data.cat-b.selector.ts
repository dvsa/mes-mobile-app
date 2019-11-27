import { Competencies, LegalRequirements } from '../test-data.constants';
import { get } from 'lodash';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { QuestionProvider } from '../../../../providers/question/question';
import { TestCategory } from '../../../../shared/models/test-category';
import { VehicleChecksQuestion } from '../../../../providers/question/vehicle-checks-question.model';

export const getDrivingFaultCount = (
    data: CatBUniqueTypes.TestData, competency: Competencies) => data.drivingFaults[competency];

export const getManoeuvres = (data: CatBUniqueTypes.TestData): CatBUniqueTypes.Manoeuvres => data.manoeuvres;

export const hasManoeuvreBeenCompletedCatB = (data: CatBUniqueTypes.TestData) => {
  return (
    get(data.manoeuvres, 'forwardPark.selected') ||
    get(data.manoeuvres, 'reverseParkCarpark.selected') ||
    get(data.manoeuvres, 'reverseParkRoad.selected') ||
    get(data.manoeuvres, 'reverseRight.selected')
  );
};

export const hasControlledStopBeenCompleted = (data: CatBUniqueTypes.TestData) => data.controlledStop.selected;

export const hasEyesightTestGotSeriousFault = (data: CatBUniqueTypes.TestData) => data.eyesightTest.seriousFault;

export const hasLegalRequirementBeenCompleted = (
  data: CatBUniqueTypes.TestRequirements, legalRequirement: LegalRequirements) => {
  return data[legalRequirement];
};

export const getVehicleChecks = (state: CatBUniqueTypes.TestData): CatBUniqueTypes.VehicleChecks => state.vehicleChecks;

export const getTellMeQuestion = (state: CatBUniqueTypes.VehicleChecks): VehicleChecksQuestion => {
  const questionProvider: QuestionProvider =  new QuestionProvider();
  return questionProvider
    .getTellMeQuestions(TestCategory.B)
    .find(question => question.code === get(state, 'tellMeQuestion.code'));
};

export const isTellMeQuestionSelected = (
  state: CatBUniqueTypes.VehicleChecks) => get(state, 'tellMeQuestion.code') !== undefined;

export const isTellMeQuestionCorrect =
  (state: CatBUniqueTypes.VehicleChecks) => get(state, 'tellMeQuestion.outcome') === CompetencyOutcome.P;

export const isTellMeQuestionDrivingFault = (state: CatBUniqueTypes.VehicleChecks) =>
  get(state, 'tellMeQuestion.outcome') === CompetencyOutcome.DF;

export const tellMeQuestionOutcome = (state: CatBUniqueTypes.VehicleChecks) => get(state, 'tellMeQuestion.outcome');

export const getSelectedTellMeQuestionText = (state: CatBUniqueTypes.VehicleChecks) => {
  const questionProvider: QuestionProvider = new QuestionProvider();

  const tellMeQuestionText = questionProvider
    .getTellMeQuestions(TestCategory.B)
    .find(question => question.code === get(state, 'tellMeQuestion.code'));

  if (!tellMeQuestionText) {
    return '';
  }
  return `${get(state, 'tellMeQuestion.code')} - ${tellMeQuestionText.shortName}`;
};

export const getShowMeQuestion = (state: CatBUniqueTypes.VehicleChecks) => {
  const questionProvider: QuestionProvider = new QuestionProvider();
  return questionProvider
    .getShowMeQuestions(TestCategory.B)
    .find(question => question.code === get(state, 'showMeQuestion.code'));
};

export const hasVehicleChecksBeenCompletedCatB = (data: CatBUniqueTypes.TestData): boolean => {
  const showMeQuestionOutcome = data.vehicleChecks.showMeQuestion.outcome;
  const tellMeQuestionOutcome = data.vehicleChecks.tellMeQuestion.outcome;

  return (showMeQuestionOutcome != null && tellMeQuestionOutcome != null);
};
