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
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Store } from '@ngrx/store';
import { LoadAppInfo, AppSuspended, AppResumed } from '../modules/app-info/app-info.actions';
import { TranslateService } from '@ngx-translate/core';
import { LOGIN_PAGE } from '../pages/page-names.constants';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
var App = /** @class */ (function () {
    function App(store$, statusBar, platform, translate) {
        var _this = this;
        this.store$ = store$;
        this.statusBar = statusBar;
        this.platform = platform;
        this.translate = translate;
        this.rootPage = LOGIN_PAGE;
        this.textZoom = 100;
        this.increasedContrast = false;
        this.onAppResumed = function () {
            _this.store$.dispatch(new AppResumed());
            window.MobileAccessibility.usePreferredTextZoom(true);
            window.MobileAccessibility.getTextZoom(_this.getTextZoomCallback);
        };
        this.onAppSuspended = function () {
            _this.store$.dispatch(new AppSuspended());
        };
        this.configureAccessibility = function () {
            window.MobileAccessibility.updateTextZoom();
            window.MobileAccessibility.getTextZoom(_this.getTextZoomCallback);
            window.MobileAccessibility.isDarkerSystemColorsEnabled(function (increasedContrast) { return _this.increasedContrast = increasedContrast; });
        };
        this.getTextZoomCallback = function (zoomLevel) {
            // Default iOS zoom levels are: 88%, 94%, 100%, 106%, 119%, 131%, 144%
            _this.textZoom = zoomLevel;
            window.MobileAccessibility.usePreferredTextZoom(false);
        };
        this.platform.ready()
            .then(function () {
            _this.configureLocale();
            _this.configureStatusBar();
            _this.loadAppInfo();
            if (_this.platform.is('ios')) {
                _this.configureAccessibility();
                _this.configurePlatformSubscriptions();
            }
        });
    }
    App.prototype.ionViewWillUnload = function () {
        if (this.platformSubscription) {
            this.platformSubscription.unsubscribe();
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    App.prototype.configureLocale = function () {
        this.translate.setDefaultLang('en');
    };
    App.prototype.configureStatusBar = function () {
        this.statusBar.styleLightContent();
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#000000');
    };
    App.prototype.loadAppInfo = function () {
        this.store$.dispatch(new LoadAppInfo());
    };
    App.prototype.configurePlatformSubscriptions = function () {
        var merged$ = merge(this.platform.resume.pipe(map(this.onAppResumed)), this.platform.pause.pipe(map(this.onAppSuspended)));
        this.platformSubscription = merged$.subscribe();
    };
    App.prototype.getTextZoom = function (zoom) {
        if (!zoom)
            return 'regular';
        if (zoom >= 131)
            return 'x-large';
        if (zoom >= 106)
            return 'large';
        return 'regular';
    };
    App.prototype.getTextZoomClass = function () {
        return "text-zoom-" + this.getTextZoom(this.textZoom);
    };
    App.prototype.getIncreasedContrastClass = function () {
        return this.increasedContrast ? 'increased-contrast' : '';
    };
    App = __decorate([
        Component({
            templateUrl: 'app.html',
        }),
        __metadata("design:paramtypes", [Store,
            StatusBar,
            Platform,
            TranslateService])
    ], App);
    return App;
}());
export { App };
//# sourceMappingURL=app.component.js.map