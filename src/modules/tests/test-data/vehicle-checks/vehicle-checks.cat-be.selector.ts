import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/Common';
import { createFeatureSelector } from '@ngrx/store';

// export const getVehicleChecksCatBe = (vehicleChecksCatBEReducer: CatBEUniqueTypes.TestData): CatBEUniqueTypes.VehicleChecks => vehicleChecksCatBEReducer.vehicleChecks;
export const getSelectedShowMeQuestions = (vehicleChecksCatBEReducer: CatBEUniqueTypes.VehicleChecks): QuestionResult[] => vehicleChecksCatBEReducer.showMeQuestions;
export const getVehicleChecksCatBe = createFeatureSelector<CatBEUniqueTypes.VehicleChecks>('vehicleChecks');