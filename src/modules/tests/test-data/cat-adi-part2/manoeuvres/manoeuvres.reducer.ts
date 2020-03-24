import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import * as manoeuvresActions from './manoeuvres.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';

export const initialState: CatADI2UniqueTypes.Manoeuvres[] = [{}, {}];

let newState = initialState;

export function manoeuvresCatADI2Reducer(
  state = initialState,
  action: manoeuvresActions.Types,
): CatADI2UniqueTypes.Manoeuvres[] {
  switch (action.type) {
    case manoeuvresActions.RECORD_MANOEUVRES_SELECTION:
      newState = state.slice(0);

      newState[action.index] = {
        [action.manoeuvre]: {
          ...state[action.index][action.manoeuvre],
          selected: true,
        },
      };

      if (
        action.index === 0 &&
        state[1][action.manoeuvre] &&
        state[1][action.manoeuvre].selected
      ) {
        newState[1][action.manoeuvre] = {};
      }

      return newState;
    case manoeuvresActions.ADD_MANOEUVRE_DRIVING_FAULT:
      newState = state.slice(0);

      newState[action.index] = {
        [action.payload.manoeuvre]: {
          ...state[action.index][action.payload.manoeuvre],
          [action.payload.competency]: CompetencyOutcome.DF,
        },
      };

      return newState;
    case manoeuvresActions.ADD_MANOEUVRE_SERIOUS_FAULT:
      newState = state.slice(0);

      newState[action.index] = {
        [action.payload.manoeuvre]: {
          ...state[action.index][action.payload.manoeuvre],
          [action.payload.competency]: CompetencyOutcome.S,
        },
      };

      return newState;
    case manoeuvresActions.ADD_MANOEUVRE_DANGEROUS_FAULT:
      newState = state.slice(0);

      newState[action.index] = {
        [action.payload.manoeuvre]: {
          ...state[action.index][action.payload.manoeuvre],
          [action.payload.competency]: CompetencyOutcome.D,
        },
      };

      return newState;
    case manoeuvresActions.REMOVE_MANOEUVRE_FAULT:
      const {
        [action.payload.competency]: competencyToOmit, ...stateToPreserve
      } = state[action.index][action.payload.manoeuvre];

      newState = state.slice(0);

      newState[action.index][action.payload.manoeuvre] = {
        ...stateToPreserve,
      };

      return newState;
    case manoeuvresActions.ADD_MANOEUVRE_COMMENT:
      return {
        ...state,
        [action.fieldName]: {
          ...state[action.fieldName],
          [`${action.controlOrObservation.toLocaleLowerCase()}FaultComments`]: action.comment,
        },
      };
    default:
      return state;
  }
}
