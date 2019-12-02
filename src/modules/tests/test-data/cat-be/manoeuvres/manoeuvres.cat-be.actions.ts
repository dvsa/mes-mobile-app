import { Action } from '@ngrx/store';

export const DESELECT_REVERSE_LEFT_MANOEUVRE = '[Manoeuvres] [CatBE] Deselect Reverse Left Manoeuvre';

export class DeselectReverseLeftManoeuvre implements Action {
  readonly type = DESELECT_REVERSE_LEFT_MANOEUVRE;
}

export type Types =
  | DeselectReverseLeftManoeuvre;
