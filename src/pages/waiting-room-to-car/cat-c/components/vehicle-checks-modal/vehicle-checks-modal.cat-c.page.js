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
import { getCandidate } from '../../../../../modules/tests/journal-data/cat-c/candidate/candidate.cat-c.reducer';
import { getUntitledCandidateName } from '../../../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { merge } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../../../providers/question/question';
import { getTestData } from '../../../../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import { ShowMeQuestionSelected, ShowMeQuestionOutcomeChanged, TellMeQuestionSelected, TellMeQuestionOutcomeChanged, } from '../../../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';
import { NUMBER_OF_TELL_ME_QUESTIONS as NUMBER_OF_TELL_ME_QUESTIONS_NON_TRAILER, } from '../../../../../shared/constants/tell-me-questions/tell-me-questions.vocational.constants';
import { NUMBER_OF_SHOW_ME_QUESTIONS as NUMBER_OF_SHOW_ME_QUESTIONS_NON_TRAILER, } from '../../../../../shared/constants/show-me-questions/show-me-questions.vocational.constants';
import { NUMBER_OF_TELL_ME_QUESTIONS as NUMBER_OF_TELL_ME_QUESTIONS_TRAILER, } from '../../../../../shared/constants/tell-me-questions/tell-me-questions.vocational-trailer.constants';
import { NUMBER_OF_SHOW_ME_QUESTIONS as NUMBER_OF_SHOW_ME_QUESTIONS_TRAILER, } from '../../../../../shared/constants/show-me-questions/show-me-questions.vocational-trailer.constants';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { map } from 'rxjs/operators';
import * as vehicleChecksModalActions from './vehicle-checks-modal.cat-c.actions';
import { getVehicleChecksCatC, getSelectedShowMeQuestions, getSelectedTellMeQuestions, } from '../../../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.selector';
var VehicleChecksCatCModal = /** @class */ (function () {
    function VehicleChecksCatCModal(store$, navController, faultCountProvider, questionProvider, params) {
        var _this = this;
        this.store$ = store$;
        this.navController = navController;
        this.faultCountProvider = faultCountProvider;
        this.shouldDisplayBanner = function () {
            return _this.isTrailerBanner() || _this.isNonTrailerBanner();
        };
        this.category = params.get('category');
        this.setNumberOfShowMeTellMeQuestions();
        this.formGroup = new FormGroup({});
        this.showMeQuestions = questionProvider.getShowMeQuestions(this.category);
        this.tellMeQuestions = questionProvider.getTellMeQuestions(this.category);
    }
    VehicleChecksCatCModal.prototype.setNumberOfShowMeTellMeQuestions = function () {
        var numberOfShowMeQuestions;
        var numberOfTellMeQuestions;
        switch (this.category) {
            case "C" /* C */:
            case "C1" /* C1 */:
                numberOfShowMeQuestions = NUMBER_OF_SHOW_ME_QUESTIONS_NON_TRAILER;
                numberOfTellMeQuestions = NUMBER_OF_TELL_ME_QUESTIONS_NON_TRAILER;
                break;
            case "C+E" /* CE */:
            case "C1+E" /* C1E */:
                numberOfShowMeQuestions = NUMBER_OF_SHOW_ME_QUESTIONS_TRAILER;
                numberOfTellMeQuestions = NUMBER_OF_TELL_ME_QUESTIONS_TRAILER;
        }
        this.showMeQuestionsNumberArray = Array(numberOfShowMeQuestions);
        this.tellMeQuestionsNumberArray = Array(numberOfTellMeQuestions);
    };
    VehicleChecksCatCModal.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            showMeQuestions$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatC), select(getSelectedShowMeQuestions)),
            tellMeQuestions$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatC), select(getSelectedTellMeQuestions)),
            vehicleChecksScore$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatC), map(function (vehicleChecks) {
                return _this.faultCountProvider.getVehicleChecksFaultCount(_this.category, vehicleChecks);
            })),
        };
        var vehicleChecksScore$ = this.pageState.vehicleChecksScore$;
        var merged$ = merge(vehicleChecksScore$.pipe(map(function (score) { return (_this.vehicleChecksScore = score); })));
        this.subscription = merged$.subscribe();
    };
    VehicleChecksCatCModal.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    VehicleChecksCatCModal.prototype.onSubmit = function () {
        this.navController.pop();
    };
    VehicleChecksCatCModal.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new vehicleChecksModalActions.VehicleChecksViewDidEnter());
    };
    VehicleChecksCatCModal.prototype.showMeQuestionChanged = function (result, index) {
        this.store$.dispatch(new ShowMeQuestionSelected(result, index));
    };
    VehicleChecksCatCModal.prototype.showMeQuestionOutcomeChanged = function (result, index) {
        this.store$.dispatch(new ShowMeQuestionOutcomeChanged(result, index));
    };
    VehicleChecksCatCModal.prototype.tellMeQuestionChanged = function (result, index) {
        this.store$.dispatch(new TellMeQuestionSelected(result, index));
    };
    VehicleChecksCatCModal.prototype.tellMeQuestionOutcomeChanged = function (result, index) {
        this.store$.dispatch(new TellMeQuestionOutcomeChanged(result, index));
    };
    VehicleChecksCatCModal.prototype.isNonTrailerBanner = function () {
        return (this.vehicleChecksScore.drivingFaults === 4 &&
            this.vehicleChecksScore.seriousFaults === 1 &&
            (this.category === "C" /* C */ || this.category === "C1" /* C1 */));
    };
    VehicleChecksCatCModal.prototype.isTrailerBanner = function () {
        return (this.vehicleChecksScore.drivingFaults === 1 &&
            this.vehicleChecksScore.seriousFaults === 1 &&
            (this.category === "C+E" /* CE */ || this.category === "C1+E" /* C1E */));
    };
    VehicleChecksCatCModal = __decorate([
        IonicPage(),
        Component({
            selector: 'vehicle-checks-modal-cat-c',
            templateUrl: 'vehicle-checks-modal.cat-c.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            FaultCountProvider,
            QuestionProvider,
            NavParams])
    ], VehicleChecksCatCModal);
    return VehicleChecksCatCModal;
}());
export { VehicleChecksCatCModal };
//# sourceMappingURL=vehicle-checks-modal.cat-c.page.js.map