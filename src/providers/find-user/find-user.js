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
var FindUserProvider = /** @class */ (function () {
    function FindUserProvider(httpClient, urlProvider, appConfig) {
        this.httpClient = httpClient;
        this.urlProvider = urlProvider;
        this.appConfig = appConfig;
    }
    FindUserProvider.prototype.userExists = function (staffNumber) {
        return this.httpClient.get(this.urlProvider.getRekeyFindUserUrl(staffNumber.toString()))
            .pipe(timeout(this.appConfig.getAppConfig().requestTimeout));
    };
    FindUserProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            UrlProvider,
            AppConfigProvider])
    ], FindUserProvider);
    return FindUserProvider;
}());
export { FindUserProvider };
//# sourceMappingURL=find-user.js.map