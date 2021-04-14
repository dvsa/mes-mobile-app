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
import { Store } from '@ngrx/store';
import { tap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { get } from 'lodash';
import moment from 'moment';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { SearchProvider } from '../../../providers/search/search';
import { CompressionProvider } from '../../../providers/compression/compression';
import { formatApplicationReference } from '../../../shared/helpers/formatters';
import { getCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTestOutcomeText } from '../../../modules/tests/tests.selector';
import { ErrorTypes } from '../../../shared/models/error-message';
import { ViewTestResultViewDidEnter } from '../view-test-result.actions';
import { LogType } from '../../../shared/models/log.model';
import { SaveLog } from '../../../modules/logs/logs.actions';
import { LogHelper } from '../../../providers/logs/logsHelper';
import { QuestionProvider } from '../../../providers/question/question';
var ViewTestResultCatADIPart2Page = /** @class */ (function (_super) {
    __extends(ViewTestResultCatADIPart2Page, _super);
    function ViewTestResultCatADIPart2Page(navController, platform, navParams, loadingController, authenticationProvider, searchProvider, compressionProvider, store$, logHelper, questionProvider) {
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
    ViewTestResultCatADIPart2Page.prototype.ngOnInit = function () {
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
    ViewTestResultCatADIPart2Page.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ViewTestResultCatADIPart2Page.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new ViewTestResultViewDidEnter(this.applicationReference));
    };
    ViewTestResultCatADIPart2Page.prototype.getTrainerData = function () {
        if (!this.testResult) {
            return null;
        }
        return {
            orditTrainedCandidate: get(this.testResult, 'trainerDetails.orditTrainedCandidate'),
            trainingRecords: get(this.testResult, 'trainerDetails.trainingRecords'),
            trainerRegistrationNumber: get(this.testResult, 'trainerDetails.trainerRegistrationNumber'),
        };
    };
    ViewTestResultCatADIPart2Page.prototype.getCandidateDetails = function () {
        if (!this.testResult) {
            return null;
        }
        return {
            prn: get(this.testResult, 'journalData.candidate.prn'),
            attemptNumber: get(this.testResult, 'journalData.candidate.previousADITests'),
        };
    };
    ViewTestResultCatADIPart2Page.prototype.getTestDetails = function () {
        if (!this.testResult) {
            return null;
        }
        var startDate = moment(this.testResult.journalData.testSlotAttributes.start);
        var journalData = this.testResult.journalData;
        return {
            date: startDate.format('dddd Do MMMM YYYY'),
            time: startDate.format('HH:mm'),
            applicationReference: formatApplicationReference(journalData.applicationReference),
            category: "ADI2" /* ADI2 */,
            specialNeeds: journalData.testSlotAttributes.specialNeedsArray,
            entitlementCheck: journalData.testSlotAttributes.entitlementCheck,
            slotType: journalData.testSlotAttributes.slotType,
            previousCancellations: get(journalData, 'testSlotAttributes.previousCancellation', []),
        };
    };
    ViewTestResultCatADIPart2Page.prototype.getExaminerDetails = function () {
        if (!this.testResult) {
            return null;
        }
        return {
            staffNumber: this.testResult.journalData.examiner.staffNumber,
            costCode: this.testResult.journalData.testCentre.costCode,
            testCentreName: this.testResult.journalData.testCentre.centreName,
        };
    };
    ViewTestResultCatADIPart2Page.prototype.getHeaderDetails = function () {
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
    ViewTestResultCatADIPart2Page = __decorate([
        IonicPage(),
        Component({
            selector: '.view-test-result-cat-adi-part2-page',
            templateUrl: 'view-test-result.cat-adi-part2.page.html',
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
            QuestionProvider])
    ], ViewTestResultCatADIPart2Page);
    return ViewTestResultCatADIPart2Page;
}(BasePageComponent));
export { ViewTestResultCatADIPart2Page };
//# sourceMappingURL=view-test-result.cat-adi-part2.page.js.map