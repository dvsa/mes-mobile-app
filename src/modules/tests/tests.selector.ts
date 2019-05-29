import { TestStatus } from './test-status/test-status.model';
import { StandardCarTestCATBSchema, JournalData } from '@dvsa/mes-test-schema/categories/B';
import { TestsModel } from './tests.model';
import { terminationCodeList } from '../../pages/office/components/termination-code/termination-code.constants';
import { testReportPracticeSlotId, end2endPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';
import { startsWith } from 'lodash';

// temporary determination of test failure and success until service
// that imnplements full business logic is implemented.
const outcomeStatus: any[] = [
  { outcomeCode: '1', outcomeText: 'Passed', outcomeColour: 'mes-green' },
  { outcomeCode: '2', outcomeText: 'Unsuccessful', outcomeColour: 'mes-red' },
  { outcomeCode: '3', outcomeText: 'Unsuccessful', outcomeColour: 'mes-red' },
  { outcomeCode: '4', outcomeText: 'Unsuccessful', outcomeColour: 'mes-red' },
  { outcomeCode: '5', outcomeText: 'Unsuccessful', outcomeColour: 'mes-red' },
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

export const getTestOutcomeClass = (test: StandardCarTestCATBSchema) => {
  const outcomeIndex = outcomeStatus.findIndex(status => status.outcomeCode === test.activityCode);
  if (outcomeIndex > -1) {
    return outcomeStatus[outcomeIndex].outcomeColour;
  }
  return 'mes-red';
};

export const isPassed = (test: StandardCarTestCATBSchema) => {
  const outcomeIndex = outcomeStatus.findIndex(status => status.outcomeCode === test.activityCode);
  if (outcomeIndex > -1) {
    return outcomeStatus[outcomeIndex].outcomeText === 'Passed';
  }
  return false;
};

export const getTerminationCode = (test: StandardCarTestCATBSchema) => {

  const terminationCodeIndex = terminationCodeList.findIndex(
    terminationCode => test.activityCode === terminationCode.activityCode);
  return terminationCodeList[terminationCodeIndex];

};

export const isPracticeMode = (tests: TestsModel) : boolean =>
  isTestReportPracticeTest(tests) || isEndToEndPracticeTest(tests);

export const isTestReportPracticeTest = (tests: TestsModel): boolean =>
  tests.currentTest.slotId === testReportPracticeSlotId;

export const isEndToEndPracticeTest = (tests: TestsModel) : boolean =>
  startsWith(tests.currentTest.slotId, end2endPracticeSlotId);
