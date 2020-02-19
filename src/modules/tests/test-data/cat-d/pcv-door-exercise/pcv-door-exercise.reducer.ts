import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import * as pcvDoorExerciseActions from './pcv-door-exercise.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: CatDUniqueTypes.PcvDoorExercise = {
  dangerousFault: null,
  seriousFault: null,
  drivingFault: null,
  dangerousFaultComments: null,
  seriousFaultComments: null,
  drivingFaultComments: null,
};

export function pcvDoorExerciseReducer(
  state = initialState,
  action: pcvDoorExerciseActions.Types,
): CatDUniqueTypes.PcvDoorExercise {
  switch (action.type) {
    case pcvDoorExerciseActions.PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT:
      return {
        ...state,
        drivingFault: true,

      };
    case pcvDoorExerciseActions.PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT:
      return {
        ...state,
        seriousFault:  true,

      };
    case pcvDoorExerciseActions.PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT:
      return {
        ...state,
        dangerousFault: true,

      };

    case pcvDoorExerciseActions.PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT:
      return {
        ...state,
        drivingFault: false,

      };
    case pcvDoorExerciseActions.PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT:
      return {
        ...state,
        seriousFault:  false,

      };
    case pcvDoorExerciseActions.PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT:
      return {
        ...state,
        dangerousFault: false,

      };
    default:
      return state;
  }
}

export const getPcvDoorExercise = createFeatureSelector<CatDUniqueTypes.PcvDoorExercise>('pcvDoorExercise');
