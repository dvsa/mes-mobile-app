var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getVehicleChecks } from '../../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { merge } from 'rxjs';
import { ShowMeQuestionSeriousFault, ShowMeQuestionDangerousFault, ShowMeQuestionDrivingFault, ShowMeQuestionPassed, ShowMeQuestionRemoveFault, } from '../../../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode, ToggleRemoveFaultMode } from '../../../test-report.actions';
import { getTestReportState } from '../../../test-report.reducer';
import { isSeriousMode, isDangerousMode, isRemoveFaultMode } from '../../../test-report.selector';
import { map } from 'rxjs/operators';
import { isEmpty } from 'lodash';
var VehicleCheckComponent = /** @class */ (function () {
    function VehicleCheckComponent(store$) {
        var _this = this;
        this.store$ = store$;
        this.selectedShowMeQuestion = false;
        this.isRemoveFaultMode = false;
        this.isSeriousMode = false;
        this.isDangerousMode = false;
        this.onTap = function () {
            _this.addOrRemoveFault();
        };
        this.onPress = function () {
            _this.addOrRemoveFault(true);
        };
        this.toggleShowMeQuestion = function () {
            if (_this.hasShowMeDrivingFault() || _this.hasSeriousFault() || _this.hasDangerousFault()) {
                return;
            }
            if (_this.showMeQuestionFault === CompetencyOutcome.P) {
                _this.store$.dispatch(new ShowMeQuestionRemoveFault());
                return;
            }
            _this.store$.dispatch(new ShowMeQuestionPassed());
        };
        this.canButtonRipple = function () {
            if (_this.isRemoveFaultMode) {
                if (_this.hasDangerousFault() && _this.isDangerousMode) {
                    return true;
                }
                if (_this.hasSeriousFault() && _this.isSeriousMode) {
                    return true;
                }
                if (_this.hasShowMeDrivingFault() && !_this.isSeriousMode && !_this.isDangerousMode) {
                    return true;
                }
                return false;
            }
            return !(_this.hasDangerousFault() || _this.hasSeriousFault() || _this.hasShowMeDrivingFault());
        };
        this.addOrRemoveFault = function (wasPress) {
            if (wasPress === void 0) { wasPress = false; }
            if (_this.isRemoveFaultMode) {
                _this.removeFault();
                return;
            }
            _this.addFault(wasPress);
        };
        this.removeFault = function () {
            if (_this.hasDangerousFault() && _this.isDangerousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new ShowMeQuestionPassed());
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (_this.hasSeriousFault() && _this.isSeriousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new ShowMeQuestionPassed());
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (!_this.isSeriousMode && !_this.isDangerousMode && _this.isRemoveFaultMode && _this.hasShowMeDrivingFault()) {
                _this.store$.dispatch(new ShowMeQuestionPassed());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
            }
        };
        this.addFault = function (wasPress) {
            if (_this.hasShowMeDrivingFault() || _this.hasSeriousFault() || _this.hasDangerousFault()) {
                return;
            }
            if (_this.isDangerousMode) {
                _this.store$.dispatch(new ShowMeQuestionDangerousFault());
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                return;
            }
            if (_this.isSeriousMode) {
                _this.store$.dispatch(new ShowMeQuestionSeriousFault());
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                return;
            }
            if (wasPress) {
                _this.store$.dispatch(new ShowMeQuestionDrivingFault());
            }
        };
        this.getDrivingFaultCount = function () {
            if (_this.hasDangerousFault() || _this.hasSeriousFault()) {
                return 0;
            }
            if (_this.hasShowMeDrivingFault() || _this.hasTellMeDrivingFault()) {
                return 1;
            }
            return 0;
        };
        this.hasShowMeDrivingFault = function () {
            return _this.showMeQuestionFault === CompetencyOutcome.DF;
        };
        this.hasTellMeDrivingFault = function () {
            return _this.tellMeQuestionFault === CompetencyOutcome.DF;
        };
        this.hasSeriousFault = function () {
            return _this.showMeQuestionFault === CompetencyOutcome.S;
        };
        this.hasDangerousFault = function () {
            return _this.showMeQuestionFault === CompetencyOutcome.D;
        };
    }
    VehicleCheckComponent.prototype.ngOnInit = function () {
        var _this = this;
        var vehicleChecks$ = this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getVehicleChecks));
        var isSeriousMode$ = this.store$.pipe(select(getTestReportState), select(isSeriousMode));
        var isDangerousMode$ = this.store$.pipe(select(getTestReportState), select(isDangerousMode));
        var isRemoveFaultMode$ = this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode));
        this.subscription = merge(vehicleChecks$.pipe(map(function (vehicleChecks) {
            _this.tellMeQuestionFault = vehicleChecks.tellMeQuestion.outcome;
            _this.showMeQuestionFault = vehicleChecks.showMeQuestion.outcome;
            _this.selectedShowMeQuestion = !isEmpty(vehicleChecks.showMeQuestion.outcome);
        })), isSeriousMode$.pipe(map(function (toggle) { return _this.isSeriousMode = toggle; })), isDangerousMode$.pipe(map(function (toggle) { return _this.isDangerousMode = toggle; })), isRemoveFaultMode$.pipe(map(function (toggle) { return _this.isRemoveFaultMode = toggle; }))).subscribe();
    };
    VehicleCheckComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    VehicleCheckComponent = __decorate([
        Component({
            selector: 'vehicle-check',
            templateUrl: 'vehicle-check.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], VehicleCheckComponent);
    return VehicleCheckComponent;
}());
export { VehicleCheckComponent };
//# sourceMappingURL=vehicle-check.js.map