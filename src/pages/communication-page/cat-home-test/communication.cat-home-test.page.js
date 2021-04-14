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
import { IonicPage, Navbar, NavController, Platform } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import { TranslateService } from '@ngx-translate/core';
import { CommunicationSubmitInfo, CommunicationSubmitInfoError, CommunicationValidationError, CommunicationViewDidEnter, } from '../communication.actions';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { formatDriverNumber, getCandidateDriverNumber, getCandidateEmailAddress, getCandidateName, getPostalAddress, getUntitledCandidateName, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { map, take, tap } from 'rxjs/operators';
import { getCommunicationPreference } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getCommunicationPreferenceType, getCommunicationPreferenceUpdatedEmail, getConductedLanguage, } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { merge } from 'rxjs/observable/merge';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { CAT_HOME_TEST } from '../../page-names.constants';
import { CandidateChoseEmailAsCommunicationPreference, CandidateChosePostAsCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
var CommunicationCatHomeTestPage = /** @class */ (function (_super) {
    __extends(CommunicationCatHomeTestPage, _super);
    function CommunicationCatHomeTestPage(store$, navController, platform, authenticationProvider, deviceAuthenticationProvider, translate) {
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
    CommunicationCatHomeTestPage_1 = CommunicationCatHomeTestPage;
    CommunicationCatHomeTestPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.store$.dispatch(new CommunicationViewDidEnter());
        this.navBar.backButtonClick = function (e) {
            _this.clickBack();
        };
    };
    CommunicationCatHomeTestPage.prototype.clickBack = function () {
        this.navController.pop();
    };
    CommunicationCatHomeTestPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var candidate$ = currentTest$.pipe(select(getJournalData), select(getCandidate));
        this.pageState = {
            candidateName$: candidate$.pipe(select(getCandidateName)),
            candidateUntitledName$: candidate$.pipe(select(getUntitledCandidateName)),
            candidateDriverNumber$: candidate$.pipe(select(getCandidateDriverNumber), map(formatDriverNumber)),
            candidateProvidedEmail$: candidate$.pipe(select(getCandidateEmailAddress), take(1)),
            communicationEmail$: currentTest$.pipe(select(getCommunicationPreference), select(getCommunicationPreferenceUpdatedEmail)),
            communicationType$: currentTest$.pipe(select(getCommunicationPreference), select(getCommunicationPreferenceType)),
            candidateAddress$: candidate$.pipe(select(getPostalAddress)),
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
    CommunicationCatHomeTestPage.prototype.ionViewWillEnter = function () {
        if (this.subscription.closed && this.merged$) {
            this.subscription = this.merged$.subscribe();
        }
        return true;
    };
    CommunicationCatHomeTestPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    CommunicationCatHomeTestPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.deviceAuthenticationProvider.triggerLockScreen()
                .then(function () {
                _this.store$.dispatch(new CommunicationSubmitInfo());
                _this.navController.push(CAT_HOME_TEST.WAITING_ROOM_TO_CAR_PAGE)
                    .then(function () {
                    var waitingRoomPage = _this.navController.getViews()
                        .find(function (view) { return view.id === CAT_HOME_TEST.WAITING_ROOM_PAGE; });
                    if (waitingRoomPage) {
                        _this.navController.removeView(waitingRoomPage);
                    }
                    var communicationPage = _this.navController.getViews().find(function (view) { return view.id === CAT_HOME_TEST.COMMUNICATION_PAGE; });
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
    CommunicationCatHomeTestPage.prototype.dispatchCandidateChoseProvidedEmail = function () {
        this.setCommunicationType(CommunicationCatHomeTestPage_1.email, CommunicationCatHomeTestPage_1.providedEmail);
        this.store$.dispatch(new CandidateChoseEmailAsCommunicationPreference(this.candidateProvidedEmail, CommunicationCatHomeTestPage_1.email));
    };
    CommunicationCatHomeTestPage.prototype.dispatchCandidateChoseNewEmail = function (communicationEmail) {
        this.store$.dispatch(new CandidateChoseEmailAsCommunicationPreference(communicationEmail, CommunicationCatHomeTestPage_1.email));
    };
    CommunicationCatHomeTestPage.prototype.setCommunicationType = function (communicationChoice, emailType) {
        if (emailType === void 0) { emailType = null; }
        this.communicationType = communicationChoice;
        this.emailType = emailType;
        this.verifyNewEmailFormControl(communicationChoice);
    };
    CommunicationCatHomeTestPage.prototype.isProvidedEmailSelected = function () {
        return (this.communicationType === CommunicationCatHomeTestPage_1.email
            && this.emailType === CommunicationCatHomeTestPage_1.providedEmail);
    };
    CommunicationCatHomeTestPage.prototype.isNewEmailSelected = function () {
        return (this.communicationType === CommunicationCatHomeTestPage_1.email
            && this.emailType === CommunicationCatHomeTestPage_1.updatedEmail);
    };
    CommunicationCatHomeTestPage.prototype.isPostSelected = function () {
        return this.communicationType === CommunicationCatHomeTestPage_1.post;
    };
    CommunicationCatHomeTestPage.prototype.dispatchCandidateChosePost = function () {
        this.setCommunicationType(CommunicationCatHomeTestPage_1.post);
        this.store$.dispatch(new CandidateChosePostAsCommunicationPreference(CommunicationCatHomeTestPage_1.post));
    };
    CommunicationCatHomeTestPage.prototype.getFormValidation = function () {
        return {
            radioCtrl: new FormControl('', Validators.required),
        };
    };
    /**
     * Facade function which dictates which radio value to reselect when rehydrating from state.
     *
     * No current schema properties allow for the capture of radio selection for emails on the communication page.
     */
    CommunicationCatHomeTestPage.prototype.restoreRadiosFromState = function () {
        if (this.communicationType === CommunicationCatHomeTestPage_1.email) {
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
    CommunicationCatHomeTestPage.prototype.assertEmailType = function () {
        if (this.candidateProvidedEmail !== '' && this.candidateProvidedEmail === this.communicationEmail) {
            this.selectProvidedEmail = true;
            this.selectNewEmail = false;
            this.emailType = CommunicationCatHomeTestPage_1.providedEmail;
        }
        if (this.candidateProvidedEmail !== this.communicationEmail) {
            this.selectNewEmail = true;
            this.selectProvidedEmail = false;
            this.emailType = CommunicationCatHomeTestPage_1.updatedEmail;
        }
    };
    CommunicationCatHomeTestPage.prototype.restoreRadioValidators = function () {
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
    CommunicationCatHomeTestPage.prototype.initialiseDefaultSelections = function () {
        this.communicationType = CommunicationCatHomeTestPage_1.email;
        if (this.candidateProvidedEmail) {
            this.emailType = CommunicationCatHomeTestPage_1.providedEmail;
            this.selectProvidedEmail = true;
            this.form.controls['radioCtrl'].setValue(true);
            this.dispatchCandidateChoseProvidedEmail();
        }
        if (!this.candidateProvidedEmail) {
            this.emailType = CommunicationCatHomeTestPage_1.updatedEmail;
            this.selectNewEmail = true;
            this.selectProvidedEmail = false;
            this.form.controls['radioCtrl'].setValue(true);
        }
    };
    CommunicationCatHomeTestPage.prototype.verifyNewEmailFormControl = function (communicationChoice) {
        var newEmailCtrl = this.form.get('newEmailCtrl');
        if (newEmailCtrl !== null) {
            if (communicationChoice !== CommunicationCatHomeTestPage_1.email
                || this.emailType === CommunicationCatHomeTestPage_1.providedEmail) {
                newEmailCtrl.clearValidators();
            }
            else {
                newEmailCtrl.setValidators(Validators.email);
            }
            newEmailCtrl.updateValueAndValidity();
        }
    };
    CommunicationCatHomeTestPage.prototype.shouldPreselectADefaultValue = function () {
        return this.communicationType === CommunicationCatHomeTestPage_1.notProvided;
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
    CommunicationCatHomeTestPage.prototype.conditionalDispatchCandidateChoseNewEmail = function () {
        this.setCommunicationType(CommunicationCatHomeTestPage_1.email, CommunicationCatHomeTestPage_1.updatedEmail);
        if (this.isNewEmailSelected() && this.communicationEmail !== '') {
            this.dispatchCandidateChoseNewEmail(this.communicationEmail);
        }
    };
    CommunicationCatHomeTestPage.prototype.getNewEmailAddressValue = function () {
        return this.candidateProvidedEmail === this.communicationEmail ? '' : this.communicationEmail;
    };
    var CommunicationCatHomeTestPage_1;
    CommunicationCatHomeTestPage.providedEmail = 'Provided';
    CommunicationCatHomeTestPage.updatedEmail = 'Updated';
    CommunicationCatHomeTestPage.email = 'Email';
    CommunicationCatHomeTestPage.post = 'Post';
    CommunicationCatHomeTestPage.notProvided = 'Not provided';
    CommunicationCatHomeTestPage.welshLanguage = 'Cymraeg';
    CommunicationCatHomeTestPage.englishLanguage = 'English';
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], CommunicationCatHomeTestPage.prototype, "navBar", void 0);
    CommunicationCatHomeTestPage = CommunicationCatHomeTestPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: '.communication-cat-home-test-page',
            templateUrl: 'communication.cat-home-test.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            Platform,
            AuthenticationProvider,
            DeviceAuthenticationProvider,
            TranslateService])
    ], CommunicationCatHomeTestPage);
    return CommunicationCatHomeTestPage;
}(BasePageComponent));
export { CommunicationCatHomeTestPage };
//# sourceMappingURL=communication.cat-home-test.page.js.map