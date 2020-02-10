import { Action } from '@ngrx/store';
import { SingleFaultCompetencyConstants } from './single-fault-competencies.constants';
import { SingleFaultCompetencyOutcome } from '@dvsa/mes-test-schema/categories/AM1';

export const SET_SINGLE_FAULT_COMPETENCY_OUTCOME = '[Single Fault Competency] Set Outcome';
export const REMOVE_SINGLE_FAULT_COMPETENCY_OUTCOME = '[Single Fault Competency] Remove Outcome';
export const ADD_SINGLE_FAULT_COMPETENCY_COMMENT = '[Single Fault Competency] Add Comment';

export class SetSingleFaultCompetencyOutcome implements Action {
  constructor(public competencyName: SingleFaultCompetencyConstants,
              public outcome: SingleFaultCompetencyOutcome) {
  }

  readonly type = SET_SINGLE_FAULT_COMPETENCY_OUTCOME;
}

export class RemoveSingleFaultCompetencyOutcome implements Action {
  constructor(public competencyName: SingleFaultCompetencyConstants) {
  }

  readonly type = REMOVE_SINGLE_FAULT_COMPETENCY_OUTCOME;
}

export class AddSingleFaultCompetencyComment implements Action {
  constructor(public competencyName: SingleFaultCompetencyConstants,
              public comment: string) {
  }

  readonly type = ADD_SINGLE_FAULT_COMPETENCY_COMMENT;
}

export type Types =
  | SetSingleFaultCompetencyOutcome
  | RemoveSingleFaultCompetencyOutcome
  | AddSingleFaultCompetencyComment;
