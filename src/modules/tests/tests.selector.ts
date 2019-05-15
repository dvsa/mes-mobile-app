import { TestStatus } from './test-status/test-status.model';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { TestsModel } from './tests.model';
import { terminationCodeList } from '../../pages/office/components/termination-code/termination-code.constants';
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

export const getCurrentTest = (tests: TestsModel) => {
  const currentTestSlotId = tests.currentTest.slotId;
  return tests.startedTests[currentTestSlotId];
};

export const getTestStatus = (tests: TestsModel, slotId: number) => tests.testLifecycles[slotId] || TestStatus.Booked;

export const getTestOutcome = (test: StandardCarTestCATBSchema) => test.activityCode;

export const getTestOutcomeText = (test: StandardCarTestCATBSchema) => {
  const outcomeIndex = outcomeStatus.findIndex(status => status.outcomeCode === test.activityCode);
  if (outcomeIndex > -1) {
    return outcomeStatus[outcomeIndex].outcomeText;
  }
  return 'Terminated';
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

export const isPracticeTest = (tests: TestsModel) => startsWith(tests.currentTest.slotId, 'practice_');
