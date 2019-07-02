import { TestStatus } from './test-status/test-status.model';
import { StandardCarTestCATBSchema, JournalData } from '@dvsa/mes-test-schema/categories/B';
import { TestsModel } from './tests.model';
import { activityCodeModelList } from '../../pages/office/components/activity-code/activity-code.constants';
import { testReportPracticeSlotId, end2endPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';
import { startsWith } from 'lodash';

// temporary determination of test failure and success until service
// that imnplements full business logic is implemented.
const outcomeStatus: any[] = [
  { outcomeCode: '1', outcomeText: 'Passed' },
  { outcomeCode: '2', outcomeText: 'Unsuccessful' },
  { outcomeCode: '3', outcomeText: 'Unsuccessful' },
  { outcomeCode: '4', outcomeText: 'Unsuccessful' },
  { outcomeCode: '5', outcomeText: 'Unsuccessful' },
];

export const getCurrentTestSlotId = (tests: TestsModel) => tests.currentTest.slotId;

export const getCurrentTest = (tests: TestsModel) => {
  const currentTestSlotId = tests.currentTest.slotId;
  return tests.startedTests[currentTestSlotId];
};

export const getJournalData = (test: StandardCarTestCATBSchema): JournalData => test.journalData;

export const getTestStatus = (tests: TestsModel, slotId: number) => tests.testStatus[slotId] || TestStatus.Booked;

export const getTestOutcome = (test: StandardCarTestCATBSchema) => test.activityCode;

export const getTestOutcomeText = (test: StandardCarTestCATBSchema) => {
  const outcomeIndex = outcomeStatus.findIndex(status => status.outcomeCode === test.activityCode);
  if (outcomeIndex > -1) {
    return outcomeStatus[outcomeIndex].outcomeText;
  }
  return 'Terminated';
};

export const isTestOutcomeSet = (test: StandardCarTestCATBSchema) => {
  if (test.activityCode) {
    return true;
  }
  return false;
};

export const isPassed = (test: StandardCarTestCATBSchema) => {
  const outcomeIndex = outcomeStatus.findIndex(status => status.outcomeCode === test.activityCode);
  if (outcomeIndex > -1) {
    return outcomeStatus[outcomeIndex].outcomeText === 'Passed';
  }
  return false;
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
