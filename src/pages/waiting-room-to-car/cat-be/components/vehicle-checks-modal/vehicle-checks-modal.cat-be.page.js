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
import { getCandidate } from '../../../../../modules/tests/journal-data/cat-be/candidate/candidate.cat-be.reducer';
import { getUntitledCandidateName } from '../../../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { merge } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../../../providers/question/question';
import { getVehicleChecksCatBE, getSelectedShowMeQuestions, getSelectedTellMeQuestions, } from '../../../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';
import { ShowMeQuestionSelected, ShowMeQuestionOutcomeChanged, TellMeQuestionSelected, TellMeQuestionOutcomeChanged, } from '../../../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.action';
import { NUMBER_OF_TELL_ME_QUESTIONS, } from '../../../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
import { NUMBER_OF_SHOW_ME_QUESTIONS, } from '../../../../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { map } from 'rxjs/operators';
import * as vehicleChecksModalActions from './vehicle-checks-modal.cat-be.actions';
var VehicleChecksCatBEModal = /** @class */ (function () {
    function VehicleChecksCatBEModal(store$, navController, faultCountProvider, questionProvider) {
        var _this = this;
        this.store$ = store$;
        this.navController = navController;
        this.faultCountProvider = faultCountProvider;
        this.showMeQuestionsNumberArray = Array(NUMBER_OF_SHOW_ME_QUESTIONS);
        this.tellMeQuestionsNumberArray = Array(NUMBER_OF_TELL_ME_QUESTIONS);
        this.shouldDisplayBanner = function () {
            return _this.vehicleChecksScore.drivingFaults === 4 && _this.vehicleChecksScore.seriousFaults === 1;
        };
        this.formGroup = new FormGroup({});
        this.showMeQuestions = questionProvider.getShowMeQuestions("B+E" /* BE */);
        this.tellMeQuestions = questionProvider.getTellMeQuestions("B+E" /* BE */);
    }
    VehicleChecksCatBEModal.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            showMeQuestions$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatBE), select(getSelectedShowMeQuestions)),
            tellMeQuestions$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatBE), select(getSelectedTellMeQuestions)),
            vehicleChecksScore$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatBE), map(function (vehicleChecks) {
                return _this.faultCountProvider.getVehicleChecksFaultCount("B+E" /* BE */, vehicleChecks);
            })),
        };
        var vehicleChecksScore$ = this.pageState.vehicleChecksScore$;
        var merged$ = merge(vehicleChecksScore$.pipe(map(function (score) { return _this.vehicleChecksScore = score; })));
        this.subscription = merged$.subscribe();
    };
    VehicleChecksCatBEModal.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    VehicleChecksCatBEModal.prototype.onSubmit = function () {
        this.navController.pop();
    };
    VehicleChecksCatBEModal.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new vehicleChecksModalActions.VehicleChecksViewDidEnter());
    };
    VehicleChecksCatBEModal.prototype.showMeQuestionChanged = function (result, index) {
        this.store$.dispatch(new ShowMeQuestionSelected(result, index));
    };
    VehicleChecksCatBEModal.prototype.showMeQuestionOutcomeChanged = function (result, index) {
        this.store$.dispatch(new ShowMeQuestionOutcomeChanged(result, index));
    };
    VehicleChecksCatBEModal.prototype.tellMeQuestionChanged = function (result, index) {
        this.store$.dispatch(new TellMeQuestionSelected(result, index));
    };
    VehicleChecksCatBEModal.prototype.tellMeQuestionOutcomeChanged = function (result, index) {
        this.store$.dispatch(new TellMeQuestionOutcomeChanged(result, index));
    };
    VehicleChecksCatBEModal = __decorate([
        IonicPage(),
        Component({
            selector: 'vehicle-checks-modal-cat-be',
            templateUrl: 'vehicle-checks-modal.cat-be.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            FaultCountProvider,
            QuestionProvider])
    ], VehicleChecksCatBEModal);
    return VehicleChecksCatBEModal;
}());
export { VehicleChecksCatBEModal };
//# sourceMappingURL=vehicle-checks-modal.cat-be.page.js.map