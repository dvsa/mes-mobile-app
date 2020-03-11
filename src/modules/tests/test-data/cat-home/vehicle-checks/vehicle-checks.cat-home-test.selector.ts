import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector } from '@ngrx/store';
import { some } from 'lodash';

export const getSelectedShowMeQuestions = (
  vehicleChecks: CatFUniqueTypes.VehicleChecks,
): QuestionResult[] => {
  return vehicleChecks.showMeQuestions;
};

export const getSelectedTellMeQuestions = (
  vehicleChecksCatBEReducer: CatFUniqueTypes.VehicleChecks,
): QuestionResult[] => {
  return vehicleChecksCatBEReducer.tellMeQuestions;
};

export const vehicleChecksExist = (vehicleChecks: CatFUniqueTypes.VehicleChecks): boolean => {
  const questions = [...vehicleChecks.showMeQuestions, ... vehicleChecks.tellMeQuestions];
  return some(questions, fault => fault.outcome != null);
};

export const getVehicleChecksCatBE =
  createFeatureSelector<CatFUniqueTypes.VehicleChecks>('vehicleChecks');
