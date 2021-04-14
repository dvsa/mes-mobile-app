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
import { map, withLatestFrom } from 'rxjs/operators';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { CalculateTestResult, TerminateTestFromTestReport, TestReportViewDidEnter, } from '../test-report.actions';
import { getCurrentTest, getJournalData, } from '../../../modules/tests/tests.selector';
import { Competencies, LegalRequirements, ExaminerActions, } from '../../../modules/tests/test-data/test-data.constants';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestReportState } from '../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../test-report.selector';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { ModalEvent } from '../test-report.constants';
import { CAT_HOME_TEST, LEGAL_REQUIREMENTS_MODAL, SPECIAL_REQUIREMENT_MODAL } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { getCandidate } from '../../../modules/tests/journal-data/cat-home/candidate/candidate.cat-home.reducer';
import { TestDataByCategoryProvider } from '../../../providers/test-data-by-category/test-data-by-category';
import { hasManoeuvreBeenCompletedCatHomeTest, } from '../../../modules/tests/test-data/cat-home-test/test-data.cat-home.selector';
import { getTestRequirementsCatHome, } from '../../../modules/tests/test-data/cat-home-test/test-requirements/test-requirements.cat-home.reducer';
var TestReportCatHomeTestPage = /** @class */ (function (_super) {
    __extends(TestReportCatHomeTestPage, _super);
    function TestReportCatHomeTestPage(store$, navController, navParams, platform, authenticationProvider, modalController, testReportValidatorProvider, testDataByCategory) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.modalController = modalController;
        _this.testReportValidatorProvider = testReportValidatorProvider;
        _this.testDataByCategory = testDataByCategory;
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
            else if (!_this.manoeuvresCompleted && _this.testCategory !== "K" /* K */) {
                _this.modal = _this.modalController.create(SPECIAL_REQUIREMENT_MODAL, null, options);
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
                    _this.navController.push(CAT_HOME_TEST.DEBRIEF_PAGE);
                    break;
                case ModalEvent.TERMINATE:
                    _this.store$.dispatch(new TerminateTestFromTestReport());
                    _this.navController.push(CAT_HOME_TEST.DEBRIEF_PAGE);
                    break;
            }
        };
        _this.onCancel = function () {
            _this.modal.dismiss();
        };
        _this.onContinue = function () {
            _this.modal.dismiss().then(function () { return _this.navController.push(CAT_HOME_TEST.DEBRIEF_PAGE); });
        };
        _this.onTerminate = function () {
            _this.modal.dismiss().then(function () { return _this.navController.push(CAT_HOME_TEST.DEBRIEF_PAGE); });
        };
        _this.showManoeuvreButton = function () {
            return _this.testCategory !== "K" /* K */;
        };
        _this.displayOverlay = false;
        return _this;
    }
    TestReportCatHomeTestPage.prototype.getCallback = function () {
        var _this = this;
        return {
            callbackMethod: function () {
                _this.toggleReportOverlay();
            },
        };
    };
    TestReportCatHomeTestPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var category$ = currentTest$.pipe(select(getTestCategory), map(function (category) { return category; }));
        this.pageState = {
            candidateUntitledName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            isRemoveFaultMode$: this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode)),
            isSeriousMode$: this.store$.pipe(select(getTestReportState), select(isSeriousMode)),
            isDangerousMode$: this.store$.pipe(select(getTestReportState), select(isDangerousMode)),
            manoeuvres$: currentTest$.pipe(withLatestFrom(category$), map(function (_a) {
                var data = _a[0], category = _a[1];
                return _this.testDataByCategory.getTestDataByCategoryCode(category)(data);
            }), select(hasManoeuvreBeenCompletedCatHomeTest)),
            testData$: currentTest$.pipe(withLatestFrom(category$), map(function (_a) {
                var data = _a[0], category = _a[1];
                return _this.testDataByCategory.getTestDataByCategoryCode(category)(data);
            })),
            testRequirements$: currentTest$.pipe(withLatestFrom(category$), map(function (_a) {
                var data = _a[0], category = _a[1];
                return _this.testDataByCategory.getTestDataByCategoryCode(category)(data);
            }), select(getTestRequirementsCatHome)),
            testCategory$: currentTest$.pipe(select(getTestCategory)),
        };
        this.setupSubscription();
    };
    TestReportCatHomeTestPage.prototype.ionViewDidEnter = function () {
        // it is possible that we come back to the page from the terminate screen
        // so need to re-establish the subscription if it doesn't exists or is closed
        if (!this.subscription || this.subscription.closed) {
            this.setupSubscription();
        }
        this.store$.dispatch(new TestReportViewDidEnter());
    };
    TestReportCatHomeTestPage.prototype.toggleReportOverlay = function () {
        this.displayOverlay = !this.displayOverlay;
    };
    TestReportCatHomeTestPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TestReportCatHomeTestPage.prototype.setupSubscription = function () {
        var _this = this;
        var _a = this.pageState, candidateUntitledName$ = _a.candidateUntitledName$, isRemoveFaultMode$ = _a.isRemoveFaultMode$, isSeriousMode$ = _a.isSeriousMode$, isDangerousMode$ = _a.isDangerousMode$, manoeuvres$ = _a.manoeuvres$, testData$ = _a.testData$, testCategory$ = _a.testCategory$;
        this.subscription = merge(candidateUntitledName$, isRemoveFaultMode$.pipe(map(function (result) { return (_this.isRemoveFaultMode = result); })), isSeriousMode$.pipe(map(function (result) { return (_this.isSeriousMode = result); })), isDangerousMode$.pipe(map(function (result) { return (_this.isDangerousMode = result); })), manoeuvres$.pipe(map(function (result) { return (_this.manoeuvresCompleted = result); })), testCategory$.pipe(map(function (result) { return _this.testCategory = result; })), testData$.pipe(map(function (data) {
            _this.isTestReportValid =
                _this.testReportValidatorProvider.isTestReportValid(data, _this.testCategory);
            _this.missingLegalRequirements =
                _this.testReportValidatorProvider.getMissingLegalRequirements(data, _this.testCategory);
            _this.isEtaValid = _this.testReportValidatorProvider.isETAValid(data, _this.testCategory);
        }))).subscribe();
    };
    TestReportCatHomeTestPage = __decorate([
        IonicPage(),
        Component({
            selector: '.test-report-cat-home-test-page',
            templateUrl: 'test-report.cat-home-test.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            ModalController,
            TestReportValidatorProvider,
            TestDataByCategoryProvider])
    ], TestReportCatHomeTestPage);
    return TestReportCatHomeTestPage;
}(BasePageComponent));
export { TestReportCatHomeTestPage };
//# sourceMappingURL=test-report.cat-home-test.page.js.map