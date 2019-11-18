
import { ETA, Eco, TestData } from '@dvsa/mes-test-schema/categories/Common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { Competencies, LegalRequirements, ExaminerActions, CatBeLegalRequirements } from './test-data.constants';
import { get } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { CatBLegalRequirements } from './test-data.models';
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';
import { QuestionProvider } from '../../../providers/question/question';
import { TestCategory } from '../../../shared/models/test-category';

export const getDrivingFaultCount = (
  data: CatBUniqueTypes.TestData, competency: Competencies) => data.drivingFaults[competency];

export const hasSeriousFault = (
  data: TestData, competency: Competencies) => data.seriousFaults[competency];

export const hasDangerousFault = (
  data: TestData, competency: Competencies) => data.dangerousFaults[competency];

export const getTestRequirements = (data: TestData) => data.testRequirements;

export const getETA = (data: TestData) => data.ETA;

export const getETAFaultText = (data: ETA) => {
  if (!data) return;
  if (data.physical && !data.verbal) return 'Physical';
  if (!data.physical && data.verbal) return 'Verbal';
  if (data.physical && data.verbal) return 'Physical and Verbal';
  return;
};

export const hasExaminerTakenAction = (data: ETA, action: ExaminerActions) => {
  return data[action];
};

export const getEco = (data: TestData) => data.eco;

export const getEcoFaultText = (data: Eco) => {
  if (!data) return;
  if (data.adviceGivenControl && !data.adviceGivenPlanning) return 'Control';
  if (!data.adviceGivenControl && data.adviceGivenPlanning) return 'Planning';
  if (data.adviceGivenControl && data.adviceGivenPlanning) return 'Control and Planning';
  return;
};

export const getManoeuvres = (data: CatBUniqueTypes.TestData): CatBUniqueTypes.Manoeuvres => data.manoeuvres;

export const hasManoeuvreBeenCompleted = (data: CatBUniqueTypes.TestData) => {
  return (
    get(data.manoeuvres, 'forwardPark.selected') ||
    get(data.manoeuvres, 'reverseParkCarpark.selected') ||
    get(data.manoeuvres, 'reverseParkRoad.selected') ||
    get(data.manoeuvres, 'reverseRight.selected')
  );
};

export const hasControlledStopBeenCompleted = (data: CatBUniqueTypes.TestData) => data.controlledStop.selected;

export const hasEyesightTestBeenCompleted = (data: TestData) => data.eyesightTest.complete;

export const hasEyesightTestGotSeriousFault = (data: CatBUniqueTypes.TestData) => data.eyesightTest.seriousFault;

export const hasLegalRequirementBeenCompleted = (
  data: CatBUniqueTypes.TestRequirements, legalRequirement: LegalRequirements | CatBeLegalRequirements) => {
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

export const getShowMeQuestionOptions = (
  questions: VehicleChecksQuestion[],
  outcome: string,
  provider: OutcomeBehaviourMapProvider) => {
  const filteredQuestions: VehicleChecksQuestion[] = [];
  const showNotApplicable = provider.showNotApplicable(outcome, 'showMeQuestion');
  questions.forEach((value) => {
    if (value.code !== 'N/A' || (value.code === 'N/A' && showNotApplicable)) {
      filteredQuestions.push(value);
    }
  });
  return filteredQuestions;
};

export const hasVehicleChecksBeenCompleted = (data: CatBUniqueTypes.TestData): boolean => {
  const showMeQuestionOutcome = data.vehicleChecks.showMeQuestion.outcome;
  const tellMeQuestionOutcome = data.vehicleChecks.tellMeQuestion.outcome;

  return (
    showMeQuestionOutcome === CompetencyOutcome.P ||
    showMeQuestionOutcome === CompetencyOutcome.DF ||
    showMeQuestionOutcome === CompetencyOutcome.S ||
    showMeQuestionOutcome === CompetencyOutcome.D)
    && (
      tellMeQuestionOutcome === CompetencyOutcome.P ||
      tellMeQuestionOutcome === CompetencyOutcome.DF ||
      tellMeQuestionOutcome === CompetencyOutcome.S ||
      tellMeQuestionOutcome === CompetencyOutcome.D
    );
};

export const getCatBLegalRequirements = (data: CatBUniqueTypes.TestData): CatBLegalRequirements => {
  return {
    normalStart1: data.testRequirements.normalStart1 || false,
    normalStart2: data.testRequirements.normalStart2 || false,
    angledStart: data.testRequirements.angledStart || false,
    hillStart: data.testRequirements.hillStart || false,
    manoeuvre: hasManoeuvreBeenCompleted(data) || false,
    vehicleChecks: hasVehicleChecksBeenCompleted(data) || false,
    eco: data.eco.completed || false,
  };
};
