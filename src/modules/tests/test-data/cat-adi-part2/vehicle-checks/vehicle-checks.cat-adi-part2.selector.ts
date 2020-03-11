import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector } from '@ngrx/store';
import { some } from 'lodash';

export const getSelectedTellMeQuestions = (
  vehicleChecksCatADIPart2Reducer: CatADI2UniqueTypes.VehicleChecks,
): QuestionResult[] => vehicleChecksCatADIPart2Reducer.tellMeQuestions;

export const vehicleChecksExist = (vehicleChecks: CatADI2UniqueTypes.VehicleChecks): boolean =>
  some(vehicleChecks.tellMeQuestions, fault => fault.outcome != null);

export const getVehicleChecksCatADI2 =
  createFeatureSelector<CatADI2UniqueTypes.VehicleChecks>('vehicleChecks');
