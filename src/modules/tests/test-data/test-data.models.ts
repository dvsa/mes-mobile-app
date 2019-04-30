import { Competencies } from './test-data.constants';

export type FaultPayload = {
  competency: Competencies,
  newFaultCount: number,
};

export type CatBLegalRequirements = {
  normalStop1: boolean,
  normalStop2: boolean,
  angledStart: boolean,
  hillStart: boolean,
  manoeuvre: boolean,
  vehicleChecks: boolean,
  eco: boolean,
};
