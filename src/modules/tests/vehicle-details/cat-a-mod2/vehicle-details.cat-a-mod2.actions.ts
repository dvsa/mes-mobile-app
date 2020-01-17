import { Action } from '@ngrx/store';

export const SCHOOL_BIKE_TOGGLED = '[Vehicle Details] School Bike toggled';

export class SchoolCarToggled implements Action {
  readonly type = SCHOOL_BIKE_TOGGLED;
}

export type Types =
 | SchoolCarToggled;
