
import { createFeatureSelector } from '@ngrx/store';
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import * as vehicleChecksActions from './vehicle-checks.actions';

export const initialState: VehicleChecks = {};

export function vehicleChecksReducer(
  state = initialState,
  action: vehicleChecksActions.Types,
): VehicleChecks {
  return state;
}

export const getVehicleChecks = createFeatureSelector<VehicleChecks>('vehicleChecks');
