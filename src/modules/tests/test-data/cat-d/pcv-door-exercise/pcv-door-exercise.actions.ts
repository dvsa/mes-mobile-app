import { Action } from '@ngrx/store';

// export const TOGGLE_PCV_DOOR_EXERCISE = '[PcvDoorExercise] Toggle Controlled Stop';
export const PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT = '[PcvDoorExercise] Add Driving Fault';
export const PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT = '[PcvDoorExercise] Add Serious Fault';
export const PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT = '[PcvDoorExercise] Add Dangerous Fault';

export const PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT = '[PcvDoorExercise] Remove Driving Fault';
export const PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT = '[PcvDoorExercise] Remove Serious Fault';
export const PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT = '[PcvDoorExercise] Remove Dangerous Fault';

// export const PCV_DOOR_EXERCISE_REMOVE_FAULT = '[PcvDoorExercise] Remove Fault';
export const ADD_PCV_DOOR_EXERCISE_COMMENT = '[PcvDoorExercise] Add Comment';

// export class TogglePcvDoorExercise implements Action {
//   readonly type = TOGGLE_PCV_DOOR_EXERCISE;
// }

export class PcvDoorExerciseAddDrivingFault implements Action {
  readonly type = PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT;
}
export class PcvDoorExerciseAddSeriousFault implements Action {
  readonly type = PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT;
}

export class PcvDoorExerciseAddDangerousFault implements Action {
  readonly type = PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT;
}

export class PcvDoorExerciseRemoveDrivingFault implements Action {
  readonly type = PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT;
}
export class PcvDoorExerciseRemoveSeriousFault implements Action {
  readonly type = PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT;
}

export class PcvDoorExerciseRemoveDangerousFault implements Action {
  readonly type = PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT;
}

export class AddPcvDoorExerciseComment implements Action {
  readonly type = ADD_PCV_DOOR_EXERCISE_COMMENT;
  constructor(public comment: string) { }
}

export type Types =

  | PcvDoorExerciseAddDrivingFault
  | PcvDoorExerciseAddSeriousFault
  | PcvDoorExerciseAddDangerousFault

  | PcvDoorExerciseRemoveDrivingFault
  | PcvDoorExerciseRemoveSeriousFault
  | PcvDoorExerciseRemoveDangerousFault

  | AddPcvDoorExerciseComment;
