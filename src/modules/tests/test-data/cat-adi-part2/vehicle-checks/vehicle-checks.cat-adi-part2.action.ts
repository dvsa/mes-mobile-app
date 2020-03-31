import { Action } from '@ngrx/store';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';

export const TELL_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatADI2] Tell Me Question Selected';
export const TELL_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatADI2] Tell Me Question Outcome Changed';
export const SHOW_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatADI2] Show Me Question Selected';
export const SHOW_ME_QUESTION_DRIVING_FAULT = '[Vehicle Checks] [CatADI2] Show Me Question Driving Fault';
export const VEHICLE_CHECKS_SERIOUS_FAULT = '[Vehicle Checks] [CatADI2] Vehicle Checks Serious Fault';
export const VEHICLE_CHECKS_DANGEROUS_FAULT = '[Vehicle Checks] [CatADI2] Vehicle Checks Dangerous Fault';
export const VEHICLE_CHECKS_REMOVE_SERIOUS_FAULT = '[Vehicle Checks] [CatADI2] Vehicle Checks Remove Serious Fault';
export const VEHICLE_CHECKS_REMOVE_DANGEROUS_FAULT = '[Vehicle Checks] [CatADI2] Vehicle Checks Remove Dangerous Fault';
export const SHOW_ME_QUESTION_PASSED = '[Vehicle Checks] [CatADI2] Show Me Question Passed';
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
export class ShowMeQuestionDrivingFault implements Action {
  readonly type = SHOW_ME_QUESTION_DRIVING_FAULT;
}
export class VehicleChecksSeriousFault implements Action {
  readonly type = VEHICLE_CHECKS_SERIOUS_FAULT;
}
export class VehicleChecksDangerousFault implements Action {
  readonly type = VEHICLE_CHECKS_DANGEROUS_FAULT;
}
export class ShowMeQuestionPassed implements Action {
  readonly type = SHOW_ME_QUESTION_PASSED;
}
export class VehicleChecksRemoveSeriousFault implements Action {
  readonly type = VEHICLE_CHECKS_REMOVE_SERIOUS_FAULT;
}
export class VehicleChecksRemoveDangerousFault implements Action {
  readonly type = VEHICLE_CHECKS_REMOVE_DANGEROUS_FAULT;
}
export type Types =
  | TellMeQuestionSelected
  | TellMeQuestionOutcomeChanged
  | AddShowMeTellMeComment
  | ShowMeQuestionDrivingFault
  | VehicleChecksSeriousFault
  | VehicleChecksDangerousFault
  | VehicleChecksRemoveSeriousFault
  | VehicleChecksRemoveDangerousFault
  | ShowMeQuestionPassed;
