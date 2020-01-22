import { TestCentre } from '@dvsa/mes-test-schema/categories/common';
import { TestSlot } from '@dvsa/mes-journal-schema';

export const getCostCentre = (testCentre: TestCentre) => testCentre.costCode || '';

export const extractTestCentre = (slotData: TestSlot): TestCentre => {
  return {
    centreId: slotData.testCentre.centreId,
    costCode: slotData.testCentre.costCode,
    centreName: slotData.testCentre.centreName,
  };
};
