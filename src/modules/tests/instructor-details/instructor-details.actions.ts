import { Action } from '@ngrx/store';

export const INSTRUCTOR_REGISTRATION_NUMBER_CHANGED = '[Vehicle Details] Instructor registration number changed';

export const INSTRUCTOR_REGISTRATION_NUMBER_REMOVED = '[Vehicle Details] Instructor registration number removed';

export class InstructorRegistrationNumberChanged implements Action {
  readonly type = INSTRUCTOR_REGISTRATION_NUMBER_CHANGED;
  constructor(public instructorRegistrationNumber: number) {}
}

export class InstructorRegistrationNumberRemoved implements Action {
  readonly type = INSTRUCTOR_REGISTRATION_NUMBER_REMOVED;
  constructor() {}
}

export type Types =
  | InstructorRegistrationNumberChanged
  | InstructorRegistrationNumberRemoved;
