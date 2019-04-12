import { Action } from '@ngrx/store';
import { ShowMeQuestion } from '../../providers/question/show-me-question.model';

export const OFFICE_VIEW_DID_ENTER = '[OfficePage] Office view did enter';
export const SHOW_ME_QUESTION_SELECTED = '[OfficePage] Office view did enter';

export class OfficeViewDidEnter implements Action {
  readonly type = OFFICE_VIEW_DID_ENTER;
}

export class ShowMeQuestionSelected implements Action {
  constructor(public tellMeQuestion: ShowMeQuestion) {}
  readonly type = SHOW_ME_QUESTION_SELECTED;
}

export type Types =
  | OfficeViewDidEnter
  | ShowMeQuestionSelected
  ;
