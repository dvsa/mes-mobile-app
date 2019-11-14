import { Action } from '@ngrx/store';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';

export const SHOW_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatBE] Show Me Question Selected';
export const SHOW_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatBE] Show Me Question Outcome Changed';
export const TELL_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatBE] Tell Me Question Selected';
export const TELL_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatBE] Tell Me Question Outcome Changed';

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

export type Types =
  | ShowMeQuestionSelected
  | ShowMeQuestionOutcomeChanged
  | TellMeQuestionSelected
  | TellMeQuestionOutcomeChanged;
