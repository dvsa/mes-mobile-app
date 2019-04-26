import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import { default as tellMeQuestions } from '../../../providers/question/tell-me-question.constants';
import { default as showMeQuestions } from '../../../providers/question/show-me-question.constants';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { get } from 'lodash';

export const isTellMeQuestionSelected = (state: VehicleChecks) => get(state, 'tellMeQuestion.code') !== undefined;

export const isTellMeQuestionCorrect = (state: VehicleChecks) => get(state, 'tellMeQuestion.outcome') === 'P';

export const isTellMeQuestionDrivingFault = (state: VehicleChecks) =>
  get(state, 'tellMeQuestion.outcome') === CompetencyOutcome.DF;

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
