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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, Navbar, NavController, Platform } from 'ionic-angular';
import { merge } from 'rxjs';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { select, Store } from '@ngrx/store';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { getTests } from '../../modules/tests/tests.reducer';
import { getActivityCode, getCurrentTest, getJournalData, getTestOutcomeText, } from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateName, getUntitledCandidateName, } from '../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTestSlotAttributes } from '../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { getTestStartDateTime } from '../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { getTestCategory } from '../../modules/tests/category/category.reducer';
import { map, tap } from 'rxjs/operators';
import { isProvisionalLicenseProvided } from '../../modules/tests/pass-completion/pass-completion.selector';
import { getGearboxCategory } from '../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { getTestSummary } from '../../modules/tests/test-summary/common/test-summary.reducer';
import { getD255 } from '../../modules/tests/test-summary/common/test-summary.selector';
import { getPassCompletion } from '../../modules/tests/pass-completion/pass-completion.reducer';
import * as pageConstants from '../page-names.constants';
import { VehicleDetailsByCategoryProvider, } from '../../providers/vehicle-details-by-category/vehicle-details-by-category';
import { TestOutcome } from '../../modules/tests/tests.constants';
import { includes } from 'lodash';
import { ConfirmTestDetailsViewDidEnter } from './confirm-test-details.actions';
import { SetTestStatusWriteUp } from '../../modules/tests/test-status/test-status.actions';
import { PersistTests } from '../../modules/tests/tests.actions';
var LicenceReceivedText;
(function (LicenceReceivedText) {
    LicenceReceivedText["TRUE"] = "Yes - Please retain the candidates licence";
    LicenceReceivedText["FALSE"] = "No - Please ensure that the licence is kept by the candidate";
})(LicenceReceivedText || (LicenceReceivedText = {}));
var GearBox;
(function (GearBox) {
    GearBox["AUTOMATIC"] = "Automatic - An automatic licence will be issued";
    GearBox["MANUAL"] = "Manual";
})(GearBox || (GearBox = {}));
var D255;
(function (D255) {
    D255["TRUE"] = "Yes - Please complete a D255";
    D255["FALSE"] = "No";
})(D255 || (D255 = {}));
var ConfirmTestDetailsPage = /** @class */ (function (_super) {
    __extends(ConfirmTestDetailsPage, _super);
    function ConfirmTestDetailsPage(platform, navController, authenticationProvider, store$, alertController, vehicleDetailsProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider, store$) || this;
        _this.platform = platform;
        _this.navController = navController;
        _this.authenticationProvider = authenticationProvider;
        _this.alertController = alertController;
        _this.vehicleDetailsProvider = vehicleDetailsProvider;
        return _this;
    }
    ConfirmTestDetailsPage.prototype.ionViewWillEnter = function () {
        if (this.merged$) {
            this.subscription = this.merged$.subscribe();
        }
        return true;
    };
    ConfirmTestDetailsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.store$.dispatch(new ConfirmTestDetailsViewDidEnter());
        this.navBar.backButtonClick = function (e) {
            _this.clickBack();
        };
    };
    ConfirmTestDetailsPage.prototype.clickBack = function () {
        this.navController.pop();
    };
    ConfirmTestDetailsPage.prototype.goBackToDebrief = function () {
        return __awaiter(this, void 0, void 0, function () {
            var previousPage, previousView;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        previousPage = pageConstants.getPageNameByCategoryAndKey(this.category, 'DEBRIEF_PAGE');
                        previousView = this.navController.getViews().find(function (view) { return view.id === previousPage; });
                        return [4 /*yield*/, this.navController.popTo(previousView)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConfirmTestDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var category;
        currentTest$.pipe(select(getTestCategory)).subscribe(function (value) {
            category = value;
            var vehicleDetails = _this.vehicleDetailsProvider.getVehicleDetailsByCategoryCode(category);
            _this.pageState = {
                slotId$: _this.store$.pipe(select(getTests), map(function (tests) { return tests.currentTest.slotId; })),
                candidateUntitledName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
                candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateName)),
                startDateTime$: currentTest$.pipe(select(getJournalData), select(getTestSlotAttributes), select(getTestStartDateTime)),
                testOutcomeText$: currentTest$.pipe(select(getTestOutcomeText)),
                activityCode$: currentTest$.pipe(select(getActivityCode)),
                testCategory$: currentTest$.pipe(select(getTestCategory), map(function (testCategory) { return testCategory; })),
                transmission$: currentTest$.pipe(select(vehicleDetails.vehicleDetails), select(getGearboxCategory)),
                d255$: currentTest$.pipe(select(getTestSummary), select(getD255)),
            };
            if (category !== "ADI2" /* ADI2 */) {
                _this.pageState = __assign(__assign({}, _this.pageState), { provisionalLicense$: currentTest$.pipe(select(getPassCompletion), map(isProvisionalLicenseProvided)) });
            }
        });
        var _a = this.pageState, testCategory$ = _a.testCategory$, testOutcomeText$ = _a.testOutcomeText$, candidateUntitledName$ = _a.candidateUntitledName$, slotId$ = _a.slotId$;
        this.merged$ = merge(testCategory$.pipe(map(function (value) { return _this.category = value; })), testOutcomeText$.pipe(map(function (value) { return _this.testOutcome = value; })), candidateUntitledName$.pipe(tap(function (value) { return _this.candidateName = value; })), slotId$.pipe(map(function (slotId) { return _this.slotId = slotId; })));
    };
    ConfirmTestDetailsPage.prototype.isTerminated = function (testResult) {
        return testResult === TestOutcome.Terminated;
    };
    ConfirmTestDetailsPage.prototype.isPassed = function (testResult) {
        return testResult === TestOutcome.Passed;
    };
    ConfirmTestDetailsPage.prototype.getActivityCode = function (activityCodeModel) {
        return activityCodeModel.activityCode;
    };
    ConfirmTestDetailsPage.prototype.getProvisionalText = function (received) {
        return received ? LicenceReceivedText.TRUE : LicenceReceivedText.FALSE;
    };
    ConfirmTestDetailsPage.prototype.getTransmissionText = function (gearbox) {
        return gearbox === GearBox.MANUAL ? GearBox.MANUAL : GearBox.AUTOMATIC;
    };
    ConfirmTestDetailsPage.prototype.getD255Text = function (d255) {
        return d255 ? D255.TRUE : D255.FALSE;
    };
    ConfirmTestDetailsPage.prototype.onSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.showConfirmTestDetailsModal()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConfirmTestDetailsPage.prototype.showConfirmTestDetailsModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alert = this.alertController.create({
                            message: "You are about to submit a " + this.testOutcome + " Cat " + this.category + " test for " + this.candidateName + "\n                <br/><br/>Are you sure you want to submit this result?",
                            cssClass: 'confirm-declaration-modal',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    handler: function () {
                                    },
                                },
                                {
                                    text: 'Submit',
                                    handler: function () { return _this.onTestDetailsConfirm(); },
                                },
                            ],
                            enableBackdropDismiss: false,
                        });
                        return [4 /*yield*/, alert.present()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConfirmTestDetailsPage.prototype.onTestDetailsConfirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isPassed(this.testOutcome)) {
                            this.store$.dispatch(new SetTestStatusWriteUp(this.slotId));
                            this.store$.dispatch(new PersistTests());
                        }
                        return [4 /*yield*/, this.navController.push(pageConstants.getPageNameByCategoryAndKey(this.category, 'BACK_TO_OFFICE_PAGE'))];
                    case 1:
                        _a.sent();
                        this.navController.getViews().forEach(function (view) {
                            if (includes([
                                pageConstants.getPageNameByCategoryAndKey(_this.category, 'TEST_REPORT_PAGE'),
                                pageConstants.getPageNameByCategoryAndKey(_this.category, 'DEBRIEF_PAGE'),
                                pageConstants.getPageNameByCategoryAndKey(_this.category, 'PASS_FINALISATION_PAGE'),
                                pageConstants.getPageNameByCategoryAndKey(_this.category, 'HEALTH_DECLARATION_PAGE'),
                                pageConstants.CONFIRM_TEST_DETAILS,
                            ], view.id)) {
                                _this.navController.removeView(view);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ConfirmTestDetailsPage.prototype.ionViewDidLeave = function () {
        _super.prototype.ionViewDidLeave.call(this);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], ConfirmTestDetailsPage.prototype, "navBar", void 0);
    ConfirmTestDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'confirm-test-details-page',
            templateUrl: 'confirm-test-details.page.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            AuthenticationProvider,
            Store,
            AlertController,
            VehicleDetailsByCategoryProvider])
    ], ConfirmTestDetailsPage);
    return ConfirmTestDetailsPage;
}(PracticeableBasePageComponent));
export { ConfirmTestDetailsPage };
//# sourceMappingURL=confirm-test-details.page.js.map