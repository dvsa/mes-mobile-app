import * as instructorDetailsActions from './instructor-details.actions';
import { Accompaniment, InstructorDetails } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector } from '@ngrx/store';

const initialState: InstructorDetails = {};

export const instructorDetailsReducer = (state = initialState, action: instructorDetailsActions.Types) => {
  switch (action.type) {
    case instructorDetailsActions.INSTRUCTOR_REGISTRATION_NUMBER_CHANGED:
      return {
        ...state,
        registrationNumber: action.instructorRegistrationNumber,
      };
    default:
      return state;
  }
};

export const getInstructorDetails = createFeatureSelector<Accompaniment>('instructorDetails');
