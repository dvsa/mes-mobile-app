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
import { getVehicleChecksCatADI2, getSelectedTellMeQuestions, } from '../../../../../modules/tests/test-data/cat-adi-part2/vehicle-checks/vehicle-checks.cat-adi-part2.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.reducer';
import { TellMeQuestionSelected, TellMeQuestionOutcomeChanged, } from '../../../../../modules/tests/test-data/cat-adi-part2/vehicle-checks/vehicle-checks.cat-adi-part2.action';
import { NUMBER_OF_TELL_ME_QUESTIONS, } from '../../../../../shared/constants/tell-me-questions/tell-me-questions.cat-adi-part2.constants';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { map } from 'rxjs/operators';
import * as vehicleChecksModalActions from './vehicle-checks-modal.cat-adi-part2.actions';
var VehicleChecksCatADIPart2Modal = /** @class */ (function () {
    function VehicleChecksCatADIPart2Modal(store$, navController, faultCountProvider, questionProvider) {
        this.store$ = store$;
        this.navController = navController;
        this.faultCountProvider = faultCountProvider;
        this.tellMeQuestionsNumberArray = Array(NUMBER_OF_TELL_ME_QUESTIONS);
        this.formGroup = new FormGroup({});
        this.tellMeQuestions = questionProvider.getTellMeQuestions("ADI2" /* ADI2 */);
    }
    VehicleChecksCatADIPart2Modal.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            tellMeQuestions$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatADI2), select(getSelectedTellMeQuestions)),
            vehicleChecksScore$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatADI2), map(function (vehicleChecks) {
                return _this.faultCountProvider.getVehicleChecksFaultCount("ADI2" /* ADI2 */, vehicleChecks);
            })),
        };
        var vehicleChecksScore$ = this.pageState.vehicleChecksScore$;
        var merged$ = merge(vehicleChecksScore$.pipe(map(function (score) { return _this.vehicleChecksScore = score; })));
        this.subscription = merged$.subscribe();
    };
    VehicleChecksCatADIPart2Modal.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    VehicleChecksCatADIPart2Modal.prototype.onSubmit = function () {
        this.navController.pop();
    };
    VehicleChecksCatADIPart2Modal.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new vehicleChecksModalActions.VehicleChecksViewDidEnter());
    };
    VehicleChecksCatADIPart2Modal.prototype.tellMeQuestionChanged = function (result, index) {
        this.store$.dispatch(new TellMeQuestionSelected(result, index));
    };
    VehicleChecksCatADIPart2Modal.prototype.tellMeQuestionOutcomeChanged = function (result, index) {
        this.store$.dispatch(new TellMeQuestionOutcomeChanged(result, index));
    };
    VehicleChecksCatADIPart2Modal = __decorate([
        IonicPage(),
        Component({
            selector: 'vehicle-checks-modal-cat-adi-part2',
            templateUrl: 'vehicle-checks-modal.cat-adi-part2.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            FaultCountProvider,
            QuestionProvider])
    ], VehicleChecksCatADIPart2Modal);
    return VehicleChecksCatADIPart2Modal;
}());
export { VehicleChecksCatADIPart2Modal };
//# sourceMappingURL=vehicle-checks-modal.cat-adi-part2.page.js.map