import { FakeJournalEffects } from '../fake-journal.effects';
import * as fakeJournalActions from '../fake-journal.actions';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { ReplaySubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  PopulateApplicationReference,
} from '../../../modules/tests/application-reference/application-reference.actions';
import { fakeJournalTestSlots } from '../__mocks__/fake-journal.mock';
import { PopulateCandidateDetails } from '../../../modules/tests/candidate/candidate.actions';
import { PopulateTestSlotAttributes } from '../../../modules/tests/test-slot-attributes/test-slot-attributes.actions';
import { PopulateTestCentre } from '../../../modules/tests/test-centre/test-centre.actions';
import { SetTestStatusBooked } from '../../../modules/tests/test-status/test-status.actions';
import { end2endPracticeSlotId } from '../../../modules/tests/__mocks__/tests.mock';

describe('Fake Journal Effects', () => {
  let effects: FakeJournalEffects;
  let actions$: any;
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

  it('should create the fake journal effects', () => {
    expect(effects).toBeTruthy();
  });

  describe('startE2EPracticeTestEffect', () => {
    beforeEach(() => {
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(1003));
    });

    it('should dispatch a success action when the effect is triggered and test is valid', (done) => {
      actions$.next(new fakeJournalActions.StartE2EPracticeTest(1003));
      effects.startE2EPracticeTestEffect$.subscribe((result) => {
        const slot = fakeJournalTestSlots.find(slot => slot.slotDetail.slotId === 1003);
        if (result instanceof PopulateApplicationReference)  {
          expect(result).toEqual(new PopulateApplicationReference(slot.booking.application));
        }
        if (result instanceof PopulateCandidateDetails) {
          expect(result).toEqual(new PopulateCandidateDetails(slot.booking.candidate));
        }
        if (result instanceof PopulateTestSlotAttributes) {
          expect(result.payload.slotId).toEqual(end2endPracticeSlotId);
        }
        if (result instanceof PopulateTestCentre) {
          expect(result.payload.costCode).toEqual(slot.testCentre.costCode);
        }
        if (result instanceof SetTestStatusBooked) {
          expect(result).toEqual(new SetTestStatusBooked(end2endPracticeSlotId));
          done();
        }
      });

    });
  });
});
