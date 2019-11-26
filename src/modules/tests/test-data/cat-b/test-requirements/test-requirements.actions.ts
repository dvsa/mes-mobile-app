import { Action } from '@ngrx/store';
import { LegalRequirements } from '../../test-data.constants';

export const TOGGLE_LEGAL_REQUIREMENT = '[Legal Requirements] Toggle Legal Requirement';

export class ToggleLegalRequirement implements Action {
  constructor(public payload: LegalRequirements) { }
  readonly type = TOGGLE_LEGAL_REQUIREMENT;
}

export type Types =
  | ToggleLegalRequirement;
