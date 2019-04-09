import { Action } from '@ngrx/store';

export const ADDITIONAL_INFORMATION_CHANGED = '[Test Summary] Additional Information changed';
export const ROUTE_NUMBER_CHANGED = '[Test Summary] Route Number changed';
export const DEBRIEF_WITNESSED_CHANGED = '[Test Summary] Debrief Witnessed changed';
export const IDENTIFICATION_USED_CHANGED = '[Test Summary] Identification used changed';
export const INDEPENDENT_DRIVING_TYPE_CHANGED = '[Test Summary] Independent driving changed';
export const D255_CHANGED = '[Test Summary] D255 changed';

export class AdditionalInformationChanged implements Action {
  readonly type = ADDITIONAL_INFORMATION_CHANGED;
  constructor(public additionalInformation: string) {}
}

export class RouteNumberChanged implements Action {
  readonly type = ROUTE_NUMBER_CHANGED;
  constructor(public routeNumber: number) {}
}

export class DebriefWitnessedChanged implements Action {
  readonly type = DEBRIEF_WITNESSED_CHANGED;
  constructor(public witnessed: string) {}
}

export class IdentificationUsedChanged implements Action {
  readonly type = IDENTIFICATION_USED_CHANGED;
  constructor(public identification: string) {}
}

export class IndependentDrivingTypeChanged implements Action {
  readonly type = INDEPENDENT_DRIVING_TYPE_CHANGED;
  constructor(public drivingType: string) {}
}

export class D255Changed implements Action {
  readonly type = D255_CHANGED;
  constructor(public change: string) {}
}
export type Types =
  | AdditionalInformationChanged
  | RouteNumberChanged
  | DebriefWitnessedChanged
  | IdentificationUsedChanged
  | IndependentDrivingTypeChanged
  | D255Changed;
