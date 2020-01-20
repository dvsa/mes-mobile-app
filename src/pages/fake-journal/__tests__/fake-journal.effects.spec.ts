import { FakeJournalEffects } from '../fake-journal.effects';
import * as fakeJournalActions from '../fake-journal.actions';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed } from '@angular/core/testing';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  PopulateApplicationReference,
} from '../../../modules/tests/journal-data/common/application-reference/application-reference.actions';
import { fakeJournalTestSlots } from '../__mocks__/fake-journal.mock';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import {
  PopulateTestSlotAttributes,
} from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.actions';
import { PopulateTestCentre } from '../../../modules/tests/journal-data/common/test-centre/test-centre.actions';
import { SetTestStatusBooked } from '../../../modules/tests/test-status/test-status.actions';
import { Application } from '@dvsa/mes-journal-schema';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';

describe('Fake Journal Effects', () => {
  let effects: FakeJournalEffects;
  let actions$: ReplaySubject<{}>;
  let store$: Store<StoreModel>;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        FakeJournalEffects,
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(FakeJournalEffects);
    store$ = TestBed.get(Store);
  });

  describe('startE2EPracticeTestEffect', () => {
    const testId = `${end2endPracticeSlotId}_1`;
    beforeEach(() => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(testId));
    });

    it('should dispatch actions for populating startedTests with mock data', (done) => {
      // ACT
      actions$.next(new fakeJournalActions.StartE2EPracticeTest(testId));
      // ASSERT
      effects.startE2EPracticeTestEffect$.subscribe((result) => {
        const slot = fakeJournalTestSlots.find(slot => slot.slotDetail.slotId === testId);
        if (result instanceof PopulateApplicationReference)  {
          expect(result).toEqual(new PopulateApplicationReference(slot.booking.application as Application));
        }
        if (result instanceof PopulateCandidateDetails) {
          expect(result).toEqual(new PopulateCandidateDetails(slot.booking.candidate));
        }
        if (result instanceof PopulateTestSlotAttributes) {
          expect(result.payload.slotId).toEqual(testId);
        }
        if (result instanceof PopulateTestCentre) {
          expect(result.payload.costCode).toEqual(slot.testCentre.costCode);
        }
        if (result instanceof SetTestStatusBooked) {
          expect(result).toEqual(new SetTestStatusBooked(testId));
          done();
        }
      });

    });
  });
});
