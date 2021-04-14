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
import { getTestData } from '../../../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.reducer';
import { getVehicleChecksCatADIPart2, hasVehicleChecksBeenCompletedCatADI2 } from '../../../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.selector';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { merge } from 'rxjs';
import { VehicleChecksAddSeriousFault, VehicleChecksAddDangerousFault, VehicleChecksRemoveSeriousFault, VehicleChecksRemoveDangerousFault, ShowMeQuestionAddDrivingFault, ShowMeQuestionRemoveDrivingFault, VehicleChecksCompletedToggle, } from '../../../../../modules/tests/test-data/cat-adi-part2/vehicle-checks/vehicle-checks.cat-adi-part2.action';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode, ToggleRemoveFaultMode } from '../../../test-report.actions';
import { getTestReportState } from '../../../test-report.reducer';
import { isSeriousMode, isDangerousMode, isRemoveFaultMode } from '../../../test-report.selector';
import { map } from 'rxjs/operators';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
var VehicleCheckComponent = /** @class */ (function () {
    function VehicleCheckComponent(store$, faultCountProvider) {
        var _this = this;
        this.store$ = store$;
        this.faultCountProvider = faultCountProvider;
        this.selectedShowMeQuestion = false;
        this.vehicleChecksCompleted = false;
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
            _this.store$.dispatch(new VehicleChecksCompletedToggle());
            _this.selectedShowMeQuestion = !_this.selectedShowMeQuestion;
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
                _this.store$.dispatch(new VehicleChecksRemoveDangerousFault());
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (_this.hasSeriousFault() && _this.isSeriousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new VehicleChecksRemoveSeriousFault());
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (!_this.isSeriousMode && !_this.isDangerousMode && _this.isRemoveFaultMode && _this.hasShowMeDrivingFault()) {
                _this.store$.dispatch(new ShowMeQuestionRemoveDrivingFault(_this.showMeQuestionFaultCount - 1));
                _this.store$.dispatch(new ToggleRemoveFaultMode());
            }
        };
        this.addFault = function (wasPress) {
            if (_this.isDangerousMode) {
                _this.store$.dispatch(new VehicleChecksAddDangerousFault());
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                return;
            }
            if (_this.isSeriousMode) {
                _this.store$.dispatch(new VehicleChecksAddSeriousFault());
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                return;
            }
            if (wasPress) {
                if (_this.getDrivingFaultCount() < 4 && _this.showMeQuestionFaultCount < 2) {
                    _this.store$.dispatch(new ShowMeQuestionAddDrivingFault(_this.showMeQuestionFaultCount));
                }
            }
        };
        this.getDrivingFaultCount = function () {
            if (_this.hasShowMeDrivingFault() || _this.hasTellMeDrivingFault()) {
                return _this.showMeQuestionFaultCount + _this.tellMeQuestionFaultCount;
            }
            return 0;
        };
        this.hasShowMeDrivingFault = function () {
            var showMeQuestions = _this.vehicleChecks.showMeQuestions;
            if (!showMeQuestions) {
                return false;
            }
            return showMeQuestions.some(function (e) {
                if (!e) {
                    return false;
                }
                return e.outcome === CompetencyOutcome.DF;
            });
        };
        this.hasTellMeDrivingFault = function () {
            var tellMeQuestions = _this.vehicleChecks.tellMeQuestions;
            if (!tellMeQuestions) {
                return false;
            }
            return tellMeQuestions.some(function (e) {
                if (!e) {
                    return false;
                }
                return e.outcome === CompetencyOutcome.DF;
            });
        };
        this.hasSeriousFault = function () {
            return _this.vehicleChecks.seriousFault;
        };
        this.hasDangerousFault = function () {
            return _this.vehicleChecks.dangerousFault;
        };
    }
    VehicleCheckComponent.prototype.ngOnInit = function () {
        var _this = this;
        var vehicleChecks$ = this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getVehicleChecksCatADIPart2));
        var isSeriousMode$ = this.store$.pipe(select(getTestReportState), select(isSeriousMode));
        var isDangerousMode$ = this.store$.pipe(select(getTestReportState), select(isDangerousMode));
        var isRemoveFaultMode$ = this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode));
        var vehicleChecksCompleted$ = merge(vehicleChecks$.pipe(select(hasVehicleChecksBeenCompletedCatADI2)));
        this.subscription = merge(vehicleChecks$.pipe(map(function (vehicleChecks) {
            _this.vehicleChecks = vehicleChecks;
            _this.tellMeQuestionFaultCount = _this.faultCountProvider.getVehicleChecksFaultCount("ADI2" /* ADI2 */, { tellMeQuestions: vehicleChecks.tellMeQuestions }).drivingFaults;
            _this.showMeQuestionFaultCount = _this.faultCountProvider.getVehicleChecksFaultCount("ADI2" /* ADI2 */, { showMeQuestions: vehicleChecks.showMeQuestions }).drivingFaults;
        })), vehicleChecksCompleted$.pipe(map(function (toggle) { return _this.vehicleChecksCompleted = toggle; })), isSeriousMode$.pipe(map(function (toggle) { return _this.isSeriousMode = toggle; })), isDangerousMode$.pipe(map(function (toggle) { return _this.isDangerousMode = toggle; })), isRemoveFaultMode$.pipe(map(function (toggle) { return _this.isRemoveFaultMode = toggle; }))).subscribe();
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
        __metadata("design:paramtypes", [Store,
            FaultCountProvider])
    ], VehicleCheckComponent);
    return VehicleCheckComponent;
}());
export { VehicleCheckComponent };
//# sourceMappingURL=vehicle-check.js.map