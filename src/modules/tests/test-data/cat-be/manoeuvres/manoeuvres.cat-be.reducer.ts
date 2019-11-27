import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import * as manoeuvresActions from '../../cat-b/manoeuvres/manoeuvres.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';

export const initialState: CatBEUniqueTypes.Manoeuvres = {
  reverseLeft: {},
};

export function manoeuvresCatBEReducer(
  state = initialState,
  action: manoeuvresActions.Types,
): CatBEUniqueTypes.Manoeuvres {
  switch (action.type) {
    case manoeuvresActions.RECORD_MANOEUVRES_SELECTION:
      return {
        [action.manoeuvre]: {
          ...state[action.manoeuvre],
          selected: true,
        },
      };
    case manoeuvresActions.ADD_MANOEUVRE_DRIVING_FAULT:
      return {
        ...state,
        [action.payload.manoeuvre]: {
          ...state[action.payload.manoeuvre],
          [action.payload.competency]: CompetencyOutcome.DF,
        },
      };
    case manoeuvresActions.ADD_MANOEUVRE_COMMENT:
      return {
        ...state,
        [action.fieldName]: {
          ...state[action.fieldName],
          [`${action.controlOrObservation.toLocaleLowerCase()}FaultComments`]: action.comment,
        },
      };
    case manoeuvresActions.ADD_MANOEUVRE_SERIOUS_FAULT:
      return {
        ...state,
        [action.payload.manoeuvre]: {
          ...state[action.payload.manoeuvre],
          [action.payload.competency]: CompetencyOutcome.S,
        },
      };
    case manoeuvresActions.ADD_MANOEUVRE_DANGEROUS_FAULT:
      return {
        ...state,
        [action.payload.manoeuvre]: {
          ...state[action.payload.manoeuvre],
          [action.payload.competency]: CompetencyOutcome.D,
        },
      };
    case manoeuvresActions.REMOVE_MANOEUVRE_FAULT:
      const {
        [action.payload.competency]: competencyToOmit, ...stateToPreserve
      } = state[action.payload.manoeuvre];
      return {
        ...state,
        [action.payload.manoeuvre]: stateToPreserve,
      };
    default:
      return state;
  }
}
