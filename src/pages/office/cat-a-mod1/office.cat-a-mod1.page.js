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
import { IonicPage, NavController, NavParams, Platform, ToastController, Keyboard, AlertController, } from 'ionic-angular';
import { Component } from '@angular/core';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { OfficeViewDidEnter, CompleteTest, SavingWriteUpForLater, OfficeValidationError, TestStartDateChanged, } from '../office.actions';
import { merge } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { getCurrentTest, getTestOutcome, isTestOutcomeSet, isPassed, getTestOutcomeText, getActivityCode, getJournalData, } from '../../../modules/tests/tests.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCandidateDescription, getAdditionalInformation, getWeatherConditions, getIdentification, } from '../../../modules/tests/test-summary/common/test-summary.selector';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { map, withLatestFrom } from 'rxjs/operators';
import { IdentificationUsedChanged, CandidateDescriptionChanged, WeatherConditionsChanged, AdditionalInformationChanged, } from '../../../modules/tests/test-summary/common/test-summary.actions';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateName, getCandidateDriverNumber, formatDriverNumber, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { QuestionProvider } from '../../../providers/question/question';
import { getTestSlotAttributes, } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { getTestDate, getTestStartDateTime, getTestTime } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { getETA, getETAFaultText, } from '../../../modules/tests/test-data/common/test-data.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { WeatherConditionProvider } from '../../../providers/weather-conditions/weather-condition';
import { AddDangerousFaultComment, } from '../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { AddSeriousFaultComment } from '../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { AddDrivingFaultComment } from '../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import { CommentSource } from '../../../shared/models/fault-marking.model';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../office-behaviour-map.cat-a-mod1';
import { activityCodeModelList } from '../components/activity-code/activity-code.constants';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { CAT_A_MOD1, JOURNAL_PAGE } from '../../page-names.constants';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { getCircuit } from '../../../modules/tests/test-summary/cat-a-mod1/test-summary.cat-a-mod1.selector';
import { CircuitTypeChanged } from '../../../modules/tests/test-summary/cat-a-mod1/test-summary.cat-a-mod1.actions';
import { getEmergencyStop } from '../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.selector';
import { getAvoidance, getAvoidanceAttempted, } from '../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.selector';
import { CANDIDATE_DESCRIPTION_MAX_LENGTH, CANDIDATE_DESCRIPTION_CONTROL, } from '../components/candidate-description/candidate-description.constants';
import { AddSingleFaultCompetencyComment, } from '../../../modules/tests/test-data/common/single-fault-competencies/single-fault-competencies.actions';
import { Competencies } from '../../../modules/tests/test-data/test-data.constants';
import { AddAvoidanceComment } from '../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.actions';
import { AddAnEmergencyStopComment } from '../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.actions';
import { startsWith } from 'lodash';
import { getNewTestStartTime } from '../../../shared/helpers/test-start-time';
import { SetStartDate } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.actions';
var OfficeCatAMod1Page = /** @class */ (function (_super) {
    __extends(OfficeCatAMod1Page, _super);
    function OfficeCatAMod1Page(store$, toastController, navController, navParams, platform, authenticationProvider, weatherConditionProvider, questionProvider, keyboard, outcomeBehaviourProvider, alertController, faultCountProvider, faultSummaryProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.toastController = toastController;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.weatherConditionProvider = weatherConditionProvider;
        _this.questionProvider = questionProvider;
        _this.keyboard = keyboard;
        _this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        _this.alertController = alertController;
        _this.faultCountProvider = faultCountProvider;
        _this.faultSummaryProvider = faultSummaryProvider;
        _this.drivingFaultCtrl = 'drivingFaultCtrl';
        _this.seriousFaultCtrl = 'seriousFaultCtrl';
        _this.dangerousFaultCtrl = 'dangerousFaultCtrl';
        _this.isValidStartDateTime = true;
        _this.createToast = function (errorMessage) {
            _this.toast = _this.toastController.create({
                message: errorMessage,
                position: 'top',
                dismissOnPageChange: true,
                cssClass: 'mes-toast-message-error',
                duration: 5000,
                showCloseButton: true,
                closeButtonText: 'X',
            });
        };
        _this.shouldDisplayDrivingFaultComments = function (data, category) {
            var drivingFaultCount = _this.faultCountProvider.getDrivingFaultSumCount(category, data);
            var seriousFaultCount = _this.faultCountProvider.getSeriousFaultSumCount(category, data);
            var dangerousFaultCount = _this.faultCountProvider.getDangerousFaultSumCount(category, data);
            return dangerousFaultCount === 0 && seriousFaultCount === 0 && drivingFaultCount > OfficeCatAMod1Page_1.maxFaultCount;
        };
        _this.form = new FormGroup({});
        _this.weatherConditions = _this.weatherConditionProvider.getWeatherConditions();
        _this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
        _this.activityCodeOptions = activityCodeModelList;
        return _this;
    }
    OfficeCatAMod1Page_1 = OfficeCatAMod1Page;
    OfficeCatAMod1Page.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new OfficeViewDidEnter());
    };
    OfficeCatAMod1Page.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var testCategory$ = currentTest$.pipe(select(getTestCategory), 
        // We need this as TestCategory but it comes as CategoryCode.
        map(function (testCategory) { return testCategory; }));
        this.pageState = {
            testCategory$: testCategory$,
            activityCode$: currentTest$.pipe(select(getActivityCode)),
            isRekey$: currentTest$.pipe(select(getRekeyIndicator), select(isRekey)),
            testOutcome$: currentTest$.pipe(select(getTestOutcome)),
            testOutcomeText$: currentTest$.pipe(select(getTestOutcomeText)),
            isPassed$: currentTest$.pipe(select(isPassed)),
            isTestOutcomeSet$: currentTest$.pipe(select(isTestOutcomeSet)),
            startTime$: currentTest$.pipe(select(getJournalData), select(getTestSlotAttributes), select(getTestTime)),
            startDate$: currentTest$.pipe(select(getJournalData), select(getTestSlotAttributes), select(getTestDate)),
            startDateTime$: currentTest$.pipe(select(getJournalData), select(getTestSlotAttributes), select(getTestStartDateTime)),
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateName)),
            candidateDriverNumber$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateDriverNumber), map(formatDriverNumber)),
            displayCandidateDescription$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getCandidateDescription))), map(function (_a) {
                var outcome = _a[0], candidate = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'candidateDescription', candidate);
            })),
            displayIdentification$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getIdentification))), map(function (_a) {
                var outcome = _a[0], identification = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'identification', identification);
            })),
            displayWeatherConditions$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getWeatherConditions))), map(function (_a) {
                var outcome = _a[0], weather = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'weatherConditions', weather);
            })),
            displayAdditionalInformation$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getAdditionalInformation))), map(function (_a) {
                var outcome = _a[0], additional = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'additionalInformation', additional);
            })),
            displayEta$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData), select(getETA))), map(function (_a) {
                var outcome = _a[0], eta = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'eta', eta);
            })),
            displayDrivingFault$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData)), testCategory$), map(function (_a) {
                var outcome = _a[0], data = _a[1], category = _a[2];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', _this.faultSummaryProvider.getDrivingFaultsList(data, category));
            })),
            displaySeriousFault$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData)), testCategory$), map(function (_a) {
                var outcome = _a[0], data = _a[1], category = _a[2];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', _this.faultSummaryProvider.getSeriousFaultsList(data, category));
            })),
            displayDangerousFault$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData)), testCategory$), map(function (_a) {
                var outcome = _a[0], data = _a[1], category = _a[2];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', _this.faultSummaryProvider.getDrivingFaultsList(data, category));
            })),
            candidateDescription$: currentTest$.pipe(select(getTestSummary), select(getCandidateDescription)),
            identification$: currentTest$.pipe(select(getTestSummary), select(getIdentification)),
            additionalInformation$: currentTest$.pipe(select(getTestSummary), select(getAdditionalInformation)),
            etaFaults$: currentTest$.pipe(select(getTestData), select(getETA), select(getETAFaultText)),
            dangerousFaults$: currentTest$.pipe(select(getTestData), withLatestFrom(testCategory$), map(function (_a) {
                var data = _a[0], category = _a[1];
                return _this.faultSummaryProvider.getDangerousFaultsList(data, category);
            })),
            seriousFaults$: currentTest$.pipe(select(getTestData), withLatestFrom(testCategory$), map(function (_a) {
                var data = _a[0], category = _a[1];
                return _this.faultSummaryProvider.getSeriousFaultsList(data, category);
            })),
            drivingFaults$: currentTest$.pipe(select(getTestData), withLatestFrom(testCategory$), map(function (_a) {
                var data = _a[0], category = _a[1];
                return _this.faultSummaryProvider.getDrivingFaultsList(data, category);
            })),
            drivingFaultCount$: currentTest$.pipe(select(getTestData), withLatestFrom(testCategory$), map(function (_a) {
                var data = _a[0], category = _a[1];
                return _this.faultCountProvider.getDrivingFaultSumCount(category, data);
            })),
            displayDrivingFaultComments$: currentTest$.pipe(select(getTestData), withLatestFrom(testCategory$), map(function (_a) {
                var data = _a[0], category = _a[1];
                return _this.shouldDisplayDrivingFaultComments(data, category);
            })),
            weatherConditions$: currentTest$.pipe(select(getTestSummary), select(getWeatherConditions)),
            displayCircuit$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getCircuit))), map(function (_a) {
                var outcome = _a[0], circuit = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'circuit', circuit);
            })),
            circuit$: currentTest$.pipe(select(getTestSummary), select(getCircuit)),
            emergencyStop$: currentTest$.pipe(select(getTestData), select(getEmergencyStop)),
            avoidance$: currentTest$.pipe(select(getTestData), select(getAvoidance)),
            avoidanceAttempted$: currentTest$.pipe(select(getTestData), select(getAvoidance), select(getAvoidanceAttempted)),
            displaySpeedRequirements$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData), select(getEmergencyStop))), map(function (_a) {
                var outcome = _a[0], emergencyStop = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'speedRequirement', emergencyStop.firstAttempt);
            })),
        };
        this.setupSubscriptions();
    };
    OfficeCatAMod1Page.prototype.setupSubscriptions = function () {
        var _this = this;
        var startDateTime$ = this.pageState.startDateTime$;
        this.subscription = merge(startDateTime$.pipe(map(function (value) { return _this.startDateTime = value; }))).subscribe();
    };
    OfficeCatAMod1Page.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    OfficeCatAMod1Page.prototype.popToRoot = function () {
        var journalPage = this.navController.getViews().find(function (view) { return view.id === JOURNAL_PAGE; });
        this.navController.popTo(journalPage);
    };
    OfficeCatAMod1Page.prototype.defer = function () {
        this.popToRoot();
        this.store$.dispatch(new SavingWriteUpForLater());
        this.store$.dispatch(new PersistTests());
    };
    OfficeCatAMod1Page.prototype.onSubmit = function () {
        if (this.isFormValid()) {
            this.showFinishTestModal();
        }
    };
    OfficeCatAMod1Page.prototype.setIsValidStartDateTime = function (isValid) {
        this.isValidStartDateTime = isValid;
    };
    OfficeCatAMod1Page.prototype.dateOfTestChanged = function (inputDate) {
        var customStartDate = getNewTestStartTime(inputDate, this.startDateTime);
        this.store$.dispatch(new TestStartDateChanged(this.startDateTime, customStartDate));
        this.store$.dispatch(new SetStartDate(customStartDate));
    };
    OfficeCatAMod1Page.prototype.identificationChanged = function (identification) {
        this.store$.dispatch(new IdentificationUsedChanged(identification));
    };
    OfficeCatAMod1Page.prototype.weatherConditionsChanged = function (weatherConditions) {
        this.store$.dispatch(new WeatherConditionsChanged(weatherConditions));
    };
    OfficeCatAMod1Page.prototype.candidateDescriptionChanged = function (candidateDescription) {
        this.store$.dispatch(new CandidateDescriptionChanged(candidateDescription));
    };
    OfficeCatAMod1Page.prototype.additionalInformationChanged = function (additionalInformation) {
        this.store$.dispatch(new AdditionalInformationChanged(additionalInformation));
    };
    OfficeCatAMod1Page.prototype.circuitChanged = function (circuit) {
        this.store$.dispatch(new CircuitTypeChanged(circuit));
    };
    OfficeCatAMod1Page.prototype.dangerousFaultCommentChanged = function (dangerousFaultComment) {
        if (dangerousFaultComment.source === CommentSource.SIMPLE) {
            this.store$.dispatch(new AddDangerousFaultComment(dangerousFaultComment.competencyIdentifier, dangerousFaultComment.comment));
        }
        else if (dangerousFaultComment.source === CommentSource.SINGLE_FAULT_COMPETENCY) {
            this.store$.dispatch(new AddSingleFaultCompetencyComment(dangerousFaultComment.competencyIdentifier, dangerousFaultComment.comment));
        }
    };
    OfficeCatAMod1Page.prototype.seriousFaultCommentChanged = function (seriousFaultComment) {
        if (seriousFaultComment.source === CommentSource.SIMPLE) {
            this.store$.dispatch(new AddSeriousFaultComment(seriousFaultComment.competencyIdentifier, seriousFaultComment.comment));
        }
        else if (seriousFaultComment.source === CommentSource.SINGLE_FAULT_COMPETENCY) {
            this.store$.dispatch(new AddSingleFaultCompetencyComment(seriousFaultComment.competencyIdentifier, seriousFaultComment.comment));
        }
        else if (startsWith(seriousFaultComment.source, CommentSource.SPEED_REQUIREMENTS)) {
            var segments = seriousFaultComment.source.split('-');
            var fieldName = segments[1];
            switch (fieldName) {
                case Competencies.speedCheckAvoidance:
                    this.store$.dispatch(new AddAvoidanceComment(seriousFaultComment.comment));
                    break;
                case Competencies.speedCheckEmergency:
                    this.store$.dispatch(new AddAnEmergencyStopComment(seriousFaultComment.comment));
                    break;
            }
        }
    };
    OfficeCatAMod1Page.prototype.drivingFaultCommentChanged = function (drivingFaultComment) {
        if (drivingFaultComment.source === CommentSource.SIMPLE) {
            this.store$.dispatch(new AddDrivingFaultComment(drivingFaultComment.competencyIdentifier, drivingFaultComment.comment));
        }
        else if (drivingFaultComment.source === CommentSource.SINGLE_FAULT_COMPETENCY) {
            this.store$.dispatch(new AddSingleFaultCompetencyComment(drivingFaultComment.competencyIdentifier, drivingFaultComment.comment));
        }
    };
    OfficeCatAMod1Page.prototype.activityCodeChanged = function (activityCodeModel) {
        var showMeQuestion = this.form.controls['showMeQuestion'];
        if (showMeQuestion) {
            if (showMeQuestion.value && showMeQuestion.value.code === 'N/A') {
                this.form.controls['showMeQuestion'].setValue({});
            }
        }
        this.store$.dispatch(new SetActivityCode(activityCodeModel.activityCode));
    };
    OfficeCatAMod1Page.prototype.showFinishTestModal = function () {
        var _this = this;
        var alert = this.alertController.create({
            title: 'Are you sure you wish to mark the write up for this test as complete?',
            cssClass: 'finish-test-modal',
            buttons: [
                {
                    text: 'Back',
                    handler: function () { },
                },
                {
                    text: 'Continue',
                    handler: function () { return _this.completeTest(); },
                },
            ],
        });
        alert.present();
    };
    OfficeCatAMod1Page.prototype.goToReasonForRekey = function () {
        if (this.isFormValid()) {
            this.navController.push(CAT_A_MOD1.REKEY_REASON_PAGE);
        }
    };
    OfficeCatAMod1Page.prototype.isFormValid = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            return true;
        }
        Object.keys(this.form.controls).forEach(function (controlName) {
            if (controlName === CANDIDATE_DESCRIPTION_CONTROL
                && _this.form.controls[controlName].value !== null
                && _this.form.controls[controlName].value.length > CANDIDATE_DESCRIPTION_MAX_LENGTH) {
                _this.store$.dispatch(new OfficeValidationError(controlName + " exceeds max length of " + CANDIDATE_DESCRIPTION_MAX_LENGTH));
            }
            else if (_this.form.controls[controlName].invalid) {
                _this.store$.dispatch(new OfficeValidationError(controlName + " is blank"));
            }
        });
        this.createToast('Fill all mandatory fields');
        this.toast.present();
        return false;
    };
    OfficeCatAMod1Page.prototype.completeTest = function () {
        this.store$.dispatch(new CompleteTest());
        this.popToRoot();
    };
    var OfficeCatAMod1Page_1;
    OfficeCatAMod1Page.maxFaultCount = 5;
    OfficeCatAMod1Page = OfficeCatAMod1Page_1 = __decorate([
        IonicPage(),
        Component({
            selector: '.office-cat-a-mod1-page',
            templateUrl: 'office.cat-a-mod1.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            ToastController,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            WeatherConditionProvider,
            QuestionProvider,
            Keyboard,
            OutcomeBehaviourMapProvider,
            AlertController,
            FaultCountProvider,
            FaultSummaryProvider])
    ], OfficeCatAMod1Page);
    return OfficeCatAMod1Page;
}(BasePageComponent));
export { OfficeCatAMod1Page };
//# sourceMappingURL=office.cat-a-mod1.page.js.map