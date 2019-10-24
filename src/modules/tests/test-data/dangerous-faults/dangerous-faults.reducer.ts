import { DangerousFaults } from '@dvsa/mes-test-schema/categories/Common';
import * as dangerousFaultsActions from './dangerous-faults.actions';
import { Competencies } from '../test-data.constants';

export const initialState: DangerousFaults = {};

export function dangerousFaultsReducer(
  state = initialState,
  action: dangerousFaultsActions.Types,
) {
  switch (action.type) {
    case dangerousFaultsActions.ADD_DANGEROUS_FAULT:
      return {
        ...state,
        [action.payload]: true,
      };
    case dangerousFaultsActions.REMOVE_DANGEROUS_FAULT:
      const dangerousCompetency = action.payload as Competencies;
      const { [dangerousCompetency]: removedDangerousFault, ...updatedDangerousFaults } = state;
      return {
        ...updatedDangerousFaults,
      };
    case dangerousFaultsActions.ADD_DANGEROUS_FAULT_COMMENT:
      return {
        ...state,
        [`${action.competencyName}Comments`]: action.comment,
      };
    default:
      return state;
  }
}
