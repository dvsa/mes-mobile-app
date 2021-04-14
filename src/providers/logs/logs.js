var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProvider } from '../url/url';
import { of } from 'rxjs';
var LogsProvider = /** @class */ (function () {
    function LogsProvider(http, urlProvider) {
        var _this = this;
        this.http = http;
        this.urlProvider = urlProvider;
        this.sendLogs = function (logs) {
            if (logs.length > 0) {
                var logsServiceUrl = _this.urlProvider.getLogsServiceUrl();
                return _this.http.post(logsServiceUrl, logs);
            }
            return of();
        };
    }
    LogsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            UrlProvider])
    ], LogsProvider);
    return LogsProvider;
}());
export { LogsProvider };
//# sourceMappingURL=logs.js.map