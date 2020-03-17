import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector } from '@ngrx/store';
import { some } from 'lodash';
import { CatGUniqueTypes } from '@dvsa/mes-test-schema/categories/G';
import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { CatKUniqueTypes } from '@dvsa/mes-test-schema/categories/K';

type VehicleChecksUnion =
  | CatFUniqueTypes.VehicleChecks
  | CatGUniqueTypes.VehicleChecks
  | CatHUniqueTypes.VehicleChecks
  | CatKUniqueTypes.VehicleChecks;

export const getSelectedShowMeQuestions = (
  vehicleChecks: VehicleChecksUnion,
): QuestionResult[] => {
  return vehicleChecks.showMeQuestions;
};

export const getSelectedTellMeQuestions = (
  vehicleChecks: VehicleChecksUnion,
): QuestionResult[] => {
  return vehicleChecks.tellMeQuestions;
};

export const vehicleChecksExist = (vehicleChecks: VehicleChecksUnion): boolean => {
  const questions = [...vehicleChecks.showMeQuestions, ... vehicleChecks.tellMeQuestions];
  return some(questions, fault => fault.outcome != null);
};

export const getVehicleChecksCatHomeTest =
  createFeatureSelector<VehicleChecksUnion>('vehicleChecks');
