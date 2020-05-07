import * as trainerDetailActions from './trainer-details.cat-adi-part2.actions';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { createFeatureSelector } from '@ngrx/store';

const initialState: CatADI2UniqueTypes.TrainerDetails = {
  orditTrainedCandidate: null,
  trainingRecords: null,
  trainerRegistrationNumber: null,
};

export const trainerDetailsCatADIPart2Reducer = (
  state: CatADI2UniqueTypes.TrainerDetails = initialState,
  action: trainerDetailActions.Types,
): CatADI2UniqueTypes.TrainerDetails => {
  switch (action.type) {
    case trainerDetailActions.ORDIT_CHANGED:
      return {
        ...state,
        orditTrainedCandidate: action.orditChanged,
      };
    case trainerDetailActions.TRAINING_RECORDS_CHANGED:
      return {
        ...state,
        trainingRecords: action.trainingRecordChanged,
      };
    case trainerDetailActions.TRAINER_REGISTRATION_NUMBER_CHANGED:
      return {
        ...state,
        trainerRegistrationNumber: action.trainerRegistrationNumber,
      };
    default:
      return state;
  }
};

export const getTrainerDetails = createFeatureSelector<CatADI2UniqueTypes.TrainerDetails>('trainerDetails');
