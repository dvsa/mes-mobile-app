import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Store } from '@ngrx/store';
import { TestReportAnalyticsEffects } from '../test-report.analytics.effects';
import * as journalActions from '../../journal/journal.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as testDataActions from '../../../modules/tests/test-data/test-data.actions';
import * as testReportActions from '../test-report.actions';
import { StoreModel } from '../../../shared/models/store.model';
import {
  Competencies,
  ManoeuvreCompetencies,
  ManoeuvreTypes,
} from '../../../modules/tests/test-data/test-data.constants';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsScreenNames,
  AnalyticsEventCategories,
  AnalyticsEvents,
  AnalyticsLabels,
} from '../../../providers/analytics/analytics.model';
import { fullCompetencyLabels } from '../../../shared/constants/competencies/catb-competencies';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { testReportPracticeModeSlot } from '../../../modules/tests/__mocks__/tests.mock';
import {
  manoeuvreTypeLabels,
  manoeuvreCompetencyLabels,
} from '../components/manoeuvre-competency/manoeuvre-competency.constants';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';

describe('Test Report Analytics Effects', () => {

  let effects: TestReportAnalyticsEffects;
  let actions$: ReplaySubject<any>;
  let analyticsProviderMock;
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
        TestReportAnalyticsEffects,
        provideMockActions(() => actions$),
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        Store,
      ],
    });
    effects = TestBed.get(TestReportAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
    spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  });

  describe('testReportViewDidEnter', () => {
    it('should call setCurrentPage and addCustomDimension', (done) => {
      // ARRANGE
      spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
      // ACT
      actions$.next(new testReportActions.TestReportViewDidEnter());
      // ASSERT
      effects.testReportViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
        done();
      });
    });
  });

  describe('toggleRemoveFaultMode', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testReportActions.ToggleRemoveFaultMode());
      // ASSERT
      effects.toggleRemoveFaultMode$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.SELECT_REMOVE_MODE,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testReportActions.ToggleRemoveFaultMode());
      // ASSERT
      effects.toggleRemoveFaultMode$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.SELECT_REMOVE_MODE}`,
        );
        done();
      });
    });
  });

  describe('toggleSeriousFaultMode', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testReportActions.ToggleSeriousFaultMode());
      // ASSERT
      effects.toggleSeriousFaultMode$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.SELECT_SERIOUS_MODE,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testReportActions.ToggleSeriousFaultMode());
      // ASSERT
      effects.toggleSeriousFaultMode$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.SELECT_SERIOUS_MODE}`,
        );
        done();
      });
    });
  });

  describe('toggleDangerousFaultMode', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testReportActions.ToggleDangerousFaultMode());
      // ASSERT
      effects.toggleDangerousFaultMode$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.SELECT_DANGEROUS_MODE,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testReportActions.ToggleDangerousFaultMode());
      // ASSERT
      effects.toggleDangerousFaultMode$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.SELECT_DANGEROUS_MODE}`,
        );
        done();
      });
    });
  });

  describe('addDrivingFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.AddDrivingFault({
        competency: Competencies.controlsGears,
        newFaultCount: 1,
      }));
      // ASSERT
      effects.addDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DRIVING_FAULT,
          fullCompetencyLabels[Competencies.controlsGears],
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.AddDrivingFault({
        competency: Competencies.controlsGears,
        newFaultCount: 1,
      }));
      // ASSERT
      effects.addDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_DRIVING_FAULT}`,
          fullCompetencyLabels[Competencies.controlsGears],
          1,
        );
        done();
      });
    });
  });

  describe('addSeriousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.AddSeriousFault(Competencies.controlsGears));
      // ASSERT
      effects.addSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_SERIOUS_FAULT,
          fullCompetencyLabels[Competencies.controlsGears],
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.AddSeriousFault(Competencies.controlsGears));
      // ASSERT
      effects.addSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_SERIOUS_FAULT}`,
          fullCompetencyLabels[Competencies.controlsGears],
          1,
        );
        done();
      });
    });
  });

  describe('addDangerousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.AddDangerousFault(Competencies.controlsGears));
      // ASSERT
      effects.addDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DANGEROUS_FAULT,
          fullCompetencyLabels[Competencies.controlsGears],
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.AddDangerousFault(Competencies.controlsGears));
      // ASSERT
      effects.addDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_DANGEROUS_FAULT}`,
          fullCompetencyLabels[Competencies.controlsGears],
          1,
        );
        done();
      });
    });
  });

  describe('addManoeuvreDrivingFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.AddManoeuvreDrivingFault({
        manoeuvre: ManoeuvreTypes.reverseRight,
        competency: ManoeuvreCompetencies.controlFault,
      }));
      // ASSERT
      effects.addManoeuvreDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DRIVING_FAULT,
          // tslint:disable-next-line:max-line-length
          `${manoeuvreTypeLabels[ManoeuvreTypes.reverseRight]} - ${manoeuvreCompetencyLabels[ManoeuvreCompetencies.controlFault]}`,
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.AddManoeuvreDrivingFault({
        manoeuvre: ManoeuvreTypes.reverseRight,
        competency: ManoeuvreCompetencies.controlFault,
      }));
      // ASSERT
      effects.addManoeuvreDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_DRIVING_FAULT}`,
          // tslint:disable-next-line:max-line-length
          `${manoeuvreTypeLabels[ManoeuvreTypes.reverseRight]} - ${manoeuvreCompetencyLabels[ManoeuvreCompetencies.controlFault]}`,
          1,
        );
        done();
      });
    });
  });

  describe('addManoeuvreSeriousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.AddManoeuvreSeriousFault({
        manoeuvre: ManoeuvreTypes.reverseRight,
        competency: ManoeuvreCompetencies.controlFault,
      }));
      // ASSERT
      effects.addManoeuvreSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_SERIOUS_FAULT,
          // tslint:disable-next-line:max-line-length
          `${manoeuvreTypeLabels[ManoeuvreTypes.reverseRight]} - ${manoeuvreCompetencyLabels[ManoeuvreCompetencies.controlFault]}`,
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.AddManoeuvreSeriousFault({
        manoeuvre: ManoeuvreTypes.reverseRight,
        competency: ManoeuvreCompetencies.controlFault,
      }));
      // ASSERT
      effects.addManoeuvreSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_SERIOUS_FAULT}`,
          // tslint:disable-next-line:max-line-length
          `${manoeuvreTypeLabels[ManoeuvreTypes.reverseRight]} - ${manoeuvreCompetencyLabels[ManoeuvreCompetencies.controlFault]}`,
          1,
        );
        done();
      });
    });
  });

  describe('addManoeuvreDangerousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.AddManoeuvreDangerousFault({
        manoeuvre: ManoeuvreTypes.reverseRight,
        competency: ManoeuvreCompetencies.controlFault,
      }));
      // ASSERT
      effects.addManoeuvreDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DANGEROUS_FAULT,
          // tslint:disable-next-line:max-line-length
          `${manoeuvreTypeLabels[ManoeuvreTypes.reverseRight]} - ${manoeuvreCompetencyLabels[ManoeuvreCompetencies.controlFault]}`,
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.AddManoeuvreDangerousFault({
        manoeuvre: ManoeuvreTypes.reverseRight,
        competency: ManoeuvreCompetencies.controlFault,
      }));
      // ASSERT
      effects.addManoeuvreDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_DANGEROUS_FAULT}`,
          // tslint:disable-next-line:max-line-length
          `${manoeuvreTypeLabels[ManoeuvreTypes.reverseRight]} - ${manoeuvreCompetencyLabels[ManoeuvreCompetencies.controlFault]}`,
          1,
        );
        done();
      });
    });
  });

  describe('controlledStopAddDrivingFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.ControlledStopAddDrivingFault());
      // ASSERT
      effects.controlledStopAddDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DRIVING_FAULT,
          fullCompetencyLabels['outcomeControlledStop'],
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.ControlledStopAddDrivingFault());
      // ASSERT
      effects.controlledStopAddDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_DRIVING_FAULT}`,
          fullCompetencyLabels['outcomeControlledStop'],
          1,
        );
        done();
      });
    });
  });

  describe('controlledStopAddSeriousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.ControlledStopAddSeriousFault());
      // ASSERT
      effects.controlledStopAddSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_SERIOUS_FAULT,
          fullCompetencyLabels['outcomeControlledStop'],
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.ControlledStopAddSeriousFault());
      // ASSERT
      effects.controlledStopAddSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_SERIOUS_FAULT}`,
          fullCompetencyLabels['outcomeControlledStop'],
          1,
        );
        done();
      });
    });
  });

  describe('controlledStopAddDangerousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.ControlledStopAddDangerousFault());
      // ASSERT
      effects.controlledStopAddDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DANGEROUS_FAULT,
          fullCompetencyLabels['outcomeControlledStop'],
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.ControlledStopAddDangerousFault());
      // ASSERT
      effects.controlledStopAddDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_DANGEROUS_FAULT}`,
          fullCompetencyLabels['outcomeControlledStop'],
          1,
        );
        done();
      });
    });
  });

  describe('showMeQuestionDrivingFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.ShowMeQuestionDrivingFault());
      // ASSERT
      effects.showMeQuestionDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DRIVING_FAULT,
          fullCompetencyLabels['showMeQuestion'],
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.ShowMeQuestionDrivingFault());
      // ASSERT
      effects.showMeQuestionDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_DRIVING_FAULT}`,
          fullCompetencyLabels['showMeQuestion'],
          1,
        );
        done();
      });
    });
  });

  describe('showMeQuestionSeriousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.ShowMeQuestionSeriousFault());
      // ASSERT
      effects.showMeQuestionSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_SERIOUS_FAULT,
          fullCompetencyLabels['showMeQuestion'],
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.ShowMeQuestionSeriousFault());
      // ASSERT
      effects.showMeQuestionSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_SERIOUS_FAULT}`,
          fullCompetencyLabels['showMeQuestion'],
          1,
        );
        done();
      });
    });
  });

  describe('showMeQuestionDangerousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.ShowMeQuestionDangerousFault());
      // ASSERT
      effects.showMeQuestionDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DANGEROUS_FAULT,
          fullCompetencyLabels['showMeQuestion'],
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.ShowMeQuestionDangerousFault());
      // ASSERT
      effects.showMeQuestionDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_DANGEROUS_FAULT}`,
          fullCompetencyLabels['showMeQuestion'],
          1,
        );
        done();
      });
    });
  });

  describe('removeDrivingFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.RemoveDrivingFault({
        competency: Competencies.controlsGears,
        newFaultCount: 0,
      }));
      // ASSERT
      effects.removeDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_DRIVING_FAULT,
          fullCompetencyLabels[Competencies.controlsGears],
          0,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.RemoveDrivingFault({
        competency: Competencies.controlsGears,
        newFaultCount: 0,
      }));
      // ASSERT
      effects.removeDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.REMOVE_DRIVING_FAULT}`,
          fullCompetencyLabels[Competencies.controlsGears],
          0,
        );
        done();
      });
    });
  });

  describe('removeSeriousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.RemoveSeriousFault(Competencies.controlsGears));
      // ASSERT
      effects.removeSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_SERIOUS_FAULT,
          fullCompetencyLabels[Competencies.controlsGears],
          0,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.RemoveSeriousFault(Competencies.controlsGears));
      // ASSERT
      effects.removeSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.REMOVE_SERIOUS_FAULT}`,
          fullCompetencyLabels[Competencies.controlsGears],
          0,
        );
        done();
      });
    });
  });

  describe('removeDangerousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.RemoveDangerousFault(Competencies.controlsGears));
      // ASSERT
      effects.removeDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_DANGEROUS_FAULT,
          fullCompetencyLabels[Competencies.controlsGears],
          0,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.RemoveDangerousFault(Competencies.controlsGears));
      // ASSERT
      effects.removeDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.REMOVE_DANGEROUS_FAULT}`,
          fullCompetencyLabels[Competencies.controlsGears],
          0,
        );
        done();
      });
    });
  });

  describe('removeManoeuvreDrivingFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.RemoveManoeuvreFault({
        manoeuvre: ManoeuvreTypes.reverseRight,
        competency: ManoeuvreCompetencies.controlFault,
      }));
      // ASSERT
      effects.removeManoeuvreFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_DRIVING_FAULT,
          // tslint:disable-next-line:max-line-length
          `${manoeuvreTypeLabels[ManoeuvreTypes.reverseRight]} - ${manoeuvreCompetencyLabels[ManoeuvreCompetencies.controlFault]}`,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.RemoveManoeuvreFault({
        manoeuvre: ManoeuvreTypes.reverseRight,
        competency: ManoeuvreCompetencies.controlFault,
      }));
      // ASSERT
      effects.removeManoeuvreFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.REMOVE_DRIVING_FAULT}`,
          // tslint:disable-next-line:max-line-length
          `${manoeuvreTypeLabels[ManoeuvreTypes.reverseRight]} - ${manoeuvreCompetencyLabels[ManoeuvreCompetencies.controlFault]}`,
        );
        done();
      });
    });
  });

  describe('controlledStopRemoveFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.ControlledStopRemoveFault());
      // ASSERT
      effects.controlledStopRemoveFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_FAULT,
          fullCompetencyLabels['outcomeControlledStop'],
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.ControlledStopRemoveFault());
      // ASSERT
      effects.controlledStopRemoveFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.REMOVE_FAULT}`,
          fullCompetencyLabels['outcomeControlledStop'],
        );
        done();
      });
    });
  });

  describe('showMeQuestionRemoveFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testDataActions.ShowMeQuestionRemoveFault());
      // ASSERT
      effects.showMeQuestionRemoveFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_FAULT,
          fullCompetencyLabels['showMeQuestion'],
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testDataActions.ShowMeQuestionRemoveFault());
      // ASSERT
      effects.showMeQuestionRemoveFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.REMOVE_FAULT}`,
          fullCompetencyLabels['showMeQuestion'],
          );
        done();
      });
    });
  });

  describe('testTermination', () => {
    it('should call logEvent for termination event', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions$.next(new testReportActions.TerminateTestFromTestReport());
      // ASSERT
      effects.testTermination$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TERMINATION,
          AnalyticsEvents.END_TEST,
          AnalyticsLabels.TERMINATE_TEST,
        );
        done();
      });
    });
    it('should call logEvent for termination event, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new testReportActions.TerminateTestFromTestReport());
      // ASSERT
      effects.testTermination$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TERMINATION}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.END_TEST}`,
          AnalyticsLabels.TERMINATE_TEST,
          );
        done();
      });
    });
  });

});
