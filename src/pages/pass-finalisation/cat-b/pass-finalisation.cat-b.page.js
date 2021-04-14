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
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { PassFinalisationViewDidEnter, PassFinalisationValidationError, } from './../pass-finalisation.actions';
import { ProvisionalLicenseReceived, ProvisionalLicenseNotReceived, PassCertificateNumberChanged, } from '../../../modules/tests/pass-completion/pass-completion.actions';
import { getPassCompletion } from '../../../modules/tests/pass-completion/pass-completion.reducer';
import { getPassCertificateNumber, isProvisionalLicenseProvided, } from '../../../modules/tests/pass-completion/pass-completion.selector';
import { merge } from 'rxjs';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getApplicationReference, } from '../../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import { getApplicationNumber, } from '../../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { getCurrentTest, getJournalData, getTestOutcomeText } from '../../../modules/tests/tests.selector';
import { map, tap } from 'rxjs/operators';
import { getTests } from '../../../modules/tests/tests.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-b/vehicle-details.cat-b.reducer';
import { getGearboxCategory, isAutomatic, isManual, } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { GearboxCategoryChanged } from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { CAT_B } from '../../page-names.constants';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { isDebriefWitnessed, getD255 } from '../../../modules/tests/test-summary/common/test-summary.selector';
import { D255Yes, D255No, DebriefWitnessed, DebriefUnwitnessed, } from '../../../modules/tests/test-summary/common/test-summary.actions';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../office/office-behaviour-map';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish, } from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { getCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage, } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { PASS_CERTIFICATE_NUMBER_CTRL } from '../components/pass-certificate-number/pass-certificate-number.constants';
import { TransmissionType } from '../../../shared/models/transmission-type';
var PassFinalisationCatBPage = /** @class */ (function (_super) {
    __extends(PassFinalisationCatBPage, _super);
    function PassFinalisationCatBPage(store$, navController, navParams, platform, authenticationProvider, outcomeBehaviourProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider, store$) || this;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        _this.passCertificateCtrl = PASS_CERTIFICATE_NUMBER_CTRL;
        _this.testOutcome = ActivityCodes.PASS;
        _this.form = new FormGroup({});
        _this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
        return _this;
    }
    PassFinalisationCatBPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateName)),
            candidateUntitledName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            candidateDriverNumber$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateDriverNumber), map(formatDriverNumber)),
            testOutcomeText$: currentTest$.pipe(select(getTestOutcomeText)),
            applicationNumber$: currentTest$.pipe(select(getJournalData), select(getApplicationReference), select(getApplicationNumber)),
            provisionalLicense$: currentTest$.pipe(select(getPassCompletion), map(isProvisionalLicenseProvided)),
            passCertificateNumber$: currentTest$.pipe(select(getPassCompletion), select(getPassCertificateNumber)),
            transmission$: currentTest$.pipe(select(getVehicleDetails), select(getGearboxCategory)),
            transmissionAutomaticRadioChecked$: currentTest$.pipe(select(getVehicleDetails), map(isAutomatic), tap(function (val) {
                if (val)
                    _this.form.controls['transmissionCtrl'].setValue('Automatic');
            })),
            transmissionManualRadioChecked$: currentTest$.pipe(select(getVehicleDetails), map(isManual), tap(function (val) {
                if (val)
                    _this.form.controls['transmissionCtrl'].setValue('Manual');
            })),
            debriefWitnessed$: currentTest$.pipe(select(getTestSummary), select(isDebriefWitnessed)),
            d255$: currentTest$.pipe(select(getTestSummary), select(getD255)),
            conductedLanguage$: currentTest$.pipe(select(getCommunicationPreference), select(getConductedLanguage)),
        };
        var transmission$ = this.pageState.transmission$;
        this.merged$ = merge(transmission$.pipe(map(function (value) { return _this.transmission = value; })));
        this.subscription = this.merged$.subscribe();
    };
    PassFinalisationCatBPage.prototype.ionViewDidLeave = function () {
        _super.prototype.ionViewDidLeave.call(this);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    PassFinalisationCatBPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new PassFinalisationViewDidEnter());
        if (this.subscription.closed && this.merged$) {
            this.subscription = this.merged$.subscribe();
        }
    };
    PassFinalisationCatBPage.prototype.provisionalLicenseReceived = function () {
        this.store$.dispatch(new ProvisionalLicenseReceived());
    };
    PassFinalisationCatBPage.prototype.provisionalLicenseNotReceived = function () {
        this.store$.dispatch(new ProvisionalLicenseNotReceived());
    };
    PassFinalisationCatBPage.prototype.transmissionChanged = function (transmission) {
        this.store$.dispatch(new GearboxCategoryChanged(transmission));
    };
    PassFinalisationCatBPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.store$.dispatch(new PersistTests());
            this.navController.push(CAT_B.HEALTH_DECLARATION_PAGE);
            return;
        }
        Object.keys(this.form.controls).forEach(function (controlName) {
            if (_this.form.controls[controlName].invalid) {
                if (controlName === PASS_CERTIFICATE_NUMBER_CTRL) {
                    _this.store$.dispatch(new PassFinalisationValidationError(controlName + " is invalid"));
                    return;
                }
                _this.store$.dispatch(new PassFinalisationValidationError(controlName + " is blank"));
            }
        });
    };
    PassFinalisationCatBPage.prototype.passCertificateNumberChanged = function (passCertificateNumber) {
        this.store$.dispatch(new PassCertificateNumberChanged(passCertificateNumber));
    };
    PassFinalisationCatBPage.prototype.d255Changed = function (d255) {
        this.store$.dispatch(d255 ? new D255Yes() : new D255No());
    };
    PassFinalisationCatBPage.prototype.debriefWitnessedChanged = function (debriefWitnessed) {
        this.store$.dispatch(debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed());
    };
    PassFinalisationCatBPage.prototype.isWelshChanged = function (isWelsh) {
        this.store$.dispatch(isWelsh ?
            new CandidateChoseToProceedWithTestInWelsh('Cymraeg')
            : new CandidateChoseToProceedWithTestInEnglish('English'));
    };
    PassFinalisationCatBPage.prototype.displayTransmissionBanner = function () {
        return !this.form.controls['transmissionCtrl'].pristine && this.transmission === TransmissionType.Automatic;
    };
    __decorate([
        ViewChild('passCertificateNumberInput'),
        __metadata("design:type", ElementRef)
    ], PassFinalisationCatBPage.prototype, "passCertificateNumberInput", void 0);
    PassFinalisationCatBPage = __decorate([
        IonicPage(),
        Component({
            selector: '.pass-finalisation-cat-b-page',
            templateUrl: 'pass-finalisation.cat-b.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            OutcomeBehaviourMapProvider])
    ], PassFinalisationCatBPage);
    return PassFinalisationCatBPage;
}(PracticeableBasePageComponent));
export { PassFinalisationCatBPage };
//# sourceMappingURL=pass-finalisation.cat-b.page.js.map