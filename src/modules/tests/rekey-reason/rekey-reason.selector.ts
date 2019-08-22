import { RekeyReason, StandardCarTestCATBSchema, IpadIssue, Transfer, Other } from '@dvsa/mes-test-schema/categories/B';

export const getReasonForRekey = (test: StandardCarTestCATBSchema) => {
  return test.rekeyReason;
};

export const getRekeyIpadIssue = (rekeyReason: RekeyReason): IpadIssue => rekeyReason.ipadIssue;
export const getRekeyTransfer = (rekeyReason: RekeyReason): Transfer => rekeyReason.transfer;
// TODO add selector for transfer staff number
export const getRekeyOther = (rekeyReason: RekeyReason): Other => rekeyReason.other;
