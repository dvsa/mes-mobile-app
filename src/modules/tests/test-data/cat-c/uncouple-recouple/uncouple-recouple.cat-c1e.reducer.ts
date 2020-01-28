import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import * as uncoupleRecoupleActions from '../../common/uncouple-recouple/uncouple-recouple.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';

export const initialState: CatC1EUniqueTypes.UncoupleRecouple = {};

export function uncoupleRecoupleCatC1EReducer(
  state = initialState,
  action: uncoupleRecoupleActions.UncoupleRecoupleActionsTypes,
): CatC1EUniqueTypes.UncoupleRecouple {
  switch (action.type) {
    case uncoupleRecoupleActions.TOGGLE_UNCOUPLE_RECOUPLE:
      return {
        ...state,
        selected: !state.selected,
      };
    case uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_ADD_DRIVING_FAULT:
      return {
        ...state,
        fault: CompetencyOutcome.DF,
        selected: true,
      };
    case uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_ADD_SERIOUS_FAULT:
      return {
        ...state,
        fault: CompetencyOutcome.S,
        selected: true,
      };
    case uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_ADD_DANGEROUS_FAULT:
      return {
        ...state,
        fault: CompetencyOutcome.D,
        selected: true,
      };
    case uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_REMOVE_FAULT:
      return {
        selected: state.selected,
      };
    case uncoupleRecoupleActions.ADD_UNCOUPLE_RECOUPLE_COMMENT:
      return {
        ...state,
        faultComments: action.comment,
      };
    default:
      return state;
  }
}
