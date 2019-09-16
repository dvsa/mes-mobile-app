import { TestStatus } from './test-status/test-status.model';
import { StandardCarTestCATBSchema, JournalData, ActivityCode } from '@dvsa/mes-test-schema/categories/B';
import { TestsModel } from './tests.model';
import { activityCodeModelList } from '../../pages/office/components/activity-code/activity-code.constants';
import { testReportPracticeSlotId, end2endPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';
import { startsWith } from 'lodash';
import { TestOutcome } from './tests.constants';
import { ActivityCodes } from '../../shared/models/activity-codes';
import { DateTime } from '../../shared/helpers/date-time';

export const getCurrentTestSlotId = (tests: TestsModel): string => tests.currentTest.slotId;

export const getCurrentTest = (tests: TestsModel): StandardCarTestCATBSchema => {
  const currentTestSlotId = tests.currentTest.slotId;
  return tests.startedTests[currentTestSlotId];
};

export const getCurrentTestStatus = (tests: TestsModel): TestStatus => {
  const currentTestSlotId = tests.currentTest.slotId;
  return tests.testStatus[currentTestSlotId];
};

export const getTestById = (tests: TestsModel, slotId: string): StandardCarTestCATBSchema => {
  return tests.startedTests[slotId];
};

export const getJournalData = (test: StandardCarTestCATBSchema): JournalData => test.journalData;

export const getTestStatus = (tests: TestsModel, slotId: number) => tests.testStatus[slotId] || TestStatus.Booked;

export const getTestOutcome = (test: StandardCarTestCATBSchema) => test.activityCode;

export const getTestOutcomeText = (test: StandardCarTestCATBSchema) => {
  if (test.activityCode === ActivityCodes.PASS) {
    return TestOutcome.Passed;
  }

  if (
    test.activityCode === ActivityCodes.FAIL ||
    test.activityCode === ActivityCodes.FAIL_CANDIDATE_STOPS_TEST ||
    test.activityCode === ActivityCodes.FAIL_EYESIGHT ||
    test.activityCode === ActivityCodes.FAIL_PUBLIC_SAFETY
  ) {
    return TestOutcome.Failed;
  }

  return TestOutcome.Terminated;
};

export const isTestOutcomeSet = (test: StandardCarTestCATBSchema) => {
  if (test.activityCode) {
    return true;
  }
  return false;
};

export const isPassed = (test: StandardCarTestCATBSchema): boolean => {
  return test.activityCode === ActivityCodes.PASS;
};

export const getActivityCode = (test: StandardCarTestCATBSchema) => {

  const activityCodeIndex = activityCodeModelList.findIndex(
    activityCode => test.activityCode === activityCode.activityCode);
  return activityCodeModelList[activityCodeIndex];

};

export const isPracticeMode = (tests: TestsModel) : boolean =>
  isTestReportPracticeTest(tests) || isEndToEndPracticeTest(tests);

export const isTestReportPracticeTest = (tests: TestsModel): boolean =>
  tests.currentTest.slotId === testReportPracticeSlotId;

export const isEndToEndPracticeTest = (tests: TestsModel) : boolean =>
  startsWith(tests.currentTest.slotId, end2endPracticeSlotId);

export const getAllTestStatuses = (test: TestsModel): { [slotId: string]: TestStatus; } => {
  return test.testStatus;
};

export const getActivityCodeBySlotId = (testsModel: TestsModel, id: number): ActivityCode => {
  if (testsModel && testsModel.startedTests && testsModel.startedTests[id]) {
    return testsModel.startedTests[id].activityCode;
  }
  return null;
};

export const getIncompleteTestsSlotIds = (tests: TestsModel): string[] => {
  return Object.keys(tests.testStatus).filter(slotId =>
    isTestBeforeToday(tests.startedTests[slotId])
    && tests.testStatus[slotId] !== TestStatus.Submitted
    && tests.testStatus[slotId] !== TestStatus.Completed);
};

const isTestBeforeToday = (test: StandardCarTestCATBSchema): boolean => {
  const testDate = new DateTime(test.journalData.testSlotAttributes.start);
  const today = new DateTime();
  return today.daysDiff(new Date(testDate.format('YYYY-MM-DD'))) < 0;
};

export const getIncompleteTests = (tests: TestsModel): StandardCarTestCATBSchema[] => {
  const incompleteTestsSlotIds: string[] = getIncompleteTestsSlotIds(tests);
  return incompleteTestsSlotIds.map((slotId: string) => tests.startedTests[slotId]);
};

export const getIncompleteTestsCount = (tests: TestsModel): number => {
  const incompleteTestsSlotIds: string[] = getIncompleteTestsSlotIds(tests);
  return incompleteTestsSlotIds.length;
};

export const getOldestIncompleteTest = (tests: TestsModel): StandardCarTestCATBSchema => {
  const incompleteTestsSlotIds: string[] = getIncompleteTestsSlotIds(tests);

  let oldestTest: StandardCarTestCATBSchema;

  incompleteTestsSlotIds.forEach((slotId: string) => {
    if (!oldestTest) {
      oldestTest = tests.startedTests[slotId];
      return;
    }

    const oldestStartDate: DateTime = new DateTime(oldestTest.journalData.testSlotAttributes.start);
    const currentStartDate: DateTime = new DateTime(tests.startedTests[slotId].journalData.testSlotAttributes.start);
    if (currentStartDate.isBefore(oldestStartDate)) {
      oldestTest = tests.startedTests[slotId];
    }
  });
  return oldestTest;
};
