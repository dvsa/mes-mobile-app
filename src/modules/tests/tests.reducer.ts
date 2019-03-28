import * as testOutcomeActions from '../../pages/journal/components/test-outcome/test-outcome.actions';
import { preTestDeclarationsReducer } from './pre-test-declarations/pre-test-declarations.reducer';
import { candidateReducer } from './candidate/candidate.reducer';
import { combineReducers, Action } from '@ngrx/store';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { testDataReducer } from './test_data/test-data.reducer';
import { vehicleDetailsReducer } from './vehicle-details/vehicle-details.reducer';
import { accompanimentReducer } from './accompaniment/accompaniment.reducer';
import { instructorDetailsReducer } from './instructor-details/instructor-details.reducer';
import { applicationReferenceReducer } from './application-reference/application-reference.reducer';
import { passCompletionReducer } from './pass-completion/pass-completion.reducer';

export interface CurrentTest {
  slotId: string;
}

export interface TestsModel {
  currentTest: CurrentTest;
  startedTests: { [slotId: string]: StandardCarTestCATBSchema };
}

const initialState: TestsModel = {
  currentTest: { slotId: null },
  startedTests: {},
};

/**
 * Handles actions relating to a particular test by finding which test the actions apply to
 * and applying a test capture domain concept reducer against that test's portion of the state.
 * @param state Test state for all tests
 * @param action The action to modify the state
 */
export const testsReducer = (
  state = initialState,
  action: Action,
) => {
  const slotId = deriveSlotId(state, action);
  if (!slotId) {
    return state;
  }

  return {
    ...state,
    startedTests: {
      ...state.startedTests,
      [slotId]: {
        // Each sub-reducer deals with state scoped to a specific test and has no knowledge of
        // the context of which test contains it that state.
        // Here, combineReducers delegates management of the sub-state navigated here for a given
        // slotId to the relevant sub-reducer
        ...combineReducers(
          {
            preTestDeclarations: preTestDeclarationsReducer,
            candidate: candidateReducer,
            testData: testDataReducer,
            vehicleDetails: vehicleDetailsReducer,
            accompaniment: accompanimentReducer,
            instructorDetails: instructorDetailsReducer,
            applicationReference: applicationReferenceReducer,
            passCompletion: passCompletionReducer,
          },
        // @ts-ignore
        )(state.startedTests[slotId], action),
      },
    },
    currentTest: {
      slotId,
    },
  };
};

const deriveSlotId = (state: TestsModel, action): string | null => {
  if (action instanceof testOutcomeActions.TestOutcomeStartTest) {
    return `${action.payload.slotDetail.slotId}`;
  }
  return (state.currentTest && state.currentTest.slotId) ? state.currentTest.slotId : null;
};
