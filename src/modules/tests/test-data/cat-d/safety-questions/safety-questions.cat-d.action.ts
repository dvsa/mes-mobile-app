import { Action } from '@ngrx/store';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';

export const SAFETY_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatD] Safety Question Outcome Changed';
export const ADD_SAFETY_QUESTION_COMMENT = '[Vehicle Checks] [CatD] Add SafetyQuestion comment';

export class SafetyQuestionOutcomeChanged implements Action {
  constructor(public safetyQuestionOutcome: QuestionOutcome, public index: number) { }
  readonly type = SAFETY_QUESTION_OUTCOME_CHANGED;
}

export class AddSafetyQuestionComment implements Action {
  constructor(public comment: string) { }
  readonly type = ADD_SAFETY_QUESTION_COMMENT;
}

export type Types =
  | SafetyQuestionOutcomeChanged
  | AddSafetyQuestionComment;
