import * as accompanimentActions from './accompaniment.actions';
import { Accompaniment } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector } from '@ngrx/store';

const initialState: Accompaniment = {};

export const accompanimentReducer = (state = initialState, action: accompanimentActions.Types) => {
  switch (action.type) {
    case accompanimentActions.INSTRUCTOR_ACCOMPANIMENT_TOGGLED:
      return {
        ...state,
        ADI: !state.ADI,
      };
    case accompanimentActions.SUPERVISOR_ACCOMPANIMENT_TOGGLED:
      return {
        ...state,
        supervisor: !state.supervisor,
      };
    case accompanimentActions.OTHER_ACCOMPANIMENT_TOGGLED:
      return {
        ...state,
        other: !state.other,
      };
    case accompanimentActions.INTERPRETER_ACCOMPANIMENT_TOGGLED:
      return {
        ...state,
        interpreter: !state.interpreter,
      };
  }
  return state;
};

export const getAccompaniment = createFeatureSelector<Accompaniment>('accompaniment');
