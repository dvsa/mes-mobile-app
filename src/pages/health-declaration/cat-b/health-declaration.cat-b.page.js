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
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar, AlertController } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
import { Store, select } from '@ngrx/store';
import { HealthDeclarationViewDidEnter, ContinueFromDeclaration, HealthDeclarationValidationError, } from '../health-declaration.actions';
import { merge } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import * as postTestDeclarationsActions from '../../../modules/tests/post-test-declarations/post-test-declarations.actions';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { getPostTestDeclarations } from '../../../modules/tests/post-test-declarations/post-test-declarations.reducer';
import { getHealthDeclarationStatus, getReceiptDeclarationStatus, getSignatureStatus, } from '../../../modules/tests/post-test-declarations/post-test-declarations.selector';
import { getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { map, tap } from 'rxjs/operators';
import { getPassCertificateNumber, isProvisionalLicenseProvided, } from '../../../modules/tests/pass-completion/pass-completion.selector';
import { getPassCompletion } from '../../../modules/tests/pass-completion/pass-completion.reducer';
import { TranslateService } from '@ngx-translate/core';
import { ProvisionalLicenseNotReceived } from '../../../modules/tests/pass-completion/pass-completion.actions';
import { getCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage, } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CONFIRM_TEST_DETAILS } from '../../page-names.constants';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
var HealthDeclarationCatBPage = /** @class */ (function (_super) {
    __extends(HealthDeclarationCatBPage, _super);
    function HealthDeclarationCatBPage(store$, navController, navParams, platform, authenticationProvider, deviceAuthenticationProvider, translate, alertController) {
        var _this = _super.call(this, platform, navController, authenticationProvider, store$) || this;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.deviceAuthenticationProvider = deviceAuthenticationProvider;
        _this.translate = translate;
        _this.alertController = alertController;
        _this.inputSubscriptions = [];
        _this.form = new FormGroup({});
        return _this;
    }
    HealthDeclarationCatBPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.store$.dispatch(new HealthDeclarationViewDidEnter());
        this.navBar.backButtonClick = function (e) {
            _this.clickBack();
        };
    };
    HealthDeclarationCatBPage.prototype.clickBack = function () {
        var _this = this;
        this.deviceAuthenticationProvider.triggerLockScreen()
            .then(function () {
            _this.navController.pop();
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    HealthDeclarationCatBPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            healthDeclarationAccepted$: currentTest$.pipe(select(getPostTestDeclarations), select(getHealthDeclarationStatus)),
            receiptDeclarationAccepted$: currentTest$.pipe(select(getPostTestDeclarations), select(getReceiptDeclarationStatus)),
            signature$: currentTest$.pipe(select(getPostTestDeclarations), select(getSignatureStatus)),
            candidateName$: this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getCandidate), select(getCandidateName)),
            candidateUntitledName$: this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            candidateDriverNumber$: this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getCandidate), select(getCandidateDriverNumber), map(formatDriverNumber)),
            passCertificateNumber$: currentTest$.pipe(select(getPassCompletion), select(getPassCertificateNumber)),
            licenseProvided$: currentTest$.pipe(select(getPassCompletion), map(isProvisionalLicenseProvided)),
            conductedLanguage$: currentTest$.pipe(select(getCommunicationPreference), select(getConductedLanguage)),
        };
        var _a = this.pageState, licenseProvided$ = _a.licenseProvided$, healthDeclarationAccepted$ = _a.healthDeclarationAccepted$, conductedLanguage$ = _a.conductedLanguage$;
        this.merged$ = merge(licenseProvided$.pipe(map(function (val) { return _this.licenseProvided = val; })), healthDeclarationAccepted$.pipe(map(function (val) { return _this.healthDeclarationAccepted = val; })), conductedLanguage$.pipe(tap(function (value) { return configureI18N(value, _this.translate); })));
    };
    HealthDeclarationCatBPage.prototype.ionViewWillEnter = function () {
        if (this.merged$) {
            this.subscription = this.merged$.subscribe();
        }
        return true;
    };
    HealthDeclarationCatBPage.prototype.getSignatureDrawCompleteAction = function () {
        return postTestDeclarationsActions.SIGNATURE_DATA_CHANGED;
    };
    HealthDeclarationCatBPage.prototype.getSignatureClearAction = function () {
        return postTestDeclarationsActions.SIGNATURE_DATA_CLEARED;
    };
    HealthDeclarationCatBPage.prototype.healthDeclarationChanged = function () {
        this.store$.dispatch(new postTestDeclarationsActions.ToggleHealthDeclaration());
    };
    HealthDeclarationCatBPage.prototype.receiptDeclarationChanged = function () {
        this.store$.dispatch(new postTestDeclarationsActions.ToggleReceiptDeclaration());
    };
    HealthDeclarationCatBPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            if (!this.healthDeclarationAccepted) {
                this.showConfirmHealthDeclarationModal();
            }
            else {
                this.persistAndNavigate(false);
            }
            return;
        }
        Object.keys(this.form.controls).forEach(function (controlName) {
            if (_this.form.controls[controlName].invalid) {
                _this.store$.dispatch(new HealthDeclarationValidationError(controlName + " is blank"));
            }
        });
    };
    HealthDeclarationCatBPage.prototype.showConfirmHealthDeclarationModal = function () {
        var _this = this;
        var shortMessage = 'Remind the candidate to contact DVLA';
        var extendedMessage = 
        // tslint:disable-next-line:max-line-length
        "You need to give the provisional licence back to the candidate.<br/>The field 'Driver licence received' will be automatically changed to 'no'.<br/>" + shortMessage;
        var alert = this.alertController.create({
            title: 'The candidate has not confirmed the health declaration',
            message: this.licenseProvided ? extendedMessage : shortMessage,
            cssClass: 'confirm-declaration-modal',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () { },
                },
                {
                    text: 'Continue',
                    handler: function () { return _this.persistAndNavigate(true); },
                },
            ],
            enableBackdropDismiss: false,
        });
        alert.present();
    };
    HealthDeclarationCatBPage.prototype.persistAndNavigate = function (resetLicenseProvided) {
        var _this = this;
        this.deviceAuthenticationProvider.triggerLockScreen()
            .then(function () {
            if (_this.licenseProvided && resetLicenseProvided) {
                _this.store$.dispatch(new ProvisionalLicenseNotReceived());
            }
            _this.store$.dispatch(new ContinueFromDeclaration());
            _this.navController.push(CONFIRM_TEST_DETAILS);
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    HealthDeclarationCatBPage.prototype.ionViewDidLeave = function () {
        _super.prototype.ionViewDidLeave.call(this);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.inputSubscriptions) {
            this.inputSubscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        }
    };
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], HealthDeclarationCatBPage.prototype, "navBar", void 0);
    HealthDeclarationCatBPage = __decorate([
        IonicPage(),
        Component({
            selector: '.health-declaration-cat-b-page',
            templateUrl: 'health-declaration.cat-b.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            DeviceAuthenticationProvider,
            TranslateService,
            AlertController])
    ], HealthDeclarationCatBPage);
    return HealthDeclarationCatBPage;
}(PracticeableBasePageComponent));
export { HealthDeclarationCatBPage };
//# sourceMappingURL=health-declaration.cat-b.page.js.map