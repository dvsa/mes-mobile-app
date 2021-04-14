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
import { CAT_ADI_PART2 } from '../../page-names.constants';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
var CommunicationCatADIPart2Page = /** @class */ (function (_super) {
    __extends(CommunicationCatADIPart2Page, _super);
    function CommunicationCatADIPart2Page(store$, navController, platform, authenticationProvider, deviceAuthenticationProvider, translate) {
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
    CommunicationCatADIPart2Page_1 = CommunicationCatADIPart2Page;
    CommunicationCatADIPart2Page.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.store$.dispatch(new CommunicationViewDidEnter());
        this.navBar.backButtonClick = function (e) {
            _this.clickBack();
        };
    };
    CommunicationCatADIPart2Page.prototype.clickBack = function () {
        this.navController.pop();
    };
    CommunicationCatADIPart2Page.prototype.ngOnInit = function () {
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
    CommunicationCatADIPart2Page.prototype.ionViewWillEnter = function () {
        if (this.subscription.closed && this.merged$) {
            this.subscription = this.merged$.subscribe();
        }
        return true;
    };
    CommunicationCatADIPart2Page.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    CommunicationCatADIPart2Page.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.deviceAuthenticationProvider.triggerLockScreen()
                .then(function () {
                _this.store$.dispatch(new CommunicationSubmitInfo());
                _this.navController.push(CAT_ADI_PART2.WAITING_ROOM_TO_CAR_PAGE)
                    .then(function () {
                    var waitingRoomPage = _this.navController.getViews().find(function (view) { return view.id === CAT_ADI_PART2.WAITING_ROOM_PAGE; });
                    if (waitingRoomPage) {
                        _this.navController.removeView(waitingRoomPage);
                    }
                    var communicationPage = _this.navController.getViews().find(function (view) { return view.id === CAT_ADI_PART2.COMMUNICATION_PAGE; });
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
    CommunicationCatADIPart2Page.prototype.dispatchCandidateChoseProvidedEmail = function () {
        this.setCommunicationType(CommunicationCatADIPart2Page_1.email, CommunicationCatADIPart2Page_1.providedEmail);
        this.store$.dispatch(new CandidateChoseEmailAsCommunicationPreference(this.candidateProvidedEmail, CommunicationCatADIPart2Page_1.email));
    };
    CommunicationCatADIPart2Page.prototype.dispatchCandidateChoseNewEmail = function (communicationEmail) {
        this.store$.dispatch(new CandidateChoseEmailAsCommunicationPreference(communicationEmail, CommunicationCatADIPart2Page_1.email));
    };
    CommunicationCatADIPart2Page.prototype.setCommunicationType = function (communicationChoice, emailType) {
        if (emailType === void 0) { emailType = null; }
        this.communicationType = communicationChoice;
        this.emailType = emailType;
        this.verifyNewEmailFormControl(communicationChoice);
    };
    CommunicationCatADIPart2Page.prototype.isProvidedEmailSelected = function () {
        return (this.communicationType === CommunicationCatADIPart2Page_1.email
            && this.emailType === CommunicationCatADIPart2Page_1.providedEmail);
    };
    CommunicationCatADIPart2Page.prototype.isNewEmailSelected = function () {
        return (this.communicationType === CommunicationCatADIPart2Page_1.email
            && this.emailType === CommunicationCatADIPart2Page_1.updatedEmail);
    };
    CommunicationCatADIPart2Page.prototype.isPostSelected = function () {
        return this.communicationType === CommunicationCatADIPart2Page_1.post;
    };
    CommunicationCatADIPart2Page.prototype.dispatchCandidateChosePost = function () {
        this.setCommunicationType(CommunicationCatADIPart2Page_1.post);
        this.store$.dispatch(new CandidateChosePostAsCommunicationPreference(CommunicationCatADIPart2Page_1.post));
    };
    CommunicationCatADIPart2Page.prototype.getFormValidation = function () {
        return {
            radioCtrl: new FormControl('', Validators.required),
        };
    };
    /**
     * Facade function which dictates which radio value to reselect when rehydrating from state.
     *
     * No current schema properties allow for the capture of radio selection for emails on the communication page.
     */
    CommunicationCatADIPart2Page.prototype.restoreRadiosFromState = function () {
        if (this.communicationType === CommunicationCatADIPart2Page_1.email) {
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
    CommunicationCatADIPart2Page.prototype.assertEmailType = function () {
        if (this.candidateProvidedEmail !== '' && this.candidateProvidedEmail === this.communicationEmail) {
            this.selectProvidedEmail = true;
            this.selectNewEmail = false;
            this.emailType = CommunicationCatADIPart2Page_1.providedEmail;
        }
        if (this.candidateProvidedEmail !== this.communicationEmail) {
            this.selectNewEmail = true;
            this.selectProvidedEmail = false;
            this.emailType = CommunicationCatADIPart2Page_1.updatedEmail;
        }
    };
    CommunicationCatADIPart2Page.prototype.restoreRadioValidators = function () {
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
    CommunicationCatADIPart2Page.prototype.initialiseDefaultSelections = function () {
        this.communicationType = CommunicationCatADIPart2Page_1.email;
        if (this.candidateProvidedEmail) {
            this.emailType = CommunicationCatADIPart2Page_1.providedEmail;
            this.selectProvidedEmail = true;
            this.form.controls['radioCtrl'].setValue(true);
            this.dispatchCandidateChoseProvidedEmail();
        }
        if (!this.candidateProvidedEmail) {
            this.emailType = CommunicationCatADIPart2Page_1.updatedEmail;
            this.selectNewEmail = true;
            this.selectProvidedEmail = false;
            this.form.controls['radioCtrl'].setValue(true);
        }
    };
    CommunicationCatADIPart2Page.prototype.verifyNewEmailFormControl = function (communicationChoice) {
        var newEmailCtrl = this.form.get('newEmailCtrl');
        if (newEmailCtrl !== null) {
            if (communicationChoice !== CommunicationCatADIPart2Page_1.email
                || this.emailType === CommunicationCatADIPart2Page_1.providedEmail) {
                newEmailCtrl.clearValidators();
            }
            else {
                newEmailCtrl.setValidators(Validators.email);
            }
            newEmailCtrl.updateValueAndValidity();
        }
    };
    CommunicationCatADIPart2Page.prototype.shouldPreselectADefaultValue = function () {
        return this.communicationType === CommunicationCatADIPart2Page_1.notProvided;
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
    CommunicationCatADIPart2Page.prototype.conditionalDispatchCandidateChoseNewEmail = function () {
        this.setCommunicationType(CommunicationCatADIPart2Page_1.email, CommunicationCatADIPart2Page_1.updatedEmail);
        if (this.isNewEmailSelected() && this.communicationEmail !== '') {
            this.dispatchCandidateChoseNewEmail(this.communicationEmail);
        }
    };
    CommunicationCatADIPart2Page.prototype.getNewEmailAddressValue = function () {
        return this.candidateProvidedEmail === this.communicationEmail ? '' : this.communicationEmail;
    };
    var CommunicationCatADIPart2Page_1;
    CommunicationCatADIPart2Page.providedEmail = 'Provided';
    CommunicationCatADIPart2Page.updatedEmail = 'Updated';
    CommunicationCatADIPart2Page.email = 'Email';
    CommunicationCatADIPart2Page.post = 'Post';
    CommunicationCatADIPart2Page.notProvided = 'Not provided';
    CommunicationCatADIPart2Page.welshLanguage = Language.CYMRAEG;
    CommunicationCatADIPart2Page.englishLanguage = Language.ENGLISH;
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], CommunicationCatADIPart2Page.prototype, "navBar", void 0);
    CommunicationCatADIPart2Page = CommunicationCatADIPart2Page_1 = __decorate([
        IonicPage(),
        Component({
            selector: '.communication-cat-adi-part2-page',
            templateUrl: 'communication.cat-adi-part2.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            Platform,
            AuthenticationProvider,
            DeviceAuthenticationProvider,
            TranslateService])
    ], CommunicationCatADIPart2Page);
    return CommunicationCatADIPart2Page;
}(BasePageComponent));
export { CommunicationCatADIPart2Page };
//# sourceMappingURL=communication.cat-adi-part2.page.js.map