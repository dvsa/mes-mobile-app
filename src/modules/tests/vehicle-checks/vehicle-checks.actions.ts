import { Action } from '@ngrx/store';
import { TellMeQuestion } from '../../../providers/question/tell-me-question.model';

export const TELL_ME_QUESTION_SELECTED = '[Vehicle Checks] Tell me question selected';
export const TELL_ME_QUESTION_CORRECT = '[Vehicle Checks] Tell me question correct';
export const TELL_ME_QUESTION_DRIVING_FAULT = '[Vehicle Checks] Tell me question driving fault';

export class TellMeQuestionSelected implements Action {
  constructor(public tellMeQuestion: TellMeQuestion) {}
  readonly type = TELL_ME_QUESTION_SELECTED;
}

export class TellMeQuestionCorrect implements Action {
  readonly type = TELL_ME_QUESTION_CORRECT;
}

export class TellMeQuestionDrivingFault implements Action {
  readonly type = TELL_ME_QUESTION_DRIVING_FAULT;
}

export type Types =
  | TellMeQuestionSelected
  | TellMeQuestionCorrect
  | TellMeQuestionDrivingFault;
