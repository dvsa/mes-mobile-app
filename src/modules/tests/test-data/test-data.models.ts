import { Competencies } from './test-data.constants';

export type FaultPayload = {
  competency: Competencies,
  newFaultCount: number,
};

// This type is used for test report validation
export type CatBLegalRequirements = {
  normalStart1: boolean,
  normalStart2: boolean,
  angledStart: boolean,
  hillStart: boolean,
  manoeuvre: boolean,
  vehicleChecks: boolean,
  eco: boolean,
};
