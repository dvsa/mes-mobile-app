import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import { default as tellMeQuestions } from '../../../providers/question/tell-me-question.constants';
import { default as showMeQuestions } from '../../../providers/question/show-me-question.constants';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

export const isTellMeQuestionSelected = (state: VehicleChecks) => state.tellMeQuestionCode !== undefined;
export const isTellMeQuestionCorrect = (state: VehicleChecks) => state.tellMeQuestionOutcome === 'P';
export const isTellMeQuestionDrivingFault = (state: VehicleChecks) =>
  state.tellMeQuestionOutcome === CompetencyOutcome.DF;
export const getSelectedTellMeQuestionText = (state: VehicleChecks) => {
  const tellMeQuestionText =
    tellMeQuestions.find(question => question.tellMeQuestionCode === state.tellMeQuestionCode);
  if (!tellMeQuestionText) {
    return '';
  }
  return `${state.tellMeQuestionCode} - ${tellMeQuestionText.tellMeQuestionShortName}`;
};

export const getShowMeQuestion = (state: VehicleChecks) =>
  showMeQuestions.find(question => question.showMeQuestionCode === state.showMeQuestionCode);
