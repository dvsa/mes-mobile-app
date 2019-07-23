import { Action } from '@ngrx/store';
import { CommunicationMethod, ConductedLanguage } from '@dvsa/mes-test-schema/categories/B';

export const CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_EMAIL
  = '[Communication page] Candidate confirmed communication preferences as email';
export const CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_POST
  = '[Communication page] Candidate confirmed communication preferences as post';
export const CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_ENGLISH
  = '[Communication page] Candidate chose to proceed with test in English';
export const CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_WELSH
  = '[Communication page] Candidate chose to proceed with test in Welsh';

export class CandidateChoseEmailAsCommunicationPreference implements Action {
  readonly type = CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_EMAIL;
  constructor(public updatedEmail: string, public communicationMethod: CommunicationMethod) {}
}

export class CandidateChosePostAsCommunicationPreference implements Action {
  readonly type = CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_POST;
  constructor(public communicationMethod: CommunicationMethod) { }
}

export class CandidateChoseToProceedWithTestInEnglish implements Action {
  readonly type = CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_ENGLISH;
  constructor(public conductedLanguage: ConductedLanguage) { }
}

export class CandidateChoseToProceedWithTestInWelsh implements Action {
  readonly type = CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_WELSH;
  constructor(public conductedLanguage: ConductedLanguage) { }
}

export type Types =
  | CandidateChoseEmailAsCommunicationPreference
  | CandidateChosePostAsCommunicationPreference
  | CandidateChoseToProceedWithTestInEnglish
  | CandidateChoseToProceedWithTestInWelsh;
