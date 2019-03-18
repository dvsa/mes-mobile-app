import { Action } from '@ngrx/store';
import { Candidate } from '../../../shared/models/DJournal';

export const CHANGE_ACTIVE_CANDIDATE = '[Candidate] Active candidate changed';

export class ChangeActiveCandidate implements Action {
  readonly type = CHANGE_ACTIVE_CANDIDATE;
  constructor(public payload: Candidate) {}
}

export type Types =
  | ChangeActiveCandidate;
