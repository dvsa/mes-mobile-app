import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';

import * as controlledStopActions from './controlled-stop.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';

export const initialState: CatFUniqueTypes.ControlledStop = {};

// TODO: Update schemas to create common controlled stop
export type ControlledStopUnion =
  | CatBUniqueTypes.ControlledStop
  | CatFUniqueTypes.ControlledStop;

export function controlledStopReducer(
  state = initialState,
  action: controlledStopActions.Types,
): ControlledStopUnion {
  switch (action.type) {
    case controlledStopActions.TOGGLE_CONTROLLED_STOP:
      return {
        ...state,
        selected: !state.selected,
      };
    case controlledStopActions.CONTROLLED_STOP_ADD_DRIVING_FAULT:
      return {
        ...state,
        fault: CompetencyOutcome.DF,
        selected: true,
      };
    case controlledStopActions.CONTROLLED_STOP_ADD_SERIOUS_FAULT:
      return {
        ...state,
        fault: CompetencyOutcome.S,
        selected: true,
      };
    case controlledStopActions.CONTROLLED_STOP_ADD_DANGEROUS_FAULT:
      return {
        ...state,
        fault: CompetencyOutcome.D,
        selected: true,
      };
    case controlledStopActions.CONTROLLED_STOP_REMOVE_FAULT:
      return {
        selected: state.selected,
      };
    case controlledStopActions.ADD_CONTROLLED_STOP_COMMENT:
      return {
        ...state,
        faultComments: action.comment,
      };
    default:
      return state;
  }
}
