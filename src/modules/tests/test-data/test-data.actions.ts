import { Action } from '@ngrx/store';
import { FaultPayload } from './test-data.models';
import {
  Competencies,
  LegalRequirements,
  ExaminerActions,
  ManoeuvreCompetencies,
  ManoeuvreTypes,
} from './test-data.constants';
import { TellMeQuestion } from '../../../providers/question/tell-me-question.model';
import { ShowMeQuestion } from '../../../providers/question/show-me-question.model';

export const RECORD_MANOEUVRES_SELECTION = '[Manoeuvres] Record Manoeuvres Selection';
export const ADD_MANOEUVRE_DRIVING_FAULT = '[Manoeuvres] Add Manoeuvre Driving Fault';
export const ADD_MANOEUVRE_SERIOUS_FAULT = '[Manoeuvres] Add Manoeuvre Serious Fault';
export const ADD_MANOEUVRE_DANGEROUS_FAULT = '[Manoeuvres] Add Manoeuvre Dangerous Fault';
export const REMOVE_MANOEUVRE_FAULT = '[Manoeuvres] Remove Manoeuvre Fault';
export const ADD_DRIVING_FAULT = '[Competency] Add Driving Fault';
export const ADD_SERIOUS_FAULT = '[Competency] Add Serious Fault';
export const ADD_SERIOUS_FAULT_COMMENT = '[Office] Add Serious Fault Comment';
export const ADD_DANGEROUS_FAULT = '[Competency] Add Dangerous Fault';
export const ADD_DANGEROUS_FAULT_COMMENT = '[Office] Add Dangerous Fault Comment';
export const REMOVE_DRIVING_FAULT = '[Competency] Remove Driving Fault';
export const REMOVE_SERIOUS_FAULT = '[Competency] Remove Serious Fault';
export const REMOVE_DANGEROUS_FAULT = '[Competency] Remove Dangerous Fault';
export const TOGGLE_LEGAL_REQUIREMENT = '[Legal Requirements] Toggle Legal Requirement';
export const TOGGLE_ETA = '[Eta] Toggle Eta';
export const TOGGLE_ECO = '[Eco] Toggle Eco';
export const TOGGLE_CONTROL_ECO = '[Eco] Toggle Control Eco';
export const TOGGLE_PLANNING_ECO = '[Eco] Toggle Planning Eco';
export const TOGGLE_CONTROLLED_STOP = '[ControlledStop] Toggle Controlled Stop';
export const CONTROLLED_STOP_ADD_DRIVING_FAULT = '[ControlledStop] Add Driving Fault';
export const CONTROLLED_STOP_ADD_SERIOUS_FAULT = '[ControlledStop] Add Serious Fault';
export const CONTROLLED_STOP_ADD_DANGEROUS_FAULT = '[ControlledStop] Add Dangerous Fault';
export const CONTROLLED_STOP_REMOVE_FAULT = '[ControlledStop] Remove Fault';
export const ADD_DRIVING_FAULT_COMMENT = '[Office] Add driving fault comment';

export const TELL_ME_QUESTION_SELECTED = '[Vehicle Checks] Tell me question selected';
export const TELL_ME_QUESTION_CORRECT = '[Vehicle Checks] Tell me question correct';
export const TELL_ME_QUESTION_DRIVING_FAULT = '[Vehicle Checks] Tell me question driving fault';

export const SHOW_ME_QUESTION_SELECTED = '[Vehicle Checks] Show me question selected';
export const SHOW_ME_QUESTION_PASSED = '[Vehicle Checks] Show me question passed';
export const SHOW_ME_QUESTION_DRIVING_FAULT = '[Vehicle Checks] Show me question driving fault';
export const SHOW_ME_QUESTION_SERIOUS_FAULT = '[Vehicle Checks] Show me question serious fault';
export const SHOW_ME_QUESTION_DANGEROUS_FAULT = '[Vehicle Checks] Show me question dangerous fault';
export const SHOW_ME_QUESTION_REMOVE_FAULT = '[Vehicle Checks] Show me question remove fault';

export interface ManoeuvrePayload {
  manoeuvre: ManoeuvreTypes;
  competency: ManoeuvreCompetencies;
}

export class RecordManoeuvresSelection implements Action {
  constructor(public manoeuvre: ManoeuvreTypes) { }
  readonly type = RECORD_MANOEUVRES_SELECTION;
}

export class AddManoeuvreDrivingFault implements Action {
  constructor(public payload: ManoeuvrePayload) { }
  readonly type = ADD_MANOEUVRE_DRIVING_FAULT;
}

export class AddManoeuvreSeriousFault implements Action {
  constructor(public payload: ManoeuvrePayload) { }
  readonly type = ADD_MANOEUVRE_SERIOUS_FAULT;
}

export class AddManoeuvreDangerousFault implements Action {
  constructor(public payload: ManoeuvrePayload) { }
  readonly type = ADD_MANOEUVRE_DANGEROUS_FAULT;
}

export class RemoveManoeuvreFault implements Action {
  constructor(public payload: ManoeuvrePayload) { }
  readonly type = REMOVE_MANOEUVRE_FAULT;
}
export class ControlledStopAddDrivingFault implements Action {
  readonly type = CONTROLLED_STOP_ADD_DRIVING_FAULT;
}
export class ControlledStopAddSeriousFault implements Action {
  readonly type = CONTROLLED_STOP_ADD_SERIOUS_FAULT;
}

export class ControlledStopAddDangerousFault implements Action {
  readonly type = CONTROLLED_STOP_ADD_DANGEROUS_FAULT;
}

export class ControlledStopRemoveFault implements Action {
  readonly type = CONTROLLED_STOP_REMOVE_FAULT;
}

export class AddDrivingFault implements Action {
  constructor(public payload: FaultPayload) { }
  readonly type = ADD_DRIVING_FAULT;
}
export class AddSeriousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = ADD_SERIOUS_FAULT;
}

export class AddSeriousFaultComment implements Action {
  constructor(public competencyName: string, public comment: string) { }
  readonly type = ADD_SERIOUS_FAULT_COMMENT;
}
export class AddDangerousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = ADD_DANGEROUS_FAULT;
}

export class AddDangerousFaultComment implements Action {
  constructor(public competencyName: string, public comment: string) { }
  readonly type = ADD_DANGEROUS_FAULT_COMMENT;
}

export class RemoveDrivingFault implements Action {
  constructor(public payload: FaultPayload) { }
  readonly type = REMOVE_DRIVING_FAULT;
}
export class RemoveSeriousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = REMOVE_SERIOUS_FAULT;
}
export class RemoveDangerousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = REMOVE_DANGEROUS_FAULT;
}

export class ToggleLegalRequirement implements Action {
  constructor(public payload: LegalRequirements) { }
  readonly type = TOGGLE_LEGAL_REQUIREMENT;
}

export class ToggleETA implements Action {
  constructor(public payload: ExaminerActions) { }
  readonly type = TOGGLE_ETA;
}

export class ToggleEco implements Action {
  readonly type = TOGGLE_ECO;
}
export class ToggleControlEco implements Action {
  readonly type = TOGGLE_CONTROL_ECO;
}
export class TogglePlanningEco implements Action {
  readonly type = TOGGLE_PLANNING_ECO;
}
export class ToggleControlledStop implements Action {
  readonly type = TOGGLE_CONTROLLED_STOP;
}
export class AddDrivingFaultComment implements Action {
  constructor(public competencyName: string, public comment: string) { }
  readonly type = ADD_DRIVING_FAULT_COMMENT;
}

export class TellMeQuestionSelected implements Action {
  constructor(public tellMeQuestion: TellMeQuestion) { }
  readonly type = TELL_ME_QUESTION_SELECTED;
}

export class TellMeQuestionCorrect implements Action {
  readonly type = TELL_ME_QUESTION_CORRECT;
}

export class TellMeQuestionDrivingFault implements Action {
  readonly type = TELL_ME_QUESTION_DRIVING_FAULT;
}

export class ShowMeQuestionSelected implements Action {
  constructor(public showMeQuestion: ShowMeQuestion) { }
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

export enum QuestionOutcomes {
  Pass = 'P',
  DrivingFault = 'DF',
}

export type Types =
  | RecordManoeuvresSelection
  | AddManoeuvreDrivingFault
  | AddManoeuvreSeriousFault
  | AddManoeuvreDangerousFault
  | RemoveManoeuvreFault
  | AddDrivingFault
  | AddDrivingFaultComment
  | AddSeriousFault
  | AddSeriousFaultComment
  | AddDangerousFault
  | AddDangerousFaultComment
  | RemoveDrivingFault
  | RemoveSeriousFault
  | RemoveDangerousFault
  | ToggleLegalRequirement
  | ToggleETA
  | ToggleEco
  | ToggleControlEco
  | TogglePlanningEco
  | ToggleControlledStop
  | ControlledStopAddDrivingFault
  | ControlledStopAddSeriousFault
  | ControlledStopAddDangerousFault
  | ControlledStopRemoveFault
  | TellMeQuestionSelected
  | TellMeQuestionCorrect
  | TellMeQuestionDrivingFault
  | ShowMeQuestionSelected
  | ShowMeQuestionPassed
  | ShowMeQuestionSeriousFault
  | ShowMeQuestionDangerousFault
  | ShowMeQuestionDrivingFault
  | ShowMeQuestionRemoveFault;
