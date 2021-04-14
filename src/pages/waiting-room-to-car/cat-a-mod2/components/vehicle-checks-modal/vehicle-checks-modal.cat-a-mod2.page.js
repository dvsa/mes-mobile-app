var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../../../modules/tests/tests.selector';
import { getCandidate } from '../../../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { merge } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../../../providers/question/question';
import * as safetyAndBalance from '../../../../../modules/tests/test-data/cat-a-mod2/safety-and-balance/safety-and-balance.cat-a-mod2.selector';
import { NUMBER_OF_BALANCE_QUESTIONS, } from '../../../../../shared/constants/balance-questions.cat-a-mod2.constants';
import { NUMBER_OF_SAFETY_QUESTIONS, } from '../../../../../shared/constants/safety-questions.cat-a-mod2.constants';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { map } from 'rxjs/operators';
import * as vehicleChecksModalActions from './vehicle-checks-modal.cat-a-mod2.actions';
import { getTestData } from '../../../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.reducer';
import { SafetyQuestionOutcomeChanged, SafetyQuestionSelected, BalanceQuestionSelected, BalanceQuestionOutcomeChanged, } from '../../../../../modules/tests/test-data/cat-a-mod2/safety-and-balance/safety-and-balance.cat-a-mod2.actions';
var VehicleChecksCatAMod2Modal = /** @class */ (function () {
    function VehicleChecksCatAMod2Modal(store$, navController, faultCountProvider, questionProvider) {
        var _this = this;
        this.store$ = store$;
        this.navController = navController;
        this.faultCountProvider = faultCountProvider;
        this.safetyQuestionsNumberArray = Array(NUMBER_OF_SAFETY_QUESTIONS);
        this.balanceQuestionsNumberArray = Array(NUMBER_OF_BALANCE_QUESTIONS);
        this.shouldDisplayBanner = function () {
            return _this.safetyAndBalanceQuestionsScore.drivingFaults === 1;
        };
        this.formGroup = new FormGroup({});
        this.safetyQuestions = questionProvider.getSafetyQuestions("EUAM2" /* EUAM2 */);
        this.balanceQuestions = questionProvider.getBalanceQuestions("EUAM2" /* EUAM2 */);
    }
    VehicleChecksCatAMod2Modal.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            safetyQuestions$: currentTest$.pipe(select(getTestData), select(safetyAndBalance.getSafetyAndBalanceQuestions), select(safetyAndBalance.getSelectedSafetyQuestions)),
            balanceQuestions$: currentTest$.pipe(select(getTestData), select(safetyAndBalance.getSafetyAndBalanceQuestions), select(safetyAndBalance.getSelectedBalanceQuestions)),
            safetyAndBalanceQuestionsScore$: currentTest$.pipe(select(getTestData), select(safetyAndBalance.getSafetyAndBalanceQuestions), map(function (safetyAndBalanceQuestions) {
                return _this.faultCountProvider.getSafetyAndBalanceFaultCount("EUAM2" /* EUAM2 */, safetyAndBalanceQuestions);
            })),
        };
        var safetyAndBalanceQuestionsScore$ = this.pageState.safetyAndBalanceQuestionsScore$;
        var merged$ = merge(safetyAndBalanceQuestionsScore$.pipe(map(function (score) { return _this.safetyAndBalanceQuestionsScore = score; })));
        this.subscription = merged$.subscribe();
    };
    VehicleChecksCatAMod2Modal.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    VehicleChecksCatAMod2Modal.prototype.onSubmit = function () {
        this.navController.pop();
    };
    VehicleChecksCatAMod2Modal.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new vehicleChecksModalActions.VehicleChecksViewDidEnter());
    };
    VehicleChecksCatAMod2Modal.prototype.safetyQuestionChanged = function (result, index) {
        this.store$.dispatch(new SafetyQuestionSelected(result, index));
    };
    VehicleChecksCatAMod2Modal.prototype.safetyQuestionOutcomeChanged = function (result, index) {
        this.store$.dispatch(new SafetyQuestionOutcomeChanged(result, index));
    };
    VehicleChecksCatAMod2Modal.prototype.balanceQuestionChanged = function (result, index) {
        this.store$.dispatch(new BalanceQuestionSelected(result, index));
    };
    VehicleChecksCatAMod2Modal.prototype.balanceQuestionOutcomeChanged = function (result, index) {
        this.store$.dispatch(new BalanceQuestionOutcomeChanged(result, index));
    };
    VehicleChecksCatAMod2Modal = __decorate([
        IonicPage(),
        Component({
            selector: 'vehicle-checks-modal-cat-a-mod2',
            templateUrl: 'vehicle-checks-modal.cat-a-mod2.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            FaultCountProvider,
            QuestionProvider])
    ], VehicleChecksCatAMod2Modal);
    return VehicleChecksCatAMod2Modal;
}());
export { VehicleChecksCatAMod2Modal };
//# sourceMappingURL=vehicle-checks-modal.cat-a-mod2.page.js.map