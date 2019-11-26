import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Store } from '@ngrx/store';
import { TestReportAnalyticsEffects } from '../test-report.analytics.effects';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as controlledStopActions from '../../../modules/tests/test-data/controlled-stop/controlled-stop.actions';
import * as dangerousFaultsActions from '../../../modules/tests/test-data/dangerous-faults/dangerous-faults.actions';
import * as drivingFaultsActions from '../../../modules/tests/test-data/driving-faults/driving-faults.actions';
import * as seriousFaultsActions from '../../../modules/tests/test-data/serious-faults/serious-faults.actions';
import * as manoeuvresActions from '../../../modules/tests/test-data/manoeuvres/manoeuvres.actions';
import * as vehicleChecksActions from '../../../modules/tests/test-data/vehicle-checks/vehicle-checks.actions';
import * as testRequirementsActions from '../../../modules/tests/test-data/test-requirements/test-requirements.actions';
import * as ecoActions from '../../../modules/tests/test-data/eco/eco.actions';
import * as testReportActions from '../test-report.actions';
import { StoreModel } from '../../../shared/models/store.model';
import {
  Competencies,
  ManoeuvreCompetencies,
  ManoeuvreTypes,
  LegalRequirements,
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
} from '../../../shared/constants/competencies/catb-manoeuvres';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { legalRequirementsLabels, legalRequirementToggleValues }
  from '../../../shared/constants/legal-requirements/catb-legal-requirements';
import { TestCategory } from '../../../shared/models/test-category';
import * as uncoupleRecoupleActions from '../../../modules/tests/test-data/uncouple-recouple/uncouple-recouple.actions';

fdescribe('Test Report Analytics Effects', () => {

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
  });

  describe('testReportViewDidEnter', () => {
    it('should call setCurrentPage and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new drivingFaultsActions.AddDrivingFault({
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
      actions$.next(new drivingFaultsActions.AddDrivingFault({
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new seriousFaultsActions.AddSeriousFault(Competencies.controlsGears));
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
      actions$.next(new seriousFaultsActions.AddSeriousFault(Competencies.controlsGears));
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new dangerousFaultsActions.AddDangerousFault(Competencies.controlsGears));
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
      actions$.next(new dangerousFaultsActions.AddDangerousFault(Competencies.controlsGears));
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new manoeuvresActions.AddManoeuvreDrivingFault({
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
      actions$.next(new manoeuvresActions.AddManoeuvreDrivingFault({
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new manoeuvresActions.AddManoeuvreSeriousFault({
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
      actions$.next(new manoeuvresActions.AddManoeuvreSeriousFault({
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new manoeuvresActions.AddManoeuvreDangerousFault({
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
      actions$.next(new manoeuvresActions.AddManoeuvreDangerousFault({
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new controlledStopActions.ControlledStopAddDrivingFault());
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
      actions$.next(new controlledStopActions.ControlledStopAddDrivingFault());
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new controlledStopActions.ControlledStopAddSeriousFault());
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
      actions$.next(new controlledStopActions.ControlledStopAddSeriousFault());
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new controlledStopActions.ControlledStopAddDangerousFault());
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
      actions$.next(new controlledStopActions.ControlledStopAddDangerousFault());
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new vehicleChecksActions.ShowMeQuestionDrivingFault());
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
      actions$.next(new vehicleChecksActions.ShowMeQuestionDrivingFault());
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new vehicleChecksActions.ShowMeQuestionSeriousFault());
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
      actions$.next(new vehicleChecksActions.ShowMeQuestionSeriousFault());
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new vehicleChecksActions.ShowMeQuestionDangerousFault());
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
      actions$.next(new vehicleChecksActions.ShowMeQuestionDangerousFault());
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new drivingFaultsActions.RemoveDrivingFault({
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
      actions$.next(new drivingFaultsActions.RemoveDrivingFault({
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new seriousFaultsActions.RemoveSeriousFault(Competencies.controlsGears));
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
      actions$.next(new seriousFaultsActions.RemoveSeriousFault(Competencies.controlsGears));
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new dangerousFaultsActions.RemoveDangerousFault(Competencies.controlsGears));
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
      actions$.next(new dangerousFaultsActions.RemoveDangerousFault(Competencies.controlsGears));
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new manoeuvresActions.RemoveManoeuvreFault({
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
      actions$.next(new manoeuvresActions.RemoveManoeuvreFault({
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new controlledStopActions.ControlledStopRemoveFault());
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
      actions$.next(new controlledStopActions.ControlledStopRemoveFault());
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new vehicleChecksActions.ShowMeQuestionRemoveFault());
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
      actions$.next(new vehicleChecksActions.ShowMeQuestionRemoveFault());
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
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
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

  describe('toggleLegalRequirement', () => {
    it('should call logEvent for normal start completed', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      store$.dispatch(new testRequirementsActions.ToggleLegalRequirement(LegalRequirements.normalStart1));
      // ACT
      actions$.next(new testRequirementsActions.ToggleLegalRequirement(LegalRequirements.normalStart1));
      // ASSERT
      effects.toggleLegalRequirement$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT,
          `${legalRequirementsLabels[LegalRequirements.normalStart1]} - ${legalRequirementToggleValues.completed}`,
        );
        done();
      });
    });
    it('should call logEvent for normal start uncompleted', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      store$.dispatch(new testRequirementsActions.ToggleLegalRequirement(LegalRequirements.normalStart1));
      store$.dispatch(new testRequirementsActions.ToggleLegalRequirement(LegalRequirements.normalStart1));
      // ACT
      actions$.next(new testRequirementsActions.ToggleLegalRequirement(LegalRequirements.normalStart1));
      // ASSERT
      effects.toggleLegalRequirement$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT,
          `${legalRequirementsLabels[LegalRequirements.normalStart1]} - ${legalRequirementToggleValues.uncompleted}`,
        );
        done();
      });
    });
    it('should call logEvent for eco completed', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      store$.dispatch(new ecoActions.ToggleEco());
      // ACT
      actions$.next(new ecoActions.ToggleEco());
      // ASSERT
      effects.toggleEco$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT,
          `${legalRequirementsLabels['eco']} - ${legalRequirementToggleValues.completed}`,
        );
        done();
      });
    });
    it('should call logEvent for eco uncompleted', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      store$.dispatch(new ecoActions.ToggleEco());
      store$.dispatch(new ecoActions.ToggleEco());
      // ACT
      actions$.next(new ecoActions.ToggleEco());
      // ASSERT
      effects.toggleEco$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT,
          `${legalRequirementsLabels['eco']} - ${legalRequirementToggleValues.uncompleted}`,
        );
        done();
      });
    });
    it('should call logEvent for selected manoeuvre', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      // ACT
      actions$.next(new manoeuvresActions.RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad));
      // ASSERT
      effects.manoeuvreCompletedEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT,
          `${legalRequirementsLabels['manoeuvre']} - ${legalRequirementToggleValues.completed}`,
        );
        done();
      });
    });

    it('should call logEvent for normal start, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      store$.dispatch(new testRequirementsActions.ToggleLegalRequirement(LegalRequirements.normalStart1));
      // ACT
      actions$.next(new testRequirementsActions.ToggleLegalRequirement(LegalRequirements.normalStart1));
      // ASSERT
      effects.toggleLegalRequirement$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT}`,
          `${legalRequirementsLabels[LegalRequirements.normalStart1]} - ${legalRequirementToggleValues.completed}`,
        );
        done();
      });
    });
    it('should call logEvent for eco, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      store$.dispatch(new ecoActions.ToggleEco());
      // ACT
      actions$.next(new ecoActions.ToggleEco());
      // ASSERT
      effects.toggleEco$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT}`,
          `${legalRequirementsLabels['eco']} - ${legalRequirementToggleValues.completed}`,
        );
        done();
      });
    });

    it('should call logEvent for show me / tell me completed', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      const showMeQuestionPassedAction = new vehicleChecksActions.ShowMeQuestionPassed();
      store$.dispatch(showMeQuestionPassedAction);
      // ACT
      actions$.next(showMeQuestionPassedAction);
      // ASSERT
      effects.showMeQuestionCompletedEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT,
          `${legalRequirementsLabels['vehicleChecks']} - ${legalRequirementToggleValues.completed}`,
        );
        done();
      });
    });

    it('should call logEvent for show me / tell me uncompleted', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      store$.dispatch(new vehicleChecksActions.ShowMeQuestionPassed());
      const showMeQuestionRemoveFaultAction = new vehicleChecksActions.ShowMeQuestionRemoveFault();
      store$.dispatch(showMeQuestionRemoveFaultAction);
      // ACT
      actions$.next(showMeQuestionRemoveFaultAction);
      // ASSERT
      effects.showMeQuestionUncompletedEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT,
          `${legalRequirementsLabels['vehicleChecks']} - ${legalRequirementToggleValues.uncompleted}`,
        );
        done();
      });
    });
  });

  describe('uncoupleRecoupleAddDrivingFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.BE));
      // ACT
      actions$.next(new uncoupleRecoupleActions.UncoupleRecoupleAddDrivingFault());
      // ASSERT
      effects.uncoupleRecoupleAddDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DRIVING_FAULT,
          'Uncouple recouple',
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new uncoupleRecoupleActions.UncoupleRecoupleAddDrivingFault());
      // ASSERT
      effects.uncoupleRecoupleAddDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_DRIVING_FAULT}`,
          'Uncouple recouple',
          1,
        );
        done();
      });
    });
  });

  describe('uncoupleRecoupleAddSeriousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.BE));
      // ACT
      actions$.next(new uncoupleRecoupleActions.UncoupleRecoupleAddSeriousFault());
      // ASSERT
      effects.uncoupleRecoupleAddSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_SERIOUS_FAULT,
          'Uncouple recouple',
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new uncoupleRecoupleActions.UncoupleRecoupleAddSeriousFault());
      // ASSERT
      effects.uncoupleRecoupleAddSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_SERIOUS_FAULT}`,
          'Uncouple recouple',
          1,
        );
        done();
      });
    });
  });

  describe('uncoupleRecoupleAddDangerousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.BE));
      // ACT
      actions$.next(new uncoupleRecoupleActions.UncoupleRecoupleAddDangerousFault());
      // ASSERT
      effects.uncoupleRecoupleAddDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DANGEROUS_FAULT,
          'Uncouple recouple',
          1,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new uncoupleRecoupleActions.UncoupleRecoupleAddDangerousFault());
      // ASSERT
      effects.uncoupleRecoupleAddDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.ADD_DANGEROUS_FAULT}`,
          'Uncouple recouple',
          1,
        );
        done();
      });
    });
  });

});
