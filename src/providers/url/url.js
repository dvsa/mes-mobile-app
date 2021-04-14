var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AppConfigProvider } from '../app-config/app-config';
import { Injectable } from '@angular/core';
import { isNil } from 'lodash';
var UrlProvider = /** @class */ (function () {
    function UrlProvider(appConfigProvider) {
        this.appConfigProvider = appConfigProvider;
    }
    UrlProvider.prototype.getPersonalJournalUrl = function (staffNumber) {
        var urlTemplate = this.appConfigProvider.getAppConfig().journal.journalUrl;
        return urlTemplate.replace('{staffNumber}', isNil(staffNumber) ? '00000000' : staffNumber);
    };
    UrlProvider.prototype.getLogsServiceUrl = function () {
        return this.appConfigProvider.getAppConfig().logsApiUrl;
    };
    UrlProvider.prototype.getLogsServiceApiKey = function () {
        return this.appConfigProvider.getAppConfig().logsPostApiKey;
    };
    UrlProvider.prototype.getTestResultServiceUrl = function () {
        return this.appConfigProvider.getAppConfig().tests.testSubmissionUrl;
    };
    UrlProvider.prototype.getDelegatedExaminerSearchBookingUrl = function (applicationReference) {
        var urlTemplate = this.appConfigProvider.getAppConfig().journal.delegatedExaminerSearchBookingUrl;
        return urlTemplate.replace('{applicationReference}', isNil(applicationReference) ? '00000000' : applicationReference);
    };
    UrlProvider.prototype.getRekeySearchUrl = function (staffNumber) {
        var urlTemplate = this.appConfigProvider.getAppConfig().journal.searchBookingUrl;
        return urlTemplate.replace('{staffNumber}', isNil(staffNumber) ? '00000000' : staffNumber);
    };
    UrlProvider.prototype.getRekeyFindUserUrl = function (staffNumber) {
        var urlTemplate = this.appConfigProvider.getAppConfig().user.findUserUrl;
        return urlTemplate.replace('{staffNumber}', isNil(staffNumber) ? '00000000' : staffNumber);
    };
    UrlProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AppConfigProvider])
    ], UrlProvider);
    return UrlProvider;
}());
export { UrlProvider };
//# sourceMappingURL=url.js.map