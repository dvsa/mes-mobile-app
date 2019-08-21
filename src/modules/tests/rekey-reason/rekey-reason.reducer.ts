import { RekeyReason } from '@dvsa/mes-test-schema/categories/B';
import {
  Types,
  REKEY_REASON_IPAD_ISSUE_SELECTED,
  REKEY_REASON_IPAD_ISSUE_TECH_FAULT,
  REKEY_REASON_IPAD_ISSUE_LOST,
  REKEY_REASON_IPAD_ISSUE_STOLEN,
  REKEY_REASON_IPAD_ISSUE_BROKEN,
  REKEY_REASON_TRANSFER_SELECTED,
  REKEY_REASON_TRANSFER_STAFF_UPDATED,
  REKEY_REASON_OTHER_SELECTED,
  REKEY_REASON_OTHER_REASON_UPDATED,
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
    case REKEY_REASON_IPAD_ISSUE_SELECTED:
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
    case REKEY_REASON_IPAD_ISSUE_TECH_FAULT:
      return {
        ...state,
        ipadIssue: {
          ...initialState.ipadIssue,
          selected: true,
          technicalFault: action.selectedValue,
        },
      };
    case REKEY_REASON_IPAD_ISSUE_LOST:
      return {
        ...state,
        ipadIssue: {
          ...initialState.ipadIssue,
          selected: true,
          lost: action.selectedValue,
        },
      };
    case REKEY_REASON_IPAD_ISSUE_STOLEN:
      return {
        ...state,
        ipadIssue: {
          ...initialState.ipadIssue,
          selected: true,
          stolen: action.selectedValue,
        },
      };
    case REKEY_REASON_IPAD_ISSUE_BROKEN:
      return {
        ...state,
        ipadIssue: {
          ...initialState.ipadIssue,
          selected: true,
          broken: action.selectedValue,
        },
      };
    case REKEY_REASON_TRANSFER_SELECTED:
      return {
        ...state,
        transfer: {
          ...initialState.transfer,
          selected: action.selectedValue,
        },
      };
    case REKEY_REASON_TRANSFER_STAFF_UPDATED:
      return {
        ...state,
        transfer: {
          ...initialState.transfer,
          selected: true,
          // TODO: Add Staff Number here as transfer staff number
        },
      };
    case REKEY_REASON_OTHER_SELECTED:
      return {
        ...state,
        other: {
          ...initialState.other,
          selected: action.selectedValue,
        },
      };
    case REKEY_REASON_OTHER_REASON_UPDATED:
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
export const getTestSummary = createFeatureSelector<RekeyReason>('rekeyReason');