import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as journalActions from './../journal/journal.actions';
import { PopulateApplicationReference } from '../../modules/tests/application-reference/application-reference.actions';
import { PopulateCandidateDetails } from '../../modules/tests/candidate/candidate.actions';
import { Candidate } from '@dvsa/mes-test-schema/categories/B';
import { Application } from '../../shared/models/DJournal';

@Injectable()
export class TestReportPracticeModeEffects {

  constructor(
    private actions$: Actions,
  ) {}

  @Effect()
  startPracticeTestEffect$ = this.actions$.pipe(
    ofType(journalActions.START_PRACTICE_TEST),
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

}

const application: Application = {
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

const candidate: Candidate = {
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
