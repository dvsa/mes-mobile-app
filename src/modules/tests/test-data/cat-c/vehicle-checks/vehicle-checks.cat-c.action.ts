import { Action } from '@ngrx/store';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';

export const SHOW_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatC] Show Me Question Selected';
export const SHOW_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatC] Show Me Question Outcome Changed';
export const TELL_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatC] Tell Me Question Selected';
export const TELL_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatC] Tell Me Question Outcome Changed';
export const ADD_SHOW_ME_TELL_ME_COMMENT = '[Vehicle Checks] [CatC] Add Show me Tell me comment';

export class ShowMeQuestionSelected implements Action {
  readonly type = SHOW_ME_QUESTION_SELECTED;
  constructor(public showMeQuestion: QuestionResult, public index: number) {}
}

export class ShowMeQuestionOutcomeChanged implements Action {
  readonly type = SHOW_ME_QUESTION_OUTCOME_CHANGED;
  constructor(public showMeQuestionOutcome: QuestionOutcome, public index: number) {}
}

export class TellMeQuestionSelected implements Action {
  readonly type = TELL_ME_QUESTION_SELECTED;
  constructor(public tellMeQuestion: QuestionResult, public index: number) {}
}

export class TellMeQuestionOutcomeChanged implements Action {
  readonly type = TELL_ME_QUESTION_OUTCOME_CHANGED;
  constructor(public tellMeQuestionOutcome: QuestionOutcome, public index: number) {}
}
export class AddShowMeTellMeComment implements Action {
  constructor(public comment: string) { }
  readonly type = ADD_SHOW_ME_TELL_ME_COMMENT;
}
export type Types =
  | ShowMeQuestionSelected
  | ShowMeQuestionOutcomeChanged
  | TellMeQuestionSelected
  | TellMeQuestionOutcomeChanged
  | AddShowMeTellMeComment;
