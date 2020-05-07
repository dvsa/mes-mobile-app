import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';

export const getOrditTrained = (
  trainerDetails: CatADI2UniqueTypes.TrainerDetails) => trainerDetails.orditTrainedCandidate;

export const getTrainingRecords = (
  trainerDetails: CatADI2UniqueTypes.TrainerDetails) => trainerDetails.trainingRecords;

export const getTrainerRegistrationNumber = (
  trainerDetails: CatADI2UniqueTypes.TrainerDetails) => trainerDetails.trainerRegistrationNumber;
