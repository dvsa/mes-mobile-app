import { Action } from '@ngrx/store';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';

export const SAFETY_QUESTION_SELECTED = '[VehicleChecksPage] [CatAMod2] Safety Question Selected';
export const SAFETY_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatAMod2] Safety Question Outcome Changed';
export const BALANCE_QUESTION_SELECTED = '[VehicleChecksPage] [CatAMod2] Balance Question Selected';
export const BALANCE_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatAMod2] Balance Question Outcome Changed';
export const ADD_SAFETY_COMMENT = '[Vehicle Checks] [CatAMod2] Add Safety comment';
export const ADD_BALANCE_COMMENT = '[Vehicle Checks] [CatAMod2] Add Balance comment';

export class SafetyQuestionSelected implements Action {
  readonly type = SAFETY_QUESTION_SELECTED;
  constructor(public safetyQuestion: QuestionResult, public index: number) {}
}

export class SafetyQuestionOutcomeChanged implements Action {
  readonly type = SAFETY_QUESTION_OUTCOME_CHANGED;
  constructor(public safetyQuestionOutcome: QuestionOutcome, public index: number) {}
}

export class BalanceQuestionSelected implements Action {
  readonly type = BALANCE_QUESTION_SELECTED;
  constructor(public balanceQuestion: QuestionResult, public index: number) {}
}

export class BalanceQuestionOutcomeChanged implements Action {
  readonly type = BALANCE_QUESTION_OUTCOME_CHANGED;
  constructor(public balanceQuestionOutcome: QuestionOutcome, public index: number) {}
}

export class AddSafetyComment implements Action {
  constructor(public comment: string) { }
  readonly type = ADD_SAFETY_COMMENT;
}

export class AddBalanceComment implements Action {
  constructor(public comment: string) { }
  readonly type = ADD_BALANCE_COMMENT;
}

export type Types =
  | SafetyQuestionSelected
  | SafetyQuestionOutcomeChanged
  | BalanceQuestionSelected
  | BalanceQuestionOutcomeChanged
  | AddSafetyComment
  | AddBalanceComment;
