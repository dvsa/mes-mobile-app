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
import { BasePageComponent } from '../../../shared/classes/base-page';
import { Store, select } from '@ngrx/store';
import { HealthDeclarationViewDidEnter, ContinueFromDeclaration, HealthDeclarationValidationError, } from '../health-declaration.actions';
import { merge } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import * as postTestDeclarationsActions from '../../../modules/tests/post-test-declarations/post-test-declarations.actions';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { getPostTestDeclarations } from '../../../modules/tests/post-test-declarations/post-test-declarations.reducer';
import { getReceiptDeclarationStatus, getSignatureStatus, } from '../../../modules/tests/post-test-declarations/post-test-declarations.selector';
import { getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { map, tap } from 'rxjs/operators';
import { getPassCertificateNumber, isProvisionalLicenseProvided, } from '../../../modules/tests/pass-completion/pass-completion.selector';
import { getPassCompletion } from '../../../modules/tests/pass-completion/pass-completion.reducer';
import { TranslateService } from '@ngx-translate/core';
import { ProvisionalLicenseNotReceived } from '../../../modules/tests/pass-completion/pass-completion.actions';
import { getCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage, } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CAT_CPC } from '../../page-names.constants';
import { includes } from 'lodash';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
var HealthDeclarationCatCPCPage = /** @class */ (function (_super) {
    __extends(HealthDeclarationCatCPCPage, _super);
    function HealthDeclarationCatCPCPage(store$, navController, navParams, platform, authenticationProvider, deviceAuthenticationProvider, translate, alertController) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
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
    HealthDeclarationCatCPCPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.store$.dispatch(new HealthDeclarationViewDidEnter());
        this.navBar.backButtonClick = function (e) {
            _this.clickBack();
        };
    };
    HealthDeclarationCatCPCPage.prototype.clickBack = function () {
        var _this = this;
        this.deviceAuthenticationProvider.triggerLockScreen()
            .then(function () {
            _this.navController.pop();
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    HealthDeclarationCatCPCPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var journalData$ = currentTest$.pipe(select(getJournalData));
        var candidate$ = journalData$.pipe(select(getCandidate));
        var postTestDeclarations$ = currentTest$.pipe(select(getPostTestDeclarations));
        var passCompletion$ = currentTest$.pipe(select(getPassCompletion));
        this.pageState = {
            receiptDeclarationAccepted$: postTestDeclarations$.pipe(select(getReceiptDeclarationStatus)),
            signature$: postTestDeclarations$.pipe(select(getSignatureStatus)),
            candidateName$: candidate$.pipe(select(getCandidateName)),
            candidateUntitledName$: candidate$.pipe(select(getUntitledCandidateName)),
            candidateDriverNumber$: candidate$.pipe(select(getCandidateDriverNumber), map(formatDriverNumber)),
            // TODO confirm this is working when page is linked up
            passCertificateNumber$: passCompletion$.pipe(select(getPassCertificateNumber)),
            licenseProvided$: passCompletion$.pipe(map(isProvisionalLicenseProvided)),
            conductedLanguage$: currentTest$.pipe(select(getCommunicationPreference), select(getConductedLanguage)),
        };
        var _a = this.pageState, licenseProvided$ = _a.licenseProvided$, conductedLanguage$ = _a.conductedLanguage$;
        this.merged$ = merge(licenseProvided$.pipe(map(function (val) { return _this.licenseProvided = val; })), conductedLanguage$.pipe(tap(function (value) { return configureI18N(value, _this.translate); })));
    };
    HealthDeclarationCatCPCPage.prototype.ionViewWillEnter = function () {
        if (this.merged$) {
            this.subscription = this.merged$.subscribe();
        }
        return true;
    };
    HealthDeclarationCatCPCPage.prototype.getSignatureDrawCompleteAction = function () {
        return postTestDeclarationsActions.SIGNATURE_DATA_CHANGED;
    };
    HealthDeclarationCatCPCPage.prototype.getSignatureClearAction = function () {
        return postTestDeclarationsActions.SIGNATURE_DATA_CLEARED;
    };
    HealthDeclarationCatCPCPage.prototype.receiptDeclarationChanged = function () {
        this.store$.dispatch(new postTestDeclarationsActions.ToggleReceiptDeclaration());
    };
    HealthDeclarationCatCPCPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.persistAndNavigate(false);
            return;
        }
        Object.keys(this.form.controls).forEach(function (controlName) {
            if (_this.form.controls[controlName].invalid) {
                _this.store$.dispatch(new HealthDeclarationValidationError(controlName + " is blank"));
            }
        });
    };
    HealthDeclarationCatCPCPage.prototype.persistAndNavigate = function (resetLicenseProvided) {
        var _this = this;
        this.deviceAuthenticationProvider.triggerLockScreen()
            .then(function () {
            if (_this.licenseProvided && resetLicenseProvided) {
                _this.store$.dispatch(new ProvisionalLicenseNotReceived());
            }
            _this.store$.dispatch(new ContinueFromDeclaration());
            _this.navController.push(CAT_CPC.BACK_TO_OFFICE_PAGE).then(function () {
                _this.navController.getViews().forEach(function (view) {
                    if (includes([
                        CAT_CPC.TEST_REPORT_PAGE,
                        CAT_CPC.DEBRIEF_PAGE,
                        CAT_CPC.PASS_FINALISATION_PAGE,
                        CAT_CPC.HEALTH_DECLARATION_PAGE,
                    ], view.id)) {
                        _this.navController.removeView(view);
                    }
                });
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    HealthDeclarationCatCPCPage.prototype.ionViewDidLeave = function () {
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
    ], HealthDeclarationCatCPCPage.prototype, "navBar", void 0);
    HealthDeclarationCatCPCPage = __decorate([
        IonicPage(),
        Component({
            selector: '.health-declaration-cat-cpc-page',
            templateUrl: 'health-declaration.cat-cpc.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            DeviceAuthenticationProvider,
            TranslateService,
            AlertController])
    ], HealthDeclarationCatCPCPage);
    return HealthDeclarationCatCPCPage;
}(BasePageComponent));
export { HealthDeclarationCatCPCPage };
//# sourceMappingURL=health-declaration.cat-cpc.page.js.map