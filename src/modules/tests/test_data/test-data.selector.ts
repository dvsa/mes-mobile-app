import { TestData } from '@dvsa/mes-test-schema/categories/B';
import { Competencies } from './test-data.constants';

export const getDrivingFaultCount = (data: TestData, competency: Competencies) => data.drivingFaults[competency];

export const getDrivingFaultSummaryCount = (data: TestData): number => {

  // The way how we store the driving faults differs for certain competencies
  // Because of this we need to pay extra attention on summing up all of them

  const drivingFaultSumOfSimpleCompetencies =
    Object.values(data.drivingFaults).reduce((acc, numberOfFaults) => acc + numberOfFaults, 0);

  const result = drivingFaultSumOfSimpleCompetencies;
  return result;
};

export const hasSeriousFault = (data: TestData, competency: Competencies) => data.seriousFaults[competency];
