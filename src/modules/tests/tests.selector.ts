import { StoreModel } from '../../shared/models/store.model';

export const getCurrentTest = (rootState: StoreModel) => {
  const currentTestSlotId = rootState.tests.currentTest.slotId;
  return rootState.tests.startedTests[currentTestSlotId];
};
