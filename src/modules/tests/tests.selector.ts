import { TestsModel } from './tests.reducer';

export const getCurrentTest = (tests: TestsModel) => {
  const currentTestSlotId = tests.currentTest.slotId;
  return tests.startedTests[currentTestSlotId];
};

export const getCurrentTestSlotId = (tests: TestsModel): string => {
  console.log(JSON.stringify(tests));
  console.log(`testslot id ${tests.currentTest.slotId}`);
  return tests.currentTest.slotId;
};
