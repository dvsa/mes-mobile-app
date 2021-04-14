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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
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
import { getCandidate } from '../../../modules/tests/journal-data/cat-home/candidate/candidate.cat-home.reducer';
import { getCandidateName, getCandidateDriverNumber, formatDriverNumber, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { QuestionProvider } from '../../../providers/question/question';
import { getTestSlotAttributes, } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { getTestDate, getTestStartDateTime, getTestTime } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { getETA, getETAFaultText, getEco, getEcoFaultText, } from '../../../modules/tests/test-data/common/test-data.selector';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { WeatherConditionProvider } from '../../../providers/weather-conditions/weather-condition';
import { AddDangerousFaultComment, } from '../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { AddSeriousFaultComment } from '../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { AddDrivingFaultComment } from '../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import { AddShowMeTellMeComment, } from '../../../modules/tests/test-data/cat-home-test/vehicle-checks/vehicle-checks.cat-home-test.action';
import { AddManoeuvreComment, } from '../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { EyesightTestAddComment } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { CommentSource } from '../../../shared/models/fault-marking.model';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../office-behaviour-map.cat-home-test';
import { activityCodeModelList } from '../components/activity-code/activity-code.constants';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { startsWith } from 'lodash';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { CAT_HOME_TEST, JOURNAL_PAGE } from '../../page-names.constants';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { AddUncoupleRecoupleComment, } from '../../../modules/tests/test-data/common/uncouple-recouple/uncouple-recouple.actions';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { vehicleChecksExist, } from '../../../modules/tests/test-data/cat-home-test/vehicle-checks/vehicle-checks.cat-home-test.selector';
import { getVehicleChecks } from '../../../modules/tests/test-data/cat-home-test/test-data.cat-home.selector';
import { TestDataByCategoryProvider } from '../../../providers/test-data-by-category/test-data-by-category';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { AddControlledStopComment, } from '../../../modules/tests/test-data/common/controlled-stop/controlled-stop.actions';
import { HighwayCodeSafetyAddComment, } from '../../../modules/tests/test-data/common/highway-code-safety/highway-code-safety.actions';
import { getTestData } from '../../../modules/tests/test-data/cat-home-test/test-data.cat-f.reducer';
import { getNewTestStartTime } from '../../../shared/helpers/test-start-time';
import { SetStartDate } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.actions';
var OfficeCatHomeTestPage = /** @class */ (function (_super) {
    __extends(OfficeCatHomeTestPage, _super);
    function OfficeCatHomeTestPage(store$, toastController, navController, navParams, platform, authenticationProvider, weatherConditionProvider, questionProvider, keyboard, outcomeBehaviourProvider, alertController, faultCountProvider, faultSummaryProvider, testDataByCategoryProvider) {
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
        _this.testDataByCategoryProvider = testDataByCategoryProvider;
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
            var drivingFaultCount = _this.faultCountProvider.getDrivingFaultSumCount(_this.testCategory, data);
            var seriousFaultCount = _this.faultCountProvider.getSeriousFaultSumCount(_this.testCategory, data);
            var dangerousFaultCount = _this.faultCountProvider.getDangerousFaultSumCount(_this.testCategory, data);
            return dangerousFaultCount === 0 && seriousFaultCount === 0 && drivingFaultCount > 15;
        };
        _this.form = new FormGroup({});
        _this.weatherConditions = _this.weatherConditionProvider.getWeatherConditions();
        _this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
        _this.activityCodeOptions = activityCodeModelList;
        return _this;
    }
    OfficeCatHomeTestPage.prototype.ionViewDidEnter = function () {
        if (!this.subscription || this.subscription.closed) {
            this.setupSubscription();
        }
        this.store$.dispatch(new OfficeViewDidEnter());
    };
    OfficeCatHomeTestPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            testCategory$: currentTest$.pipe(select(getTestCategory), map(function (result) { return _this.testCategory = result; })),
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
            displayEco$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByTestCategory(_this.testCategory)(data); }), select(getEco))), map(function (_a) {
                var outcome = _a[0], eco = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'eco', eco);
            })),
            displayEta$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByTestCategory(_this.testCategory)(data); }), select(getETA))), map(function (_a) {
                var outcome = _a[0], eta = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'eta', eta);
            })),
            displayDrivingFault$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByTestCategory(_this.testCategory)(data); }))), map(function (_a) {
                var outcome = _a[0], data = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', _this.faultSummaryProvider.getDrivingFaultsList(data, _this.testCategory));
            })),
            displaySeriousFault$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByTestCategory(_this.testCategory)(data); }))), map(function (_a) {
                var outcome = _a[0], data = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', _this.faultSummaryProvider.getSeriousFaultsList(data, _this.testCategory));
            })),
            displayDangerousFault$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByTestCategory(_this.testCategory)(data); }))), map(function (_a) {
                var outcome = _a[0], data = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', _this.faultSummaryProvider.getDrivingFaultsList(data, _this.testCategory));
            })),
            displayVehicleChecks$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByTestCategory(_this.testCategory)(data); }))), map(function (_a) {
                var outcome = _a[0], data = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'vehicleChecks', vehicleChecksExist(data.vehicleChecks));
            })),
            candidateDescription$: currentTest$.pipe(select(getTestSummary), select(getCandidateDescription)),
            identification$: currentTest$.pipe(select(getTestSummary), select(getIdentification)),
            additionalInformation$: currentTest$.pipe(select(getTestSummary), select(getAdditionalInformation)),
            etaFaults$: currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByTestCategory(_this.testCategory)(data); }), select(getETA), select(getETAFaultText)),
            ecoFaults$: currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByTestCategory(_this.testCategory)(data); }), select(getEco), select(getEcoFaultText)),
            dangerousFaults$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultSummaryProvider.getDangerousFaultsList(data, _this.testCategory); })),
            seriousFaults$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultSummaryProvider.getSeriousFaultsList(data, _this.testCategory); })),
            drivingFaults$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultSummaryProvider.getDrivingFaultsList(data, _this.testCategory); })),
            drivingFaultCount$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultCountProvider.getDrivingFaultSumCount(_this.testCategory, data); })),
            displayDrivingFaultComments$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.shouldDisplayDrivingFaultComments(data); })),
            weatherConditions$: currentTest$.pipe(select(getTestSummary), select(getWeatherConditions)),
            vehicleChecks$: currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByTestCategory(_this.testCategory)(data); }), select(getVehicleChecks), map(function (checks) { return __spreadArray(__spreadArray([], checks.tellMeQuestions), checks.showMeQuestions); })),
        };
        this.setupSubscription();
    };
    OfficeCatHomeTestPage.prototype.setupSubscription = function () {
        var _this = this;
        var _a = this.pageState, testCategory$ = _a.testCategory$, startDateTime$ = _a.startDateTime$;
        this.subscription = merge(testCategory$.pipe(map(function (result) { return _this.testCategory = result; })), startDateTime$.pipe(map(function (result) { return _this.startDateTime = result; }))).subscribe();
    };
    OfficeCatHomeTestPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    OfficeCatHomeTestPage.prototype.popToRoot = function () {
        var journalPage = this.navController.getViews().find(function (view) { return view.id === JOURNAL_PAGE; });
        this.navController.popTo(journalPage);
    };
    OfficeCatHomeTestPage.prototype.defer = function () {
        this.popToRoot();
        this.store$.dispatch(new SavingWriteUpForLater());
        this.store$.dispatch(new PersistTests());
    };
    OfficeCatHomeTestPage.prototype.onSubmit = function () {
        if (this.isFormValid()) {
            this.showFinishTestModal();
        }
    };
    OfficeCatHomeTestPage.prototype.setIsValidStartDateTime = function (isValid) {
        this.isValidStartDateTime = isValid;
    };
    OfficeCatHomeTestPage.prototype.dateOfTestChanged = function (inputDate) {
        var customStartDate = getNewTestStartTime(inputDate, this.startDateTime);
        this.store$.dispatch(new TestStartDateChanged(this.startDateTime, customStartDate));
        this.store$.dispatch(new SetStartDate(customStartDate));
    };
    OfficeCatHomeTestPage.prototype.identificationChanged = function (identification) {
        this.store$.dispatch(new IdentificationUsedChanged(identification));
    };
    OfficeCatHomeTestPage.prototype.weatherConditionsChanged = function (weatherConditions) {
        this.store$.dispatch(new WeatherConditionsChanged(weatherConditions));
    };
    OfficeCatHomeTestPage.prototype.candidateDescriptionChanged = function (candidateDescription) {
        this.store$.dispatch(new CandidateDescriptionChanged(candidateDescription));
    };
    OfficeCatHomeTestPage.prototype.additionalInformationChanged = function (additionalInformation) {
        this.store$.dispatch(new AdditionalInformationChanged(additionalInformation));
    };
    OfficeCatHomeTestPage.prototype.dangerousFaultCommentChanged = function (dangerousFaultComment) {
        if (dangerousFaultComment.source === CommentSource.SIMPLE) {
            this.store$.dispatch(new AddDangerousFaultComment(dangerousFaultComment.competencyIdentifier, dangerousFaultComment.comment));
        }
        else if (startsWith(dangerousFaultComment.source, CommentSource.MANOEUVRES)) {
            var segments = dangerousFaultComment.source.split('-');
            var fieldName = segments[1];
            var controlOrObservation = segments[2];
            this.store$.dispatch(new AddManoeuvreComment(fieldName, CompetencyOutcome.D, controlOrObservation, dangerousFaultComment.comment));
        }
        else if (dangerousFaultComment.source === CommentSource.UNCOUPLE_RECOUPLE) {
            this.store$.dispatch(new AddUncoupleRecoupleComment(dangerousFaultComment.comment));
        }
        else if (dangerousFaultComment.source === CommentSource.VEHICLE_CHECKS) {
            this.store$.dispatch(new AddShowMeTellMeComment(dangerousFaultComment.comment));
        }
        else if (dangerousFaultComment.source === CommentSource.CONTROLLED_STOP) {
            this.store$.dispatch(new AddControlledStopComment(dangerousFaultComment.comment));
        }
    };
    OfficeCatHomeTestPage.prototype.seriousFaultCommentChanged = function (seriousFaultComment) {
        if (seriousFaultComment.source === CommentSource.SIMPLE) {
            this.store$.dispatch(new AddSeriousFaultComment(seriousFaultComment.competencyIdentifier, seriousFaultComment.comment));
        }
        else if (startsWith(seriousFaultComment.source, CommentSource.MANOEUVRES)) {
            var segments = seriousFaultComment.source.split('-');
            var fieldName = segments[1];
            var controlOrObservation = segments[2];
            this.store$.dispatch(new AddManoeuvreComment(fieldName, CompetencyOutcome.S, controlOrObservation, seriousFaultComment.comment));
        }
        else if (seriousFaultComment.source === CommentSource.UNCOUPLE_RECOUPLE) {
            this.store$.dispatch(new AddUncoupleRecoupleComment(seriousFaultComment.comment));
        }
        else if (seriousFaultComment.source === CommentSource.VEHICLE_CHECKS) {
            this.store$.dispatch(new AddShowMeTellMeComment(seriousFaultComment.comment));
        }
        else if (seriousFaultComment.source === CommentSource.EYESIGHT_TEST) {
            this.store$.dispatch(new EyesightTestAddComment(seriousFaultComment.comment));
        }
        else if (seriousFaultComment.source === CommentSource.CONTROLLED_STOP) {
            this.store$.dispatch(new AddControlledStopComment(seriousFaultComment.comment));
        }
        else if (seriousFaultComment.source === CommentSource.HIGHWAY_CODE_SAFETY) {
            this.store$.dispatch(new HighwayCodeSafetyAddComment(seriousFaultComment.comment));
        }
    };
    OfficeCatHomeTestPage.prototype.drivingFaultCommentChanged = function (drivingFaultComment) {
        if (drivingFaultComment.source === CommentSource.SIMPLE) {
            this.store$.dispatch(new AddDrivingFaultComment(drivingFaultComment.competencyIdentifier, drivingFaultComment.comment));
        }
        else if (startsWith(drivingFaultComment.source, CommentSource.MANOEUVRES)) {
            var segments = drivingFaultComment.source.split('-');
            var fieldName = segments[1];
            var controlOrObservation = segments[2];
            this.store$.dispatch(new AddManoeuvreComment(fieldName, CompetencyOutcome.DF, controlOrObservation, drivingFaultComment.comment));
        }
        else if (drivingFaultComment.source === CommentSource.UNCOUPLE_RECOUPLE) {
            this.store$.dispatch(new AddUncoupleRecoupleComment(drivingFaultComment.comment));
        }
        else if (drivingFaultComment.source === CommentSource.VEHICLE_CHECKS) {
            this.store$.dispatch(new AddShowMeTellMeComment(drivingFaultComment.comment));
        }
        else if (drivingFaultComment.source === CommentSource.CONTROLLED_STOP) {
            this.store$.dispatch(new AddControlledStopComment(drivingFaultComment.comment));
        }
        else if (drivingFaultComment.source === CommentSource.HIGHWAY_CODE_SAFETY) {
            this.store$.dispatch(new HighwayCodeSafetyAddComment(drivingFaultComment.comment));
        }
    };
    OfficeCatHomeTestPage.prototype.activityCodeChanged = function (activityCodeModel) {
        var showMeQuestion = this.form.controls['showMeQuestion'];
        if (showMeQuestion) {
            if (showMeQuestion.value && showMeQuestion.value.code === 'N/A') {
                this.form.controls['showMeQuestion'].setValue({});
            }
        }
        this.store$.dispatch(new SetActivityCode(activityCodeModel.activityCode));
    };
    OfficeCatHomeTestPage.prototype.showFinishTestModal = function () {
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
    OfficeCatHomeTestPage.prototype.goToReasonForRekey = function () {
        if (this.isFormValid()) {
            this.navController.push(CAT_HOME_TEST.REKEY_REASON_PAGE);
        }
    };
    OfficeCatHomeTestPage.prototype.isFormValid = function () {
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
    OfficeCatHomeTestPage.prototype.completeTest = function () {
        this.store$.dispatch(new CompleteTest());
        this.popToRoot();
    };
    OfficeCatHomeTestPage.maxFaultCount = 15;
    OfficeCatHomeTestPage = __decorate([
        IonicPage(),
        Component({
            selector: '.office-cat-home-test-page',
            templateUrl: 'office.cat-home-test.page.html',
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
            FaultSummaryProvider,
            TestDataByCategoryProvider])
    ], OfficeCatHomeTestPage);
    return OfficeCatHomeTestPage;
}(BasePageComponent));
export { OfficeCatHomeTestPage };
//# sourceMappingURL=office.cat-home-test.page.js.map