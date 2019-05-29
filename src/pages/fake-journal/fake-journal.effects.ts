import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as fakeJournalActions from './fake-journal.actions';
import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import { fakeJournalTestSlots } from './__mocks__/fake-journal.mock';
import { end2endPracticeSlotId } from '../../modules/tests/__mocks__/tests.mock';
import { PopulateApplicationReference } from '../../modules/tests/application-reference/application-reference.actions';
import { PopulateCandidateDetails } from '../../modules/tests/candidate/candidate.actions';
import {
  PopulateTestSlotAttributes,
  extractTestSlotAttributes,
} from '../../modules/tests/test-slot-attributes/test-slot-attributes.actions';
import { PopulateTestCentre } from '../../modules/tests/test-centre/test-centre.actions';

@Injectable()
export class FakeJournalEffects {
  constructor(
    private actions$: Actions,
  ) {}

  @Effect()
  startE2EPracticeTestEffect$ = this.actions$.pipe(
    ofType(fakeJournalActions.START_E2E_PRACTICE_TEST),
    switchMap((action) => {
      const startTestAction = action as fakeJournalActions.StartE2EPracticeTest;
      let slot = fakeJournalTestSlots.find(s => s.slotDetail.slotId === startTestAction.slotId);
      // Avoid mutating mock slot data
      slot = JSON.parse(JSON.stringify(slot));
      slot.slotDetail.slotId = end2endPracticeSlotId as any;

      return [
        new PopulateApplicationReference(slot.booking.application),
        new PopulateCandidateDetails(slot.booking.candidate),
        new PopulateTestSlotAttributes(extractTestSlotAttributes(slot)),
        new PopulateTestCentre({ costCode: slot.testCentre.costCode }),
        new testStatusActions.SetTestStatusBooked(end2endPracticeSlotId),
      ];
    }),
  );

}
