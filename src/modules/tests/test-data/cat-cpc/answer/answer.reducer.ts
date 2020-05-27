import * as answerActionTypes from './answer.action';
import { Answer } from '@dvsa/mes-test-schema/categories/CPC';

const initialState: Answer = {
  selected: false,
  label: null,
};

export function answerReducer(
  state: Answer = initialState,
  action: answerActionTypes.Types): Answer {
  switch (action.type) {
    case answerActionTypes.TOGGLE_ANSWER:
      return {
        label: action.payload.label,
        selected: !action.payload.selected,
      };
    default:
      return state;
  }
}
