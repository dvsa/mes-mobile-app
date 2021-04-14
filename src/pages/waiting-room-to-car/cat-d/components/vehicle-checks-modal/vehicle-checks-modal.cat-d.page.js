var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../../../modules/tests/tests.selector';
import { getCandidate } from '../../../../../modules/tests/journal-data/cat-d/candidate/candidate.cat-d.reducer';
import { getUntitledCandidateName } from '../../../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { merge } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../../../providers/question/question';
import { getTestData } from '../../../../../modules/tests/test-data/cat-d/test-data.cat-d.reducer';
import { ShowMeQuestionSelected, ShowMeQuestionOutcomeChanged, TellMeQuestionSelected, TellMeQuestionOutcomeChanged, } from '../../../../../modules/tests/test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.action';
import { SafetyQuestionOutcomeChanged, } from '../../../../../modules/tests/test-data/cat-d/safety-questions/safety-questions.cat-d.action';
import { NUMBER_OF_TELL_ME_QUESTIONS as NUMBER_OF_TELL_ME_QUESTIONS_NON_TRAILER, } from '../../../../../shared/constants/tell-me-questions/tell-me-questions.vocational.constants';
import { NUMBER_OF_SHOW_ME_QUESTIONS as NUMBER_OF_SHOW_ME_QUESTIONS_NON_TRAILER, } from '../../../../../shared/constants/show-me-questions/show-me-questions.vocational.constants';
import { NUMBER_OF_TELL_ME_QUESTIONS as NUMBER_OF_TELL_ME_QUESTIONS_TRAILER, } from '../../../../../shared/constants/tell-me-questions/tell-me-questions.vocational-trailer.constants';
import { NUMBER_OF_SHOW_ME_QUESTIONS as NUMBER_OF_SHOW_ME_QUESTIONS_TRAILER, } from '../../../../../shared/constants/show-me-questions/show-me-questions.vocational-trailer.constants';
import { NUMBER_OF_SAFETY_QUESTIONS, } from '../../../../../shared/constants/safety-questions.cat-d.constants';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { map } from 'rxjs/operators';
import * as vehicleChecksModalActions from './vehicle-checks-modal.cat-d.actions';
import { getVehicleChecksCatD, getSelectedShowMeQuestions, getSelectedTellMeQuestions, } from '../../../../../modules/tests/test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.selector';
import { getSafetyQuestionsCatD, getSafetyQuestions, } from '../../../../../modules/tests/test-data/cat-d/safety-questions/safety-questions.cat-d.selector';
var VehicleChecksCatDModal = /** @class */ (function () {
    function VehicleChecksCatDModal(store$, navController, faultCountProvider, questionProvider, params) {
        var _this = this;
        this.store$ = store$;
        this.navController = navController;
        this.faultCountProvider = faultCountProvider;
        this.shouldDisplayBanner = function () {
            return _this.isTrailerBanner() || _this.isNonTrailerBanner();
        };
        this.category = params.get('category');
        this.setNumberOfShowMeTellMeQuestions();
        this.safetyQuestionsNumberArray = Array(NUMBER_OF_SAFETY_QUESTIONS);
        this.formGroup = new FormGroup({});
        this.showMeQuestions = questionProvider.getShowMeQuestions(this.category);
        this.tellMeQuestions = questionProvider.getTellMeQuestions(this.category);
        this.safetyQuestions = questionProvider.getVocationalSafetyQuestions(this.category);
    }
    VehicleChecksCatDModal.prototype.setNumberOfShowMeTellMeQuestions = function () {
        var numberOfShowMeQuestions;
        var numberOfTellMeQuestions;
        switch (this.category) {
            case "D" /* D */:
            case "D1" /* D1 */:
                numberOfShowMeQuestions = NUMBER_OF_SHOW_ME_QUESTIONS_NON_TRAILER;
                numberOfTellMeQuestions = NUMBER_OF_TELL_ME_QUESTIONS_NON_TRAILER;
                break;
            case "D+E" /* DE */:
            case "D1+E" /* D1E */:
                numberOfShowMeQuestions = NUMBER_OF_SHOW_ME_QUESTIONS_TRAILER;
                numberOfTellMeQuestions = NUMBER_OF_TELL_ME_QUESTIONS_TRAILER;
        }
        this.showMeQuestionsNumberArray = Array(numberOfShowMeQuestions);
        this.tellMeQuestionsNumberArray = Array(numberOfTellMeQuestions);
    };
    VehicleChecksCatDModal.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            showMeQuestions$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatD), select(getSelectedShowMeQuestions)),
            tellMeQuestions$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatD), select(getSelectedTellMeQuestions)),
            safetyQuestions$: currentTest$.pipe(select(getTestData), select(getSafetyQuestionsCatD), select(getSafetyQuestions)),
            vehicleChecksScore$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatD), map(function (vehicleChecks) {
                return _this.faultCountProvider.getVehicleChecksFaultCount(_this.category, vehicleChecks);
            })),
            safetyQuestionsScore$: currentTest$.pipe(select(getTestData), select(getSafetyQuestionsCatD), map(function (safetyQuestions) {
                return _this.faultCountProvider.getSafetyQuestionsFaultCount(_this.category, safetyQuestions);
            })),
        };
        var _a = this.pageState, vehicleChecksScore$ = _a.vehicleChecksScore$, safetyQuestionsScore$ = _a.safetyQuestionsScore$;
        var merged$ = merge(vehicleChecksScore$.pipe(map(function (score) { return (_this.vehicleChecksScore = score); })), safetyQuestionsScore$.pipe(map(function (score) { return (_this.safetyQuestionsScore = score); })));
        this.subscription = merged$.subscribe();
    };
    VehicleChecksCatDModal.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    VehicleChecksCatDModal.prototype.onSubmit = function () {
        this.navController.pop();
    };
    VehicleChecksCatDModal.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new vehicleChecksModalActions.VehicleChecksViewDidEnter());
    };
    VehicleChecksCatDModal.prototype.showMeQuestionChanged = function (result, index) {
        this.store$.dispatch(new ShowMeQuestionSelected(result, index));
    };
    VehicleChecksCatDModal.prototype.showMeQuestionOutcomeChanged = function (result, index) {
        this.store$.dispatch(new ShowMeQuestionOutcomeChanged(result, index));
    };
    VehicleChecksCatDModal.prototype.tellMeQuestionChanged = function (result, index) {
        this.store$.dispatch(new TellMeQuestionSelected(result, index));
    };
    VehicleChecksCatDModal.prototype.tellMeQuestionOutcomeChanged = function (result, index) {
        this.store$.dispatch(new TellMeQuestionOutcomeChanged(result, index));
    };
    VehicleChecksCatDModal.prototype.safetyQuestionOutcomeChanged = function (result, index) {
        this.store$.dispatch(new SafetyQuestionOutcomeChanged(result, index));
    };
    VehicleChecksCatDModal.prototype.isNonTrailerBanner = function () {
        return (this.vehicleChecksScore.drivingFaults === 4 &&
            this.vehicleChecksScore.seriousFaults === 1 &&
            (this.category === "D" /* D */ || this.category === "D1" /* D1 */));
    };
    VehicleChecksCatDModal.prototype.isTrailerBanner = function () {
        return (this.vehicleChecksScore.drivingFaults === 1 &&
            this.vehicleChecksScore.seriousFaults === 1 &&
            (this.category === "D+E" /* DE */ || this.category === "D1+E" /* D1E */));
    };
    VehicleChecksCatDModal = __decorate([
        IonicPage(),
        Component({
            selector: 'vehicle-checks-modal-cat-d',
            templateUrl: 'vehicle-checks-modal.cat-d.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            FaultCountProvider,
            QuestionProvider,
            NavParams])
    ], VehicleChecksCatDModal);
    return VehicleChecksCatDModal;
}());
export { VehicleChecksCatDModal };
//# sourceMappingURL=vehicle-checks-modal.cat-d.page.js.map