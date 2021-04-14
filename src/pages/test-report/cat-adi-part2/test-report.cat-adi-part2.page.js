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
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { TestReportViewDidEnter, CalculateTestResult, TerminateTestFromTestReport, } from '../test-report.actions';
import { getCurrentTest, getJournalData, } from '../../../modules/tests/tests.selector';
import { Competencies, LegalRequirements, ExaminerActions, } from '../../../modules/tests/test-data/test-data.constants';
import { getTestData } from '../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.reducer';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestReportState } from '../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../test-report.selector';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { ModalEvent } from '../test-report.constants';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { StatusBar } from '@ionic-native/status-bar';
import { CAT_ADI_PART2, LEGAL_REQUIREMENTS_MODAL } from '../../page-names.constants';
import { getManoeuvresADI2, hasManoeuvreBeenCompletedCatADIPart2, } from '../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.selector';
import { getTestRequirementsCatADI2, } from '../../../modules/tests/test-data/cat-adi-part2/test-requirements/test-requirements.cat-adi-part2.reducer';
import { BasePageComponent } from '../../../shared/classes/base-page';
var TestReportCatADIPart2Page = /** @class */ (function (_super) {
    __extends(TestReportCatADIPart2Page, _super);
    function TestReportCatADIPart2Page(store$, navController, navParams, platform, authenticationProvider, modalController, testReportValidatorProvider, screenOrientation, insomnia, statusBar) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.modalController = modalController;
        _this.testReportValidatorProvider = testReportValidatorProvider;
        _this.screenOrientation = screenOrientation;
        _this.insomnia = insomnia;
        _this.statusBar = statusBar;
        _this.competencies = Competencies;
        _this.legalRequirements = LegalRequirements;
        _this.eta = ExaminerActions;
        _this.isRemoveFaultMode = false;
        _this.isSeriousMode = false;
        _this.isDangerousMode = false;
        _this.manoeuvresCompleted = false;
        _this.isTestReportValid = false;
        _this.isEtaValid = true;
        _this.missingLegalRequirements = [];
        _this.onEndTestClick = function () {
            var options = { cssClass: 'mes-modal-alert text-zoom-regular' };
            if (!_this.isTestReportValid) {
                _this.modal = _this.modalController.create(LEGAL_REQUIREMENTS_MODAL, {
                    legalRequirements: _this.missingLegalRequirements,
                }, options);
            }
            else if (!_this.isEtaValid) {
                _this.modal = _this.modalController.create('EtaInvalidModal', {}, options);
            }
            else {
                _this.modal = _this.modalController.create('EndTestModal', {}, options);
            }
            _this.modal.onDidDismiss(_this.onModalDismiss);
            _this.modal.present();
        };
        _this.onModalDismiss = function (event) {
            switch (event) {
                case ModalEvent.CONTINUE:
                    _this.store$.dispatch(new CalculateTestResult());
                    _this.navController.push(CAT_ADI_PART2.DEBRIEF_PAGE);
                    break;
                case ModalEvent.TERMINATE:
                    _this.store$.dispatch(new TerminateTestFromTestReport());
                    _this.navController.push(CAT_ADI_PART2.DEBRIEF_PAGE);
                    break;
            }
        };
        _this.onCancel = function () {
            _this.modal.dismiss();
        };
        _this.onContinue = function () {
            _this.modal.dismiss().then(function () { return _this.navController.push(CAT_ADI_PART2.DEBRIEF_PAGE); });
        };
        _this.onTerminate = function () {
            _this.modal.dismiss().then(function () { return _this.navController.push(CAT_ADI_PART2.DEBRIEF_PAGE); });
        };
        _this.displayOverlay = false;
        return _this;
    }
    TestReportCatADIPart2Page.prototype.ngOnInit = function () {
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateUntitledName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            isRemoveFaultMode$: this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode)),
            isSeriousMode$: this.store$.pipe(select(getTestReportState), select(isSeriousMode)),
            isDangerousMode$: this.store$.pipe(select(getTestReportState), select(isDangerousMode)),
            manoeuvres$: currentTest$.pipe(select(getTestData), select(getManoeuvresADI2), select(hasManoeuvreBeenCompletedCatADIPart2)),
            testData$: currentTest$.pipe(select(getTestData)),
            testRequirements$: currentTest$.pipe(select(getTestData), select(getTestRequirementsCatADI2)),
        };
        this.setupSubscription();
    };
    TestReportCatADIPart2Page.prototype.ionViewDidEnter = function () {
        // it is possible that we come back to the page from the terminate screen
        // so need to re-establish the subscription if it doesn't exists or is closed
        if (!this.subscription || this.subscription.closed) {
            this.setupSubscription();
        }
        this.store$.dispatch(new TestReportViewDidEnter());
    };
    TestReportCatADIPart2Page.prototype.getCallback = function () {
        var _this = this;
        return {
            callbackMethod: function () {
                _this.toggleReportOverlay();
            },
        };
    };
    TestReportCatADIPart2Page.prototype.toggleReportOverlay = function () {
        this.displayOverlay = !this.displayOverlay;
    };
    TestReportCatADIPart2Page.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TestReportCatADIPart2Page.prototype.setupSubscription = function () {
        var _this = this;
        var _a = this.pageState, candidateUntitledName$ = _a.candidateUntitledName$, isRemoveFaultMode$ = _a.isRemoveFaultMode$, isSeriousMode$ = _a.isSeriousMode$, isDangerousMode$ = _a.isDangerousMode$, manoeuvres$ = _a.manoeuvres$, testData$ = _a.testData$;
        this.subscription = merge(candidateUntitledName$, isRemoveFaultMode$.pipe(map(function (result) { return (_this.isRemoveFaultMode = result); })), isSeriousMode$.pipe(map(function (result) { return (_this.isSeriousMode = result); })), isDangerousMode$.pipe(map(function (result) { return (_this.isDangerousMode = result); })), manoeuvres$.pipe(map(function (result) { return (_this.manoeuvresCompleted = result); })), testData$.pipe(map(function (data) {
            _this.isTestReportValid =
                _this.testReportValidatorProvider.isTestReportValid(data, "ADI2" /* ADI2 */);
            _this.missingLegalRequirements =
                _this.testReportValidatorProvider.getMissingLegalRequirements(data, "ADI2" /* ADI2 */);
            _this.isEtaValid = _this.testReportValidatorProvider.isETAValid(data, "ADI2" /* ADI2 */);
        }))).subscribe();
    };
    TestReportCatADIPart2Page = __decorate([
        IonicPage(),
        Component({
            selector: '.test-report-cat-adi-part2-page',
            templateUrl: 'test-report.cat-adi-part2.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            ModalController,
            TestReportValidatorProvider,
            ScreenOrientation,
            Insomnia,
            StatusBar])
    ], TestReportCatADIPart2Page);
    return TestReportCatADIPart2Page;
}(BasePageComponent));
export { TestReportCatADIPart2Page };
//# sourceMappingURL=test-report.cat-adi-part2.page.js.map