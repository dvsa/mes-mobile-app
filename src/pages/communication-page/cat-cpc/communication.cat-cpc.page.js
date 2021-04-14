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
import { IonicPage, Navbar, Platform, NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateName, getUntitledCandidateName, getCandidateDriverNumber, formatDriverNumber, getCandidateEmailAddress, getPostalAddress, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { CommunicationViewDidEnter, CommunicationValidationError, CommunicationSubmitInfo, CommunicationSubmitInfoError, } from '../communication.actions';
import { getCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getCommunicationPreferenceUpdatedEmail, getCommunicationPreferenceType, getConductedLanguage, } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CandidateChoseEmailAsCommunicationPreference, CandidateChosePostAsCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { TranslateService } from '@ngx-translate/core';
import { CAT_CPC } from '../../page-names.constants';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
var CommunicationCatCPCPage = /** @class */ (function (_super) {
    __extends(CommunicationCatCPCPage, _super);
    function CommunicationCatCPCPage(store$, navController, platform, authenticationProvider, deviceAuthenticationProvider, translate) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.deviceAuthenticationProvider = deviceAuthenticationProvider;
        _this.translate = translate;
        _this.form = new FormGroup(_this.getFormValidation());
        return _this;
    }
    CommunicationCatCPCPage_1 = CommunicationCatCPCPage;
    CommunicationCatCPCPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.store$.dispatch(new CommunicationViewDidEnter());
        this.navBar.backButtonClick = function (e) {
            _this.clickBack();
        };
    };
    CommunicationCatCPCPage.prototype.clickBack = function () {
        this.navController.pop();
    };
    CommunicationCatCPCPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateName)),
            candidateUntitledName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            candidateDriverNumber$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateDriverNumber), map(formatDriverNumber)),
            candidateProvidedEmail$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateEmailAddress), take(1)),
            communicationEmail$: this.store$.pipe(select(getTests), select(getCurrentTest), select(getCommunicationPreference), select(getCommunicationPreferenceUpdatedEmail)),
            communicationType$: currentTest$.pipe(select(getCommunicationPreference), select(getCommunicationPreferenceType)),
            candidateAddress$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getPostalAddress)),
            conductedLanguage$: currentTest$.pipe(select(getCommunicationPreference), select(getConductedLanguage)),
            categoryCode$: currentTest$.pipe(select(getTestCategory)),
        };
        var _a = this.pageState, candidateProvidedEmail$ = _a.candidateProvidedEmail$, communicationEmail$ = _a.communicationEmail$, communicationType$ = _a.communicationType$, conductedLanguage$ = _a.conductedLanguage$;
        this.merged$ = merge(candidateProvidedEmail$.pipe(map(function (value) { return _this.candidateProvidedEmail = value; })), communicationEmail$.pipe(map(function (value) { return _this.communicationEmail = value; })), communicationType$.pipe(map(function (value) { return _this.communicationType = value; })), conductedLanguage$.pipe(tap(function (value) { return configureI18N(value, _this.translate); })));
        this.subscription = this.merged$.subscribe();
        if (this.shouldPreselectADefaultValue()) {
            this.initialiseDefaultSelections();
        }
        this.restoreRadiosFromState();
        this.restoreRadioValidators();
    };
    CommunicationCatCPCPage.prototype.ionViewWillEnter = function () {
        if (this.subscription.closed && this.merged$) {
            this.subscription = this.merged$.subscribe();
        }
        return true;
    };
    CommunicationCatCPCPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    CommunicationCatCPCPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.deviceAuthenticationProvider.triggerLockScreen()
                .then(function () {
                _this.store$.dispatch(new CommunicationSubmitInfo());
                _this.navController.push(CAT_CPC.WAITING_ROOM_TO_CAR_PAGE)
                    .then(function () {
                    var waitingRoomPage = _this.navController.getViews().find(function (view) { return view.id === CAT_CPC.WAITING_ROOM_PAGE; });
                    if (waitingRoomPage) {
                        _this.navController.removeView(waitingRoomPage);
                    }
                    var communicationPage = _this.navController.getViews().find(function (view) { return view.id === CAT_CPC.COMMUNICATION_PAGE; });
                    if (communicationPage) {
                        _this.navController.removeView(communicationPage);
                    }
                });
            })
                .catch(function (err) {
                _this.store$.dispatch(new CommunicationSubmitInfoError(err));
            });
        }
        else {
            Object.keys(this.form.controls).forEach(function (controlName) {
                if (_this.form.controls[controlName].invalid) {
                    _this.store$.dispatch(new CommunicationValidationError(controlName + " is blank"));
                }
            });
        }
    };
    CommunicationCatCPCPage.prototype.dispatchCandidateChoseProvidedEmail = function () {
        this.setCommunicationType(CommunicationCatCPCPage_1.email, CommunicationCatCPCPage_1.providedEmail);
        this.store$.dispatch(new CandidateChoseEmailAsCommunicationPreference(this.candidateProvidedEmail, CommunicationCatCPCPage_1.email));
    };
    CommunicationCatCPCPage.prototype.dispatchCandidateChoseNewEmail = function (communicationEmail) {
        this.store$.dispatch(new CandidateChoseEmailAsCommunicationPreference(communicationEmail, CommunicationCatCPCPage_1.email));
    };
    CommunicationCatCPCPage.prototype.setCommunicationType = function (communicationChoice, emailType) {
        if (emailType === void 0) { emailType = null; }
        this.communicationType = communicationChoice;
        this.emailType = emailType;
        this.verifyNewEmailFormControl(communicationChoice);
    };
    CommunicationCatCPCPage.prototype.isProvidedEmailSelected = function () {
        return (this.communicationType === CommunicationCatCPCPage_1.email
            && this.emailType === CommunicationCatCPCPage_1.providedEmail);
    };
    CommunicationCatCPCPage.prototype.isNewEmailSelected = function () {
        return (this.communicationType === CommunicationCatCPCPage_1.email
            && this.emailType === CommunicationCatCPCPage_1.updatedEmail);
    };
    CommunicationCatCPCPage.prototype.isPostSelected = function () {
        return this.communicationType === CommunicationCatCPCPage_1.post;
    };
    CommunicationCatCPCPage.prototype.dispatchCandidateChosePost = function () {
        this.setCommunicationType(CommunicationCatCPCPage_1.post);
        this.store$.dispatch(new CandidateChosePostAsCommunicationPreference(CommunicationCatCPCPage_1.post));
    };
    CommunicationCatCPCPage.prototype.getFormValidation = function () {
        return {
            radioCtrl: new FormControl('', Validators.required),
        };
    };
    CommunicationCatCPCPage.prototype.restoreRadiosFromState = function () {
        if (this.communicationType === CommunicationCatCPCPage_1.email) {
            this.assertEmailType();
        }
    };
    CommunicationCatCPCPage.prototype.assertEmailType = function () {
        if (this.candidateProvidedEmail !== '' && this.candidateProvidedEmail === this.communicationEmail) {
            this.selectProvidedEmail = true;
            this.selectNewEmail = false;
            this.emailType = CommunicationCatCPCPage_1.providedEmail;
        }
        if (this.candidateProvidedEmail !== this.communicationEmail) {
            this.selectNewEmail = true;
            this.selectProvidedEmail = false;
            this.emailType = CommunicationCatCPCPage_1.updatedEmail;
        }
    };
    CommunicationCatCPCPage.prototype.restoreRadioValidators = function () {
        this.form.controls['radioCtrl'].setValue(true);
    };
    CommunicationCatCPCPage.prototype.initialiseDefaultSelections = function () {
        this.communicationType = CommunicationCatCPCPage_1.email;
        if (this.candidateProvidedEmail) {
            this.emailType = CommunicationCatCPCPage_1.providedEmail;
            this.selectProvidedEmail = true;
            this.form.controls['radioCtrl'].setValue(true);
            this.dispatchCandidateChoseProvidedEmail();
        }
        if (!this.candidateProvidedEmail) {
            this.emailType = CommunicationCatCPCPage_1.updatedEmail;
            this.selectNewEmail = true;
            this.selectProvidedEmail = false;
            this.form.controls['radioCtrl'].setValue(true);
        }
    };
    CommunicationCatCPCPage.prototype.verifyNewEmailFormControl = function (communicationChoice) {
        var newEmailCtrl = this.form.get('newEmailCtrl');
        if (newEmailCtrl !== null) {
            if (communicationChoice !== CommunicationCatCPCPage_1.email
                || this.emailType === CommunicationCatCPCPage_1.providedEmail) {
                newEmailCtrl.clearValidators();
            }
            else {
                newEmailCtrl.setValidators(Validators.email);
            }
            newEmailCtrl.updateValueAndValidity();
        }
    };
    CommunicationCatCPCPage.prototype.shouldPreselectADefaultValue = function () {
        return this.communicationType === CommunicationCatCPCPage_1.notProvided;
    };
    CommunicationCatCPCPage.prototype.conditionalDispatchCandidateChoseNewEmail = function () {
        this.setCommunicationType(CommunicationCatCPCPage_1.email, CommunicationCatCPCPage_1.updatedEmail);
        if (this.isNewEmailSelected() && this.communicationEmail !== '') {
            this.dispatchCandidateChoseNewEmail(this.communicationEmail);
        }
    };
    CommunicationCatCPCPage.prototype.getNewEmailAddressValue = function () {
        return this.candidateProvidedEmail === this.communicationEmail ? '' : this.communicationEmail;
    };
    var CommunicationCatCPCPage_1;
    CommunicationCatCPCPage.providedEmail = 'Provided';
    CommunicationCatCPCPage.updatedEmail = 'Updated';
    CommunicationCatCPCPage.email = 'Email';
    CommunicationCatCPCPage.post = 'Post';
    CommunicationCatCPCPage.notProvided = 'Not provided';
    CommunicationCatCPCPage.welshLanguage = Language.CYMRAEG;
    CommunicationCatCPCPage.englishLanguage = Language.ENGLISH;
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], CommunicationCatCPCPage.prototype, "navBar", void 0);
    CommunicationCatCPCPage = CommunicationCatCPCPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: '.communication-cat-cpc-page',
            templateUrl: 'communication.cat-cpc.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            Platform,
            AuthenticationProvider,
            DeviceAuthenticationProvider,
            TranslateService])
    ], CommunicationCatCPCPage);
    return CommunicationCatCPCPage;
}(BasePageComponent));
export { CommunicationCatCPCPage };
//# sourceMappingURL=communication.cat-cpc.page.js.map