import * as officeActions from './office.actions';
import { OfficeModel } from './office.model';

export const initialState: OfficeModel = {
  dangerousFaultComments: [],
};

export function officeReducer(state = initialState, action: officeActions.OfficeActionTypes): OfficeModel {
  switch (action.type) {
    case officeActions.OFFICE_VIEW_ADD_DANGEROUS_FAULT_COMMENT:
      return {
        ...state,
        dangerousFaultComments: [...state.dangerousFaultComments, action.payload],
      };
    default:
      return state;
  }
}
