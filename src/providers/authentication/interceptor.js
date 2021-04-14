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
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Platform } from 'ionic-angular';
import { AuthenticationProvider } from './authentication';
import { UrlProvider } from '../url/url';
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(platform, authService, urlProvider) {
        this.platform = platform;
        this.authService = authService;
        this.urlProvider = urlProvider;
    }
    AuthInterceptor.prototype.intercept = function (request, next) {
        if (!this.platform.is('ios') || !request.url.startsWith('http')) {
            return next.handle(request);
        }
        var logUrl = new URL(request.url);
        if (logUrl.pathname.endsWith('/logs')) {
            var newRequest = request.clone({
                setHeaders: {
                    'x-api-key': this.urlProvider.getLogsServiceApiKey(),
                },
            });
            return next.handle(newRequest);
        }
        return from(this.authService.getAuthenticationToken()).pipe(switchMap(function (token) {
            if (token) {
                var newRequest = request.clone({
                    setHeaders: {
                        Authorization: token,
                    },
                });
                return next.handle(newRequest);
            }
            return next.handle(request);
        }));
    };
    AuthInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Platform,
            AuthenticationProvider,
            UrlProvider])
    ], AuthInterceptor);
    return AuthInterceptor;
}());
export { AuthInterceptor };
//# sourceMappingURL=interceptor.js.map