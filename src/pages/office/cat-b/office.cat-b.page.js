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
import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { OfficeViewDidEnter, CompleteTest, SavingWriteUpForLater, OfficeValidationError, TestStartDateChanged, } from '../office.actions';
import { merge } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { getCurrentTest, getTestOutcome, isTestOutcomeSet, isPassed, getTestOutcomeText, getActivityCode, getJournalData, } from '../../../modules/tests/tests.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getRouteNumber, getCandidateDescription, getAdditionalInformation, getWeatherConditions, getIdentification, getIndependentDriving, } from '../../../modules/tests/test-summary/common/test-summary.selector';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { map, withLatestFrom } from 'rxjs/operators';
import { RouteNumberChanged, IndependentDrivingTypeChanged, IdentificationUsedChanged, CandidateDescriptionChanged, WeatherConditionsChanged, AdditionalInformationChanged, } from '../../../modules/tests/test-summary/common/test-summary.actions';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateName, getCandidateDriverNumber, formatDriverNumber, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { QuestionProvider } from '../../../providers/question/question';
import { getTestSlotAttributes, } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { getTestDate, getTestStartDateTime, getTestTime } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { getETA, getETAFaultText, getEco, getEcoFaultText, getShowMeQuestionOptions, } from '../../../modules/tests/test-data/common/test-data.selector';
// TODO: update import for category specific page version
import { getVehicleChecks, getSelectedTellMeQuestionText, getShowMeQuestion, getTellMeQuestion, } from '../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-b/test-data.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { WeatherConditionProvider } from '../../../providers/weather-conditions/weather-condition';
import { AddDangerousFaultComment, } from '../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { AddSeriousFaultComment } from '../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { AddDrivingFaultComment } from '../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import { ShowMeQuestionSelected, AddShowMeTellMeComment, } from '../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import { AddControlledStopComment, } from '../../../modules/tests/test-data/common/controlled-stop/controlled-stop.actions';
import { AddManoeuvreComment } from '../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { EyesightTestAddComment } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { CommentSource } from '../../../shared/models/fault-marking.model';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../office-behaviour-map';
import { activityCodeModelList } from '../components/activity-code/activity-code.constants';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { startsWith } from 'lodash';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { CAT_B, JOURNAL_PAGE } from '../../page-names.constants';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { getNewTestStartTime } from '../../../shared/helpers/test-start-time';
import { SetStartDate } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.actions';
var OfficeCatBPage = /** @class */ (function (_super) {
    __extends(OfficeCatBPage, _super);
    function OfficeCatBPage(store$, toastController, navController, navParams, platform, authenticationProvider, weatherConditionProvider, questionProvider, keyboard, outcomeBehaviourProvider, alertController, faultCountProvider, faultSummaryProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider, store$) || this;
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
        _this.shouldDisplayDrivingFaultComments = function (data) {
            var drivingFaultCount = _this.faultCountProvider.getDrivingFaultSumCount("B" /* B */, data);
            var seriousFaultCount = _this.faultCountProvider.getSeriousFaultSumCount("B" /* B */, data);
            var dangerousFaultCount = _this.faultCountProvider.getDangerousFaultSumCount("B" /* B */, data);
            return dangerousFaultCount === 0 && seriousFaultCount === 0 && drivingFaultCount > 15;
        };
        _this.form = new FormGroup({});
        _this.weatherConditions = _this.weatherConditionProvider.getWeatherConditions();
        _this.showMeQuestions = questionProvider.getShowMeQuestions("B" /* B */);
        _this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
        _this.activityCodeOptions = activityCodeModelList;
        return _this;
    }
    OfficeCatBPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new OfficeViewDidEnter());
    };
    OfficeCatBPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var category$ = currentTest$.pipe(select(getTestCategory));
        this.pageState = {
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
            routeNumber$: currentTest$.pipe(select(getTestSummary), select(getRouteNumber)),
            displayRouteNumber$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getRouteNumber))), map(function (_a) {
                var outcome = _a[0], route = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'routeNumber', route);
            })),
            displayIndependentDriving$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getIndependentDriving))), map(function (_a) {
                var outcome = _a[0], independent = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'independentDriving', independent);
            })),
            displayCandidateDescription$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getCandidateDescription))), map(function (_a) {
                var outcome = _a[0], candidate = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'candidateDescription', candidate);
            })),
            displayIdentification$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getIdentification))), map(function (_a) {
                var outcome = _a[0], identification = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'identification', identification);
            })),
            displayShowMeQuestion$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData), select(getVehicleChecks), select(getShowMeQuestion))), map(function (_a) {
                var outcome = _a[0], question = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'showMeQuestion', question);
            })),
            displayTellMeQuestion$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData), select(getVehicleChecks), select(getTellMeQuestion))), map(function (_a) {
                var outcome = _a[0], question = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'tellMeQuestion', question);
            })),
            displayWeatherConditions$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getWeatherConditions))), map(function (_a) {
                var outcome = _a[0], weather = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'weatherConditions', weather);
            })),
            displayAdditionalInformation$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getAdditionalInformation))), map(function (_a) {
                var outcome = _a[0], additional = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'additionalInformation', additional);
            })),
            displayEco$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData), select(getEco))), map(function (_a) {
                var outcome = _a[0], eco = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'eco', eco);
            })),
            displayEta$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData), select(getETA))), map(function (_a) {
                var outcome = _a[0], eta = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'eta', eta);
            })),
            displayDrivingFault$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData))), map(function (_a) {
                var outcome = _a[0], testData = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', _this.faultSummaryProvider.getDrivingFaultsList(testData, "B" /* B */));
            })),
            displaySeriousFault$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData))), map(function (_a) {
                var outcome = _a[0], testData = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', _this.faultSummaryProvider.getSeriousFaultsList(testData, "B" /* B */));
            })),
            displayDangerousFault$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData))), map(function (_a) {
                var outcome = _a[0], testData = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', _this.faultSummaryProvider.getDangerousFaultsList(testData, "B" /* B */));
            })),
            candidateDescription$: currentTest$.pipe(select(getTestSummary), select(getCandidateDescription)),
            independentDriving$: currentTest$.pipe(select(getTestSummary), select(getIndependentDriving)),
            identification$: currentTest$.pipe(select(getTestSummary), select(getIdentification)),
            additionalInformation$: currentTest$.pipe(select(getTestSummary), select(getAdditionalInformation)),
            showMeQuestion$: currentTest$.pipe(select(getTestData), select(getVehicleChecks), select(getShowMeQuestion)),
            showMeQuestionOptions$: currentTest$.pipe(select(getTestOutcome), map(function (outcome) { return getShowMeQuestionOptions(_this.showMeQuestions, outcome, _this.outcomeBehaviourProvider); })),
            tellMeQuestionText$: currentTest$.pipe(select(getTestData), select(getVehicleChecks), select(getSelectedTellMeQuestionText)),
            etaFaults$: currentTest$.pipe(select(getTestData), select(getETA), select(getETAFaultText)),
            ecoFaults$: currentTest$.pipe(select(getTestData), select(getEco), select(getEcoFaultText)),
            dangerousFaults$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultSummaryProvider.getDangerousFaultsList(data, "B" /* B */); })),
            seriousFaults$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultSummaryProvider.getSeriousFaultsList(data, "B" /* B */); })),
            drivingFaults$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultSummaryProvider.getDrivingFaultsList(data, "B" /* B */); })),
            drivingFaultCount$: currentTest$.pipe(select(getTestData), withLatestFrom(category$), map(function (_a) {
                var testData = _a[0], category = _a[1];
                return _this.faultCountProvider.getDrivingFaultSumCount(category, testData);
            })),
            displayDrivingFaultComments$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.shouldDisplayDrivingFaultComments(data); })),
            weatherConditions$: currentTest$.pipe(select(getTestSummary), select(getWeatherConditions)),
        };
        this.setupSubscriptions();
    };
    OfficeCatBPage.prototype.setupSubscriptions = function () {
        var _this = this;
        var startDateTime$ = this.pageState.startDateTime$;
        this.subscription = merge(startDateTime$.pipe(map(function (value) { return _this.startDateTime = value; }))).subscribe();
    };
    OfficeCatBPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    OfficeCatBPage.prototype.popToRoot = function () {
        if (this.isPracticeMode) {
            this.exitPracticeMode();
            return;
        }
        var journalPage = this.navController.getViews().find(function (view) { return view.id === JOURNAL_PAGE; });
        this.navController.popTo(journalPage);
    };
    OfficeCatBPage.prototype.defer = function () {
        this.popToRoot();
        this.store$.dispatch(new SavingWriteUpForLater());
        this.store$.dispatch(new PersistTests());
    };
    OfficeCatBPage.prototype.onSubmit = function () {
        if (this.isFormValid()) {
            this.showFinishTestModal();
        }
    };
    OfficeCatBPage.prototype.setIsValidStartDateTime = function (isValid) {
        this.isValidStartDateTime = isValid;
    };
    OfficeCatBPage.prototype.dateOfTestChanged = function (inputDate) {
        var customStartDate = getNewTestStartTime(inputDate, this.startDateTime);
        this.store$.dispatch(new TestStartDateChanged(this.startDateTime, customStartDate));
        this.store$.dispatch(new SetStartDate(customStartDate));
    };
    OfficeCatBPage.prototype.showMeQuestionChanged = function (showMeQuestion) {
        this.store$.dispatch(new ShowMeQuestionSelected(showMeQuestion));
    };
    OfficeCatBPage.prototype.identificationChanged = function (identification) {
        this.store$.dispatch(new IdentificationUsedChanged(identification));
    };
    OfficeCatBPage.prototype.independentDrivingChanged = function (independentDriving) {
        this.store$.dispatch(new IndependentDrivingTypeChanged(independentDriving));
    };
    OfficeCatBPage.prototype.weatherConditionsChanged = function (weatherConditions) {
        this.store$.dispatch(new WeatherConditionsChanged(weatherConditions));
    };
    OfficeCatBPage.prototype.routeNumberChanged = function (routeNumber) {
        this.store$.dispatch(new RouteNumberChanged(routeNumber));
    };
    OfficeCatBPage.prototype.candidateDescriptionChanged = function (candidateDescription) {
        this.store$.dispatch(new CandidateDescriptionChanged(candidateDescription));
    };
    OfficeCatBPage.prototype.additionalInformationChanged = function (additionalInformation) {
        this.store$.dispatch(new AdditionalInformationChanged(additionalInformation));
    };
    OfficeCatBPage.prototype.dangerousFaultCommentChanged = function (dangerousFaultComment) {
        if (dangerousFaultComment.source === CommentSource.SIMPLE) {
            this.store$.dispatch(new AddDangerousFaultComment(dangerousFaultComment.competencyIdentifier, dangerousFaultComment.comment));
        }
        else if (startsWith(dangerousFaultComment.source, CommentSource.MANOEUVRES)) {
            var segments = dangerousFaultComment.source.split('-');
            var fieldName = segments[1];
            var controlOrObservation = segments[2];
            this.store$.dispatch(new AddManoeuvreComment(fieldName, CompetencyOutcome.D, controlOrObservation, dangerousFaultComment.comment));
        }
        else if (dangerousFaultComment.source === CommentSource.CONTROLLED_STOP) {
            this.store$.dispatch(new AddControlledStopComment(dangerousFaultComment.comment));
        }
        else if (dangerousFaultComment.source === CommentSource.VEHICLE_CHECKS) {
            this.store$.dispatch(new AddShowMeTellMeComment(dangerousFaultComment.comment));
        }
    };
    OfficeCatBPage.prototype.seriousFaultCommentChanged = function (seriousFaultComment) {
        if (seriousFaultComment.source === CommentSource.SIMPLE) {
            this.store$.dispatch(new AddSeriousFaultComment(seriousFaultComment.competencyIdentifier, seriousFaultComment.comment));
        }
        else if (startsWith(seriousFaultComment.source, CommentSource.MANOEUVRES)) {
            var segments = seriousFaultComment.source.split('-');
            var fieldName = segments[1];
            var controlOrObservation = segments[2];
            this.store$.dispatch(new AddManoeuvreComment(fieldName, CompetencyOutcome.S, controlOrObservation, seriousFaultComment.comment));
        }
        else if (seriousFaultComment.source === CommentSource.CONTROLLED_STOP) {
            this.store$.dispatch(new AddControlledStopComment(seriousFaultComment.comment));
        }
        else if (seriousFaultComment.source === CommentSource.VEHICLE_CHECKS) {
            this.store$.dispatch(new AddShowMeTellMeComment(seriousFaultComment.comment));
        }
        else if (seriousFaultComment.source === CommentSource.EYESIGHT_TEST) {
            this.store$.dispatch(new EyesightTestAddComment(seriousFaultComment.comment));
        }
    };
    OfficeCatBPage.prototype.drivingFaultCommentChanged = function (drivingFaultComment) {
        if (drivingFaultComment.source === CommentSource.SIMPLE) {
            this.store$.dispatch(new AddDrivingFaultComment(drivingFaultComment.competencyIdentifier, drivingFaultComment.comment));
        }
        else if (startsWith(drivingFaultComment.source, CommentSource.MANOEUVRES)) {
            var segments = drivingFaultComment.source.split('-');
            var fieldName = segments[1];
            var controlOrObservation = segments[2];
            this.store$.dispatch(new AddManoeuvreComment(fieldName, CompetencyOutcome.DF, controlOrObservation, drivingFaultComment.comment));
        }
        else if (drivingFaultComment.source === CommentSource.CONTROLLED_STOP) {
            this.store$.dispatch(new AddControlledStopComment(drivingFaultComment.comment));
        }
        else if (drivingFaultComment.source === CommentSource.VEHICLE_CHECKS) {
            this.store$.dispatch(new AddShowMeTellMeComment(drivingFaultComment.comment));
        }
    };
    OfficeCatBPage.prototype.activityCodeChanged = function (activityCodeModel) {
        var showMeQuestion = this.form.controls['showMeQuestion'];
        if (showMeQuestion) {
            if (showMeQuestion.value && showMeQuestion.value.code === 'N/A') {
                this.form.controls['showMeQuestion'].setValue({});
            }
        }
        this.store$.dispatch(new SetActivityCode(activityCodeModel.activityCode));
    };
    OfficeCatBPage.prototype.showFinishTestModal = function () {
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
    OfficeCatBPage.prototype.goToReasonForRekey = function () {
        if (this.isFormValid()) {
            this.navController.push(CAT_B.REKEY_REASON_PAGE);
        }
    };
    OfficeCatBPage.prototype.isFormValid = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            return true;
        }
        Object.keys(this.form.controls).forEach(function (controlName) {
            if (_this.form.controls[controlName].invalid) {
                _this.store$.dispatch(new OfficeValidationError(controlName + " is blank"));
            }
        });
        this.createToast('Fill all mandatory fields');
        this.toast.present();
        return false;
    };
    OfficeCatBPage.prototype.completeTest = function () {
        if (!this.isPracticeMode) {
            this.store$.dispatch(new CompleteTest());
        }
        this.popToRoot();
    };
    OfficeCatBPage.maxFaultCount = 15;
    OfficeCatBPage = __decorate([
        IonicPage(),
        Component({
            selector: '.office-cat-b-page',
            templateUrl: 'office.cat-b.page.html',
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
    ], OfficeCatBPage);
    return OfficeCatBPage;
}(PracticeableBasePageComponent));
export { OfficeCatBPage };
//# sourceMappingURL=office.cat-b.page.js.map