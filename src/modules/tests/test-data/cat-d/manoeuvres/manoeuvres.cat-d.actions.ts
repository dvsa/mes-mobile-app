import { Action } from '@ngrx/store';

export const DESELECT_REVERSE_LEFT_MANOEUVRE_CAT_D = '[CatD] [Manoeuvres] Deselect Reverse Left Manoeuvre';

export class DeselectReverseLeftManoeuvreCatD implements Action {
  readonly type = DESELECT_REVERSE_LEFT_MANOEUVRE_CAT_D;
}

export type Types =
  | DeselectReverseLeftManoeuvreCatD;
