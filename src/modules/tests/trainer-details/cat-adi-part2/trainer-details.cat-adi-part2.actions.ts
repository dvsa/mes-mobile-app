import { Action } from '@ngrx/store';

export const ORDIT_CHANGED = '[WRTC] [CatADIPart2] Ordit Trained changed';
export const TRAINING_RECORDS_CHANGED = '[WRTC] [CatADIPart2] Training Records changed';
export const TRAINER_REGISTRATION_NUMBER_CHANGED = '[WRTC] Trainer registration number changed';

export class OrditTrainedChanged implements Action {
  readonly type = ORDIT_CHANGED;
  constructor(public orditChanged: boolean) { }
}

export class TrainingRecordsChanged implements Action {
  readonly type = TRAINING_RECORDS_CHANGED;
  constructor(public trainingRecordChanged: boolean) { }
}

export class TrainerRegistrationNumberChanged implements Action {
  readonly type = TRAINER_REGISTRATION_NUMBER_CHANGED;
  constructor(public trainerRegistrationNumber: number) {}
}

export type Types =
  OrditTrainedChanged |
  TrainingRecordsChanged |
  TrainerRegistrationNumberChanged;
