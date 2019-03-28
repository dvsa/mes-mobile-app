import { Action } from '@ngrx/store';

export const INSTRUCTOR_REGISTRATION_NUMBER_CHANGED = '[Vehicle Details] Instructor registration number changed';

export class InstructorRegistrationNumberChanged implements Action {
  readonly type = INSTRUCTOR_REGISTRATION_NUMBER_CHANGED;
  constructor(public instructorRegistrationNumber: string) {}
}

export type Types =
  | InstructorRegistrationNumberChanged;
