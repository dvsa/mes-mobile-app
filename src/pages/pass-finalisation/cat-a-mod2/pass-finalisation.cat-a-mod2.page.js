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
import { PassFinalisationViewDidEnter, PassFinalisationValidationError, } from '../pass-finalisation.actions';
import { ProvisionalLicenseReceived, ProvisionalLicenseNotReceived, PassCertificateNumberChanged, } from '../../../modules/tests/pass-completion/pass-completion.actions';
import { getPassCompletion } from '../../../modules/tests/pass-completion/pass-completion.reducer';
import { getPassCertificateNumber, isProvisionalLicenseProvided, } from '../../../modules/tests/pass-completion/pass-completion.selector';
import { merge } from 'rxjs';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getApplicationReference, } from '../../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import { getApplicationNumber, } from '../../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { getCurrentTest, getJournalData, getTestOutcomeText } from '../../../modules/tests/tests.selector';
import { map } from 'rxjs/operators';
import { getTests } from '../../../modules/tests/tests.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-a-mod2/vehicle-details.cat-a-mod2.reducer';
import { getGearboxCategory } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { GearboxCategoryChanged } from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { CAT_A_MOD2 } from '../../page-names.constants';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { isDebriefWitnessed, getD255 } from '../../../modules/tests/test-summary/common/test-summary.selector';
import { D255Yes, D255No, DebriefWitnessed, DebriefUnwitnessed, } from '../../../modules/tests/test-summary/common/test-summary.actions';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../office/office-behaviour-map.cat-a-mod2';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish, } from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { getCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage, } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { PASS_CERTIFICATE_NUMBER_CTRL } from '../components/pass-certificate-number/pass-certificate-number.constants';
import { TransmissionType } from '../../../shared/models/transmission-type';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { PopulateTestCategory } from '../../../modules/tests/category/category.actions';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
var PassFinalisationCatAMod2Page = /** @class */ (function (_super) {
    __extends(PassFinalisationCatAMod2Page, _super);
    function PassFinalisationCatAMod2Page(store$, navController, navParams, platform, authenticationProvider, outcomeBehaviourProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
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
    PassFinalisationCatAMod2Page.prototype.ngOnInit = function () {
        var _this = this;
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
            debriefWitnessed$: currentTest$.pipe(select(getTestSummary), select(isDebriefWitnessed)),
            d255$: currentTest$.pipe(select(getTestSummary), select(getD255)),
            conductedLanguage$: currentTest$.pipe(select(getCommunicationPreference), select(getConductedLanguage)),
            testCategory$: currentTest$.pipe(select(getTestCategory)),
        };
        var _a = this.pageState, transmission$ = _a.transmission$, testCategory$ = _a.testCategory$;
        this.merged$ = merge(transmission$.pipe(map(function (value) { return _this.transmission = value; })), testCategory$.pipe(map(function (value) { return _this.categoryCode = value; })));
        this.subscription = this.merged$.subscribe();
    };
    PassFinalisationCatAMod2Page.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    PassFinalisationCatAMod2Page.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new PassFinalisationViewDidEnter());
        if (this.subscription.closed && this.merged$) {
            this.subscription = this.merged$.subscribe();
        }
    };
    PassFinalisationCatAMod2Page.prototype.provisionalLicenseReceived = function () {
        this.store$.dispatch(new ProvisionalLicenseReceived());
    };
    PassFinalisationCatAMod2Page.prototype.provisionalLicenseNotReceived = function () {
        this.store$.dispatch(new ProvisionalLicenseNotReceived());
    };
    PassFinalisationCatAMod2Page.prototype.transmissionChanged = function (transmission) {
        this.store$.dispatch(new GearboxCategoryChanged(transmission));
    };
    PassFinalisationCatAMod2Page.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.store$.dispatch(new PersistTests());
            this.navController.push(CAT_A_MOD2.HEALTH_DECLARATION_PAGE);
            return;
        }
        Object.keys(this.form.controls).forEach(function (controlName) {
            if (_this.form.controls[controlName].invalid) {
                if (controlName === PASS_CERTIFICATE_NUMBER_CTRL) {
                    _this.store$.dispatch(new PassFinalisationValidationError(controlName + " is invalid"));
                }
                _this.store$.dispatch(new PassFinalisationValidationError(controlName + " is blank"));
            }
        });
    };
    PassFinalisationCatAMod2Page.prototype.passCertificateNumberChanged = function (passCertificateNumber) {
        this.store$.dispatch(new PassCertificateNumberChanged(passCertificateNumber));
    };
    PassFinalisationCatAMod2Page.prototype.d255Changed = function (d255) {
        this.store$.dispatch(d255 ? new D255Yes() : new D255No());
    };
    PassFinalisationCatAMod2Page.prototype.debriefWitnessedChanged = function (debriefWitnessed) {
        this.store$.dispatch(debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed());
    };
    PassFinalisationCatAMod2Page.prototype.isWelshChanged = function (isWelsh) {
        this.store$.dispatch(isWelsh ?
            new CandidateChoseToProceedWithTestInWelsh(Language.CYMRAEG)
            : new CandidateChoseToProceedWithTestInEnglish(Language.ENGLISH));
    };
    PassFinalisationCatAMod2Page.prototype.displayTransmissionBanner = function () {
        return !this.form.controls['transmissionCtrl'].pristine && this.transmission === TransmissionType.Automatic;
    };
    PassFinalisationCatAMod2Page.prototype.categoryCodeChanged = function (category) {
        this.store$.dispatch(new PopulateTestCategory(category));
    };
    __decorate([
        ViewChild('passCertificateNumberInput'),
        __metadata("design:type", ElementRef)
    ], PassFinalisationCatAMod2Page.prototype, "passCertificateNumberInput", void 0);
    PassFinalisationCatAMod2Page = __decorate([
        IonicPage(),
        Component({
            selector: '.pass-finalisation-cat-a-mod2-page',
            templateUrl: 'pass-finalisation.cat-a-mod2.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            OutcomeBehaviourMapProvider])
    ], PassFinalisationCatAMod2Page);
    return PassFinalisationCatAMod2Page;
}(BasePageComponent));
export { PassFinalisationCatAMod2Page };
//# sourceMappingURL=pass-finalisation.cat-a-mod2.page.js.map