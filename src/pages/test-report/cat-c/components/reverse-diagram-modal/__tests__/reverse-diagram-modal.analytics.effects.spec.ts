import { ReverseDiagramModalAnalyticsEffects } from '../reverse-diagram-modal.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as reverseDiagramModalActions from '../reverse-diagram-modal.actions';
import { AnalyticsProvider } from '../../../../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsDimensionIndices,
  AnalyticsScreenNames,
  AnalyticsEventCategories,
  AnalyticsEvents,
} from '../../../../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../../../../providers/analytics/analytics.actions';
import { StoreModel } from '../../../../../../shared/models/store.model';
import * as testsActions from '../../../../../../modules/tests/tests.actions';
import * as fakeJournalActions from '../../../../../fake-journal/fake-journal.actions';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { testReportPracticeModeSlot, candidateMock } from '../../../../../../modules/tests/__mocks__/tests.mock';
import { PopulateCandidateDetails } from '../../../../../../modules/tests/journal-data/candidate/candidate.actions';
import { Application } from '@dvsa/mes-journal-schema';
import { end2endPracticeSlotId } from '../../../../../../shared/mocks/test-slot-ids.mock';
import * as applicationReferenceActions
  from '../../../../../../modules/tests/journal-data/application-reference/application-reference.actions';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';
import { PopulateTestCategory } from '../../../../../../modules/tests/category/category.actions';

describe('Reverse Diagram Modal Analytics Effects', () => {

  let effects: ReverseDiagramModalAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenName = AnalyticsScreenNames.REVERSE_DIAGRAM;
  const screenNamePracticeMode = `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.REVERSE_DIAGRAM}`;
  const mockApplication: Application = {
    applicationId: 123456,
    bookingSequence: 78,
    checkDigit: 9,
  };

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        ReverseDiagramModalAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(ReverseDiagramModalAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
  });

  describe('reverseDiagramViewDidEnter', () => {
    it('should call setCurrentPage and addCustomDimension', (done) => {
      // ARRANGE

      // TODO: MES-4287 Change the category to C
      store$.dispatch(new testsActions.StartTest(123, TestCategory.BE));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // TODO: MES-4287 Change the category to C
      store$.dispatch(new PopulateTestCategory(TestCategory.BE));
      // ACT
      actions$.next(new reverseDiagramModalActions.ReverseDiagramViewDidEnter());
      // ASSERT
      effects.reverseDiagramViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)

          // TODO: MES-4287 Change the category to C
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B+E');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenName);
        done();
      });
    });
    it('should call setCurrentPage with practice mode prefix and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      store$.dispatch(new PopulateTestCategory(TestCategory.BE));
      // ACT
      actions$.next(new reverseDiagramModalActions.ReverseDiagramViewDidEnter());
      // ASSERT
      effects.reverseDiagramViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)

          // TODO: MES-4287 Change the category to C
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B+E');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePracticeMode);
        done();
      });
    });
  });

  describe('reverseDiagramOpened', () => {
    it('should call logEvent with the correct parameters', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new reverseDiagramModalActions.ReverseDiagramOpened());
      // ASSERT
      effects.reverseDiagramOpened$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.REVERSE_DIAGRAM_OPENED}`,
        );
        done();
      });
    });
  });

  describe('reverseDiagramClosed', () => {
    it('should call logEvent with the correct parameters', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new reverseDiagramModalActions.ReverseDiagramClosed());
      // ASSERT
      effects.reverseDiagramClosed$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.REVERSE_DIAGRAM_CLOSED}`,
        );
        done();
      });
    });
  });
});
