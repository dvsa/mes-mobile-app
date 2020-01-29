import  * as changeMarkerActions from './change-marker.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: boolean = false;

export const changeMarkerReducer = (
  state = initialState,
  action: changeMarkerActions.Types,
): boolean => {
  switch (action.type) {
    case changeMarkerActions.SET_CHANGE_MARKER:
      return action.changeMarker;
    default:
      return state;
  }
};

export const getChangeMarker = createFeatureSelector<boolean>('changeMarker');
