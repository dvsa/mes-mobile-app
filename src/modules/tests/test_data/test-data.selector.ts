
import { TestData, TestRequirements, ETA, Eco, Manoeuvres } from '@dvsa/mes-test-schema/categories/B';
import { Competencies, LegalRequirements, ExaminerActions } from './test-data.constants';
import { pickBy, sumBy, endsWith, get } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

export const getDrivingFaultCount = (data: TestData, competency: Competencies) => data.drivingFaults[competency];

export const getDrivingFaultSummaryCount = (data: TestData): number => {

  // The way how we store the driving faults differs for certain competencies
  // Because of this we need to pay extra attention on summing up all of them
  const { drivingFaults, manoeuvres, controlledStop } = data;

  const drivingFaultSumOfSimpleCompetencies =
    Object.values(drivingFaults).reduce((acc, numberOfFaults) => acc + numberOfFaults, 0);

  const controlledStopHasDrivingFault = (controlledStop.fault === CompetencyOutcome.DF) ? 1 : 0;

  const result =
    drivingFaultSumOfSimpleCompetencies +
    sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
    controlledStopHasDrivingFault;

  return result;
};

export const sumManoeuvreFaults = (manoeuvres: Manoeuvres, faultType: CompetencyOutcome): number => {
  const manoeuvresCollection = Object.values(manoeuvres);
  return sumBy(manoeuvresCollection, (manoeuvre) => {
    if (manoeuvre.selected) {
      const dFkeys = pickBy(manoeuvre, (val, key) => endsWith(key, 'Fault') && val === faultType);
      return Object.keys(dFkeys).length;
    }
  });
};

export const hasSeriousFault = (data: TestData, competency: Competencies) => data.seriousFaults[competency];

export const hasDangerousFault = (data: TestData, competency: Competencies) => data.dangerousFaults[competency];

export const getTestRequirements = (data: TestData) => data.testRequirements;

export const getETA = (data: TestData) => data.ETA;
export const getETAFaultText = (data: ETA) => {
  if (!data) return;
  if (data.physical && !data.verbal) return 'Physical';
  if (!data.physical && data.verbal) return 'Verbal';
  if (data.physical && data.verbal) return 'Physical and Verbal';
  return;
};
export const hasExaminerTakenAction = (data: ETA, action: ExaminerActions) => {
  return data[action];
};

export const getEco = (data: TestData) => data.eco;
export const getEcoFaultText = (data: Eco) => {
  if (!data) return;
  if (data.adviceGivenControl && !data.adviceGivenPlanning) return 'Control';
  if (!data.adviceGivenControl && data.adviceGivenPlanning) return 'Planning';
  if (data.adviceGivenControl && data.adviceGivenPlanning) return 'Control and Planning';
  return;
};

export const getManoeuvres = (data: TestData): Manoeuvres => data.manoeuvres;

export const hasManoeuvreBeenCompleted = (data: TestData) => {
  return (
    get(data.manoeuvres, 'forwardPark.selected') ||
    get(data.manoeuvres, 'reverseParkCarpark.selected') ||
    get(data.manoeuvres, 'reverseParkRoad.selected') ||
    get(data.manoeuvres, 'reverseRight.selected')
  );
};

export const hasControlledStopBeenCompleted = (data: TestData) => data.controlledStop.selected;

export const hasLegalRequirementBeenCompleted = (data: TestRequirements, legalRequirement: LegalRequirements) => {
  return data[legalRequirement];
};
