import { Action } from '@ngrx/store';

export const DESELECT_REVERSE_LEFT_MANOEUVRE_CAT_C = '[CatC] [Manoeuvres] Deselect Reverse Left Manoeuvre';

export class DeselectReverseLeftManoeuvreCatC implements Action {
  readonly type = DESELECT_REVERSE_LEFT_MANOEUVRE_CAT_C;
}

export type Types =
  | DeselectReverseLeftManoeuvreCatC;
