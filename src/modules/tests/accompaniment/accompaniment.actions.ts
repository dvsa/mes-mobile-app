import { Action } from '@ngrx/store';

export const INSTRUCTOR_ACCOMPANIMENT_TOGGLED = '[Accompaniment] Instructor accompaniment toggled';
export const SUPERVISOR_ACCOMPANIMENT_TOGGLED = '[Accompaniment] Supervisor accompaniment toggled';
export const OTHER_ACCOMPANIMENT_TOGGLED = '[Accompaniment] Other accompaniment toggled';

export class InstructorAccompanimentToggled implements Action {
  readonly type = INSTRUCTOR_ACCOMPANIMENT_TOGGLED;
}

export class SupervisorAccompanimentToggled implements Action {
  readonly type = SUPERVISOR_ACCOMPANIMENT_TOGGLED;
}

export class OtherAccompanimentToggled implements Action {
  readonly type = OTHER_ACCOMPANIMENT_TOGGLED;
}

export type Types =
  | InstructorAccompanimentToggled
  | SupervisorAccompanimentToggled
  | OtherAccompanimentToggled;
