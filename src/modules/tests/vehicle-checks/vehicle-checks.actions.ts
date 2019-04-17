import { Action } from '@ngrx/store';
import { TellMeQuestion } from '../../../providers/question/tell-me-question.model';
import { ShowMeQuestion } from './../../../providers/question/show-me-question.model';

export const TELL_ME_QUESTION_SELECTED = '[Vehicle Checks] Tell me question selected';
export const TELL_ME_QUESTION_CORRECT = '[Vehicle Checks] Tell me question correct';
export const TELL_ME_QUESTION_DRIVING_FAULT = '[Vehicle Checks] Tell me question driving fault';
export const SHOW_ME_QUESTION_SELECTED = '[Vehicle Checks] Show me question selected';

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

export class ShowMeQuestionSelected implements Action {
  constructor(public showMeQuestion: ShowMeQuestion) {}
  readonly type = SHOW_ME_QUESTION_SELECTED;
}

export type Types =
  | TellMeQuestionSelected
  | TellMeQuestionCorrect
  | TellMeQuestionDrivingFault
  | ShowMeQuestionSelected;
