import { RekeyReason } from '@dvsa/mes-test-schema/categories/common';
import {
  Types,
  IPAD_ISSUE_SELECTED,
  IPAD_ISSUE_TECH_FAULT,
  IPAD_ISSUE_LOST,
  IPAD_ISSUE_STOLEN,
  IPAD_ISSUE_BROKEN,
  TRANSFER_SELECTED,
  OTHER_SELECTED,
  OTHER_REASON_UPDATED,
} from './rekey-reason.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: RekeyReason = {
  ipadIssue: {
    selected: false,
    broken: false,
    lost: false,
    technicalFault: false,
    stolen: false,
  },
  other: {
    selected: false,
    reason: '',
  },
  transfer: {
    selected: false,
  },
};

export function rekeyReasonReducer(state = initialState, action: Types): RekeyReason {
  switch (action.type) {
    case IPAD_ISSUE_SELECTED:
      return {
        ...state,
        ipadIssue: {
          selected: action.selectedValue,
          broken: false,
          lost: false,
          technicalFault: action.selectedValue,
          stolen: false,
        },
      };
    case IPAD_ISSUE_TECH_FAULT:
      return {
        ...state,
        ipadIssue: {
          ...initialState.ipadIssue,
          selected: true,
          technicalFault: true,
        },
      };
    case IPAD_ISSUE_LOST:
      return {
        ...state,
        ipadIssue: {
          ...initialState.ipadIssue,
          selected: true,
          lost: true,
        },
      };
    case IPAD_ISSUE_STOLEN:
      return {
        ...state,
        ipadIssue: {
          ...initialState.ipadIssue,
          selected: true,
          stolen: true,
        },
      };
    case IPAD_ISSUE_BROKEN:
      return {
        ...state,
        ipadIssue: {
          ...initialState.ipadIssue,
          selected: true,
          broken: true,
        },
      };
    case TRANSFER_SELECTED:
      return {
        ...state,
        transfer: {
          ...initialState.transfer,
          selected: action.selectedValue,
        },
      };
    case OTHER_SELECTED:
      return {
        ...state,
        other: {
          ...initialState.other,
          selected: action.selectedValue,
        },
      };
    case OTHER_REASON_UPDATED:
      return {
        ...state,
        other: {
          ...initialState.other,
          selected: true,
          reason: action.otherReason,
        },
      };
    default:
      return state;
  }
}
export const getRekeyReason = createFeatureSelector<RekeyReason>('rekeyReason');
