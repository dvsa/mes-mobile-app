import { Competencies } from '../test-data.constants';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { TestData, SafetyAndBalanceQuestions } from '@dvsa/mes-test-schema/categories/AM2';
import { NUMBER_OF_SAFETY_QUESTIONS }
  from '../../../../shared/constants/safety-questions.cat-a-mod2.constants';
import { NUMBER_OF_BALANCE_QUESTIONS }
  from '../../../../shared/constants/balance-questions.cat-a-mod2.constants';
import { get } from 'lodash';

export const getDrivingFaultCount = (
  data: TestData, competency: Competencies) => data.drivingFaults[competency];

export const getVehicleChecks = (
  state: TestData): SafetyAndBalanceQuestions => state.safetyAndBalanceQuestions;

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

// TO-DO - where is eyesight checks in the schema? 
// export const hasEyesightTestBeenCompleted = (data: TestData) => data.eyesightTest.complete;

// export const hasEyesightTestGotSeriousFault = (data: TestData) => data.eyesightTest.seriousFault;

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
