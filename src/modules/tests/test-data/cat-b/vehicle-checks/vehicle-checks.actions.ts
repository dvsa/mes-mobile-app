
import { Action } from '@ngrx/store';

import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';

export const TELL_ME_QUESTION_SELECTED = '[Vehicle Checks] Tell me question selected';
export const TELL_ME_QUESTION_CORRECT = '[Vehicle Checks] Tell me question correct';
export const TELL_ME_QUESTION_DRIVING_FAULT = '[Vehicle Checks] Tell me question driving fault';
export const ADD_SHOW_ME_TELL_ME_COMMENT = '[Vehicle Checks] Add Show me Tell me comment';

export const SHOW_ME_QUESTION_SELECTED = '[Vehicle Checks] Show me question selected';

export const SHOW_ME_QUESTION_PASSED = '[Vehicle Checks] Show me question passed';
export const SHOW_ME_QUESTION_DRIVING_FAULT = '[Vehicle Checks] Show me question driving fault';
export const SHOW_ME_QUESTION_SERIOUS_FAULT = '[Vehicle Checks] Show me question serious fault';
export const SHOW_ME_QUESTION_DANGEROUS_FAULT = '[Vehicle Checks] Show me question dangerous fault';
export const SHOW_ME_QUESTION_REMOVE_FAULT = '[Vehicle Checks] Show me question remove fault';

export enum QuestionOutcomes {
  Pass = 'P',
  DrivingFault = 'DF',
}

export class TellMeQuestionSelected implements Action {
  constructor(public tellMeQuestion: VehicleChecksQuestion) { }
  readonly type = TELL_ME_QUESTION_SELECTED;
}

export class TellMeQuestionCorrect implements Action {
  readonly type = TELL_ME_QUESTION_CORRECT;
}

export class TellMeQuestionDrivingFault implements Action {
  readonly type = TELL_ME_QUESTION_DRIVING_FAULT;
}

export class ShowMeQuestionSelected implements Action {
  constructor(public showMeQuestion: VehicleChecksQuestion) { }
  readonly type = SHOW_ME_QUESTION_SELECTED;
}

export class ShowMeQuestionPassed implements Action {
  readonly type = SHOW_ME_QUESTION_PASSED;
}

export class ShowMeQuestionSeriousFault implements Action {
  readonly type = SHOW_ME_QUESTION_SERIOUS_FAULT;
}

export class ShowMeQuestionDangerousFault implements Action {
  readonly type = SHOW_ME_QUESTION_DANGEROUS_FAULT;
}

export class ShowMeQuestionDrivingFault implements Action {
  readonly type = SHOW_ME_QUESTION_DRIVING_FAULT;
}

export class ShowMeQuestionRemoveFault implements Action {
  readonly type = SHOW_ME_QUESTION_REMOVE_FAULT;
}

export class AddShowMeTellMeComment implements Action {
  constructor(public comment: string) { }
  readonly type = ADD_SHOW_ME_TELL_ME_COMMENT;
}

export type Types =
  | TellMeQuestionSelected
  | TellMeQuestionCorrect
  | TellMeQuestionDrivingFault
  | ShowMeQuestionSelected
  | ShowMeQuestionPassed
  | ShowMeQuestionSeriousFault
  | ShowMeQuestionDangerousFault
  | ShowMeQuestionDrivingFault
  | ShowMeQuestionRemoveFault
  | AddShowMeTellMeComment;
