import { RekeyReason, CatBUniqueTypes.TestResult, IpadIssue, Transfer, Other } from '@dvsa/mes-test-schema/categories/Common';

export const getReasonForRekey = (test: CatBUniqueTypes.TestResult) => {
  return test.rekeyReason;
};

export const getRekeyIpadIssue = (rekeyReason: RekeyReason): IpadIssue => rekeyReason.ipadIssue;
export const getRekeyTransfer = (rekeyReason: RekeyReason): Transfer => rekeyReason.transfer;
export const getRekeyOther = (rekeyReason: RekeyReason): Other => rekeyReason.other;
