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
import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ModalController } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { DelegatedRekeySearchViewDidEnter, SearchBookedDelegatedTest, DelegatedRekeySearchClearState, } from './delegated-rekey-search.actions';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { getIsLoading, getHasSearched, getBookedTestSlot, getDelegatedRekeySearchError, } from './delegated-rekey-search.selector';
import { getDelegatedRekeySearchState } from './delegated-rekey-search.reducer';
import { isEmpty } from 'lodash';
import { DelegatedRekeySearchErrorMessages } from './delegated-rekey-search-error-model';
import { ERROR_PAGE } from '../page-names.constants';
import { ErrorTypes } from '../../shared/models/error-message';
import { App } from './../../app/app.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
var DelegatedRekeySearchPage = /** @class */ (function (_super) {
    __extends(DelegatedRekeySearchPage, _super);
    function DelegatedRekeySearchPage(viewController, navController, platform, navParams, authenticationProvider, store$, modalController, app) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.viewController = viewController;
        _this.navController = navController;
        _this.platform = platform;
        _this.navParams = navParams;
        _this.authenticationProvider = authenticationProvider;
        _this.store$ = store$;
        _this.modalController = modalController;
        _this.app = app;
        _this.hasClickedSearch = false;
        _this.applicationReference = '';
        _this.subscription = Subscription.EMPTY;
        return _this;
    }
    DelegatedRekeySearchPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rekeySearch$;
            return __generator(this, function (_a) {
                this.store$.dispatch(new DelegatedRekeySearchClearState());
                rekeySearch$ = this.store$.pipe(select(getDelegatedRekeySearchState));
                this.pageState = {
                    isLoading$: rekeySearch$.pipe(map(getIsLoading)),
                    hasSearched$: rekeySearch$.pipe(map(getHasSearched)),
                    bookedTestSlot$: rekeySearch$.pipe(map(getBookedTestSlot)),
                    rekeySearchErr$: rekeySearch$.pipe(map(getDelegatedRekeySearchError), distinctUntilChanged()),
                };
                this.delegatedRekeyForm = new FormGroup({});
                this.delegatedRekeyForm
                    .addControl('applicationReferenceInput', new FormControl({}, [
                    Validators.required,
                    Validators.minLength(11),
                    Validators.maxLength(11),
                ]));
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(DelegatedRekeySearchPage.prototype, "applicationReferenceInvalid", {
        get: function () {
            var applicationReferenceControl = this.delegatedRekeyForm.get('applicationReferenceInput');
            return !applicationReferenceControl.valid && applicationReferenceControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    DelegatedRekeySearchPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new DelegatedRekeySearchViewDidEnter());
        this.setUpSubscription();
    };
    DelegatedRekeySearchPage.prototype.setUpSubscription = function () {
        var _this = this;
        this.subscription = this.pageState.rekeySearchErr$.subscribe(function (error) {
            if (!_this.hasBookingAlreadyBeenCompleted(error) && _this.pageState.hasSearched$) {
                _this.showError(error);
            }
        });
    };
    DelegatedRekeySearchPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.store$.dispatch(new DelegatedRekeySearchClearState());
        this.applicationReference = '';
        this.hasClickedSearch = false;
    };
    DelegatedRekeySearchPage.prototype.applicationReferenceChanged = function (val) {
        this.applicationReference = val;
    };
    DelegatedRekeySearchPage.prototype.searchTests = function () {
        this.hasClickedSearch = true;
        var applicationReferenceInputValue = this.delegatedRekeyForm.get('applicationReferenceInput');
        if (applicationReferenceInputValue.valid) {
            this.store$.dispatch(new SearchBookedDelegatedTest(this.applicationReference));
        }
    };
    DelegatedRekeySearchPage.prototype.isBookedTestSlotEmpty = function (bookedTestsSlot) {
        return isEmpty(bookedTestsSlot);
    };
    DelegatedRekeySearchPage.prototype.hasBookingAlreadyBeenCompleted = function (rekeySearchErr) {
        return rekeySearchErr.message === DelegatedRekeySearchErrorMessages.BookingAlreadyCompleted;
    };
    DelegatedRekeySearchPage.prototype.showError = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var zoomClass, errorModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (error === undefined || error.message === '')
                            return [2 /*return*/];
                        zoomClass = "modal-fullscreen " + this.app.getTextZoomClass();
                        errorModal = this.modalController.create(ERROR_PAGE, { type: ErrorTypes.SEARCH }, { cssClass: zoomClass });
                        return [4 /*yield*/, errorModal.present()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DelegatedRekeySearchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-delegated-rekey-search',
            templateUrl: 'delegated-rekey-search.html',
        }),
        __metadata("design:paramtypes", [ViewController,
            NavController,
            Platform,
            NavParams,
            AuthenticationProvider,
            Store,
            ModalController,
            App])
    ], DelegatedRekeySearchPage);
    return DelegatedRekeySearchPage;
}(BasePageComponent));
export { DelegatedRekeySearchPage };
//# sourceMappingURL=delegated-rekey-search.js.map