import { TestsModel } from './tests.reducer';

export const getCurrentTest = (tests: TestsModel) => {
  const currentTestSlotId = tests.currentTest.slotId;
  return tests.startedTests[currentTestSlotId];
};

export const getTestStatus = (tests: TestsModel, slotId: number) => tests.testLifecycles[slotId];
