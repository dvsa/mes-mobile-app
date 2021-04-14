var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, concatMap, withLatestFrom, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as appInfoActions from './app-info.actions';
import { AppInfoProvider } from '../../providers/app-info/app-info';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { getAppInfoState } from './app-info.reducer';
import { getDateConfigLoaded } from './app-info.selector';
import { LOGIN_PAGE } from '../../pages/page-names.constants';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
var AppInfoEffects = /** @class */ (function () {
    function AppInfoEffects(actions$, appInfoProvider, dateTimeProvider, store$, navigationProvider, authenticationProvider) {
        var _this = this;
        this.actions$ = actions$;
        this.appInfoProvider = appInfoProvider;
        this.dateTimeProvider = dateTimeProvider;
        this.store$ = store$;
        this.navigationProvider = navigationProvider;
        this.authenticationProvider = authenticationProvider;
        this.loadAppInfo$ = this.actions$.pipe(ofType(appInfoActions.LOAD_APP_INFO), switchMap(function () {
            return _this.appInfoProvider
                .getVersionNumber()
                .pipe(map(function (versionNumber) { return new appInfoActions.LoadAppInfoSuccess(versionNumber); }), catchError(function (err) { return of(new appInfoActions.LoadAppInfoFailure(err)); }));
        }));
        this.loadConfigSuccessEffect$ = this.actions$.pipe(ofType(appInfoActions.LOAD_CONFIG_SUCCESS), switchMap(function () {
            console.log('Config loaded successfully');
            return of(new appInfoActions.SetDateConfigLoaded(_this.dateTimeProvider.now().format('YYYY-MM-DD')));
        }));
        this.appResumedEffect$ = this.actions$.pipe(ofType(appInfoActions.APP_RESUMED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getAppInfoState), select(getDateConfigLoaded)))); }), filter(function (_a) {
            var action = _a[0], dateConfigLoaded = _a[1];
            return dateConfigLoaded !== _this.dateTimeProvider.now().format('YYYY-MM-DD');
        }), switchMap(function (_a) {
            var action = _a[0], dateConfigLoaded = _a[1];
            console.log('App resumed after being suspended. Config was not loaded today... app will refresh');
            _this.navigationProvider.getNav().setRoot(LOGIN_PAGE);
            return of(new appInfoActions.RestartApp());
        }));
        this.loadEmployeeName$ = this.actions$.pipe(ofType(appInfoActions.LOAD_EMPLOYEE_NAME), switchMap(function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authenticationProvider.loadEmployeeName()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, new appInfoActions.LoadEmployeeNameSuccess(result)];
                }
            });
        }); }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], AppInfoEffects.prototype, "loadAppInfo$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], AppInfoEffects.prototype, "loadConfigSuccessEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], AppInfoEffects.prototype, "appResumedEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], AppInfoEffects.prototype, "loadEmployeeName$", void 0);
    AppInfoEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            AppInfoProvider,
            DateTimeProvider,
            Store,
            NavigationProvider,
            AuthenticationProvider])
    ], AppInfoEffects);
    return AppInfoEffects;
}());
export { AppInfoEffects };
//# sourceMappingURL=app-info.effects.js.map