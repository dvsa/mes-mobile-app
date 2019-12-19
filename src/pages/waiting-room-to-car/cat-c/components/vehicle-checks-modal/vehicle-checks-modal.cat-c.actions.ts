import { Action } from '@ngrx/store';

export const VEHICLE_CHECKS_VIEW_DID_ENTER = '[VehicleChecks] [Cat C] Vehicle Checks Did Enter';

export class VehicleChecksViewDidEnter implements Action {
  readonly type = VEHICLE_CHECKS_VIEW_DID_ENTER;
}

export type Types =
  | VehicleChecksViewDidEnter;
