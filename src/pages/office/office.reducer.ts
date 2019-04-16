import * as officeActions from './office.actions';
import { OfficeModel } from './office.model';

export const initialState: OfficeModel = {
  dangerousFaultComments: [],
  drivingFaultComments: [],
};

export function officeReducer(state = initialState, action: officeActions.OfficeActionTypes): OfficeModel {
  switch (action.type) {
    case officeActions.OFFICE_VIEW_ADD_DANGEROUS_FAULT_COMMENT:
      return {
        ...state,
        dangerousFaultComments: [...state.dangerousFaultComments, action.payload],
      };
    case officeActions.OFFICE_VIEW_ADD_DRIVING_FAULT_COMMENT:
      return {
        ...state,
        drivingFaultComments: [...state.drivingFaultComments, action.payload],
      };
    default:
      return state;
  }
}
