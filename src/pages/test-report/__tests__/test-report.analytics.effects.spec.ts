import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { TestReportAnalyticsEffects } from '../test-report.analytics.effects';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as controlledStopActions from '../../../modules/tests/test-data/cat-b/controlled-stop/controlled-stop.actions';
import * as dangerousFaultsActions
  from '../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import * as drivingFaultsActions from '../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import * as seriousFaultsActions from '../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import * as manoeuvresActions from '../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import * as vehicleChecksActions from '../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import * as testRequirementsActions
  from '../../../modules/tests/test-data/common/test-requirements/test-requirements.actions';
import * as ecoActions from '../../../modules/tests/test-data/common/eco/eco.actions';
import * as testReportActions from '../test-report.actions';
import { StoreModel } from '../../../shared/models/store.model';
import {
  Competencies,
  LegalRequirements,
  ManoeuvreCompetencies,
  ManoeuvreTypes,
  SingleFaultCompetencyNames,
} from '../../../modules/tests/test-data/test-data.constants';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsEventCategories,
  AnalyticsEvents,
  AnalyticsLabels,
  AnalyticsScreenNames,
} from '../../../providers/analytics/analytics.model';
import { fullCompetencyLabels, competencyLabels } from '../../../shared/constants/competencies/competencies';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { candidateMock, testReportPracticeModeSlot } from '../../../modules/tests/__mocks__/tests.mock';
import {
  manoeuvreCompetencyLabels,
  manoeuvreTypeLabels,
} from '../../../shared/constants/competencies/catb-manoeuvres';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import {
  legalRequirementsLabels,
  legalRequirementToggleValues,
} from '../../../shared/constants/legal-requirements/legal-requirements.constants';
import * as uncoupleRecoupleActions
  from '../../../modules/tests/test-data/common/uncouple-recouple/uncouple-recouple.actions';
import * as reverseLeftActions from '../components/reverse-left/reverse-left.actions';
import { configureTestSuite } from 'ng-bullet';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import * as avoidanceActions from '../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.actions';
import {
  speedCheckToggleValues,
} from '../../../shared/constants/competencies/cata-mod1-speed-checks';
import * as testReportCatAMod1Actions from '../cat-a-mod1/test-report.cat-a-mod1.actions';
import { ModalReason } from '../cat-a-mod1/components/activity-code-4-modal/activity-code-4-modal.constants';
import * as emergencyStopActions
  from '../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.actions';
import * as activityCodeActions from '../../../modules/tests/activity-code/activity-code.actions';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { PopulateTestCategory } from '../../../modules/tests/category/category.actions';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import * as singleFaultCompetencyActions
  from '../../../modules/tests/test-data/common/single-fault-competencies/single-fault-competencies.actions';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

import * as pcvDoorExerciseActions from
    '../../../modules/tests/test-data/cat-d/pcv-door-exercise/pcv-door-exercise.actions';

describe('Test Report Analytics Effects', () => {

  let effects: TestReportAnalyticsEffects;
  let actions$: ReplaySubject<any>;
  let analyticsProviderMock;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
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
  });

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
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
        expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(AnalyticsScreenNames.TEST_REPORT);
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

    it('should call logEvent for deselected manoeuvre', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      actions$.next(new manoeuvresActions.RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad));
      // ACT
      actions$.next(new manoeuvresActions.RecordManoeuvresDeselection(ManoeuvreTypes.reverseParkRoad));
      // ASSERT
      effects.deselectReverseLeftManoeuvreEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT,
          `${legalRequirementsLabels['manoeuvre']} - ${legalRequirementToggleValues.uncompleted}`,
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

  describe('reverseLeftPopoverOpened', () => {
    it('should call logEvent with the correct parameters', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new reverseLeftActions.ReverseLeftPopoverOpened());
      // ASSERT
      effects.reverseLeftPopoverOpened$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.REVERSE_LEFT_POPOVER_OPENED}`,
        );
        done();
      });
    });
  });

  describe('reverseLeftPopoverClosed', () => {
    it('should call logEvent with the correct parameters', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new reverseLeftActions.ReverseLeftPopoverClosed());
      // ASSERT
      effects.reverseLeftPopoverClosed$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.REVERSE_LEFT_POPOVER_CLOSED}`,
        );
        done();
      });
    });
  });

  describe('toggleAvoidanceSpeedReq', () => {
    it('should log speed not met for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));

      actions$.next(new avoidanceActions.AddAvoidanceSeriousFault());
      // ASSERT
      effects.toggleAvoidanceSpeedReq$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.TOGGLE_AVOIDANCE_SPEED_REQUIREMENT,
          `${competencyLabels['speedCheckAvoidance']} - ${speedCheckToggleValues.speedNotMet}`,
        );
        done();
      });
    });

    it('should call logEvent for speed met for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));

      // ACT
      actions$.next(new avoidanceActions.RemoveAvoidanceSeriousFault());

      // ASSERT
      effects.toggleAvoidanceSpeedReq$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.TOGGLE_AVOIDANCE_SPEED_REQUIREMENT,
          `${competencyLabels['speedCheckAvoidance']} - ${speedCheckToggleValues.speedMet}`,
        );
        done();
      });
    });
  });

  describe('recordAvoidanceFirstAttempt', () => {
    it('should call logEvent for record avoidance first attempt', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      const attemptValue = 27;
      store$.dispatch(new avoidanceActions.RecordAvoidanceFirstAttempt(attemptValue));

      // ACT
      actions$.next(new avoidanceActions.RecordAvoidanceFirstAttempt(attemptValue));

      // ASSERT
      effects.recordAvoidanceFirstAttempt$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.RECORD_AVOIDANCE_FIRST_ATTEMPT,
          `${competencyLabels['speedCheckAvoidance']} - ${attemptValue}`,
        );
        done();
      });
    });
  });

  describe('recordAvoidanceSecondAttempt', () => {
    it('should call logEvent for record avoidance second attempt', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      const attemptValue = 5;
      store$.dispatch(new avoidanceActions.RecordAvoidanceSecondAttempt(attemptValue));

      // ACT
      actions$.next(new avoidanceActions.RecordAvoidanceSecondAttempt(attemptValue));

      // ASSERT
      effects.recordAvoidanceSecondAttempt$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.RECORD_AVOIDANCE_SECOND_ATTEMPT,
          `${competencyLabels['speedCheckAvoidance']} - ${attemptValue}`,
        );
        done();
      });
    });
  });

  describe('speedRequirementNotMetModalOpened', () => {
    it('should call logEvent for speed requirement not met modal opened', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));

      // ACT
      actions$.next(new testReportCatAMod1Actions.SpeedRequirementNotMetModalOpened());

      // ASSERT
      effects.speedRequirementNotMetModalOpened$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.SPEED_REQ_NOT_MET_MODAL_OPENED,
          ModalReason.SPEED_REQUIREMENTS,
        );
        done();
      });
    });
  });

  describe('emergencyStopDangerousFaultModelOpened', () => {
    it('should call logEvent for ememergency stop dangererous fault modal opened', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));

      // ACT
      actions$.next(new testReportCatAMod1Actions.EmergencyStopDangerousFaultModelOpened());

      // ASSERT
      effects.emergencyStopDangerousFaultModelOpened$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.EMERGENCY_STOP_DANGEROUS_FAULT_MODAL_OPENED,
          ModalReason.EMERGENCY_STOP_DANGEROUS,
        );
        done();
      });
    });
  });

  describe('emergencyStopSeriousFaultModelOpened', () => {
    it('should call logEvent for emergency stop serious fault modal opened', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));

      // ACT
      actions$.next(new testReportCatAMod1Actions.EmergencyStopSeriousFaultModelOpened());

      // ASSERT
      effects.emergencyStopSeriousFaultModelOpened$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.EMERGENCY_STOP_SERIOUS_FAULT_MODAL_OPENED,
          ModalReason.EMERGENCY_STOP_SERIOUS,
        );
        done();
      });
    });
  });

  describe('toggleEmergencyStopSpeedReq', () => {
    it('should call logEvent for speed not met', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new emergencyStopActions.AddEmergencyStopSeriousFault());

      // ASSERT
      effects.toggleEmergencyStopSpeedReq$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.TOGGLE_EMERGENCY_STOP_SPEED_REQ,
          `${competencyLabels['speedCheckEmergency']} - ${speedCheckToggleValues.speedNotMet}`,
        );
        done();
      });
    });

    it('should call logEvent for speed met', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));

      // ACT
      actions$.next(new emergencyStopActions.RemoveEmergencyStopSeriousFault());

      // ASSERT
      effects.toggleEmergencyStopSpeedReq$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.TOGGLE_EMERGENCY_STOP_SPEED_REQ,
          `${competencyLabels['speedCheckEmergency']} - ${speedCheckToggleValues.speedMet}`,
        );
        done();
      });
    });
  });

  describe('recordEmergencyStopFirstAttempt', () => {
    it('should call logEvent for record emergency stop first attempt', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      const attemptValue = 27;
      store$.dispatch(new emergencyStopActions.RecordEmergencyStopFirstAttempt(attemptValue));

      // ACT
      actions$.next(new emergencyStopActions.RecordEmergencyStopFirstAttempt(attemptValue));

      // ASSERT
      effects.recordEmergencyStopFirstAttempt$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.RECORD_EMERGENCY_STOP_FIRST_ATTEMPT,
          `${competencyLabels['speedCheckEmergency']} - ${attemptValue}`,
        );
        done();
      });
    });
  });

  describe('recordEmergencyStopSecondAttempt', () => {
    it('should call logEvent for record emergency stop second attempt', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      const attemptValue = 27;
      store$.dispatch(new emergencyStopActions.RecordEmergencyStopSecondAttempt(attemptValue));

      // ACT
      actions$.next(new emergencyStopActions.RecordEmergencyStopSecondAttempt(attemptValue));

      // ASSERT
      effects.recordEmergencyStopSecondAttempt$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.RECORD_EMERGENCY_STOP_SECOND_ATTEMPT,
          `${competencyLabels['speedCheckEmergency']} - ${attemptValue}`,
        );
        done();
      });
    });
  });

  it('should call logEvent for set activity code', (done) => {
    // ARRANGE
    store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));

    // ACT
    actions$.next(new activityCodeActions.SetActivityCode(ActivityCodes.FAIL_PUBLIC_SAFETY));

    // ASSERT
    effects.setActivityCode$.subscribe((result) => {
      expect(result instanceof AnalyticRecorded).toBe(true);
      expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
      expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
        AnalyticsEventCategories.TERMINATION,
        AnalyticsEvents.END_TEST,
        AnalyticsLabels.SET_ACTIVITY_CODE,
      );
      done();
    });
  });

  describe('setSingleFaultCompetencyOutcome', () => {
    it('should call logEvent for adding a single competency driving fault', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));

      // ACT
      actions$.next(new singleFaultCompetencyActions.SetSingleFaultCompetencyOutcome(
        SingleFaultCompetencyNames.slalom, CompetencyOutcome.DF));

      // ASSERT
      effects.setSingleFaultCompetencyOutcome$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_SINGLE_FAULT,
          fullCompetencyLabels.slalom,
        );
        done();
      });
    });

    it('should call logEvent for adding a single competency dangerous fault', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));

      // ACT
      actions$.next(new singleFaultCompetencyActions.SetSingleFaultCompetencyOutcome(
        SingleFaultCompetencyNames.slalom, CompetencyOutcome.D));

      // ASSERT
      effects.setSingleFaultCompetencyOutcome$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DANGEROUS_SINGLE_FAULT,
          fullCompetencyLabels.slalom,
        );
        done();
      });
    });

    it('should call logEvent for adding a single competency serious fault', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));

      // ACT
      actions$.next(new singleFaultCompetencyActions.SetSingleFaultCompetencyOutcome(
        SingleFaultCompetencyNames.slalom, CompetencyOutcome.S));

      // ASSERT
      effects.setSingleFaultCompetencyOutcome$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_SERIOUS_SINGLE_FAULT,
          fullCompetencyLabels.slalom,
        );
        done();
      });
    });
  });

  describe('removeSingleFaultCompetencyOutcome', () => {
    it('should call logEvent for removing a single competency driving fault', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));

      // ACT
      actions$.next(new singleFaultCompetencyActions.RemoveSingleFaultCompetencyOutcome(
        SingleFaultCompetencyNames.slalom));

      // ASSERT
      effects.removeSingleFaultCompetencyOutcome$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_SINGLE_FAULT,
          fullCompetencyLabels.slalom,
        );
        done();
      });
    });
  });

  describe('removeSingleDangerousFaultCompetencyOutcome', () => {
    it('should call logEvent for removing a single competency dangerous fault', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));

      // ACT
      actions$.next(new singleFaultCompetencyActions.RemoveSingleDangerousFaultCompetencyOutcome(
        SingleFaultCompetencyNames.slalom));

      // ASSERT
      effects.removeSingleDangerousFaultCompetencyOutcome$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_DANGEROUS_SINGLE_FAULT,
          fullCompetencyLabels.slalom,
        );
        done();
      });
    });
  });

  describe('removeSingleSeriousFaultCompetencyOutcome', () => {
    it('should call logEvent for removing a single competency serious fault', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.EUAM1));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));

      // ACT
      actions$.next(new singleFaultCompetencyActions.RemoveSingleSeriousFaultCompetencyOutcome(
        SingleFaultCompetencyNames.slalom));

      // ASSERT
      effects.removeSingleSeriousFaultCompetencyOutcome$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_SERIOUS_SINGLE_FAULT,
          fullCompetencyLabels.slalom,
        );
        done();
      });
    });
  });

  describe('PcvDoorExerciseAddDrivingFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.D));
      // ACT
      actions$.next(new pcvDoorExerciseActions.PcvDoorExerciseAddDrivingFault());
      // ASSERT
      effects.pcvDoorExerciseAddDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT,
          fullCompetencyLabels.pcvDoorExercise,

        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new pcvDoorExerciseActions.PcvDoorExerciseAddDrivingFault());
      // ASSERT
      effects.pcvDoorExerciseAddDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT}`,
          fullCompetencyLabels.pcvDoorExercise,
        );
        done();
      });
    });
  });

  describe('PcvDoorExerciseSeriousDrivingFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.D));
      // ACT
      actions$.next(new pcvDoorExerciseActions.PcvDoorExerciseAddSeriousFault());
      // ASSERT
      effects.pcvDoorExerciseAddSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT,
          fullCompetencyLabels.pcvDoorExercise,

        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new pcvDoorExerciseActions.PcvDoorExerciseAddSeriousFault());
      // ASSERT
      effects.pcvDoorExerciseAddSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT}`,
          fullCompetencyLabels.pcvDoorExercise,
        );
        done();
      });
    });
  });

  describe('pcvDoorExerciseAddDangerousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.D));
      // ACT
      actions$.next(new pcvDoorExerciseActions.PcvDoorExerciseAddDangerousFault());
      // ASSERT
      effects.pcvDoorExerciseAddDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT,
           fullCompetencyLabels.pcvDoorExercise,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new pcvDoorExerciseActions.PcvDoorExerciseAddDangerousFault());
      // ASSERT
      effects.pcvDoorExerciseAddDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT}`,
           fullCompetencyLabels.pcvDoorExercise,
        );
        done();
      });
    });
  });

  describe('PcvDoorExerciseRemoveDrivingFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.D));
      // ACT
      actions$.next(new pcvDoorExerciseActions.PcvDoorExerciseRemoveDrivingFault());
      // ASSERT
      effects.pcvDoorExerciseRemoveDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT,
          fullCompetencyLabels.pcvDoorExercise,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new pcvDoorExerciseActions.PcvDoorExerciseRemoveDrivingFault());
      // ASSERT
      effects.pcvDoorExerciseRemoveDrivingFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT}`,
          fullCompetencyLabels.pcvDoorExercise,
        );
        done();
      });
    });
  });

  describe('pcvDoorExerciseRemoveSeriousFaultX', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.D));
      // ACT
      actions$.next(new pcvDoorExerciseActions.PcvDoorExerciseRemoveSeriousFault());
      // ASSERT
      effects.pcvDoorExerciseRemoveSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT,
          fullCompetencyLabels.pcvDoorExercise,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new pcvDoorExerciseActions.PcvDoorExerciseRemoveSeriousFault());
      // ASSERT
      effects.pcvDoorExerciseRemoveSeriousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT}`,
          fullCompetencyLabels.pcvDoorExercise,
        );
        done();
      });
    });
  });

  describe('pcvDoorExerciseRemoveDangerousFault', () => {
    it('should call logEvent for this competency', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.D));
      // ACT
      actions$.next(new pcvDoorExerciseActions.PcvDoorExerciseRemoveDangerousFault());
      // ASSERT
      effects.pcvDoorExerciseRemoveDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT,
          fullCompetencyLabels.pcvDoorExercise,
        );
        done();
      });
    });
    it('should call logEvent for this competency, prefixed with practice test', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ACT
      actions$.next(new pcvDoorExerciseActions.PcvDoorExerciseRemoveDangerousFault());
      // ASSERT
      effects.pcvDoorExerciseRemoveDangerousFault$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEventCategories.TEST_REPORT}`,
          `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsEvents.PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT}`,
          fullCompetencyLabels.pcvDoorExercise,
        );
        done();
      });
    });
  });
});
