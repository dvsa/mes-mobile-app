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
import { FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform, Navbar, ModalController } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { Insomnia } from '@ionic-native/insomnia';
import { TranslateService } from '@ngx-translate/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import * as waitingRoomActions from '../waiting-room.actions';
import { getPreTestDeclarations, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.reducer';
import * as preTestDeclarationsActions from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.actions';
import { getInsuranceDeclarationStatus, getResidencyDeclarationStatus, getSignatureStatus, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.selector';
import { getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestSlotAttributes, } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { isWelshTest } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { getCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage, } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CAT_CPC, ERROR_PAGE, LOGIN_PAGE } from '../../page-names.constants';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish, } from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { ErrorTypes } from '../../../shared/models/error-message';
import { App } from '../../../app/app.component';
import { DeviceProvider } from '../../../providers/device/device';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
var WaitingRoomCatCPCPage = /** @class */ (function (_super) {
    __extends(WaitingRoomCatCPCPage, _super);
    function WaitingRoomCatCPCPage(store$, navController, navParams, platform, authenticationProvider, deviceAuthenticationProvider, deviceProvider, screenOrientation, insomnia, translate, modalController, app) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.deviceAuthenticationProvider = deviceAuthenticationProvider;
        _this.deviceProvider = deviceProvider;
        _this.screenOrientation = screenOrientation;
        _this.insomnia = insomnia;
        _this.translate = translate;
        _this.modalController = modalController;
        _this.app = app;
        _this.isJournalDataInvalid = function (journalData) {
            return isEmpty(journalData.examiner.staffNumber) ||
                (isEmpty(journalData.candidate.candidateName) && isEmpty(journalData.candidate.driverNumber));
        };
        _this.formGroup = new FormGroup({});
        return _this;
    }
    WaitingRoomCatCPCPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.store$.dispatch(new waitingRoomActions.WaitingRoomViewDidEnter());
        if (_super.prototype.isIos.call(this)) {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
            this.insomnia.keepAwake();
            this.deviceProvider.enableSingleAppMode();
        }
        this.navBar.backButtonClick = function (e) {
            _this.clickBack();
        };
    };
    WaitingRoomCatCPCPage.prototype.clickBack = function () {
        var _this = this;
        this.deviceAuthenticationProvider.triggerLockScreen()
            .then(function () {
            _this.navController.pop();
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    WaitingRoomCatCPCPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            insuranceDeclarationAccepted$: currentTest$.pipe(select(getPreTestDeclarations), select(getInsuranceDeclarationStatus)),
            residencyDeclarationAccepted$: currentTest$.pipe(select(getPreTestDeclarations), select(getResidencyDeclarationStatus)),
            signature$: currentTest$.pipe(select(getPreTestDeclarations), select(getSignatureStatus)),
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateName)),
            candidateUntitledName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            candidateDriverNumber$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateDriverNumber), map(formatDriverNumber)),
            welshTest$: currentTest$.pipe(select(getJournalData), select(getTestSlotAttributes), select(isWelshTest)),
            conductedLanguage$: currentTest$.pipe(select(getCommunicationPreference), select(getConductedLanguage)),
            category$: currentTest$.pipe(select(getTestCategory)),
        };
        var _a = this.pageState, welshTest$ = _a.welshTest$, conductedLanguage$ = _a.conductedLanguage$;
        this.merged$ = merge(currentTest$.pipe(select(getJournalData), tap(function (journalData) {
            if (_this.isJournalDataInvalid(journalData)) {
                _this.showCandidateDataMissingError();
            }
        })), welshTest$, conductedLanguage$.pipe(tap(function (value) { return configureI18N(value, _this.translate); })));
    };
    WaitingRoomCatCPCPage.prototype.ionViewWillEnter = function () {
        if (this.merged$) {
            this.subscription = this.merged$.subscribe();
        }
        return true;
    };
    WaitingRoomCatCPCPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    WaitingRoomCatCPCPage.prototype.getSignatureDrawCompleteAction = function () {
        return preTestDeclarationsActions.SIGNATURE_DATA_CHANGED;
    };
    WaitingRoomCatCPCPage.prototype.getSignatureClearAction = function () {
        return preTestDeclarationsActions.SIGNATURE_DATA_CLEARED;
    };
    WaitingRoomCatCPCPage.prototype.insuranceDeclarationChanged = function () {
        this.store$.dispatch(new preTestDeclarationsActions.ToggleInsuranceDeclaration());
    };
    WaitingRoomCatCPCPage.prototype.residencyDeclarationChanged = function () {
        this.store$.dispatch(new preTestDeclarationsActions.ToggleResidencyDeclaration());
    };
    WaitingRoomCatCPCPage.prototype.dispatchCandidateChoseToProceedInWelsh = function () {
        this.store$.dispatch(new CandidateChoseToProceedWithTestInWelsh(Language.CYMRAEG));
    };
    WaitingRoomCatCPCPage.prototype.dispatchCandidateChoseToProceedInEnglish = function () {
        this.store$.dispatch(new CandidateChoseToProceedWithTestInEnglish(Language.ENGLISH));
    };
    WaitingRoomCatCPCPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.formGroup.controls).forEach(function (controlName) { return _this.formGroup.controls[controlName].markAsDirty(); });
        if (this.formGroup.valid) {
            this.navController.push(CAT_CPC.COMMUNICATION_PAGE);
        }
        else {
            Object.keys(this.formGroup.controls).forEach(function (controlName) {
                if (_this.formGroup.controls[controlName].invalid) {
                    _this.store$.dispatch(new waitingRoomActions.WaitingRoomValidationError(controlName + " is blank"));
                }
            });
        }
    };
    WaitingRoomCatCPCPage.prototype.showCandidateDataMissingError = function () {
        var _this = this;
        // Modals are at the same level as the ion-nav so are not getting the zoom level class,
        // this needs to be passed in the create options.
        var zoomClass = "modal-fullscreen " + this.app.getTextZoomClass();
        var errorModal = this.modalController.create(ERROR_PAGE, { type: ErrorTypes.JOURNAL_DATA_MISSING }, { cssClass: zoomClass });
        errorModal.present();
        errorModal.onDidDismiss(function () { return _this.navController.setRoot(LOGIN_PAGE); });
    };
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], WaitingRoomCatCPCPage.prototype, "navBar", void 0);
    WaitingRoomCatCPCPage = __decorate([
        IonicPage(),
        Component({
            selector: '.waiting-room-cat-cpc-page',
            templateUrl: 'waiting-room.cat-cpc.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            DeviceAuthenticationProvider,
            DeviceProvider,
            ScreenOrientation,
            Insomnia,
            TranslateService,
            ModalController,
            App])
    ], WaitingRoomCatCPCPage);
    return WaitingRoomCatCPCPage;
}(BasePageComponent));
export { WaitingRoomCatCPCPage };
//# sourceMappingURL=waiting-room.cat-cpc.page.js.map