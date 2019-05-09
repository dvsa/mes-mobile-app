import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, filter, map } from 'rxjs/operators';
import { TestPersistenceProvider } from '../../providers/test-persistence/test-persistence';
import { from } from 'rxjs/observable/from';
import * as testActions from './tests.actions';
import { of } from 'rxjs/observable/of';
import { TestSlotAttributes, TestCentre, Candidate } from '@dvsa/mes-test-schema/categories/B';
import { PopulateApplicationReference } from './application-reference/application-reference.actions';
import { PopulateCandidateDetails } from './candidate/candidate.actions';
import { Application } from '../../shared/models/DJournal';

@Injectable()
export class TestsEffects {
  constructor(
    private actions$: Actions,
    private testPersistenceProvider: TestPersistenceProvider,
  ) {}

  @Effect({ dispatch: false })
  persistTestsEffect$ = this.actions$.pipe(
    ofType(testActions.PERSIST_TESTS),
    switchMap(() => this.testPersistenceProvider.persistAllTests()),
    catchError((err) => {
      console.log(`Error persisting tests: ${err}`);
      return of();
    }),
  );

  @Effect()
  loadPersistedTestsEffect$ = this.actions$.pipe(
    ofType(testActions.LOAD_PERSISTED_TESTS),
    switchMap(() => from(this.testPersistenceProvider.loadPersistedTests()).pipe(
      filter(testsModel => testsModel !== null),
      map(testsModel => new testActions.LoadPersistedTestsSuccess(testsModel)),
      catchError((err) => {
        console.log(`Error reading persisted tests: ${err}`);
        return of();
      }),
    )),
  );

  @Effect()
  startPracticeTestEffect$ = this.actions$.pipe(
    ofType(testActions.START_PRACTICE_TEST),
    switchMap(() => {
      const slot = {
        slotData: {
          ...practiceSlot,
        },
      };

      return [
        new PopulateApplicationReference(slot.slotData.booking.application),
        new PopulateCandidateDetails(slot.slotData.booking.candidate),
      ];
    }),
  );

  extractTestSlotAttributes = (slotData): TestSlotAttributes => {
    return {
      welshTest: slotData.booking.application.welshTest,
      slotId: slotData.slotDetail.slotId,
      start: slotData.slotDetail.start,
      specialNeeds: slotData.booking.application.specialNeeds,
      vehicleSlotType: slotData.vehicleSlotType,
      extendedTest: slotData.booking.application.extendedTest,
    };
  }

  extractTestCentre = (slotData): TestCentre => {
    return {
      costCode: slotData.testCentre.costCode,
    };
  }

}

export const application: Application = {
  applicationId: 1234569,
  bookingSequence: 1,
  checkDigit: 9,
  entitlementCheck: false,
  extendedTest: false,
  progressiveAccess: false,
  testCategory: 'B',
  vehicleGearbox: 'Manual',
  welshTest: false,
};

export const candidate: Candidate = {
  candidateAddress: {
    addressLine1: 'My House',
    addressLine2: 'Someplace',
    addressLine3: 'Sometown',
    postcode: 'AB45 6CD',
  },
  candidateId: 1,
  candidateName: {
    firstName: 'Practice',
    lastName: 'Mode',
    title: 'Miss',
  },
  driverNumber: 'MODEX625220A99HC',
  mobileTelephone: '07654 123456',
};

const practiceSlot = {
  slotDetail: {
    slotId: 1,
    duration: 57,
    start: '2019-01-01T10:14:00+00:00',
  },
  booking: {
    application,
    candidate,
  },
};
