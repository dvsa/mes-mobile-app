import { Action } from '@ngrx/store';
import { CommunicationMethod } from '@dvsa/mes-test-schema/categories/B';

export const CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_EMAIL
  = '[Communication page] Candidate confirmed communication preferences as email';
export const CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_POST
  = '[Communication page] Candidate confirmed communication preferences as post';
export const CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_SUPPORT_CENTRE
  = '[Communication page] Candidate confirmed communication preferences as support centre';

export class CandidateChoseEmailAsCommunicationPreference implements Action {
  readonly type = CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_EMAIL;
  constructor(public updatedEmail: string, public communicationMethod: CommunicationMethod) {}
}

export class CandidateChosePostAsCommunicationPreference implements Action {
  readonly type = CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_POST;
  constructor(public communicationMethod: CommunicationMethod) { }
}

export class CandidateChoseSupportCentreAsCommunicationPreference implements Action {
  readonly type = CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_SUPPORT_CENTRE;
  constructor(public communicationMethod: CommunicationMethod) { }
}

export type Types =
  | CandidateChoseEmailAsCommunicationPreference
  | CandidateChosePostAsCommunicationPreference
  | CandidateChoseSupportCentreAsCommunicationPreference;
