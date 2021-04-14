var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, concatMap, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents, AnalyticsLabels, } from '../../providers/analytics/analytics.model';
import * as testReportActions from '../../pages/test-report/test-report.actions';
import * as controlledStopActions from '../../modules/tests/test-data/common/controlled-stop/controlled-stop.actions';
import * as highwayCodeSafetyActions from '../../modules/tests/test-data/common/highway-code-safety/highway-code-safety.actions';
import * as dangerousFaultsActions from '../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import * as drivingFaultsActions from '../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import * as seriousFaultsActions from '../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import * as manoeuvresActions from '../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import * as manoeuvresADIPart2Actions from '../../modules/tests/test-data/cat-adi-part2/manoeuvres/manoeuvres.actions';
import * as vehicleChecksActions from '../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import * as testRequirementsActions from '../../modules/tests/test-data/common/test-requirements/test-requirements.actions';
import * as ecoActions from '../../modules/tests/test-data/common/eco/eco.actions';
import { getTests } from '../../modules/tests/tests.reducer';
import { fullCompetencyLabels, competencyLabels } from '../../shared/constants/competencies/competencies';
import { manoeuvreCompetencyLabels, manoeuvreTypeLabels, } from '../../shared/constants/competencies/catb-manoeuvres';
import { AnalyticRecorded, AnalyticNotRecorded } from '../../providers/analytics/analytics.actions';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { legalRequirementsLabels, legalRequirementToggleValues } from '../../shared/constants/legal-requirements/legal-requirements.constants';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { getTestData } from '../../modules/tests/test-data/cat-b/test-data.reducer';
import { getEco, getTestRequirements, getETA } from '../../modules/tests/test-data/common/test-data.selector';
import * as uncoupleRecoupleActions from '../../modules/tests/test-data/common/uncouple-recouple/uncouple-recouple.actions';
import * as reverseLeftActions from './components/reverse-left/reverse-left.actions';
import { getTestData as getCatAmod1TestData } from '../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { getAvoidance } from '../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.selector';
import { speedCheckToggleValues } from '../../shared/constants/competencies/cata-mod1-speed-checks';
import { getEmergencyStop } from '../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.selector';
import * as activityCodeActions from '../../modules/tests/activity-code/activity-code.actions';
import * as testReportCatAMod1Actions from './cat-a-mod1/test-report.cat-a-mod1.actions';
import { ModalReason } from './cat-a-mod1/components/activity-code-4-modal/activity-code-4-modal.constants';
import * as singleFaultCompetencyActions from '../../modules/tests/test-data/common/single-fault-competencies/single-fault-competencies.actions';
import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import * as emergencyStopActions from '../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.actions';
import * as avoidanceActions from '../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.actions';
import * as pcvDoorExerciseActions from '../../modules/tests/test-data/cat-d/pcv-door-exercise/pcv-door-exercise.actions';
import { getControlledStop, } from '../../modules/tests/test-data/common/controlled-stop/controlled-stop.reducer';
import { getHighwayCodeSafety, } from '../../modules/tests/test-data/common/highway-code-safety/highway-code-safety.reducer';
import * as etaActions from '../../modules/tests/test-data/common/eta/eta.actions';
import { ExaminerActions } from '../../modules/tests/test-data/test-data.constants';
var TestReportAnalyticsEffects = /** @class */ (function () {
    function TestReportAnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.testReportViewDidEnter$ = this.actions$.pipe(ofType(testReportActions.TEST_REPORT_VIEW_DID_ENTER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.setCurrentPage(formatAnalyticsText(AnalyticsScreenNames.TEST_REPORT, tests));
            return of(new AnalyticRecorded());
        }));
        this.toggleRemoveFaultMode$ = this.actions$.pipe(ofType(testReportActions.TOGGLE_REMOVE_FAULT_MODE), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            if (!action.isUserGenerated) {
                return of(new AnalyticNotRecorded());
            }
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.SELECT_REMOVE_MODE, tests));
            return of(new AnalyticRecorded());
        }));
        this.toggleSeriousFaultMode$ = this.actions$.pipe(ofType(testReportActions.TOGGLE_SERIOUS_FAULT_MODE), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            if (!action.isUserGenerated) {
                return of(new AnalyticNotRecorded());
            }
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.SELECT_SERIOUS_MODE, tests));
            return of(new AnalyticRecorded());
        }));
        this.toggleDangerousFaultMode$ = this.actions$.pipe(ofType(testReportActions.TOGGLE_DANGEROUS_FAULT_MODE), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            if (!action.isUserGenerated) {
                return of(new AnalyticNotRecorded());
            }
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.SELECT_DANGEROUS_MODE, tests));
            return of(new AnalyticRecorded());
        }));
        this.addDrivingFault$ = this.actions$.pipe(ofType(drivingFaultsActions.ADD_DRIVING_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests), fullCompetencyLabels[action.payload.competency], action.payload.newFaultCount);
            return of(new AnalyticRecorded());
        }));
        this.addSeriousFault$ = this.actions$.pipe(ofType(seriousFaultsActions.ADD_SERIOUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests), fullCompetencyLabels[action.payload], 1);
            return of(new AnalyticRecorded());
        }));
        this.addDangerousFault$ = this.actions$.pipe(ofType(dangerousFaultsActions.ADD_DANGEROUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_FAULT, tests), fullCompetencyLabels[action.payload], 1);
            return of(new AnalyticRecorded());
        }));
        this.addManoeuvreDrivingFault$ = this.actions$.pipe(ofType(manoeuvresActions.ADD_MANOEUVRE_DRIVING_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests), manoeuvreTypeLabels[action.payload.manoeuvre] + " - " + manoeuvreCompetencyLabels[action.payload.competency], 1);
            return of(new AnalyticRecorded());
        }));
        this.addManoeuvreDrivingFaultCatADIPart2$ = this.actions$.pipe(ofType(manoeuvresADIPart2Actions.ADD_MANOEUVRE_DRIVING_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests), manoeuvreTypeLabels[action.payload.manoeuvre] + " - " + manoeuvreCompetencyLabels[action.payload.competency], 1);
            return of(new AnalyticRecorded());
        }));
        this.addManoeuvreSeriousFault$ = this.actions$.pipe(ofType(manoeuvresActions.ADD_MANOEUVRE_SERIOUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests), manoeuvreTypeLabels[action.payload.manoeuvre] + " - " + manoeuvreCompetencyLabels[action.payload.competency], 1);
            return of(new AnalyticRecorded());
        }));
        this.addManoeuvreSeriousFaultCatADIPart2$ = this.actions$.pipe(ofType(manoeuvresADIPart2Actions.ADD_MANOEUVRE_SERIOUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests), manoeuvreTypeLabels[action.payload.manoeuvre] + " - " + manoeuvreCompetencyLabels[action.payload.competency], 1);
            return of(new AnalyticRecorded());
        }));
        this.addManoeuvreDangerousFault$ = this.actions$.pipe(ofType(manoeuvresActions.ADD_MANOEUVRE_DANGEROUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_FAULT, tests), manoeuvreTypeLabels[action.payload.manoeuvre] + " - " + manoeuvreCompetencyLabels[action.payload.competency], 1);
            return of(new AnalyticRecorded());
        }));
        this.addManoeuvreDangerousFaultCatADIPart2$ = this.actions$.pipe(ofType(manoeuvresADIPart2Actions.ADD_MANOEUVRE_DANGEROUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_FAULT, tests), manoeuvreTypeLabels[action.payload.manoeuvre] + " - " + manoeuvreCompetencyLabels[action.payload.competency], 1);
            return of(new AnalyticRecorded());
        }));
        this.controlledStopAddDrivingFault$ = this.actions$.pipe(ofType(controlledStopActions.CONTROLLED_STOP_ADD_DRIVING_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests), fullCompetencyLabels['outcomeControlledStop'], 1);
            return of(new AnalyticRecorded());
        }));
        this.controlledStopAddSeriousFault$ = this.actions$.pipe(ofType(controlledStopActions.CONTROLLED_STOP_ADD_SERIOUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests), fullCompetencyLabels['outcomeControlledStop'], 1);
            return of(new AnalyticRecorded());
        }));
        this.controlledStopAddDangerousFault$ = this.actions$.pipe(ofType(controlledStopActions.CONTROLLED_STOP_ADD_DANGEROUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_FAULT, tests), fullCompetencyLabels['outcomeControlledStop'], 1);
            return of(new AnalyticRecorded());
        }));
        this.highwayCodeSafetyAddDrivingFault$ = this.actions$.pipe(ofType(highwayCodeSafetyActions.HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests), fullCompetencyLabels['outcomeHighwayCodeSafety'], 1);
            return of(new AnalyticRecorded());
        }));
        this.highwayCodeSafetyAddSeriousFault$ = this.actions$.pipe(ofType(highwayCodeSafetyActions.HIGHWAY_CODE_SAFETY_ADD_SERIOUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests), fullCompetencyLabels['outcomeHighwayCodeSafety'], 1);
            return of(new AnalyticRecorded());
        }));
        this.showMeQuestionDrivingFault$ = this.actions$.pipe(ofType(vehicleChecksActions.SHOW_ME_QUESTION_DRIVING_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests), fullCompetencyLabels['showMeQuestion'], 1);
            return of(new AnalyticRecorded());
        }));
        this.showMeQuestionSeriousFault$ = this.actions$.pipe(ofType(vehicleChecksActions.SHOW_ME_QUESTION_SERIOUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests), fullCompetencyLabels['showMeQuestion'], 1);
            return of(new AnalyticRecorded());
        }));
        this.showMeQuestionDangerousFault$ = this.actions$.pipe(ofType(vehicleChecksActions.SHOW_ME_QUESTION_DANGEROUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_FAULT, tests), fullCompetencyLabels['showMeQuestion'], 1);
            return of(new AnalyticRecorded());
        }));
        this.removeDrivingFault$ = this.actions$.pipe(ofType(drivingFaultsActions.REMOVE_DRIVING_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REMOVE_DRIVING_FAULT, tests), fullCompetencyLabels[action.payload.competency], action.payload.newFaultCount);
            return of(new AnalyticRecorded());
        }));
        this.removeSeriousFault$ = this.actions$.pipe(ofType(seriousFaultsActions.REMOVE_SERIOUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REMOVE_SERIOUS_FAULT, tests), fullCompetencyLabels[action.payload], 0);
            return of(new AnalyticRecorded());
        }));
        this.removeDangerousFault$ = this.actions$.pipe(ofType(dangerousFaultsActions.REMOVE_DANGEROUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REMOVE_DANGEROUS_FAULT, tests), fullCompetencyLabels[action.payload], 0);
            return of(new AnalyticRecorded());
        }));
        this.removeManoeuvreFault$ = this.actions$.pipe(ofType(manoeuvresActions.REMOVE_MANOEUVRE_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REMOVE_DRIVING_FAULT, tests), manoeuvreTypeLabels[action.payload.manoeuvre] + " - " + manoeuvreCompetencyLabels[action.payload.competency]);
            return of(new AnalyticRecorded());
        }));
        this.removeManoeuvreFaultCatADIPart2$ = this.actions$.pipe(ofType(manoeuvresADIPart2Actions.REMOVE_MANOEUVRE_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REMOVE_DRIVING_FAULT, tests), manoeuvreTypeLabels[action.payload.manoeuvre] + " - " + manoeuvreCompetencyLabels[action.payload.competency]);
            return of(new AnalyticRecorded());
        }));
        this.controlledStopRemoveFault$ = this.actions$.pipe(ofType(controlledStopActions.CONTROLLED_STOP_REMOVE_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REMOVE_FAULT, tests), fullCompetencyLabels['outcomeControlledStop']);
            return of(new AnalyticRecorded());
        }));
        this.highwayCodeSafetyRemoveFault$ = this.actions$.pipe(ofType(highwayCodeSafetyActions.HIGHWAY_CODE_SAFETY_REMOVE_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REMOVE_FAULT, tests), fullCompetencyLabels['outcomeHighwayCodeSafety']);
            return of(new AnalyticRecorded());
        }));
        this.showMeQuestionRemoveFault$ = this.actions$.pipe(ofType(vehicleChecksActions.SHOW_ME_QUESTION_REMOVE_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REMOVE_FAULT, tests), fullCompetencyLabels['showMeQuestion']);
            return of(new AnalyticRecorded());
        }));
        this.testTermination$ = this.actions$.pipe(ofType(testReportActions.TERMINATE_TEST_FROM_TEST_REPORT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TERMINATION, tests), formatAnalyticsText(AnalyticsEvents.END_TEST, tests), AnalyticsLabels.TERMINATE_TEST);
            return of(new AnalyticRecorded());
        }));
        this.toggleLegalRequirement$ = this.actions$.pipe(ofType(testRequirementsActions.TOGGLE_LEGAL_REQUIREMENT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getTestRequirements)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], testRequirements = _a[2];
            var toggleValue = testRequirements[action.payload]
                ? legalRequirementToggleValues.completed
                : legalRequirementToggleValues.uncompleted;
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests), legalRequirementsLabels[action.payload] + " - " + toggleValue);
            return of(new AnalyticRecorded());
        }));
        this.toggleEco$ = this.actions$.pipe(ofType(ecoActions.TOGGLE_ECO), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getEco)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], eco = _a[2];
            var toggleValue = eco.completed
                ? legalRequirementToggleValues.completed
                : legalRequirementToggleValues.uncompleted;
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests), legalRequirementsLabels['eco'] + " - " + toggleValue);
            return of(new AnalyticRecorded());
        }));
        this.toggleEcoControl$ = this.actions$.pipe(ofType(ecoActions.TOGGLE_CONTROL_ECO), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getEco)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], eco = _a[2];
            var toggleValue = eco.adviceGivenControl
                ? 'selected'
                : 'unselected';
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_ECO_CONTROL, tests), "" + toggleValue);
            return of(new AnalyticRecorded());
        }));
        this.toggleEcoPlanning$ = this.actions$.pipe(ofType(ecoActions.TOGGLE_PLANNING_ECO), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getEco)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], eco = _a[2];
            var toggleValue = eco.adviceGivenPlanning
                ? 'selected'
                : 'unselected';
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_ECO_PLANNING, tests), "" + toggleValue);
            return of(new AnalyticRecorded());
        }));
        this.toggleETA$ = this.actions$.pipe(ofType(etaActions.TOGGLE_ETA), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getETA)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], eta = _a[2];
            var event = action.payload === ExaminerActions.physical ?
                AnalyticsEvents.TOGGLE_ETA_PHYSICAL : AnalyticsEvents.TOGGLE_ETA_VERBAL;
            var etaValue = action.payload === ExaminerActions.physical ? eta.physical : eta.verbal;
            var toggleValue = etaValue
                ? 'selected'
                : 'unselected';
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(event, tests), "" + toggleValue);
            return of(new AnalyticRecorded());
        }));
        this.toggleControlledStop$ = this.actions$.pipe(ofType(controlledStopActions.TOGGLE_CONTROLLED_STOP), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getControlledStop)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], controlledStop = _a[2];
            var toggleValue = controlledStop.selected
                ? legalRequirementToggleValues.completed
                : legalRequirementToggleValues.uncompleted;
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_CONTROLLED_STOP, tests), "" + toggleValue);
            return of(new AnalyticRecorded());
        }));
        this.toggleHighwayCodeSafety$ = this.actions$.pipe(ofType(highwayCodeSafetyActions.TOGGLE_HIGHWAYCODE_SAFETY), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getHighwayCodeSafety)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], highwayCodeSafety = _a[2];
            var toggleValue = highwayCodeSafety.selected
                ? legalRequirementToggleValues.completed
                : legalRequirementToggleValues.uncompleted;
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests), legalRequirementsLabels.highwayCodeSafety + " - " + toggleValue);
            return of(new AnalyticRecorded());
        }));
        this.manoeuvreCompletedEffect$ = this.actions$.pipe(ofType(manoeuvresActions.RECORD_MANOEUVRES_SELECTION), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests), legalRequirementsLabels['manoeuvre'] + " - " + legalRequirementToggleValues.completed);
            return of(new AnalyticRecorded());
        }));
        this.manoeuvreCompletedEffectCatADIPart2$ = this.actions$.pipe(ofType(manoeuvresADIPart2Actions.RECORD_MANOEUVRES_SELECTION), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests), legalRequirementsLabels['manoeuvre'] + " - " + legalRequirementToggleValues.completed);
            return of(new AnalyticRecorded());
        }));
        this.deselectReverseLeftManoeuvreEffect$ = this.actions$.pipe(ofType(manoeuvresActions.RECORD_MANOEUVRES_DESELECTION), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests), legalRequirementsLabels['manoeuvre'] + " - " + legalRequirementToggleValues.uncompleted);
            return of(new AnalyticRecorded());
        }));
        this.showMeQuestionCompletedEffect$ = this.actions$.pipe(ofType(vehicleChecksActions.SHOW_ME_QUESTION_PASSED, vehicleChecksActions.SHOW_ME_QUESTION_DRIVING_FAULT, vehicleChecksActions.SHOW_ME_QUESTION_SERIOUS_FAULT, vehicleChecksActions.SHOW_ME_QUESTION_DANGEROUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests), legalRequirementsLabels['vehicleChecks'] + " - " + legalRequirementToggleValues.completed);
            return of(new AnalyticRecorded());
        }));
        this.showMeQuestionUncompletedEffect$ = this.actions$.pipe(ofType(vehicleChecksActions.SHOW_ME_QUESTION_REMOVE_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests), legalRequirementsLabels['vehicleChecks'] + " - " + legalRequirementToggleValues.uncompleted);
            return of(new AnalyticRecorded());
        }));
        this.uncoupleRecoupleAddDrivingFault$ = this.actions$.pipe(ofType(uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_ADD_DRIVING_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests), 'Uncouple recouple', 1);
            return of(new AnalyticRecorded());
        }));
        this.uncoupleRecoupleAddSeriousFault$ = this.actions$.pipe(ofType(uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_ADD_SERIOUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests), 'Uncouple recouple', 1);
            return of(new AnalyticRecorded());
        }));
        this.uncoupleRecoupleAddDangerousFault$ = this.actions$.pipe(ofType(uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_ADD_DANGEROUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_FAULT, tests), 'Uncouple recouple', 1);
            return of(new AnalyticRecorded());
        }));
        this.reverseLeftPopoverOpened$ = this.actions$.pipe(ofType(reverseLeftActions.REVERSE_LEFT_POPOVER_OPENED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REVERSE_LEFT_POPOVER_OPENED, tests));
            return of(new AnalyticRecorded());
        }));
        this.reverseLeftPopoverClosed$ = this.actions$.pipe(ofType(reverseLeftActions.REVERSE_LEFT_POPOVER_CLOSED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REVERSE_LEFT_POPOVER_CLOSED, tests));
            return of(new AnalyticRecorded());
        }));
        this.toggleAvoidanceSpeedReq$ = this.actions$.pipe(ofType(avoidanceActions.ADD_AVOIDANCE_SERIOUS_FAULT, avoidanceActions.REMOVE_AVOIDANCE_SERIOUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var toggleValue = action.type === avoidanceActions.ADD_AVOIDANCE_SERIOUS_FAULT ?
                speedCheckToggleValues.speedNotMet : speedCheckToggleValues.speedMet;
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_AVOIDANCE_SPEED_REQUIREMENT, tests), competencyLabels['speedCheckAvoidance'] + " - " + toggleValue);
            return of(new AnalyticRecorded());
        }));
        this.recordAvoidanceFirstAttempt$ = this.actions$.pipe(ofType(avoidanceActions.RECORD_AVOIDANCE_FIRST_ATTEMPT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getCatAmod1TestData), select(getAvoidance)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], avoidance = _a[2];
            var attemptValue = avoidance.firstAttempt;
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.RECORD_AVOIDANCE_FIRST_ATTEMPT, tests), competencyLabels['speedCheckAvoidance'] + " - " + attemptValue);
            return of(new AnalyticRecorded());
        }));
        this.recordAvoidanceSecondAttempt$ = this.actions$.pipe(ofType(avoidanceActions.RECORD_AVOIDANCE_SECOND_ATTEMPT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getCatAmod1TestData), select(getAvoidance)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], avoidance = _a[2];
            var attemptValue = avoidance.secondAttempt;
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.RECORD_AVOIDANCE_SECOND_ATTEMPT, tests), competencyLabels['speedCheckAvoidance'] + " - " + attemptValue);
            return of(new AnalyticRecorded());
        }));
        this.toggleEmergencyStopSpeedReq$ = this.actions$.pipe(ofType(emergencyStopActions.ADD_EMERGENCY_STOP_SERIOUS_FAULT, emergencyStopActions.REMOVE_EMERGENCY_STOP_SERIOUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var toggleValue = action.type === emergencyStopActions.ADD_EMERGENCY_STOP_SERIOUS_FAULT ?
                speedCheckToggleValues.speedNotMet : speedCheckToggleValues.speedMet;
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_EMERGENCY_STOP_SPEED_REQ, tests), competencyLabels['speedCheckEmergency'] + " - " + toggleValue);
            return of(new AnalyticRecorded());
        }));
        this.recordEmergencyStopFirstAttempt$ = this.actions$.pipe(ofType(emergencyStopActions.RECORD_EMERGENCY_STOP_FIRST_ATTEMPT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getCatAmod1TestData), select(getEmergencyStop)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], emergencyStop = _a[2];
            var attemptValue = emergencyStop.firstAttempt;
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.RECORD_EMERGENCY_STOP_FIRST_ATTEMPT, tests), competencyLabels['speedCheckEmergency'] + " - " + attemptValue);
            return of(new AnalyticRecorded());
        }));
        this.recordEmergencyStopSecondAttempt$ = this.actions$.pipe(ofType(emergencyStopActions.RECORD_EMERGENCY_STOP_SECOND_ATTEMPT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getCatAmod1TestData), select(getEmergencyStop)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], emergencyStop = _a[2];
            var attemptValue = emergencyStop.secondAttempt;
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.RECORD_EMERGENCY_STOP_SECOND_ATTEMPT, tests), competencyLabels['speedCheckEmergency'] + " - " + attemptValue);
            return of(new AnalyticRecorded());
        }));
        this.setActivityCode$ = this.actions$.pipe(ofType(activityCodeActions.SET_ACTIVITY_CODE), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TERMINATION, tests), formatAnalyticsText(AnalyticsEvents.END_TEST, tests), AnalyticsLabels.SET_ACTIVITY_CODE);
            return of(new AnalyticRecorded());
        }));
        this.speedRequirementNotMetModalOpened$ = this.actions$.pipe(ofType(testReportCatAMod1Actions.SPEED_REQ_NOT_MET_MODAL_OPENED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.SPEED_REQ_NOT_MET_MODAL_OPENED, tests), ModalReason.SPEED_REQUIREMENTS);
            return of(new AnalyticRecorded());
        }));
        this.emergencyStopDangerousFaultModelOpened$ = this.actions$.pipe(ofType(testReportCatAMod1Actions.EMERGENCY_STOP_DANGEROUS_FAULT_MODAL_OPENED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.EMERGENCY_STOP_DANGEROUS_FAULT_MODAL_OPENED, tests), ModalReason.EMERGENCY_STOP_DANGEROUS);
            return of(new AnalyticRecorded());
        }));
        this.emergencyStopSeriousFaultModelOpened$ = this.actions$.pipe(ofType(testReportCatAMod1Actions.EMERGENCY_STOP_SERIOUS_FAULT_MODAL_OPENED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.EMERGENCY_STOP_SERIOUS_FAULT_MODAL_OPENED, tests), ModalReason.EMERGENCY_STOP_SERIOUS);
            return of(new AnalyticRecorded());
        }));
        this.setSingleFaultCompetencyOutcome$ = this.actions$.pipe(ofType(singleFaultCompetencyActions.SET_SINGLE_FAULT_COMPETENCY_OUTCOME), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            if (action.outcome === CompetencyOutcome.DF) {
                _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_SINGLE_FAULT, tests), fullCompetencyLabels[action.competencyName]);
            }
            else if (action.outcome === CompetencyOutcome.D) {
                _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_SINGLE_FAULT, tests), fullCompetencyLabels[action.competencyName]);
            }
            else if (action.outcome === CompetencyOutcome.S) {
                _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_SINGLE_FAULT, tests), fullCompetencyLabels[action.competencyName]);
            }
            return of(new AnalyticRecorded());
        }));
        this.removeSingleFaultCompetencyOutcome$ = this.actions$.pipe(ofType(singleFaultCompetencyActions.REMOVE_SINGLE_FAULT_COMPETENCY_OUTCOME), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REMOVE_SINGLE_FAULT, tests), fullCompetencyLabels[action.competencyName]);
            return of(new AnalyticRecorded());
        }));
        this.removeSingleDangerousFaultCompetencyOutcome$ = this.actions$.pipe(ofType(singleFaultCompetencyActions.REMOVE_SINGLE_DANGEROUS_FAULT_COMPETENCY_OUTCOME), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REMOVE_DANGEROUS_SINGLE_FAULT, tests), fullCompetencyLabels[action.competencyName]);
            return of(new AnalyticRecorded());
        }));
        this.removeSingleSeriousFaultCompetencyOutcome$ = this.actions$.pipe(ofType(singleFaultCompetencyActions.REMOVE_SINGLE_SERIOUS_FAULT_COMPETENCY_OUTCOME), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.REMOVE_SERIOUS_SINGLE_FAULT, tests), fullCompetencyLabels[action.competencyName]);
            return of(new AnalyticRecorded());
        }));
        this.pcvDoorExerciseAddDrivingFault$ = this.actions$.pipe(ofType(pcvDoorExerciseActions.PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT, tests), fullCompetencyLabels.pcvDoorExercise);
            return of(new AnalyticRecorded());
        }));
        this.pcvDoorExerciseAddSeriousFault$ = this.actions$.pipe(ofType(pcvDoorExerciseActions.PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT, tests), fullCompetencyLabels.pcvDoorExercise);
            return of(new AnalyticRecorded());
        }));
        this.pcvDoorExerciseAddDangerousFault$ = this.actions$.pipe(ofType(pcvDoorExerciseActions.PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT, tests), fullCompetencyLabels.pcvDoorExercise);
            return of(new AnalyticRecorded());
        }));
        this.pcvDoorExerciseRemoveDrivingFault$ = this.actions$.pipe(ofType(pcvDoorExerciseActions.PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT, tests), fullCompetencyLabels.pcvDoorExercise);
            return of(new AnalyticRecorded());
        }));
        this.pcvDoorExerciseRemoveSeriousFault$ = this.actions$.pipe(ofType(pcvDoorExerciseActions.PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT, tests), fullCompetencyLabels.pcvDoorExercise);
            return of(new AnalyticRecorded());
        }));
        this.pcvDoorExerciseRemoveDangerousFault$ = this.actions$.pipe(ofType(pcvDoorExerciseActions.PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT, tests), fullCompetencyLabels.pcvDoorExercise);
            return of(new AnalyticRecorded());
        }));
        this.startTimer$ = this.actions$.pipe(ofType(testReportActions.START_TIMER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.START_TIMER, tests));
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "testReportViewDidEnter$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "toggleRemoveFaultMode$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "toggleSeriousFaultMode$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "toggleDangerousFaultMode$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "addDrivingFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "addSeriousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "addDangerousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "addManoeuvreDrivingFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "addManoeuvreDrivingFaultCatADIPart2$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "addManoeuvreSeriousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "addManoeuvreSeriousFaultCatADIPart2$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "addManoeuvreDangerousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "addManoeuvreDangerousFaultCatADIPart2$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "controlledStopAddDrivingFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "controlledStopAddSeriousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "controlledStopAddDangerousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "highwayCodeSafetyAddDrivingFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "highwayCodeSafetyAddSeriousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "showMeQuestionDrivingFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "showMeQuestionSeriousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "showMeQuestionDangerousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "removeDrivingFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "removeSeriousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "removeDangerousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "removeManoeuvreFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "removeManoeuvreFaultCatADIPart2$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "controlledStopRemoveFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "highwayCodeSafetyRemoveFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "showMeQuestionRemoveFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "testTermination$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "toggleLegalRequirement$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "toggleEco$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "toggleEcoControl$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "toggleEcoPlanning$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "toggleETA$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "toggleControlledStop$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "toggleHighwayCodeSafety$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "manoeuvreCompletedEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "manoeuvreCompletedEffectCatADIPart2$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "deselectReverseLeftManoeuvreEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "showMeQuestionCompletedEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "showMeQuestionUncompletedEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "uncoupleRecoupleAddDrivingFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "uncoupleRecoupleAddSeriousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "uncoupleRecoupleAddDangerousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "reverseLeftPopoverOpened$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "reverseLeftPopoverClosed$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "toggleAvoidanceSpeedReq$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "recordAvoidanceFirstAttempt$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "recordAvoidanceSecondAttempt$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "toggleEmergencyStopSpeedReq$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "recordEmergencyStopFirstAttempt$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "recordEmergencyStopSecondAttempt$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "setActivityCode$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "speedRequirementNotMetModalOpened$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "emergencyStopDangerousFaultModelOpened$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "emergencyStopSeriousFaultModelOpened$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "setSingleFaultCompetencyOutcome$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "removeSingleFaultCompetencyOutcome$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "removeSingleDangerousFaultCompetencyOutcome$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "removeSingleSeriousFaultCompetencyOutcome$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "pcvDoorExerciseAddDrivingFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "pcvDoorExerciseAddSeriousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "pcvDoorExerciseAddDangerousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "pcvDoorExerciseRemoveDrivingFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "pcvDoorExerciseRemoveSeriousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "pcvDoorExerciseRemoveDangerousFault$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestReportAnalyticsEffects.prototype, "startTimer$", void 0);
    TestReportAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], TestReportAnalyticsEffects);
    return TestReportAnalyticsEffects;
}());
export { TestReportAnalyticsEffects };
//# sourceMappingURL=test-report.analytics.effects.js.map