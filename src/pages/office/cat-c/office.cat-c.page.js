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
import { getRouteNumber, getCandidateDescription, getAdditionalInformation, getWeatherConditions, getIdentification, getIndependentDriving, isDebriefWitnessed, getD255, } from '../../../modules/tests/test-summary/common/test-summary.selector';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { map, withLatestFrom } from 'rxjs/operators';
import { RouteNumberChanged, IndependentDrivingTypeChanged, IdentificationUsedChanged, CandidateDescriptionChanged, WeatherConditionsChanged, AdditionalInformationChanged, D255Yes, D255No, DebriefWitnessed, DebriefUnwitnessed, } from '../../../modules/tests/test-summary/common/test-summary.actions';
import { getCandidate } from '../../../modules/tests/journal-data/cat-c/candidate/candidate.cat-c.reducer';
import { getCandidateName, getCandidateDriverNumber, formatDriverNumber, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { QuestionProvider } from '../../../providers/question/question';
import { getTestSlotAttributes, } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { getTestDate, getTestStartDateTime, getTestTime } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { getETA, getETAFaultText, getEco, getEcoFaultText, } from '../../../modules/tests/test-data/common/test-data.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import { PersistTests, SendCurrentTest } from '../../../modules/tests/tests.actions';
import { WeatherConditionProvider } from '../../../providers/weather-conditions/weather-condition';
import { AddDangerousFaultComment, } from '../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { AddSeriousFaultComment } from '../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { AddDrivingFaultComment } from '../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import { AddShowMeTellMeComment, } from '../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';
import { AddManoeuvreComment } from '../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { EyesightTestAddComment } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { CommentSource } from '../../../shared/models/fault-marking.model';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../office-behaviour-map.cat-c';
import { getActivityCodeOptions, } from '../components/activity-code/activity-code.constants';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { startsWith } from 'lodash';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { CAT_C, DELEGATED_REKEY_UPLOAD_OUTCOME_PAGE, JOURNAL_PAGE } from '../../page-names.constants';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { AddUncoupleRecoupleComment, } from '../../../modules/tests/test-data/common/uncouple-recouple/uncouple-recouple.actions';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { vehicleChecksExist, } from '../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.selector';
import { getVehicleChecks } from '../../../modules/tests/test-data/cat-c/test-data.cat-c.selector';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { ExaminerRole } from '../../../providers/app-config/constants/examiner-role.constants';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { getDelegatedTestIndicator } from '../../../modules/tests/delegated-test/delegated-test.reducer';
import { isDelegatedTest } from '../../../modules/tests/delegated-test/delegated-test.selector';
import { PassCertificateNumberChanged, ProvisionalLicenseNotReceived, ProvisionalLicenseReceived, } from '../../../modules/tests/pass-completion/pass-completion.actions';
import { GearboxCategoryChanged } from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { CandidateChoseToProceedWithTestInEnglish, CandidateChoseToProceedWithTestInWelsh, } from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { TransmissionType } from '../../../shared/models/transmission-type';
import { getGearboxCategory } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { getPassCertificateNumber, isProvisionalLicenseProvided, } from '../../../modules/tests/pass-completion/pass-completion.selector';
import { getPassCompletion } from '../../../modules/tests/pass-completion/cat-c/pass-completion.cat-c.reducer';
import { getCommunicationPreference } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { TestOutcome } from '../../../modules/tests/tests.constants';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { getApplicationReference } from '../../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import { getApplicationNumber } from '../../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import * as postTestDeclarationsActions from '../../../modules/tests/post-test-declarations/post-test-declarations.actions';
import { getPostTestDeclarations } from '../../../modules/tests/post-test-declarations/post-test-declarations.reducer';
import { getHealthDeclarationStatus } from '../../../modules/tests/post-test-declarations/post-test-declarations.selector';
import { SetRekeyDate } from '../../../modules/tests/rekey-date/rekey-date.actions';
import { SetStartDate } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.actions';
import { getNewTestStartTime } from '../../../shared/helpers/test-start-time';
var OfficeCatCPage = /** @class */ (function (_super) {
    __extends(OfficeCatCPage, _super);
    function OfficeCatCPage(store$, toastController, navController, navParams, platform, authenticationProvider, weatherConditionProvider, questionProvider, keyboard, outcomeBehaviourProvider, alertController, faultCountProvider, faultSummaryProvider, appConfig) {
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
        _this.appConfig = appConfig;
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
        _this.activityCodeOptions = getActivityCodeOptions(_this.appConfig.getAppConfig().role === ExaminerRole.DLG);
        return _this;
    }
    OfficeCatCPage.prototype.ionViewDidEnter = function () {
        if (!this.subscription || this.subscription.closed) {
            this.setupSubscription();
        }
        this.store$.dispatch(new OfficeViewDidEnter());
    };
    OfficeCatCPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            applicationNumber$: currentTest$.pipe(select(getJournalData), select(getApplicationReference), select(getApplicationNumber)),
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
                var outcome = _a[0], data = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', _this.faultSummaryProvider.getDrivingFaultsList(data, _this.testCategory));
            })),
            displaySeriousFault$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData))), map(function (_a) {
                var outcome = _a[0], data = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', _this.faultSummaryProvider.getSeriousFaultsList(data, _this.testCategory));
            })),
            displayDangerousFault$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData))), map(function (_a) {
                var outcome = _a[0], data = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'faultComment', _this.faultSummaryProvider.getDrivingFaultsList(data, _this.testCategory));
            })),
            displayVehicleChecks$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestData))), map(function (_a) {
                var outcome = _a[0], data = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'vehicleChecks', vehicleChecksExist(data.vehicleChecks));
            })),
            candidateDescription$: currentTest$.pipe(select(getTestSummary), select(getCandidateDescription)),
            independentDriving$: currentTest$.pipe(select(getTestSummary), select(getIndependentDriving)),
            identification$: currentTest$.pipe(select(getTestSummary), select(getIdentification)),
            additionalInformation$: currentTest$.pipe(select(getTestSummary), select(getAdditionalInformation)),
            etaFaults$: currentTest$.pipe(select(getTestData), select(getETA), select(getETAFaultText)),
            ecoFaults$: currentTest$.pipe(select(getTestData), select(getEco), select(getEcoFaultText)),
            dangerousFaults$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultSummaryProvider.getDangerousFaultsList(data, _this.testCategory); })),
            seriousFaults$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultSummaryProvider.getSeriousFaultsList(data, _this.testCategory); })),
            drivingFaults$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultSummaryProvider.getDrivingFaultsList(data, _this.testCategory); })),
            drivingFaultCount$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultCountProvider.getDrivingFaultSumCount(_this.testCategory, data); })),
            seriousFaultCount$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultCountProvider.getSeriousFaultSumCount(_this.testCategory, data); })),
            dangerousFaultCount$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultCountProvider.getDangerousFaultSumCount(_this.testCategory, data); })),
            displayDrivingFaultComments$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.shouldDisplayDrivingFaultComments(data); })),
            weatherConditions$: currentTest$.pipe(select(getTestSummary), select(getWeatherConditions)),
            vehicleChecks$: currentTest$.pipe(select(getTestData), select(getVehicleChecks), map(function (checks) { return __spreadArray(__spreadArray([], checks.tellMeQuestions), checks.showMeQuestions); })),
            delegatedTest$: currentTest$.pipe(select(getDelegatedTestIndicator), select(isDelegatedTest)),
            transmission$: currentTest$.pipe(select(getTestData), select(getGearboxCategory)),
            passCertificateNumber$: currentTest$.pipe(select(getPassCompletion), select(getPassCertificateNumber)),
            debriefWitnessed$: currentTest$.pipe(select(getTestSummary), select(isDebriefWitnessed)),
            d255$: currentTest$.pipe(select(getTestSummary), select(getD255)),
            conductedLanguage$: currentTest$.pipe(select(getCommunicationPreference), select(getConductedLanguage)),
            provisionalLicense$: currentTest$.pipe(select(getPassCompletion), map(isProvisionalLicenseProvided)),
            healthDeclarationAccepted$: currentTest$.pipe(select(getPostTestDeclarations), select(getHealthDeclarationStatus)),
        };
        this.setupSubscription();
    };
    OfficeCatCPage.prototype.setupSubscription = function () {
        var _this = this;
        var _a = this.pageState, testCategory$ = _a.testCategory$, delegatedTest$ = _a.delegatedTest$, transmission$ = _a.transmission$, testOutcome$ = _a.testOutcome$, testOutcomeText$ = _a.testOutcomeText$, conductedLanguage$ = _a.conductedLanguage$, startDateTime$ = _a.startDateTime$;
        this.subscription = merge(conductedLanguage$.pipe(map(function (result) { return _this.conductedLanguage = result; })), testOutcomeText$.pipe(map(function (result) { return _this.testOutcomeText = result; })), testOutcome$.pipe(map(function (result) { return _this.testOutcome = result; })), transmission$.pipe(map(function (result) { return _this.transmission = result; })), delegatedTest$.pipe(map(function (result) { return _this.isDelegated = result; })), testCategory$.pipe(map(function (result) { return _this.testCategory = result; })), startDateTime$.pipe(map(function (value) { return _this.startDateTime = value; }))).subscribe();
    };
    OfficeCatCPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    OfficeCatCPage.prototype.popToRoot = function () {
        var journalPage = this.navController.getViews().find(function (view) { return view.id === JOURNAL_PAGE; });
        this.navController.popTo(journalPage);
    };
    OfficeCatCPage.prototype.defer = function () {
        this.popToRoot();
        this.store$.dispatch(new SavingWriteUpForLater());
        this.store$.dispatch(new PersistTests());
    };
    OfficeCatCPage.prototype.onSubmit = function () {
        if (this.isFormValid()) {
            this.showFinishTestModal();
        }
    };
    OfficeCatCPage.prototype.setIsValidStartDateTime = function (isValid) {
        this.isValidStartDateTime = isValid;
    };
    OfficeCatCPage.prototype.dateOfTestChanged = function (inputDate) {
        var customStartDate = getNewTestStartTime(inputDate, this.startDateTime);
        this.store$.dispatch(new TestStartDateChanged(this.startDateTime, customStartDate));
        this.store$.dispatch(new SetStartDate(customStartDate));
    };
    OfficeCatCPage.prototype.identificationChanged = function (identification) {
        this.store$.dispatch(new IdentificationUsedChanged(identification));
    };
    OfficeCatCPage.prototype.independentDrivingChanged = function (independentDriving) {
        this.store$.dispatch(new IndependentDrivingTypeChanged(independentDriving));
    };
    OfficeCatCPage.prototype.weatherConditionsChanged = function (weatherConditions) {
        this.store$.dispatch(new WeatherConditionsChanged(weatherConditions));
    };
    OfficeCatCPage.prototype.routeNumberChanged = function (routeNumber) {
        this.store$.dispatch(new RouteNumberChanged(routeNumber));
    };
    OfficeCatCPage.prototype.candidateDescriptionChanged = function (candidateDescription) {
        this.store$.dispatch(new CandidateDescriptionChanged(candidateDescription));
    };
    OfficeCatCPage.prototype.additionalInformationChanged = function (additionalInformation) {
        this.store$.dispatch(new AdditionalInformationChanged(additionalInformation));
    };
    OfficeCatCPage.prototype.dangerousFaultCommentChanged = function (dangerousFaultComment) {
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
    };
    OfficeCatCPage.prototype.seriousFaultCommentChanged = function (seriousFaultComment) {
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
    };
    OfficeCatCPage.prototype.drivingFaultCommentChanged = function (drivingFaultComment) {
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
    };
    OfficeCatCPage.prototype.activityCodeChanged = function (activityCodeModel) {
        var showMeQuestion = this.form.controls['showMeQuestion'];
        if (showMeQuestion) {
            if (showMeQuestion.value && showMeQuestion.value.code === 'N/A') {
                this.form.controls['showMeQuestion'].setValue({});
            }
        }
        this.store$.dispatch(new SetActivityCode(activityCodeModel.activityCode));
    };
    OfficeCatCPage.prototype.showFinishTestModal = function () {
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
    OfficeCatCPage.prototype.goToReasonForRekey = function () {
        if (this.isFormValid()) {
            this.navController.push(CAT_C.REKEY_REASON_PAGE);
        }
    };
    OfficeCatCPage.prototype.isFormValid = function () {
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
    OfficeCatCPage.prototype.completeTest = function () {
        if (!this.isDelegated) {
            this.store$.dispatch(new CompleteTest());
            this.popToRoot();
        }
        else {
            this.store$.dispatch(new SetRekeyDate());
            this.store$.dispatch(new SendCurrentTest());
            this.navController.push(DELEGATED_REKEY_UPLOAD_OUTCOME_PAGE);
        }
    };
    OfficeCatCPage.prototype.provisionalLicenseReceived = function () {
        this.store$.dispatch(new ProvisionalLicenseReceived());
    };
    OfficeCatCPage.prototype.provisionalLicenseNotReceived = function () {
        this.store$.dispatch(new ProvisionalLicenseNotReceived());
    };
    OfficeCatCPage.prototype.transmissionChanged = function (transmission) {
        this.store$.dispatch(new GearboxCategoryChanged(transmission));
    };
    OfficeCatCPage.prototype.healthDeclarationChanged = function (healthSigned) {
        this.store$.dispatch(new postTestDeclarationsActions.HealthDeclarationAccepted(healthSigned));
    };
    OfficeCatCPage.prototype.passCertificateNumberChanged = function (passCertificateNumber) {
        this.store$.dispatch(new PassCertificateNumberChanged(passCertificateNumber));
        this.store$.dispatch(new postTestDeclarationsActions.PassCertificateNumberRecieved(this.form.get('passCertificateNumberCtrl').valid));
    };
    OfficeCatCPage.prototype.d255Changed = function (d255) {
        this.store$.dispatch(d255 ? new D255Yes() : new D255No());
    };
    OfficeCatCPage.prototype.debriefWitnessedChanged = function (debriefWitnessed) {
        this.store$.dispatch(debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed());
    };
    OfficeCatCPage.prototype.isWelshChanged = function (isWelsh) {
        this.store$.dispatch(isWelsh
            ? new CandidateChoseToProceedWithTestInWelsh('Cymraeg')
            : new CandidateChoseToProceedWithTestInEnglish('English'));
    };
    OfficeCatCPage.prototype.displayTransmissionBanner = function () {
        var control = this.form.get('transmissionCtrl');
        return control && !control.pristine && (this.transmission === TransmissionType.Automatic);
    };
    OfficeCatCPage.prototype.isTerminated = function () {
        return this.testOutcomeText === TestOutcome.Terminated;
    };
    OfficeCatCPage.prototype.isPass = function () {
        return this.testOutcomeText === TestOutcome.Passed;
    };
    OfficeCatCPage.prototype.isWelsh = function () {
        return this.conductedLanguage === Language.CYMRAEG;
    };
    OfficeCatCPage.maxFaultCount = 15;
    OfficeCatCPage = __decorate([
        IonicPage(),
        Component({
            selector: '.office-cat-c-page',
            templateUrl: 'office.cat-c.page.html',
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
            AppConfigProvider])
    ], OfficeCatCPage);
    return OfficeCatCPage;
}(BasePageComponent));
export { OfficeCatCPage };
//# sourceMappingURL=office.cat-c.page.js.map