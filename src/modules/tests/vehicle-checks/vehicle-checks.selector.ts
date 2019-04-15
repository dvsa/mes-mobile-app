import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import { default as tellMeQuestions } from '../../../providers/question/tell-me-question.constants';

export const isTellMeQuestionSelected = (state: VehicleChecks) => state.tellMeQuestionCode !== undefined;
export const isTellMeQuestionCorrect = (state: VehicleChecks) => state.tellMeQuestionOutcome === 'P';
export const isTellMeQuestionDrivingFault = (state: VehicleChecks) => state.tellMeQuestionOutcome === 'DF';
export const getSelectedTellMeQuestionText = (state: VehicleChecks) => {
  const tellMeQuestionText =
    tellMeQuestions.find(question => question.tellMeQuestionCode === state.tellMeQuestionCode);
  if (!tellMeQuestionText) {
    return '';
  }
  return `${state.tellMeQuestionCode} - ${tellMeQuestionText.tellMeQuestionShortName}`;
};
