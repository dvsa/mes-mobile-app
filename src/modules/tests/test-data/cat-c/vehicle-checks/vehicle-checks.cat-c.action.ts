import { Action } from '@ngrx/store';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export const INITIALIZE_VEHICLE_CHECKS = '[VehicleChecksPage] [CatC] Initialize Vehicle Checks';
export const SHOW_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatC] Show Me Question Selected';
export const SHOW_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatC] Show Me Question Outcome Changed';
export const TELL_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatC] Tell Me Question Selected';
export const TELL_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatC] Tell Me Question Outcome Changed';
export const ADD_SHOW_ME_TELL_ME_COMMENT = '[Vehicle Checks] [CatC] Add Show me Tell me comment';
export const VEHICLE_CHECKS_COMPLETED = '[Vehicle Checks] [CatC] Vehicle Checks Completed';
export const VEHICLE_CHECKS_FULL_LICENCE_HELD = '[Vehicle Checks] [CatD] Full Licence Held toggled';
export const VEHICLE_CHECKS_DRIVING_FAULTS_NUMBER_CHANGED =
  '[Vehicle Checks] [CatC] Vehicle Checks Driving Faults Number Changed';
export const VEHICLE_CHECKS_DROP_EXTRA_VEHICLE_CHECKS =
  '[Vehicle Checks] [CatC] Vehicle Checks dropping extra vehicle checks as full licence held';

export class InitializeVehicleChecks implements Action {
  constructor(public category: TestCategory) { }
  readonly type = INITIALIZE_VEHICLE_CHECKS;
}
export class SetFullLicenceHeld implements Action {
  constructor(public payload: boolean) { }
  readonly type = VEHICLE_CHECKS_FULL_LICENCE_HELD;
}

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

export class DropExtraVehicleChecks implements Action {
  readonly type = VEHICLE_CHECKS_DROP_EXTRA_VEHICLE_CHECKS;
}

export type Types =
  | InitializeVehicleChecks
  | ShowMeQuestionSelected
  | ShowMeQuestionOutcomeChanged
  | TellMeQuestionSelected
  | TellMeQuestionOutcomeChanged
  | AddShowMeTellMeComment
  | VehicleChecksCompletedToggled
  | VehicleChecksDrivingFaultsNumberChanged
  | SetFullLicenceHeld
  | DropExtraVehicleChecks;
