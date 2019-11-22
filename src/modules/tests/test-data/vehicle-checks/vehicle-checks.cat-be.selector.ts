import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/Common';
import { createFeatureSelector } from '@ngrx/store';

export const getSelectedShowMeQuestions = (
  vehicleChecks: CatBEUniqueTypes.VehicleChecks,
): QuestionResult[] => {
  return vehicleChecks.showMeQuestions;
};

export const getSelectedTellMeQuestions = (
  vehicleChecksCatBEReducer: CatBEUniqueTypes.VehicleChecks,
): QuestionResult[] => {
  return vehicleChecksCatBEReducer.tellMeQuestions;
};

export const getVehicleChecksCatBE =
  createFeatureSelector<CatBEUniqueTypes.VehicleChecks>('vehicleChecks');
