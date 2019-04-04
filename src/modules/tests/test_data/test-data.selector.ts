
import { TestData, ETA } from '@dvsa/mes-test-schema/categories/B';
import { Competencies } from './test-data.constants';

export const getDrivingFaultCount = (data: TestData, competency: Competencies) => data.drivingFaults[competency];
export const getManoeuvres = (data: TestData) => data.manoeuvres;
export const getDrivingFaultSummaryCount = (data: TestData): number => {

  // The way how we store the driving faults differs for certain competencies
  // Because of this we need to pay extra attention on summing up all of them

  const drivingFaultSumOfSimpleCompetencies =
    Object.values(data.drivingFaults).reduce((acc, numberOfFaults) => acc + numberOfFaults, 0);

  const result = drivingFaultSumOfSimpleCompetencies;
  return result;
};

export const hasSeriousFault = (data: TestData, competency: Competencies) => data.seriousFaults[competency];

export const hasDangerousFault = (data: TestData, competency: Competencies) => data.dangerousFaults[competency];

export const getTestRequirements = (data: TestData) => data.testRequirements;

export const getETA = (data: TestData) => data.ETA;
export const getETAVerbal = (data: ETA) => data.verbal;
export const getETAPhysical = (data: ETA) => data.physical;
export const getETAFaultText = (data: ETA) => {
  if (data.physical && !data.verbal) return 'Physical';
  if (!data.physical && data.verbal) return 'Verbal';
  if (data.physical && data.verbal) return 'Physical and Verbal';
  return;
};
