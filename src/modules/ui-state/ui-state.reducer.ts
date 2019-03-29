import { createFeatureSelector, combineReducers } from '@ngrx/store';
import { waitingRoomToCarReducer } from './waiting-room-to-car/waiting-room-to-car.reducer';

interface UiStateModel {
  waitingRoomToCar: {};
}

export const uiStateReducer = combineReducers({
  waitingRoomToCar: waitingRoomToCarReducer,
});

export const getUiState = createFeatureSelector<UiStateModel>('ui');
