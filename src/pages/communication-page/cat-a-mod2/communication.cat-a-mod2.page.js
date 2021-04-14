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
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { merge } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateName, getUntitledCandidateName, getCandidateDriverNumber, formatDriverNumber, getCandidateEmailAddress, getPostalAddress, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { CommunicationViewDidEnter, CommunicationValidationError, CommunicationSubmitInfo, CommunicationSubmitInfoError, } from '../communication.actions';
import { map, take, tap } from 'rxjs/operators';
import { getCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getCommunicationPreferenceUpdatedEmail, getCommunicationPreferenceType, getConductedLanguage, } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CandidateChoseEmailAsCommunicationPreference, CandidateChosePostAsCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { TranslateService } from '@ngx-translate/core';
import { CAT_A_MOD2 } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
var CommunicationCatAMod2Page = /** @class */ (function (_super) {
    __extends(CommunicationCatAMod2Page, _super);
    function CommunicationCatAMod2Page(store$, navController, platform, authenticationProvider, deviceAuthenticationProvider, translate) {
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
    CommunicationCatAMod2Page_1 = CommunicationCatAMod2Page;
    CommunicationCatAMod2Page.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.store$.dispatch(new CommunicationViewDidEnter());
        this.navBar.backButtonClick = function (e) {
            _this.clickBack();
        };
    };
    CommunicationCatAMod2Page.prototype.clickBack = function () {
        this.navController.pop();
    };
    CommunicationCatAMod2Page.prototype.ngOnInit = function () {
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
    CommunicationCatAMod2Page.prototype.ionViewWillEnter = function () {
        if (this.subscription.closed && this.merged$) {
            this.subscription = this.merged$.subscribe();
        }
        return true;
    };
    CommunicationCatAMod2Page.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    CommunicationCatAMod2Page.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.deviceAuthenticationProvider.triggerLockScreen()
                .then(function () {
                _this.store$.dispatch(new CommunicationSubmitInfo());
                _this.navController.push(CAT_A_MOD2.WAITING_ROOM_TO_CAR_PAGE)
                    .then(function () {
                    var waitingRoomPage = _this.navController.getViews().find(function (view) { return view.id === CAT_A_MOD2.WAITING_ROOM_PAGE; });
                    if (waitingRoomPage) {
                        _this.navController.removeView(waitingRoomPage);
                    }
                    var communicationPage = _this.navController.getViews().find(function (view) { return view.id === CAT_A_MOD2.COMMUNICATION_PAGE; });
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
    CommunicationCatAMod2Page.prototype.dispatchCandidateChoseProvidedEmail = function () {
        this.setCommunicationType(CommunicationCatAMod2Page_1.email, CommunicationCatAMod2Page_1.providedEmail);
        this.store$.dispatch(new CandidateChoseEmailAsCommunicationPreference(this.candidateProvidedEmail, CommunicationCatAMod2Page_1.email));
    };
    CommunicationCatAMod2Page.prototype.dispatchCandidateChoseNewEmail = function (communicationEmail) {
        this.store$.dispatch(new CandidateChoseEmailAsCommunicationPreference(communicationEmail, CommunicationCatAMod2Page_1.email));
    };
    CommunicationCatAMod2Page.prototype.setCommunicationType = function (communicationChoice, emailType) {
        if (emailType === void 0) { emailType = null; }
        this.communicationType = communicationChoice;
        this.emailType = emailType;
        this.verifyNewEmailFormControl(communicationChoice);
    };
    CommunicationCatAMod2Page.prototype.isProvidedEmailSelected = function () {
        return (this.communicationType === CommunicationCatAMod2Page_1.email
            && this.emailType === CommunicationCatAMod2Page_1.providedEmail);
    };
    CommunicationCatAMod2Page.prototype.isNewEmailSelected = function () {
        return (this.communicationType === CommunicationCatAMod2Page_1.email
            && this.emailType === CommunicationCatAMod2Page_1.updatedEmail);
    };
    CommunicationCatAMod2Page.prototype.isPostSelected = function () {
        return this.communicationType === CommunicationCatAMod2Page_1.post;
    };
    CommunicationCatAMod2Page.prototype.dispatchCandidateChosePost = function () {
        this.setCommunicationType(CommunicationCatAMod2Page_1.post);
        this.store$.dispatch(new CandidateChosePostAsCommunicationPreference(CommunicationCatAMod2Page_1.post));
    };
    CommunicationCatAMod2Page.prototype.getFormValidation = function () {
        return {
            radioCtrl: new FormControl('', Validators.required),
        };
    };
    /**
     * Facade function which dictates which radio value to reselect when rehydrating from state.
     *
     * No current schema properties allow for the capture of radio selection for emails on the communication page.
     */
    CommunicationCatAMod2Page.prototype.restoreRadiosFromState = function () {
        if (this.communicationType === CommunicationCatAMod2Page_1.email) {
            this.assertEmailType();
        }
    };
    /**
     * Called by restoreRadiosFromState() when communicationType is 'Email'.
     *
     * If candidate provided an email at time of booking and this email is the same as the 'updatedEmail' in the
     * 'CommunicationPreferences' object stored in state then we select the relevant properties, to ensure that the
     * appropriate radio button is rehydrated.
     *
     * If the candidate did not provided an email at the time of booking and the 'CommunicationPreferences' object
     * contains one in state, we select the relevant properties, to ensure that the appropriate radio button is
     * rehydrated.
     */
    CommunicationCatAMod2Page.prototype.assertEmailType = function () {
        if (this.candidateProvidedEmail !== '' && this.candidateProvidedEmail === this.communicationEmail) {
            this.selectProvidedEmail = true;
            this.selectNewEmail = false;
            this.emailType = CommunicationCatAMod2Page_1.providedEmail;
        }
        if (this.candidateProvidedEmail !== this.communicationEmail) {
            this.selectNewEmail = true;
            this.selectProvidedEmail = false;
            this.emailType = CommunicationCatAMod2Page_1.updatedEmail;
        }
    };
    CommunicationCatAMod2Page.prototype.restoreRadioValidators = function () {
        this.form.controls['radioCtrl'].setValue(true);
    };
    /**
     * Initialise a default radio selection on the communication page
     *
     * If 'communicationEmail' it implies the candidate is entering the form for the first time and
     * setting default values will not impact rehydration.
     *
     * If there is a candidate email provided at the time of booking, this will be chosen as
     * the default selection. If there is not then the new email radio selection will be chosen
     * as the default selection.
     *
     */
    CommunicationCatAMod2Page.prototype.initialiseDefaultSelections = function () {
        this.communicationType = CommunicationCatAMod2Page_1.email;
        if (this.candidateProvidedEmail) {
            this.emailType = CommunicationCatAMod2Page_1.providedEmail;
            this.selectProvidedEmail = true;
            this.form.controls['radioCtrl'].setValue(true);
            this.dispatchCandidateChoseProvidedEmail();
        }
        if (!this.candidateProvidedEmail) {
            this.emailType = CommunicationCatAMod2Page_1.updatedEmail;
            this.selectNewEmail = true;
            this.selectProvidedEmail = false;
            this.form.controls['radioCtrl'].setValue(true);
        }
    };
    CommunicationCatAMod2Page.prototype.verifyNewEmailFormControl = function (communicationChoice) {
        var newEmailCtrl = this.form.get('newEmailCtrl');
        if (newEmailCtrl !== null) {
            if (communicationChoice !== CommunicationCatAMod2Page_1.email
                || this.emailType === CommunicationCatAMod2Page_1.providedEmail) {
                newEmailCtrl.clearValidators();
            }
            else {
                newEmailCtrl.setValidators(Validators.email);
            }
            newEmailCtrl.updateValueAndValidity();
        }
    };
    CommunicationCatAMod2Page.prototype.shouldPreselectADefaultValue = function () {
        return this.communicationType === CommunicationCatAMod2Page_1.notProvided;
    };
    /**
     * Function to conditionally dispatch 'dispatchCandidateChoseNewEmail' action
     * to cover edge case candidate action.
     *
     * Candidate selects new email -> app crashes -> candidate selects Post ->
     * app crashes -> candidate selects new email (previous state value exists so examiner clicks continue)
     *
     * As state change for new email happens on text input, the expected action
     * (CandidateChoseEmailAsCommunicationPreference) would not be dispatched.
     */
    CommunicationCatAMod2Page.prototype.conditionalDispatchCandidateChoseNewEmail = function () {
        this.setCommunicationType(CommunicationCatAMod2Page_1.email, CommunicationCatAMod2Page_1.updatedEmail);
        if (this.isNewEmailSelected() && this.communicationEmail !== '') {
            this.dispatchCandidateChoseNewEmail(this.communicationEmail);
        }
    };
    CommunicationCatAMod2Page.prototype.getNewEmailAddressValue = function () {
        return this.candidateProvidedEmail === this.communicationEmail ? '' : this.communicationEmail;
    };
    var CommunicationCatAMod2Page_1;
    CommunicationCatAMod2Page.providedEmail = 'Provided';
    CommunicationCatAMod2Page.updatedEmail = 'Updated';
    CommunicationCatAMod2Page.email = 'Email';
    CommunicationCatAMod2Page.post = 'Post';
    CommunicationCatAMod2Page.notProvided = 'Not provided';
    CommunicationCatAMod2Page.welshLanguage = 'Cymraeg';
    CommunicationCatAMod2Page.englishLanguage = 'English';
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], CommunicationCatAMod2Page.prototype, "navBar", void 0);
    CommunicationCatAMod2Page = CommunicationCatAMod2Page_1 = __decorate([
        IonicPage(),
        Component({
            selector: '.communication-cat-a-mod2-page',
            templateUrl: 'communication.cat-a-mod2.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            Platform,
            AuthenticationProvider,
            DeviceAuthenticationProvider,
            TranslateService])
    ], CommunicationCatAMod2Page);
    return CommunicationCatAMod2Page;
}(BasePageComponent));
export { CommunicationCatAMod2Page };
//# sourceMappingURL=communication.cat-a-mod2.page.js.map