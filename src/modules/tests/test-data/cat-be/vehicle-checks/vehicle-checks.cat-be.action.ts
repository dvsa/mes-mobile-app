import { Action } from '@ngrx/store';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';

export const SHOW_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatBE] Show Me Question Selected';
export const SHOW_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatBE] Show Me Question Outcome Changed';
export const TELL_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatBE] Tell Me Question Selected';
export const TELL_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatBE] Tell Me Question Outcome Changed';
export const ADD_SHOW_ME_TELL_ME_COMMENT = '[Vehicle Checks] [CatBE] Add Show me Tell me comment';
export const VEHICLE_CHECKS_COMPLETED = '[Vehicle Checks] [CatBE] Vehicle Checks Completed';
export const VEHICLE_CHECKS_DRIVING_FAULTS_NUMBER_CHANGED =
  '[Vehicle Checks] [CatBE] Vehicle Checks Driving Faults Number Changed';
export const VEHICLE_CHECKS_SERIOUS_FAULTS_NUMBER_CHANGED =
  '[Vehicle Checks] [CatBE] Vehicle Checks Serious Faults Number Changed';

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

export class VehicleChecksCompletedToggled implements Action {
  constructor(public toggled: boolean) { }
  readonly type = VEHICLE_CHECKS_COMPLETED;
}
export class VehicleChecksDrivingFaultsNumberChanged implements Action {
  constructor(public payload: QuestionResult[]) { }
  readonly type = VEHICLE_CHECKS_DRIVING_FAULTS_NUMBER_CHANGED;
}
export class VehicleChecksSeriousFaultsNumberChanged implements Action {
  constructor(public payload: QuestionResult) { }
  readonly type = VEHICLE_CHECKS_SERIOUS_FAULTS_NUMBER_CHANGED;
}

export type Types =
  | VehicleChecksCompletedToggled
  | ShowMeQuestionSelected
  | ShowMeQuestionOutcomeChanged
  | TellMeQuestionSelected
  | TellMeQuestionOutcomeChanged
  | AddShowMeTellMeComment
  | VehicleChecksDrivingFaultsNumberChanged
  | VehicleChecksSeriousFaultsNumberChanged;
