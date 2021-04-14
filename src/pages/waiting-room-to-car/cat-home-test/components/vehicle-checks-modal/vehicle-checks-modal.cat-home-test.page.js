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
import { getCandidate } from '../../../../../modules/tests/journal-data/cat-home/candidate/candidate.cat-home.reducer';
import { getUntitledCandidateName } from '../../../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../../../providers/question/question';
import { getVehicleChecksCatHomeTest, getSelectedShowMeQuestions, getSelectedTellMeQuestions, } from '../../../../../modules/tests/test-data/cat-home-test/vehicle-checks/vehicle-checks.cat-home-test.selector';
import { ShowMeQuestionSelected, ShowMeQuestionOutcomeChanged, TellMeQuestionSelected, TellMeQuestionOutcomeChanged, } from '../../../../../modules/tests/test-data/cat-home-test/vehicle-checks/vehicle-checks.cat-home-test.action';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import * as vehicleChecksModalActions from './vehicle-checks-modal.cat-home-test.actions';
import { getTestCategory } from '../../../../../modules/tests/category/category.reducer';
import { TestDataByCategoryProvider } from '../../../../../providers/test-data-by-category/test-data-by-category';
import { NUMBER_OF_SHOW_ME_QUESTIONS, } from '../../../../../shared/constants/show-me-questions/show-me-questions.cat-home-test.constants';
import { NUMBER_OF_TELL_ME_QUESTIONS, } from '../../../../../shared/constants/tell-me-questions/tell-me-questions.cat-home-test.constants';
var VehicleChecksCatHomeTestModal = /** @class */ (function () {
    function VehicleChecksCatHomeTestModal(store$, navController, faultCountProvider, testDataByCategoryProvider, questionProvider) {
        var _this = this;
        this.store$ = store$;
        this.navController = navController;
        this.faultCountProvider = faultCountProvider;
        this.testDataByCategoryProvider = testDataByCategoryProvider;
        this.questionProvider = questionProvider;
        this.showMeQuestionsNumberArray = Array(NUMBER_OF_SHOW_ME_QUESTIONS);
        this.tellMeQuestionsNumberArray = Array(NUMBER_OF_TELL_ME_QUESTIONS);
        this.shouldDisplayBanner = function () {
            return _this.vehicleChecksScore.drivingFaults === 4 && _this.vehicleChecksScore.seriousFaults === 1;
        };
        this.formGroup = new FormGroup({});
    }
    VehicleChecksCatHomeTestModal.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.categoryCodeSubscription = currentTest$.pipe(select(getTestCategory)).subscribe(function (value) {
            _this.testCategory = value;
        });
        var testData$ = currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByCategoryCode(_this.testCategory)(data); }));
        this.showMeQuestions = this.questionProvider.getShowMeQuestions(this.testCategory);
        this.tellMeQuestions = this.questionProvider.getTellMeQuestions(this.testCategory);
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            showMeQuestions$: testData$.pipe(select(getVehicleChecksCatHomeTest), select(getSelectedShowMeQuestions)),
            tellMeQuestions$: testData$.pipe(select(getVehicleChecksCatHomeTest), select(getSelectedTellMeQuestions)),
            vehicleChecksScore$: testData$.pipe(select(getVehicleChecksCatHomeTest), map(function (vehicleChecks) {
                return _this.faultCountProvider.getVehicleChecksFaultCount(_this.testCategory, vehicleChecks);
            })),
        };
        var vehicleChecksScore$ = this.pageState.vehicleChecksScore$;
        var merged$ = merge(vehicleChecksScore$.pipe(map(function (score) { return _this.vehicleChecksScore = score; })));
        this.subscription = merged$.subscribe();
    };
    VehicleChecksCatHomeTestModal.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.categoryCodeSubscription) {
            this.categoryCodeSubscription.unsubscribe();
        }
    };
    VehicleChecksCatHomeTestModal.prototype.onSubmit = function () {
        this.navController.pop();
    };
    VehicleChecksCatHomeTestModal.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new vehicleChecksModalActions.VehicleChecksViewDidEnter());
    };
    VehicleChecksCatHomeTestModal.prototype.showMeQuestionChanged = function (result, index) {
        this.store$.dispatch(new ShowMeQuestionSelected(result, index));
    };
    VehicleChecksCatHomeTestModal.prototype.showMeQuestionOutcomeChanged = function (result, index) {
        this.store$.dispatch(new ShowMeQuestionOutcomeChanged(result, index));
    };
    VehicleChecksCatHomeTestModal.prototype.tellMeQuestionChanged = function (result, index) {
        this.store$.dispatch(new TellMeQuestionSelected(result, index));
    };
    VehicleChecksCatHomeTestModal.prototype.tellMeQuestionOutcomeChanged = function (result, index) {
        this.store$.dispatch(new TellMeQuestionOutcomeChanged(result, index));
    };
    VehicleChecksCatHomeTestModal = __decorate([
        IonicPage(),
        Component({
            selector: 'vehicle-checks-modal-cat-home-test',
            templateUrl: 'vehicle-checks-modal.cat-home-test.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            FaultCountProvider,
            TestDataByCategoryProvider,
            QuestionProvider])
    ], VehicleChecksCatHomeTestModal);
    return VehicleChecksCatHomeTestModal;
}());
export { VehicleChecksCatHomeTestModal };
//# sourceMappingURL=vehicle-checks-modal.cat-home-test.page.js.map