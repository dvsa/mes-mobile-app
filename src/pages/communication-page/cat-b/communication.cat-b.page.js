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
import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
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
import { CAT_B } from '../../page-names.constants';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
var CommunicationCatBPage = /** @class */ (function (_super) {
    __extends(CommunicationCatBPage, _super);
    function CommunicationCatBPage(store$, navController, platform, authenticationProvider, deviceAuthenticationProvider, translate) {
        var _this = _super.call(this, platform, navController, authenticationProvider, store$) || this;
        _this.navController = navController;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.deviceAuthenticationProvider = deviceAuthenticationProvider;
        _this.translate = translate;
        _this.form = new FormGroup(_this.getFormValidation());
        return _this;
    }
    CommunicationCatBPage_1 = CommunicationCatBPage;
    CommunicationCatBPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.store$.dispatch(new CommunicationViewDidEnter());
        this.navBar.backButtonClick = function (e) {
            _this.clickBack();
        };
    };
    CommunicationCatBPage.prototype.clickBack = function () {
        this.navController.pop();
    };
    CommunicationCatBPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
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
    CommunicationCatBPage.prototype.ionViewWillEnter = function () {
        if (this.subscription.closed && this.merged$) {
            this.subscription = this.merged$.subscribe();
        }
        return true;
    };
    CommunicationCatBPage.prototype.ionViewDidLeave = function () {
        _super.prototype.ionViewDidLeave.call(this);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    CommunicationCatBPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.deviceAuthenticationProvider.triggerLockScreen()
                .then(function () {
                _this.store$.dispatch(new CommunicationSubmitInfo());
                _this.navController.push(CAT_B.WAITING_ROOM_TO_CAR_PAGE)
                    .then(function () {
                    var waitingRoomPage = _this.navController.getViews().find(function (view) { return view.id === CAT_B.WAITING_ROOM_PAGE; });
                    if (waitingRoomPage) {
                        _this.navController.removeView(waitingRoomPage);
                    }
                    var communicationPage = _this.navController.getViews().find(function (view) { return view.id === CAT_B.COMMUNICATION_PAGE; });
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
    CommunicationCatBPage.prototype.dispatchCandidateChoseProvidedEmail = function () {
        this.setCommunicationType(CommunicationCatBPage_1.email, CommunicationCatBPage_1.providedEmail);
        this.store$.dispatch(new CandidateChoseEmailAsCommunicationPreference(this.candidateProvidedEmail, CommunicationCatBPage_1.email));
    };
    CommunicationCatBPage.prototype.dispatchCandidateChoseNewEmail = function (communicationEmail) {
        this.store$.dispatch(new CandidateChoseEmailAsCommunicationPreference(communicationEmail, CommunicationCatBPage_1.email));
    };
    CommunicationCatBPage.prototype.setCommunicationType = function (communicationChoice, emailType) {
        if (emailType === void 0) { emailType = null; }
        this.communicationType = communicationChoice;
        this.emailType = emailType;
        this.verifyNewEmailFormControl(communicationChoice);
    };
    CommunicationCatBPage.prototype.isProvidedEmailSelected = function () {
        return (this.communicationType === CommunicationCatBPage_1.email
            && this.emailType === CommunicationCatBPage_1.providedEmail);
    };
    CommunicationCatBPage.prototype.isNewEmailSelected = function () {
        return (this.communicationType === CommunicationCatBPage_1.email
            && this.emailType === CommunicationCatBPage_1.updatedEmail);
    };
    CommunicationCatBPage.prototype.isPostSelected = function () {
        return this.communicationType === CommunicationCatBPage_1.post;
    };
    CommunicationCatBPage.prototype.dispatchCandidateChosePost = function () {
        this.setCommunicationType(CommunicationCatBPage_1.post);
        this.store$.dispatch(new CandidateChosePostAsCommunicationPreference(CommunicationCatBPage_1.post));
    };
    CommunicationCatBPage.prototype.getFormValidation = function () {
        return {
            radioCtrl: new FormControl('', Validators.required),
        };
    };
    /**
     * Facade function which dictates which radio value to reselect when rehydrating from state.
     *
     * No current schema properties allow for the capture of radio selection for emails on the communication page.
     */
    CommunicationCatBPage.prototype.restoreRadiosFromState = function () {
        if (this.communicationType === CommunicationCatBPage_1.email) {
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
    CommunicationCatBPage.prototype.assertEmailType = function () {
        if (this.candidateProvidedEmail !== '' && this.candidateProvidedEmail === this.communicationEmail) {
            this.selectProvidedEmail = true;
            this.selectNewEmail = false;
            this.emailType = CommunicationCatBPage_1.providedEmail;
        }
        if (this.candidateProvidedEmail !== this.communicationEmail) {
            this.selectNewEmail = true;
            this.selectProvidedEmail = false;
            this.emailType = CommunicationCatBPage_1.updatedEmail;
        }
    };
    CommunicationCatBPage.prototype.restoreRadioValidators = function () {
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
    CommunicationCatBPage.prototype.initialiseDefaultSelections = function () {
        this.communicationType = CommunicationCatBPage_1.email;
        if (this.candidateProvidedEmail) {
            this.emailType = CommunicationCatBPage_1.providedEmail;
            this.selectProvidedEmail = true;
            this.form.controls['radioCtrl'].setValue(true);
            this.dispatchCandidateChoseProvidedEmail();
        }
        if (!this.candidateProvidedEmail) {
            this.emailType = CommunicationCatBPage_1.updatedEmail;
            this.selectNewEmail = true;
            this.selectProvidedEmail = false;
            this.form.controls['radioCtrl'].setValue(true);
        }
    };
    CommunicationCatBPage.prototype.verifyNewEmailFormControl = function (communicationChoice) {
        var newEmailCtrl = this.form.get('newEmailCtrl');
        if (newEmailCtrl !== null) {
            if (communicationChoice !== CommunicationCatBPage_1.email
                || this.emailType === CommunicationCatBPage_1.providedEmail) {
                newEmailCtrl.clearValidators();
            }
            else {
                newEmailCtrl.setValidators(Validators.email);
            }
            newEmailCtrl.updateValueAndValidity();
        }
    };
    CommunicationCatBPage.prototype.shouldPreselectADefaultValue = function () {
        return this.communicationType === CommunicationCatBPage_1.notProvided;
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
    CommunicationCatBPage.prototype.conditionalDispatchCandidateChoseNewEmail = function () {
        this.setCommunicationType(CommunicationCatBPage_1.email, CommunicationCatBPage_1.updatedEmail);
        if (this.isNewEmailSelected() && this.communicationEmail !== '') {
            this.dispatchCandidateChoseNewEmail(this.communicationEmail);
        }
    };
    CommunicationCatBPage.prototype.getNewEmailAddressValue = function () {
        return this.candidateProvidedEmail === this.communicationEmail ? '' : this.communicationEmail;
    };
    var CommunicationCatBPage_1;
    CommunicationCatBPage.providedEmail = 'Provided';
    CommunicationCatBPage.updatedEmail = 'Updated';
    CommunicationCatBPage.email = 'Email';
    CommunicationCatBPage.post = 'Post';
    CommunicationCatBPage.notProvided = 'Not provided';
    CommunicationCatBPage.welshLanguage = 'Cymraeg';
    CommunicationCatBPage.englishLanguage = 'English';
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], CommunicationCatBPage.prototype, "navBar", void 0);
    CommunicationCatBPage = CommunicationCatBPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: '.communication-cat-b-page',
            templateUrl: 'communication.cat-b.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            Platform,
            AuthenticationProvider,
            DeviceAuthenticationProvider,
            TranslateService])
    ], CommunicationCatBPage);
    return CommunicationCatBPage;
}(PracticeableBasePageComponent));
export { CommunicationCatBPage };
//# sourceMappingURL=communication.cat-b.page.js.map