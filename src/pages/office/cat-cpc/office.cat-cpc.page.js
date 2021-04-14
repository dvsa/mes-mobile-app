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
import { map, withLatestFrom } from 'rxjs/operators';
import { OfficeViewDidEnter, CompleteTest, SavingWriteUpForLater, OfficeValidationError, TestStartDateChanged, } from '../office.actions';
import { merge } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { getCurrentTest, getTestOutcome, isTestOutcomeSet, isPassed, getTestOutcomeText, getActivityCode, getJournalData, } from '../../../modules/tests/tests.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCandidateDescription, getAdditionalInformation, getIdentification, isDebriefWitnessed, } from '../../../modules/tests/test-summary/common/test-summary.selector';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { IdentificationUsedChanged, CandidateDescriptionChanged, AdditionalInformationChanged, DebriefWitnessed, DebriefUnwitnessed, } from '../../../modules/tests/test-summary/common/test-summary.actions';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateName, getCandidateDriverNumber, formatDriverNumber, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTestSlotAttributes, } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { getTestDate, getTestStartDateTime, getTestTime } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { PersistTests, SendCurrentTest } from '../../../modules/tests/tests.actions';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../office-behaviour-map.cat-cpc';
import { getActivityCodeOptions } from '../components/activity-code/activity-code.constants';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { CAT_CPC, DELEGATED_REKEY_UPLOAD_OUTCOME_PAGE, JOURNAL_PAGE } from '../../page-names.constants';
import { AssessmentReportChanged } from '../../../modules/tests/test-summary/cat-cpc/test-summary.cat-cpc.actions';
import { getAssessmentReport } from '../../../modules/tests/test-summary/cat-cpc/test-summary.cat-cpc.selector';
import { getCombination, getTotalPercent, getQuestion1, getQuestion2, getQuestion3, getQuestion4, getQuestion5, } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.reducer';
import { getTestOutcome as getTestOutcomeDebrief } from '../../debrief/debrief.selector';
import { questionCombinations, } from '../../../shared/constants/cpc-questions/cpc-question-combinations.constants';
import { TestOutcome } from '../../../shared/models/test-outcome';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { ExaminerRole } from '../../../providers/app-config/constants/examiner-role.constants';
import { getDelegatedTestIndicator } from '../../../modules/tests/delegated-test/delegated-test.reducer';
import { isDelegatedTest } from '../../../modules/tests/delegated-test/delegated-test.selector';
import { getApplicationReference } from '../../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import { getApplicationNumber } from '../../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { CandidateChoseToProceedWithTestInEnglish, CandidateChoseToProceedWithTestInWelsh, } from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { PassCertificateNumberChanged } from '../../../modules/tests/pass-completion/pass-completion.actions';
import * as postTestDeclarationsActions from '../../../modules/tests/post-test-declarations/post-test-declarations.actions';
import { getPassCompletion } from '../../../modules/tests/pass-completion/pass-completion.reducer';
import { getPassCertificateNumber } from '../../../modules/tests/pass-completion/pass-completion.selector';
import { getPostTestDeclarations } from '../../../modules/tests/post-test-declarations/post-test-declarations.reducer';
import { getReceiptDeclarationStatus } from '../../../modules/tests/post-test-declarations/post-test-declarations.selector';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { get } from 'lodash';
import { SetRekeyDate } from '../../../modules/tests/rekey-date/rekey-date.actions';
import { SetStartDate } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.actions';
import { getNewTestStartTime } from '../../../shared/helpers/test-start-time';
var OfficeCatCPCPage = /** @class */ (function (_super) {
    __extends(OfficeCatCPCPage, _super);
    function OfficeCatCPCPage(store$, toastController, navController, navParams, platform, authenticationProvider, keyboard, outcomeBehaviourProvider, alertController, appConfig) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.toastController = toastController;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.keyboard = keyboard;
        _this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        _this.alertController = alertController;
        _this.appConfig = appConfig;
        _this.conductedLanguage = Language.ENGLISH;
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
        _this.form = new FormGroup({});
        _this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
        _this.activityCodeOptions = getActivityCodeOptions(_this.appConfig.getAppConfig().role === ExaminerRole.DLG);
        return _this;
    }
    OfficeCatCPCPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new OfficeViewDidEnter());
    };
    OfficeCatCPCPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            activityCode$: currentTest$.pipe(select(getActivityCode)),
            startTime$: currentTest$.pipe(select(getJournalData), select(getTestSlotAttributes), select(getTestTime)),
            startDate$: currentTest$.pipe(select(getJournalData), select(getTestSlotAttributes), select(getTestDate)),
            startDateTime$: currentTest$.pipe(select(getJournalData), select(getTestSlotAttributes), select(getTestStartDateTime)),
            testOutcome$: currentTest$.pipe(select(getTestOutcome)),
            testOutcomeText$: currentTest$.pipe(select(getTestOutcomeText)),
            isPassed$: currentTest$.pipe(select(isPassed)),
            isTestOutcomeSet$: currentTest$.pipe(select(isTestOutcomeSet)),
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateName)),
            candidateDriverNumber$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateDriverNumber), map(formatDriverNumber)),
            displayCandidateDescription$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getCandidateDescription))), map(function (_a) {
                var outcome = _a[0], candidate = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'candidateDescription', candidate);
            })),
            candidateDescription$: currentTest$.pipe(select(getTestSummary), select(getCandidateDescription)),
            displayIdentification$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getIdentification))), map(function (_a) {
                var outcome = _a[0], identification = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'identification', identification);
            })),
            identification$: currentTest$.pipe(select(getTestSummary), select(getIdentification)),
            combination$: currentTest$.pipe(select(getTestData), select(getCombination)),
            displayAdditionalInformation$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getAdditionalInformation))), map(function (_a) {
                var outcome = _a[0], additional = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'additionalInformation', additional);
            })),
            additionalInformation$: currentTest$.pipe(select(getTestSummary), select(getAdditionalInformation)),
            assessmentReport$: currentTest$.pipe(select(getTestSummary), select(getAssessmentReport)),
            overallScore$: currentTest$.pipe(select(getTestData), select(getTotalPercent)),
            question1$: currentTest$.pipe(select(getTestData), select(getQuestion1)),
            question2$: currentTest$.pipe(select(getTestData), select(getQuestion2)),
            question3$: currentTest$.pipe(select(getTestData), select(getQuestion3)),
            question4$: currentTest$.pipe(select(getTestData), select(getQuestion4)),
            question5$: currentTest$.pipe(select(getTestData), select(getQuestion5)),
            testResult$: currentTest$.pipe(select(getTestOutcomeDebrief)),
            isRekey$: currentTest$.pipe(select(getRekeyIndicator), select(isRekey)),
            delegatedTest$: currentTest$.pipe(select(getDelegatedTestIndicator), select(isDelegatedTest)),
            applicationNumber$: currentTest$.pipe(select(getJournalData), select(getApplicationReference), select(getApplicationNumber)),
            debriefWitnessed$: currentTest$.pipe(select(getTestSummary), select(isDebriefWitnessed)),
            passCertificateNumber$: currentTest$.pipe(select(getPassCompletion), select(getPassCertificateNumber)),
            passCertificateNumberReceived$: currentTest$.pipe(select(getPostTestDeclarations), select(getReceiptDeclarationStatus)),
        };
        var _a = this.pageState, testResult$ = _a.testResult$, combination$ = _a.combination$, delegatedTest$ = _a.delegatedTest$, startDateTime$ = _a.startDateTime$;
        this.subscription = merge(testResult$.pipe(map(function (result) { return _this.outcome = result; })), combination$.pipe(map(function (result) { return _this.combinationCode = result; })), delegatedTest$.pipe(map(function (value) { return _this.isDelegated = value; })), startDateTime$.pipe(map(function (value) { return _this.startDateTime = value; }))).subscribe();
    };
    OfficeCatCPCPage.prototype.popToRoot = function () {
        var journalPage = this.navController.getViews().find(function (view) { return view.id === JOURNAL_PAGE; });
        this.navController.popTo(journalPage);
    };
    OfficeCatCPCPage.prototype.defer = function () {
        this.popToRoot();
        this.store$.dispatch(new SavingWriteUpForLater());
        this.store$.dispatch(new PersistTests());
    };
    OfficeCatCPCPage.prototype.getCombinationAdditionalText = function (code) {
        var question = questionCombinations.find(function (question) {
            return question.code === code;
        });
        return question ? question.additionalText || null : null;
    };
    OfficeCatCPCPage.prototype.isFail = function () {
        return this.outcome === TestOutcome.FAIL;
    };
    OfficeCatCPCPage.prototype.isPass = function () {
        return this.outcome === TestOutcome.PASS;
    };
    OfficeCatCPCPage.prototype.onSubmit = function () {
        if (this.isFormValid()) {
            this.showFinishTestModal();
        }
    };
    OfficeCatCPCPage.prototype.setIsValidStartDateTime = function (isValid) {
        this.isValidStartDateTime = isValid;
    };
    OfficeCatCPCPage.prototype.dateOfTestChanged = function (inputDate) {
        var customStartDate = getNewTestStartTime(inputDate, this.startDateTime);
        this.store$.dispatch(new TestStartDateChanged(this.startDateTime, customStartDate));
        this.store$.dispatch(new SetStartDate(customStartDate));
    };
    OfficeCatCPCPage.prototype.candidateDescriptionChanged = function (candidateDescription) {
        this.store$.dispatch(new CandidateDescriptionChanged(candidateDescription));
    };
    OfficeCatCPCPage.prototype.identificationChanged = function (identification) {
        this.store$.dispatch(new IdentificationUsedChanged(identification));
    };
    OfficeCatCPCPage.prototype.additionalInformationChanged = function (additionalInformation) {
        this.store$.dispatch(new AdditionalInformationChanged(additionalInformation));
    };
    OfficeCatCPCPage.prototype.activityCodeChanged = function (activityCodeModel) {
        var showMeQuestion = get(this.form.controls, 'showMeQuestion.value.code', null);
        if (showMeQuestion === 'N/A') {
            this.form.controls['showMeQuestion'].setValue({});
        }
        this.store$.dispatch(new SetActivityCode(activityCodeModel.activityCode));
    };
    OfficeCatCPCPage.prototype.assessmentReportChanged = function (assessmentReport) {
        this.store$.dispatch(new AssessmentReportChanged(assessmentReport));
    };
    OfficeCatCPCPage.prototype.showFinishTestModal = function () {
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
    OfficeCatCPCPage.prototype.goToReasonForRekey = function () {
        if (this.isFormValid()) {
            this.navController.push(CAT_CPC.REKEY_REASON_PAGE);
        }
    };
    OfficeCatCPCPage.prototype.passCertificateNumberChanged = function (passCertificateNumber) {
        this.store$.dispatch(new PassCertificateNumberChanged(passCertificateNumber));
        if (!this.isDelegated) {
            this.store$.dispatch(new postTestDeclarationsActions.PassCertificateNumberRecieved(this.form.get('passCertificateNumberCtrl').valid));
        }
    };
    OfficeCatCPCPage.prototype.isFormValid = function () {
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
    OfficeCatCPCPage.prototype.completeTest = function () {
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
    OfficeCatCPCPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    OfficeCatCPCPage.prototype.isWelshChanged = function (isWelsh) {
        this.store$.dispatch(isWelsh
            ? new CandidateChoseToProceedWithTestInWelsh('Cymraeg')
            : new CandidateChoseToProceedWithTestInEnglish('English'));
    };
    OfficeCatCPCPage.prototype.isWelsh = function () {
        return this.conductedLanguage === Language.CYMRAEG;
    };
    OfficeCatCPCPage.prototype.passCertificateDeclarationChanged = function (passCertificateSigned) {
        this.store$.dispatch(new postTestDeclarationsActions.PassCertificateNumberRecieved(passCertificateSigned));
    };
    OfficeCatCPCPage.prototype.debriefWitnessedChanged = function (debriefWitnessed) {
        this.store$.dispatch(debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed());
    };
    OfficeCatCPCPage = __decorate([
        IonicPage(),
        Component({
            selector: '.office-cat-cpc-page',
            templateUrl: 'office.cat-cpc.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            ToastController,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            Keyboard,
            OutcomeBehaviourMapProvider,
            AlertController,
            AppConfigProvider])
    ], OfficeCatCPCPage);
    return OfficeCatCPCPage;
}(BasePageComponent));
export { OfficeCatCPCPage };
//# sourceMappingURL=office.cat-cpc.page.js.map