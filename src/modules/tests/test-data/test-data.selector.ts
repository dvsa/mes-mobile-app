
import { TestData, TestRequirements, ETA, Eco, Manoeuvres, VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import { Competencies, LegalRequirements, ExaminerActions } from './test-data.constants';
import { pickBy, sumBy, endsWith, get } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { default as tellMeQuestions } from '../../../providers/question/tell-me-question.constants';
import { default as showMeQuestions } from '../../../providers/question/show-me-question.constants';
import { ShowMeQuestion } from '../../../providers/question/show-me-question.model';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { CatBLegalRequirements } from './test-data.models';
import { TellMeQuestion } from '../../../providers/question/tell-me-question.model';

export const getDrivingFaultCount = (data: TestData, competency: Competencies) => data.drivingFaults[competency];

export const getDrivingFaultSummaryCount = (data: TestData): number => {

  // The way how we store the driving faults differs for certain competencies
  // Because of this we need to pay extra attention on summing up all of them
  const { drivingFaults, manoeuvres, controlledStop, vehicleChecks } = data;

  const drivingFaultSumOfSimpleCompetencies =
    Object.values(drivingFaults).reduce((acc, numberOfFaults) => acc + numberOfFaults, 0);

  const controlledStopHasDrivingFault = (controlledStop && controlledStop.fault === CompetencyOutcome.DF) ? 1 : 0;

  const result =
    drivingFaultSumOfSimpleCompetencies +
    sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
    sumVehicleCheckFaults(vehicleChecks) +
    controlledStopHasDrivingFault;

  return result;
};

export const getSeriousFaultSummaryCount = (data: TestData): number => {

  // The way how we store serious faults differs for certain competencies
  // Because of this we need to pay extra attention on summing up all of them
  const { seriousFaults, manoeuvres, controlledStop, vehicleChecks } = data;

  const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
  const vehicleCheckSeriousFaults = vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S ? 1 : 0;
  const controlledStopSeriousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.S) ? 1 : 0;

  const result =
    seriousFaultSumOfSimpleCompetencies +
    sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
    vehicleCheckSeriousFaults +
    controlledStopSeriousFaults;

  return result;
};

export const getDangerousFaultSummaryCount = (data: TestData): number => {

  // The way how we store serious faults differs for certain competencies
  // Because of this we need to pay extra attention on summing up all of them
  const { dangerousFaults, manoeuvres, controlledStop, vehicleChecks } = data;

  const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
  const vehicleCheckDangerousFaults = vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D ? 1 : 0;
  const controlledStopDangerousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.D) ? 1 : 0;

  const result =
    dangerousFaultSumOfSimpleCompetencies +
    sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) +
    vehicleCheckDangerousFaults +
    controlledStopDangerousFaults;

  return result;
};

export const sumVehicleCheckFaults = (vehicleChecks: VehicleChecks): number => {

  if (!vehicleChecks || !vehicleChecks.showMeQuestion || !vehicleChecks.tellMeQuestion) {
    return 0;
  }
  const { showMeQuestion, tellMeQuestion } = vehicleChecks;

  if (showMeQuestion.outcome === CompetencyOutcome.S || showMeQuestion.outcome === CompetencyOutcome.D) {
    return 0;
  }

  if (showMeQuestion.outcome === CompetencyOutcome.DF || tellMeQuestion.outcome === CompetencyOutcome.DF) {
    return 1;
  }

  return 0;
};

export const sumManoeuvreFaults = (manoeuvres: Manoeuvres, faultType: CompetencyOutcome): number => {
  const manoeuvresCollection = Object.values(manoeuvres);
  return sumBy(manoeuvresCollection, (manoeuvre) => {
    if (manoeuvre.selected) {
      const dFkeys = pickBy(manoeuvre, (val, key) => endsWith(key, 'Fault') && val === faultType);
      return Object.keys(dFkeys).length;
    }
  });
};

export const hasSeriousFault = (data: TestData, competency: Competencies) => data.seriousFaults[competency];

export const hasDangerousFault = (data: TestData, competency: Competencies) => data.dangerousFaults[competency];

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

export const getManoeuvres = (data: TestData): Manoeuvres => data.manoeuvres;

export const hasManoeuvreBeenCompleted = (data: TestData) => {
  return (
    get(data.manoeuvres, 'forwardPark.selected') ||
    get(data.manoeuvres, 'reverseParkCarpark.selected') ||
    get(data.manoeuvres, 'reverseParkRoad.selected') ||
    get(data.manoeuvres, 'reverseRight.selected')
  );
};

export const hasControlledStopBeenCompleted = (data: TestData) => data.controlledStop.selected;

export const hasLegalRequirementBeenCompleted = (data: TestRequirements, legalRequirement: LegalRequirements) => {
  return data[legalRequirement];
};

export const getVehicleChecks = (state: TestData): VehicleChecks => state.vehicleChecks;

export const getTellMeQuestion = (state: VehicleChecks): TellMeQuestion =>
  tellMeQuestions.find(question => question.code === get(state, 'tellMeQuestion.code'));

export const isTellMeQuestionSelected = (state: VehicleChecks) => get(state, 'tellMeQuestion.code') !== undefined;

export const isTellMeQuestionCorrect =
  (state: VehicleChecks) => get(state, 'tellMeQuestion.outcome') === CompetencyOutcome.P;

export const isTellMeQuestionDrivingFault = (state: VehicleChecks) =>
  get(state, 'tellMeQuestion.outcome') === CompetencyOutcome.DF;

export const tellMeQuestionOutcome = (state: VehicleChecks) => get(state, 'tellMeQuestion.outcome');

export const getSelectedTellMeQuestionText = (state: VehicleChecks) => {
  const tellMeQuestionText =
    tellMeQuestions.find(question => question.code === get(state, 'tellMeQuestion.code'));
  if (!tellMeQuestionText) {
    return '';
  }
  return `${get(state, 'tellMeQuestion.code')} - ${tellMeQuestionText.shortName}`;
};

export const getShowMeQuestion = (state: VehicleChecks) =>
  showMeQuestions.find(question => question.code === get(state, 'showMeQuestion.code'));

export const getShowMeQuestionOptions = (
  questions: ShowMeQuestion[],
  outcome: string,
  provider: OutcomeBehaviourMapProvider) => {
  const filteredQuestions: ShowMeQuestion[] = [];
  const showNotApplicable = provider.showNotApplicable(outcome, 'showMeQuestion');
  questions.forEach((value) => {
    if (value.code !== 'N/A' || (value.code === 'N/A' && showNotApplicable)) {
      filteredQuestions.push(value);
    }
  });
  return filteredQuestions;
};

export const hasVehicleChecksBeenCompleted = (data: TestData): boolean => {
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

export const getCatBLegalRequirements = (data: TestData): CatBLegalRequirements => {
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
