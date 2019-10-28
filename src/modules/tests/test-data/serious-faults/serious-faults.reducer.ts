import { SeriousFaults } from '@dvsa/mes-test-schema/categories/Common';
import * as seriousFaultsActions from './serious-faults.actions';
import { Competencies } from '../test-data.constants';

export const initialState: SeriousFaults = {};

export function seriousFaultsReducer(
  state = initialState,
  action: seriousFaultsActions.Types,
): SeriousFaults {
  switch (action.type) {
    case seriousFaultsActions.ADD_SERIOUS_FAULT:
      return {
        ...state,
        [action.payload]: true,
      };
    case seriousFaultsActions.REMOVE_SERIOUS_FAULT:
      const seriousCompetency = action.payload as Competencies;
      const { [seriousCompetency]: removedSeriousFault, ...updatedSeriousFaults } = state;
      return updatedSeriousFaults;
    case seriousFaultsActions.ADD_SERIOUS_FAULT_COMMENT:
      return {
        ...state,
        [`${action.competencyName}Comments`]: action.comment,
      };
    default:
      return state;
  }
}
