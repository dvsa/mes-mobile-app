import { Competencies } from './test-data.constants';

export type FaultPayload = {
  competency: Competencies,
  newFaultCount: number,
};

export type CatBLegalRequirements = {
  normalStart1: boolean,
  normalStart2: boolean,
  angledStart: boolean,
  hillStart: boolean,
  manoeuvre: boolean,
  vehicleChecks: boolean,
  eco: boolean,
};
