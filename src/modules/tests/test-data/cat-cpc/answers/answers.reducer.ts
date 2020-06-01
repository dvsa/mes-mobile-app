import * as answerActionTypes from './answers.action';
import { Answer } from '@dvsa/mes-test-schema/categories/CPC';

const initialState: Answer = {
  selected: null,
  label: null,
};

export function answerReducer(
  state: Answer = initialState,
  action: answerActionTypes.Types): Answer {
  switch (action.type) {
    case answerActionTypes.POPULATE_ANSWER:
      return {
        ...state,
        selected: !action.payload.selected,
      };
    default:
      return state;
  }
}
