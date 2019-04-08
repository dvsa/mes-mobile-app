import { Action } from '@ngrx/store';

export const ADDITIONAL_INFORMATION_CHANGED = '[Test Summary] Additional Information changed';
export const ROUTE_NUMBER_CHANGED = '[Test Summary] Route Number changed';

export class AdditionalInformationChanged implements Action {
  readonly type = ADDITIONAL_INFORMATION_CHANGED;
  constructor(public additionalInformation: string) {}
}

export class RouteNumberChanged implements Action {
  readonly type = ROUTE_NUMBER_CHANGED;
  constructor(public routeNumber: number) {}
}

export type Types =
  | AdditionalInformationChanged
  | RouteNumberChanged;
