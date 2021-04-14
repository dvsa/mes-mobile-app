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
import { IonicPage, NavController, NavParams, Platform, LoadingController, } from 'ionic-angular';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { SearchProvider } from '../../../providers/search/search';
import { tap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CompressionProvider } from '../../../providers/compression/compression';
import { formatApplicationReference } from '../../../shared/helpers/formatters';
import { getCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTestOutcomeText } from '../../../modules/tests/tests.selector';
import { manoeuvreTypeLabels, } from '../../../shared/constants/competencies/catb-manoeuvres';
import { get } from 'lodash';
import { Store } from '@ngrx/store';
import { ErrorTypes } from '../../../shared/models/error-message';
import { ViewTestResultViewDidEnter } from '../view-test-result.actions';
import { LogType } from '../../../shared/models/log.model';
import { SaveLog } from '../../../modules/logs/logs.actions';
import { LogHelper } from '../../../providers/logs/logsHelper';
import { QuestionProvider } from '../../../providers/question/question';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import moment from 'moment';
var ViewTestResultCatBPage = /** @class */ (function (_super) {
    __extends(ViewTestResultCatBPage, _super);
    function ViewTestResultCatBPage(navController, platform, navParams, loadingController, authenticationProvider, searchProvider, compressionProvider, store$, logHelper, questionProvider, faultCountProvider, faultSummaryProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.navController = navController;
        _this.platform = platform;
        _this.navParams = navParams;
        _this.loadingController = loadingController;
        _this.authenticationProvider = authenticationProvider;
        _this.searchProvider = searchProvider;
        _this.compressionProvider = compressionProvider;
        _this.store$ = store$;
        _this.logHelper = logHelper;
        _this.questionProvider = questionProvider;
        _this.faultCountProvider = faultCountProvider;
        _this.faultSummaryProvider = faultSummaryProvider;
        _this.applicationReference = '';
        _this.showErrorMessage = false;
        _this.handleLoadingUI = function (isLoading) {
            _this.isLoading = isLoading;
            if (isLoading) {
                _this.loadingSpinner = _this.loadingController.create({
                    dismissOnPageChange: true,
                    spinner: 'circles',
                });
                _this.loadingSpinner.present();
                return;
            }
            if (_this.loadingSpinner) {
                _this.loadingSpinner.dismiss();
                _this.loadingSpinner = null;
            }
        };
        // on exit error modal
        _this.goBack = function () {
            _this.navController.pop();
        };
        _this.applicationReference = navParams.get('applicationReference');
        return _this;
    }
    ViewTestResultCatBPage.prototype.ngOnInit = function () {
        var _this = this;
        this.handleLoadingUI(true);
        this.subscription = this.searchProvider
            .getTestResult(this.applicationReference, this.authenticationProvider.getEmployeeId())
            .pipe(map(function (response) { return response.body; }), map(function (data) { return _this.testResult = _this.compressionProvider.extractTestResult(data); }), tap(function () { return _this.handleLoadingUI(false); }), catchError(function (err) {
            _this.store$.dispatch(new SaveLog(_this.logHelper
                .createLog(LogType.ERROR, "Getting test result for app ref (" + _this.applicationReference + ")", err)));
            _this.errorLink = ErrorTypes.SEARCH_RESULT;
            _this.additionalErrorText = true;
            _this.showErrorMessage = true;
            _this.handleLoadingUI(false);
            return of();
        })).subscribe();
    };
    ViewTestResultCatBPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ViewTestResultCatBPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new ViewTestResultViewDidEnter(this.applicationReference));
    };
    ViewTestResultCatBPage.prototype.getTestDetails = function () {
        if (!this.testResult) {
            return null;
        }
        var startDate = moment(this.testResult.journalData.testSlotAttributes.start);
        return {
            date: startDate.format('dddd Do MMMM YYYY'),
            time: startDate.format('HH:mm'),
            applicationReference: formatApplicationReference(this.testResult.journalData.applicationReference),
            category: this.testResult.category,
            specialNeeds: this.testResult.journalData.testSlotAttributes.specialNeedsArray,
            entitlementCheck: this.testResult.journalData.testSlotAttributes.entitlementCheck,
            slotType: this.testResult.journalData.testSlotAttributes.slotType,
            previousCancellations: get(this.testResult, 'journalData.testSlotAttributes.previousCancellation', []),
        };
    };
    ViewTestResultCatBPage.prototype.getExaminerDetails = function () {
        if (!this.testResult) {
            return null;
        }
        return {
            staffNumber: this.testResult.journalData.examiner.staffNumber,
            costCode: this.testResult.journalData.testCentre.costCode,
            testCentreName: this.testResult.journalData.testCentre.centreName,
        };
    };
    ViewTestResultCatBPage.prototype.getVehicleDetails = function () {
        if (!this.testResult) {
            return null;
        }
        var vehicleInfomation = [];
        if (get(this.testResult, 'vehicleDetails.dualControls')) {
            vehicleInfomation.push('Dual controls');
        }
        if (get(this.testResult, 'vehicleDetails.schoolCar')) {
            vehicleInfomation.push('School car');
        }
        return {
            transmission: get(this.testResult, 'vehicleDetails.gearboxCategory'),
            registrationNumber: get(this.testResult, 'vehicleDetails.registrationNumber'),
            instructorRegistrationNumber: get(this.testResult, 'instructorDetails.registrationNumber'),
            vehicleDetails: vehicleInfomation,
        };
    };
    ViewTestResultCatBPage.prototype.getHeaderDetails = function () {
        if (!this.testResult) {
            return null;
        }
        return {
            candidateName: getCandidateName(this.testResult.journalData.candidate),
            candidateDriverNumber: this.testResult.journalData.candidate.driverNumber,
            activityCode: this.testResult.activityCode,
            testOutcome: getTestOutcomeText(this.testResult),
        };
    };
    ViewTestResultCatBPage.prototype.getDebrief = function () {
        if (!this.testResult) {
            return null;
        }
        return {
            legalRequirements: get(this.testResult, 'testData.testRequirements'),
            manoeuvres: this.getManoeuvres(),
            controlledStop: get(this.testResult, 'testData.controlledStop.selected'),
            ecoControl: get(this.testResult, 'testData.eco.adviceGivenControl'),
            ecoPlanning: get(this.testResult, 'testData.eco.adviceGivenPlanning'),
            eta: this.getETA(),
            showMeQuestion: this.getShowMeQuestion(),
            tellMeQuestion: this.getTellMeQuestion(),
            dangerousFaults: this.getDangerousFaults(),
            seriousFaults: this.getSeriousFaults(),
            drivingFaults: this.getDrivingFaults(),
            drivingFaultCount: this.faultCountProvider.getDrivingFaultSumCount(this.testResult.category, this.testResult.testData),
        };
    };
    ViewTestResultCatBPage.prototype.getManoeuvres = function () {
        var manoeuvres = [];
        if (get(this.testResult, 'testData.manoeuvres.forwardPark.selected')) {
            manoeuvres.push(manoeuvreTypeLabels.forwardPark);
        }
        if (get(this.testResult, 'testData.manoeuvres.reverseParkCarpark.selected')) {
            manoeuvres.push(manoeuvreTypeLabels.reverseParkCarpark);
        }
        if (get(this.testResult, 'testData.manoeuvres.reverseParkRoad.selected')) {
            manoeuvres.push(manoeuvreTypeLabels.reverseParkRoad);
        }
        if (get(this.testResult, 'testData.manoeuvres.reverseRight.selected')) {
            manoeuvres.push(manoeuvreTypeLabels.reverseRight);
        }
        if (manoeuvres.length === 0) {
            manoeuvres.push('None');
        }
        return manoeuvres;
    };
    ViewTestResultCatBPage.prototype.getETA = function () {
        var eta = [];
        if (get(this.testResult, 'testData.ETA.physical')) {
            eta.push('Physical');
        }
        if (get(this.testResult, 'testData.ETA.verbal')) {
            eta.push('Verbal');
        }
        if (eta.length === 0) {
            eta.push('None');
        }
        return eta;
    };
    ViewTestResultCatBPage.prototype.getShowMeQuestion = function () {
        var showMeQuestionCode = get(this.testResult, 'testData.vehicleChecks.showMeQuestion.code');
        return this.questionProvider
            .getShowMeQuestions(this.testResult.category)
            .find(function (question) { return question.code === showMeQuestionCode; });
    };
    ViewTestResultCatBPage.prototype.getTellMeQuestion = function () {
        var tellMeQuestionCode = get(this.testResult, 'testData.vehicleChecks.tellMeQuestion.code');
        return this.questionProvider
            .getTellMeQuestions(this.testResult.category)
            .find(function (question) { return question.code === tellMeQuestionCode; });
    };
    ViewTestResultCatBPage.prototype.getDangerousFaults = function () {
        var testData = get(this.testResult, 'testData');
        return this.faultSummaryProvider.getDangerousFaultsList(testData, "B" /* B */);
    };
    ViewTestResultCatBPage.prototype.getSeriousFaults = function () {
        var testData = get(this.testResult, 'testData');
        return this.faultSummaryProvider.getSeriousFaultsList(testData, "B" /* B */);
    };
    ViewTestResultCatBPage.prototype.getDrivingFaults = function () {
        var testData = get(this.testResult, 'testData');
        return this.faultSummaryProvider.getDrivingFaultsList(testData, "B" /* B */);
    };
    ViewTestResultCatBPage = __decorate([
        IonicPage(),
        Component({
            selector: '.view-test-result-cat-b-page',
            templateUrl: 'view-test-result.cat-b.page.html',
        }),
        __metadata("design:paramtypes", [NavController,
            Platform,
            NavParams,
            LoadingController,
            AuthenticationProvider,
            SearchProvider,
            CompressionProvider,
            Store,
            LogHelper,
            QuestionProvider,
            FaultCountProvider,
            FaultSummaryProvider])
    ], ViewTestResultCatBPage);
    return ViewTestResultCatBPage;
}(BasePageComponent));
export { ViewTestResultCatBPage };
//# sourceMappingURL=view-test-result.cat-b.page.js.map