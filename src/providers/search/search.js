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
import { HttpClient } from '@angular/common/http';
import { UrlProvider } from '../url/url';
import { timeout } from 'rxjs/operators';
import { AppConfigProvider } from '../app-config/app-config';
var SearchProvider = /** @class */ (function () {
    function SearchProvider(http, urlProvider, appConfig) {
        this.http = http;
        this.urlProvider = urlProvider;
        this.appConfig = appConfig;
    }
    SearchProvider.prototype.driverNumberSearch = function (driverNumber) {
        return this.http.get(this.urlProvider.getTestResultServiceUrl(), {
            params: {
                driverNumber: driverNumber,
            },
        }).pipe(timeout(this.appConfig.getAppConfig().requestTimeout));
    };
    SearchProvider.prototype.applicationReferenceSearch = function (applicationReference) {
        return this.http.get(this.urlProvider.getTestResultServiceUrl(), {
            params: {
                applicationReference: applicationReference,
            },
        }).pipe(timeout(this.appConfig.getAppConfig().requestTimeout));
    };
    SearchProvider.prototype.advancedSearch = function (advancedSearchParams) {
        return this.http.get(this.urlProvider.getTestResultServiceUrl(), {
            params: {
                startDate: advancedSearchParams.startDate,
                endDate: advancedSearchParams.endDate,
                staffNumber: advancedSearchParams.staffNumber,
                dtcCode: advancedSearchParams.costCode,
                excludeAutoSavedTests: advancedSearchParams.excludeAutoSavedTests,
            },
        }).pipe(timeout(this.appConfig.getAppConfig().requestTimeout));
    };
    SearchProvider.prototype.getTestResult = function (applicationReference, staffNumber) {
        return this.http.get(this.urlProvider.getTestResultServiceUrl().concat("/" + applicationReference + "/" + staffNumber), { observe: 'response' }).pipe(timeout(this.appConfig.getAppConfig().requestTimeout));
    };
    SearchProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            UrlProvider,
            AppConfigProvider])
    ], SearchProvider);
    return SearchProvider;
}());
export { SearchProvider };
//# sourceMappingURL=search.js.map