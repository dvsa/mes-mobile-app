import { RekeyReason, StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';

export const getReasonForRekey = (test: StandardCarTestCATBSchema) => {
  return test.rekeyReason;
};

export const getRekeyIpadIssueSelected = (rekeyReason: RekeyReason): boolean => rekeyReason.ipadIssue.selected;
export const getRekeyIpadIssueTechFault = (rekeyReason: RekeyReason): boolean => rekeyReason.ipadIssue.technicalFault;
export const getRekeyIpadIssueLost = (rekeyReason: RekeyReason): boolean => rekeyReason.ipadIssue.lost;
export const getRekeyIpadIssueStolen = (rekeyReason: RekeyReason): boolean => rekeyReason.ipadIssue.stolen;
export const getRekeyIpadIssueBroken = (rekeyReason: RekeyReason): boolean => rekeyReason.ipadIssue.broken;
export const getRekeyTransferSelected = (rekeyReason: RekeyReason): boolean => rekeyReason.transfer.selected;
// TODO add selector for transfer staff number
export const getRekeyOtherSelected = (rekeyReason: RekeyReason): boolean => rekeyReason.other.selected;
export const getRekeyOtherReasonUpdated = (rekeyReason: RekeyReason): string => rekeyReason.other.reason;
