import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as fakeJournalActions from './fake-journal.actions';
import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import { fakeJournalTestSlots } from './__mocks__/fake-journal.mock';
import { PopulateApplicationReference } from '../../modules/tests/application-reference/application-reference.actions';
import { PopulateCandidateDetails } from '../../modules/tests/candidate/candidate.actions';
import {
  PopulateTestSlotAttributes,
} from '../../modules/tests/test-slot-attributes/test-slot-attributes.actions';
import { PopulateTestCentre } from '../../modules/tests/test-centre/test-centre.actions';
import { Application } from '@dvsa/mes-journal-schema';
import { extractTestSlotAttributes } from '../../modules/tests/test-slot-attributes/test-slot-attributes.selector';
import { PopulateExaminer } from '../../modules/tests/examiner/examiner.actions';
import { Examiner } from '@dvsa/mes-test-schema/categories/B';

@Injectable()
export class FakeJournalEffects {
  constructor(
    private actions$: Actions,
  ) { }

  @Effect()
  startE2EPracticeTestEffect$ = this.actions$.pipe(
    ofType(fakeJournalActions.START_E2E_PRACTICE_TEST),
    switchMap((action) => {
      const startTestAction = action as fakeJournalActions.StartE2EPracticeTest;
      const slot = fakeJournalTestSlots.find(s => s.slotDetail.slotId === startTestAction.slotId);

      const examiner: Examiner = {
        staffNumber: '01234567',
      };

      return [
        new PopulateExaminer(examiner),
        new PopulateApplicationReference(slot.booking.application as Application),
        new PopulateCandidateDetails(slot.booking.candidate),
        new PopulateTestSlotAttributes(extractTestSlotAttributes(slot)),
        new PopulateTestCentre({ centreId: slot.testCentre.centreId, costCode: slot.testCentre.costCode }),
        new testStatusActions.SetTestStatusBooked(slot.slotDetail.slotId),
      ];
    }),
  );

}
