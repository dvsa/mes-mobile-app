import { createFeatureSelector } from '@ngrx/store';

import * as networkStateActions from './network-state.actions';
import { NetworkState } from './network-state.model';

export const initialState: NetworkState = {
  unauthenticatedMode: false,
  isOffline: false,
};

export function journalReducer(state = initialState, action: networkStateActions.SetUnauthenticatedMode): NetworkState {
  switch (action.type) {
    case networkStateActions.UNAUTHENTICATED_MODE:
      return {
        ...state,
        unauthenticatedMode: action.unauthenticated,
      };
    default:
      return state;
  }
}

export const getNetworkState = createFeatureSelector<NetworkState>('network');
