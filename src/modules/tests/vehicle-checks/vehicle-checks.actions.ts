import { Action } from '@ngrx/store';
import { TellMeQuestion } from '../../../providers/question/tell-me-question.model';

export const TELL_ME_QUESTION_SELECTED = '[Vehicle Checks] Tell me question selected';

export class TellMeQuestionSelected implements Action {
  constructor(public tellMeQuestion: TellMeQuestion) {}
  readonly type = TELL_ME_QUESTION_SELECTED;
}

export type Types =
  | TellMeQuestionSelected;
