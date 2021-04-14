var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { UrlProvider } from '../url/url';
import { HttpClient } from '@angular/common/http';
import { gzipSync } from 'zlib';
import { catchError, timeout } from 'rxjs/operators';
import { isNull, unset, isObject, cloneDeep } from 'lodash';
import { Store } from '@ngrx/store';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogType } from '../../shared/models/log.model';
import { LogHelper } from '../logs/logsHelper';
import { AppConfigProvider } from '../app-config/app-config';
import { TestStatus } from '../../modules/tests/test-status/test-status.model';
import { ActivityCodes } from '../../shared/models/activity-codes';
var TestSubmissionProvider = /** @class */ (function () {
    function TestSubmissionProvider(httpClient, urlProvider, store$, logHelper, appConfig) {
        var _this = this;
        this.httpClient = httpClient;
        this.urlProvider = urlProvider;
        this.store$ = store$;
        this.logHelper = logHelper;
        this.appConfig = appConfig;
        this.submitTests = function (testsToSubmit) {
            var requests = testsToSubmit.map(function (test) { return _this.submitTest(test); });
            return forkJoin(requests);
        };
        this.submitTest = function (testToSubmit) {
            // Using cloneDeep() to prevent the initialState of the reducers from being modified
            var deepClonedData = cloneDeep(testToSubmit.payload);
            var cleanData = _this.removeNullFieldsDeep(_this.removePassCompletionWhenTestIsNotPass(_this.isPartialSubmission(testToSubmit)
                ? _this.removeFieldsForPartialData(deepClonedData)
                : deepClonedData));
            return _this.httpClient.post(_this.buildUrl(testToSubmit), _this.compressData(cleanData), { observe: 'response' })
                // Note: Catching failures here (the inner observable) is what allows us to coordinate
                // subsequent success/fail actions in sendCompletedTestsEffect$ (the outer observable)
                .pipe(timeout(_this.appConfig.getAppConfig().requestTimeout), catchError(function (err) {
                _this.store$.dispatch(new SaveLog(_this.logHelper
                    .createLog(LogType.ERROR, "Submitting test with slot ID " + testToSubmit.slotId, err.message)));
                return of(err);
            }));
        };
        this.buildUrl = function (testToSubmit) {
            return "" + _this.urlProvider.getTestResultServiceUrl() + (_this.isPartialSubmission(testToSubmit) ? '?partial=true' : '');
        };
        this.compressData = function (data) {
            return gzipSync(JSON.stringify(data)).toString('base64');
        };
        this.removeNullFieldsDeep = function (data) {
            var removeNullFields = function (object) {
                Object.keys(object).forEach(function (key) {
                    var value = object[key];
                    if (isNull(value))
                        unset(object, key);
                    if (isObject(value))
                        removeNullFields(value);
                });
                return object;
            };
            return removeNullFields(data);
        };
        // NOTE debrief witnessed and D255 should not be removed
        this.removeFieldsForPartialData = function (data) {
            Object.keys(data.testSummary).map(function (key) {
                if (key !== 'debriefWitnessed' && key !== 'D255') {
                    data.testSummary[key] = null;
                }
            });
            return data;
        };
        this.removePassCompletionWhenTestIsNotPass = function (data) {
            if (data.activityCode !== ActivityCodes.PASS) {
                unset(data, 'passCompletion');
            }
            return data;
        };
    }
    TestSubmissionProvider.prototype.isPartialSubmission = function (testToSubmit) {
        return testToSubmit.status === TestStatus.WriteUp && !testToSubmit.payload.rekey;
    };
    TestSubmissionProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            UrlProvider,
            Store,
            LogHelper,
            AppConfigProvider])
    ], TestSubmissionProvider);
    return TestSubmissionProvider;
}());
export { TestSubmissionProvider };
//# sourceMappingURL=test-submission.js.map