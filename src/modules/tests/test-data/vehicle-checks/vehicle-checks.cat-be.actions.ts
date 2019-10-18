import { Action } from '@ngrx/store';

// !!! IMPORTANT !!!
// These actions are just placeholders for when we actually build the real actions
// -------
// Please Delete all these actions when adding a real one

export const ADD_TELL_ME_QUESTION = 'Add Tell Me Question';
export const ADD_SHOW_ME_QUESTION = 'Add Show Me Question';

export class AddTellMeQuestion implements Action {
  readonly type = ADD_TELL_ME_QUESTION;
}

export class AddShowMeQuestion implements Action {
  readonly type = ADD_SHOW_ME_QUESTION;
}

export type Types =
  | AddTellMeQuestion
  | AddShowMeQuestion;
