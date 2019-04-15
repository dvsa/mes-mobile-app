import { Action } from '@ngrx/store';
import { ShowMeQuestion } from '../../../providers/question/show-me-question.model';

export const CANDIDATE_DESCRIPTION_CHANGED = '[Test Summary] Candidate description changed';
export const ADDITIONAL_INFORMATION_CHANGED = '[Test Summary] Additional Information changed';
export const ROUTE_NUMBER_CHANGED = '[Test Summary] Route Number changed';
export const DEBRIEF_WITNESSED = '[Test Summary] Debrief Witnessed';
export const DEBRIEF_UNWITNESSED = '[Test Summary] Debrief Unwitnessed';
export const IDENTIFICATION_USED_CHANGED = '[Test Summary] Identification used changed';
export const INDEPENDENT_DRIVING_TYPE_CHANGED = '[Test Summary] Independent driving changed';
export const D255_YES = '[Test Summary] D255 Yes';
export const D255_NO = '[Test Summary] D255 No';
export const SHOW_ME_QUESTION_SELECTED = '[Test Summary] Show me question changed';

export class AdditionalInformationChanged implements Action {
  readonly type = ADDITIONAL_INFORMATION_CHANGED;
  constructor(public additionalInformation: string) {}
}
export class CandidateDescriptionChanged implements Action {
  readonly type = CANDIDATE_DESCRIPTION_CHANGED;
  constructor(public description: string) {}
}

export class RouteNumberChanged implements Action {
  readonly type = ROUTE_NUMBER_CHANGED;
  constructor(public routeNumber: number) {}
}

export class DebriefWitnessed implements Action {
  readonly type = DEBRIEF_WITNESSED;
  constructor() {}
}

export class DebriefUnwitnessed implements Action {
  readonly type = DEBRIEF_UNWITNESSED;
  constructor() {}
}

export class IdentificationUsedChanged implements Action {
  readonly type = IDENTIFICATION_USED_CHANGED;
  constructor(public identification: any) {}
}

export class IndependentDrivingTypeChanged implements Action {
  readonly type = INDEPENDENT_DRIVING_TYPE_CHANGED;
  constructor(public drivingType: any) {}
}

export class D255Yes implements Action {
  readonly type = D255_YES;
  constructor() {}
}
export class D255No implements Action {
  readonly type = D255_NO;
  constructor() {}
}

export class ShowMeQuestionSelected implements Action {
  constructor(public showMeQuestion: ShowMeQuestion) {}
  readonly type = SHOW_ME_QUESTION_SELECTED;
}

export type Types =
  | AdditionalInformationChanged
  | CandidateDescriptionChanged
  | RouteNumberChanged
  | DebriefWitnessed
  | DebriefUnwitnessed
  | IdentificationUsedChanged
  | IndependentDrivingTypeChanged
  | D255Yes
  | D255No
  | ShowMeQuestionSelected;
