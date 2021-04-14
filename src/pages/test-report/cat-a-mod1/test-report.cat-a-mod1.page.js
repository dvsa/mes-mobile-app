var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { TestReportViewDidEnter, TerminateTestFromTestReport, CalculateTestResult, } from '../test-report.actions';
import { getCurrentTest, getJournalData, } from '../../../modules/tests/tests.selector';
import { Competencies, ExaminerActions, SingleFaultCompetencyNames, } from '../../../modules/tests/test-data/test-data.constants';
import { getTestData } from '../../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestReportState } from '../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../test-report.selector';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { ModalEvent } from '../test-report.constants';
import { CAT_A_MOD1 } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { SpeedCheckState } from '../../../providers/test-report-validator/test-report-validator.constants';
import { ModalReason } from './components/activity-code-4-modal/activity-code-4-modal.constants';
import { SpeedRequirementNotMetModalOpened, EmergencyStopDangerousFaultModelOpened, EmergencyStopSeriousFaultModelOpened } from './test-report.cat-a-mod1.actions';
import { competencyLabels } from '../../../shared/constants/competencies/competencies';
var TestReportCatAMod1Page = /** @class */ (function (_super) {
    __extends(TestReportCatAMod1Page, _super);
    function TestReportCatAMod1Page(store$, navController, navParams, platform, authenticationProvider, modalController, testReportValidatorProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.modalController = modalController;
        _this.testReportValidatorProvider = testReportValidatorProvider;
        _this.competencies = Competencies;
        _this.singleFaultCompetencyNames = SingleFaultCompetencyNames;
        _this.eta = ExaminerActions;
        _this.isRemoveFaultMode = false;
        _this.isSeriousMode = false;
        _this.isDangerousMode = false;
        _this.manoeuvresCompleted = false;
        _this.isEtaValid = true;
        _this.onEndTestClick = function () {
            var options = { cssClass: 'mes-modal-alert text-zoom-regular' };
            var modal = null;
            if (modal === null) {
                modal = _this.createEtaInvalidModal(options);
            }
            if (modal === null) {
                modal = _this.createSpeedCheckModal(options);
            }
            if (modal === null) {
                modal = _this.createActivityCode4Modal(options);
            }
            if (modal === null) {
                modal = _this.createEndTestModal(options);
            }
            modal.onDidDismiss(_this.onModalDismiss);
            modal.present();
        };
        _this.onModalDismiss = function (event) {
            switch (event) {
                case ModalEvent.CANCEL:
                    break;
                case ModalEvent.TERMINATE:
                    _this.store$.dispatch(new TerminateTestFromTestReport());
                    _this.navController.push(CAT_A_MOD1.DEBRIEF_PAGE);
                    break;
                case ModalEvent.CONTINUE:
                    _this.store$.dispatch(new CalculateTestResult());
                    _this.navController.push(CAT_A_MOD1.DEBRIEF_PAGE);
                    break;
                case ModalEvent.END_WITH_ACTIVITY_CODE_4:
                    _this.store$.dispatch(new SetActivityCode('4'));
                    _this.navController.push(CAT_A_MOD1.DEBRIEF_PAGE);
                    break;
            }
        };
        _this.displayOverlay = false;
        return _this;
    }
    TestReportCatAMod1Page.prototype.getCallback = function () {
        var _this = this;
        return {
            callbackMethod: function () {
                _this.toggleReportOverlay();
            },
        };
    };
    TestReportCatAMod1Page.prototype.ngOnInit = function () {
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateUntitledName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            isRemoveFaultMode$: this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode)),
            isSeriousMode$: this.store$.pipe(select(getTestReportState), select(isSeriousMode)),
            isDangerousMode$: this.store$.pipe(select(getTestReportState), select(isDangerousMode)),
            testData$: currentTest$.pipe(select(getTestData)),
        };
        this.setupSubscription();
    };
    TestReportCatAMod1Page.prototype.ionViewDidEnter = function () {
        // it is possible that we come back to the page from the terminate screen
        // so need to re-establish the subscription if it doesn't exists or is closed
        if (!this.subscription || this.subscription.closed) {
            this.setupSubscription();
        }
        this.store$.dispatch(new TestReportViewDidEnter());
    };
    TestReportCatAMod1Page.prototype.toggleReportOverlay = function () {
        this.displayOverlay = !this.displayOverlay;
    };
    TestReportCatAMod1Page.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TestReportCatAMod1Page.prototype.setupSubscription = function () {
        var _this = this;
        var _a = this.pageState, candidateUntitledName$ = _a.candidateUntitledName$, isRemoveFaultMode$ = _a.isRemoveFaultMode$, isSeriousMode$ = _a.isSeriousMode$, isDangerousMode$ = _a.isDangerousMode$, testData$ = _a.testData$;
        this.subscription = merge(candidateUntitledName$, isRemoveFaultMode$.pipe(map(function (result) { return (_this.isRemoveFaultMode = result); })), isSeriousMode$.pipe(map(function (result) { return (_this.isSeriousMode = result); })), isDangerousMode$.pipe(map(function (result) { return (_this.isDangerousMode = result); })), testData$.pipe(map(function (data) {
            _this.speedCheckState =
                _this.testReportValidatorProvider.validateSpeedChecksCatAMod1(data);
            _this.isEtaValid = _this.testReportValidatorProvider.isETAValid(data, "EUAM1" /* EUAM1 */);
        }))).subscribe();
    };
    TestReportCatAMod1Page.prototype.createEtaInvalidModal = function (options) {
        if (!this.isEtaValid) {
            return this.modalController.create('EtaInvalidModal', {}, options);
        }
        return null;
    };
    TestReportCatAMod1Page.prototype.createEndTestModal = function (options) {
        if (this.speedCheckState === SpeedCheckState.VALID) {
            return this.modalController.create('EndTestModal', {}, options);
        }
        return null;
    };
    TestReportCatAMod1Page.prototype.createSpeedCheckModal = function (options) {
        switch (this.speedCheckState) {
            case SpeedCheckState.EMERGENCY_STOP_AND_AVOIDANCE_MISSING:
                return this.modalController.create('SpeedCheckModal', { speedChecksNeedCompleting: [competencyLabels.speedCheckEmergency, competencyLabels.speedCheckAvoidance] }, options);
            case SpeedCheckState.EMERGENCY_STOP_MISSING:
                return this.modalController.create('SpeedCheckModal', { speedChecksNeedCompleting: [competencyLabels.speedCheckEmergency] }, options);
            case SpeedCheckState.AVOIDANCE_MISSING:
                return this.modalController.create('SpeedCheckModal', { speedChecksNeedCompleting: [competencyLabels.speedCheckAvoidance] }, options);
            default:
                return null;
        }
    };
    TestReportCatAMod1Page.prototype.createActivityCode4Modal = function (options) {
        switch (this.speedCheckState) {
            case SpeedCheckState.NOT_MET:
                this.store$.dispatch(new SpeedRequirementNotMetModalOpened());
                return this.modalController.create('ActivityCode4Modal', { modalReason: ModalReason.SPEED_REQUIREMENTS }, options);
            case SpeedCheckState.EMERGENCY_STOP_DANGEROUS_FAULT:
                this.store$.dispatch(new EmergencyStopDangerousFaultModelOpened());
                return this.modalController.create('ActivityCode4Modal', { modalReason: ModalReason.EMERGENCY_STOP_DANGEROUS }, options);
            case SpeedCheckState.EMERGENCY_STOP_SERIOUS_FAULT:
                this.store$.dispatch(new EmergencyStopSeriousFaultModelOpened());
                return this.modalController.create('ActivityCode4Modal', { modalReason: ModalReason.EMERGENCY_STOP_SERIOUS }, options);
            default:
                return null;
        }
    };
    TestReportCatAMod1Page = __decorate([
        IonicPage(),
        Component({
            selector: '.test-report-cat-a-mod1-page',
            templateUrl: 'test-report.cat-a-mod1.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            ModalController,
            TestReportValidatorProvider])
    ], TestReportCatAMod1Page);
    return TestReportCatAMod1Page;
}(BasePageComponent));
export { TestReportCatAMod1Page };
//# sourceMappingURL=test-report.cat-a-mod1.page.js.map