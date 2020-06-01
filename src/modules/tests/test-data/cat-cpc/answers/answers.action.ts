import { Action } from '@ngrx/store';
import { Answer } from '@dvsa/mes-test-schema/categories/CPC';

export const POPULATE_ANSWER = '[WRTC] [CatCPC] Populate answer';

export class PopulateAnswer implements Action {
  readonly type = POPULATE_ANSWER;
  constructor(public payload: Answer) {
  }
}

export type Types =
  | PopulateAnswer;
