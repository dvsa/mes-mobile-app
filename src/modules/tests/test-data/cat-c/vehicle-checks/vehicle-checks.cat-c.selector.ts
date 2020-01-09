import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector } from '@ngrx/store';
import { some } from 'lodash';

export const getSelectedShowMeQuestions = (
  vehicleChecks: CatCUniqueTypes.VehicleChecks,
): QuestionResult[] => {
  return vehicleChecks.showMeQuestions;
};

export const getSelectedTellMeQuestions = (
  vehicleChecksCatCReducer: CatCUniqueTypes.VehicleChecks,
): QuestionResult[] => {
  return vehicleChecksCatCReducer.tellMeQuestions;
};

export const vehicleChecksExist = (vehicleChecks: CatCUniqueTypes.VehicleChecks): boolean => {
  const questions = [...vehicleChecks.showMeQuestions, ... vehicleChecks.tellMeQuestions];
  return some(questions, fault => fault.outcome != null);
};

export const getVehicleChecksCatC =
  createFeatureSelector<CatCUniqueTypes.VehicleChecks>('vehicleChecks');
