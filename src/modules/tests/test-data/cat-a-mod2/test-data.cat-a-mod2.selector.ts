import { Competencies } from '../test-data.constants';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { TestData, SafetyAndBalanceQuestions } from '@dvsa/mes-test-schema/categories/AM2';
import { NUMBER_OF_SAFETY_QUESTIONS }
  from '../../../../shared/constants/safety-questions.cat-a-mod2.constants';
import { NUMBER_OF_BALANCE_QUESTIONS }
  from '../../../../shared/constants/balance-questions.cat-a-mod2.constants';
import { get } from 'lodash';
import { VehicleChecksQuestion } from '../../../../providers/question/vehicle-checks-question.model';
import { OutcomeBehaviourMapProvider } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';

export const getDrivingFaultCount = (
  data: TestData, competency: Competencies) => data.drivingFaults[competency];

export const getVehicleChecks = (
  state: TestData): SafetyAndBalanceQuestions => state.safetyAndBalanceQuestions;

  export const getSafetyQuestionOptions = (
    questions: VehicleChecksQuestion[],
    outcome: string,
    provider: OutcomeBehaviourMapProvider) => {
    const filteredQuestions: VehicleChecksQuestion[] = [];
    const showNotApplicable = provider.showNotApplicable(outcome, 'vehicleChecks');
    questions.forEach((value) => {
      if (value.code !== 'N/A' || (value.code === 'N/A' && showNotApplicable)) {
        filteredQuestions.push(value);
      }
    });
    return filteredQuestions;
  };
  
export const areBalanceQuestionsCorrect = (state: SafetyAndBalanceQuestions) => {
  let correct = true;

  if (
    typeof state.balanceQuestions === 'undefined' ||
    state.balanceQuestions === null ||
    !(state.balanceQuestions instanceof Array)) {
    correct = false;
  } else {
    state.balanceQuestions.forEach((question) => {
      if (question.outcome !== CompetencyOutcome.P) {
        correct = false;
      }
    });
  }

  return correct;
};


export const areBalanceQuestionsSelected = (
  state: SafetyAndBalanceQuestions) => typeof get(state, 'balanceQuestions') !== 'undefined';

export const hasVehicleChecksBeenCompleted = (data: SafetyAndBalanceQuestions): boolean => {
  let safetyQuestionComplete = true;
  let balanceQuestionComplete = true;

  if (
    !(data && data.safetyQuestions instanceof Array) ||
    data.safetyQuestions.length !== NUMBER_OF_SAFETY_QUESTIONS
  ) {
    safetyQuestionComplete = false;
  } else {
    data.safetyQuestions.forEach((element) => {
      if (element.outcome == null) {
        safetyQuestionComplete = false;
      }
    });
  }

  if (
    !(data && data.balanceQuestions instanceof Array) ||
    data.balanceQuestions.length !== NUMBER_OF_BALANCE_QUESTIONS
  ) {
    balanceQuestionComplete = false;
  } else {
    data.balanceQuestions.forEach((element) => {
      if (element.outcome == null) {
        balanceQuestionComplete = false;
      }
    });
  }

  return (safetyQuestionComplete && balanceQuestionComplete);
};
