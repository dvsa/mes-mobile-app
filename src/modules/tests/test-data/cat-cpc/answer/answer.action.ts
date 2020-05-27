import { Action } from '@ngrx/store';
import { Answer } from '@dvsa/mes-test-schema/categories/CPC';

export const TOGGLE_ANSWER = '[CatCPC] Populate answer';

export class ToggleAnswer implements Action {
  readonly type = TOGGLE_ANSWER;
  constructor(public payload: Answer) {
  }
}

export type Types =
  | ToggleAnswer;
