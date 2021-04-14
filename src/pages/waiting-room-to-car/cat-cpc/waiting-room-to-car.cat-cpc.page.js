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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { merge } from 'rxjs';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { PopulateVehicleConfiguration, VehicleRegistrationChanged, } from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { InterpreterAccompanimentToggled, SupervisorAccompanimentToggled, } from '../../../modules/tests/accompaniment/cat-cpc/accompaniment.cat-cpc.actions';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-cpc/vehicle-details.cat-cpc.reducer';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import { getRegistrationNumber } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { getInterpreterAccompaniment, getSupervisorAccompaniment, } from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_CPC } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { getTestData } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.reducer';
import { getCombination } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.selector';
import { PopulateCombination } from '../../../modules/tests/test-data/cat-cpc/combination/combination.action';
import { CPCQuestionProvider } from '../../../providers/cpc-questions/cpc-questions';
import { getVehicleConfiguration, } from '../../../modules/tests/vehicle-details/cat-cpc/vehicle-details.cat-cpc.selector';
import { PopulateQuestions, } from '../../../modules/tests/test-data/cat-cpc/questions/questions.action';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getDelegatedTestIndicator } from '../../../modules/tests/delegated-test/delegated-test.reducer';
import { isDelegatedTest } from '../../../modules/tests/delegated-test/delegated-test.selector';
import { getPreTestDeclarations } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.reducer';
import { getCandidateDeclarationSignedStatus, getInsuranceDeclarationStatus, getResidencyDeclarationStatus, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.selector';
import { VehicleChecksCompletedToggled } from '../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';
import { CandidateDeclarationSigned, SetDeclarationStatus, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.actions';
import { PopulateTestScore } from '../../../modules/tests/test-data/cat-cpc/overall-score/total-percentage.action';
import { map } from 'rxjs/operators';
var WaitingRoomToCarCatCPCPage = /** @class */ (function (_super) {
    __extends(WaitingRoomToCarCatCPCPage, _super);
    function WaitingRoomToCarCatCPCPage(store$, navController, navParams, platform, authenticationProvider, cpcQuestionProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.cpcQuestionProvider = cpcQuestionProvider;
        _this.showVehicleDetails = function () { return _this.testCategory === "CCPC" /* CCPC */; };
        _this.form = new FormGroup({});
        return _this;
    }
    WaitingRoomToCarCatCPCPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        currentTest$.pipe(select(getTestCategory)).subscribe(function (result) { return _this.testCategory = result; });
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            registrationNumber$: currentTest$.pipe(select(getVehicleDetails), select(getRegistrationNumber)),
            supervisorAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getSupervisorAccompaniment)),
            interpreterAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getInterpreterAccompaniment)),
            combination$: currentTest$.pipe(select(getTestData), select(getCombination)),
            configuration$: currentTest$.pipe(select(getVehicleDetails), select(getVehicleConfiguration)),
            delegatedTest$: currentTest$.pipe(select(getDelegatedTestIndicator), select(isDelegatedTest)),
            insuranceDeclarationAccepted$: currentTest$.pipe(select(getPreTestDeclarations), select(getInsuranceDeclarationStatus)),
            residencyDeclarationAccepted$: currentTest$.pipe(select(getPreTestDeclarations), select(getResidencyDeclarationStatus)),
            candidateDeclarationSigned$: currentTest$.pipe(select(getPreTestDeclarations), select(getCandidateDeclarationSignedStatus)),
        };
        this.setupSubscriptions();
        this.combinations = this.cpcQuestionProvider.getCombinations(this.testCategory);
    };
    WaitingRoomToCarCatCPCPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
    };
    WaitingRoomToCarCatCPCPage.prototype.ionViewWillLeave = function () {
        this.store$.dispatch(new PersistTests());
    };
    WaitingRoomToCarCatCPCPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    WaitingRoomToCarCatCPCPage.prototype.setupSubscriptions = function () {
        var _this = this;
        var delegatedTest$ = this.pageState.delegatedTest$;
        this.subscription = merge(delegatedTest$.pipe(map(function (result) { return _this.isDelegated = result; }))).subscribe();
    };
    WaitingRoomToCarCatCPCPage.prototype.combinationSelected = function (combination) {
        var questions = this.cpcQuestionProvider.getQuestionsBank(combination);
        var question5 = this.cpcQuestionProvider.getQuestion5ByVehicleType(combination);
        this.store$.dispatch(new PopulateCombination(combination));
        this.store$.dispatch(new PopulateQuestions(__spreadArray(__spreadArray([], questions), [question5])));
        // reset total score
        this.store$.dispatch(new PopulateTestScore(0));
    };
    WaitingRoomToCarCatCPCPage.prototype.supervisorAccompanimentToggled = function () {
        this.store$.dispatch(new SupervisorAccompanimentToggled());
    };
    WaitingRoomToCarCatCPCPage.prototype.interpreterAccompanimentToggled = function () {
        this.store$.dispatch(new InterpreterAccompanimentToggled());
    };
    WaitingRoomToCarCatCPCPage.prototype.vehicleRegistrationChanged = function (vehicleRegistration) {
        this.store$.dispatch(new VehicleRegistrationChanged(vehicleRegistration));
    };
    WaitingRoomToCarCatCPCPage.prototype.vehicleConfiguration = function (configuration) {
        this.store$.dispatch(new PopulateVehicleConfiguration(configuration));
    };
    WaitingRoomToCarCatCPCPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.navController.push(CAT_CPC.TEST_REPORT_PAGE).then(function () { return __awaiter(_this, void 0, void 0, function () {
                var view;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            view = this.navController.getViews().find(function (view) { return view.id === CAT_CPC.WAITING_ROOM_TO_CAR_PAGE; });
                            if (!(view && !this.isDelegated)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.navController.removeView(view)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        }
        else {
            Object.keys(this.form.controls).forEach(function (controlName) {
                if (_this.form.controls[controlName].invalid) {
                    _this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarValidationError(controlName + " is blank"));
                }
            });
        }
    };
    WaitingRoomToCarCatCPCPage.prototype.vehicleChecksCompletedOutcomeChanged = function (toggled) {
        this.store$.dispatch(new VehicleChecksCompletedToggled(toggled));
    };
    WaitingRoomToCarCatCPCPage.prototype.candidateDeclarationOutcomeChanged = function (declaration) {
        this.store$.dispatch(new SetDeclarationStatus(declaration));
        this.store$.dispatch(new CandidateDeclarationSigned());
    };
    WaitingRoomToCarCatCPCPage = __decorate([
        IonicPage(),
        Component({
            selector: '.waiting-room-to-car-cat-cpc-page',
            templateUrl: 'waiting-room-to-car.cat-cpc.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            CPCQuestionProvider])
    ], WaitingRoomToCarCatCPCPage);
    return WaitingRoomToCarCatCPCPage;
}(BasePageComponent));
export { WaitingRoomToCarCatCPCPage };
//# sourceMappingURL=waiting-room-to-car.cat-cpc.page.js.map