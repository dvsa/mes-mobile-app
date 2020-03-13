import { Action } from '@ngrx/store';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';

export const TELL_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatADI2] Tell Me Question Selected';
export const TELL_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatADI2] Tell Me Question Outcome Changed';
export const ADD_SHOW_ME_TELL_ME_COMMENT = '[Vehicle Checks] [CatADI2] Add Show Me / Tell Me comment';

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
  | TellMeQuestionSelected
  | TellMeQuestionOutcomeChanged
  | AddShowMeTellMeComment;
