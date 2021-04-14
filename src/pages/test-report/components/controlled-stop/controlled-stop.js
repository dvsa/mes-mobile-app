var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import * as controlledStopAction from '../../../../modules/tests/test-data/common/controlled-stop/controlled-stop.actions';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { ToggleRemoveFaultMode, ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../test-report.actions';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { TestDataByCategoryProvider } from '../../../../providers/test-data-by-category/test-data-by-category';
import { getControlledStop } from '../../../../modules/tests/test-data/common/controlled-stop/controlled-stop.reducer';
import { isControlledStopSelected, getControlledStopFault, } from '../../../../modules/tests/test-data/common/controlled-stop/controlled-stop.selectors';
var ControlledStopComponent = /** @class */ (function () {
    function ControlledStopComponent(store$, testDataByCategoryProvider) {
        var _this = this;
        this.store$ = store$;
        this.testDataByCategoryProvider = testDataByCategoryProvider;
        this.isRemoveFaultMode = false;
        this.isSeriousMode = false;
        this.isDangerousMode = false;
        this.selectedControlledStop = false;
        this.onTap = function () {
            _this.addOrRemoveFault();
        };
        this.onPress = function () {
            _this.addOrRemoveFault(true);
        };
        this.canButtonRipple = function () {
            if (_this.isRemoveFaultMode) {
                if (_this.hasDangerousFault() && _this.isDangerousMode) {
                    return true;
                }
                if (_this.hasSeriousFault() && _this.isSeriousMode) {
                    return true;
                }
                if (!_this.isSeriousMode && !_this.isDangerousMode && _this.faultCount() > 0) {
                    return true;
                }
                return false;
            }
            return !(_this.hasDangerousFault() || _this.hasSeriousFault() || _this.faultCount() > 0);
        };
        this.toggleControlledStop = function () {
            if (_this.hasDangerousFault() || _this.hasSeriousFault() || _this.faultCount() > 0) {
                return;
            }
            _this.store$.dispatch(new controlledStopAction.ToggleControlledStop());
        };
        this.addOrRemoveFault = function (wasPress) {
            if (wasPress === void 0) { wasPress = false; }
            if (_this.isRemoveFaultMode) {
                _this.removeFault();
            }
            else {
                _this.addFault(wasPress);
            }
        };
        this.addFault = function (wasPress) {
            if (_this.hasDangerousFault() || _this.hasSeriousFault() || _this.faultCount() > 0) {
                return;
            }
            if (_this.isDangerousMode) {
                _this.store$.dispatch(new controlledStopAction.ControlledStopAddDangerousFault());
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                return;
            }
            if (_this.isSeriousMode) {
                _this.store$.dispatch(new controlledStopAction.ControlledStopAddSeriousFault());
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                return;
            }
            if (wasPress) {
                _this.store$.dispatch(new controlledStopAction.ControlledStopAddDrivingFault());
            }
        };
        this.removeFault = function () {
            if (_this.hasDangerousFault() && _this.isDangerousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new controlledStopAction.ControlledStopRemoveFault());
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (_this.hasSeriousFault() && _this.isSeriousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new controlledStopAction.ControlledStopRemoveFault());
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (!_this.isSeriousMode && !_this.isDangerousMode && _this.isRemoveFaultMode && _this.faultCount() > 0) {
                _this.store$.dispatch(new controlledStopAction.ControlledStopRemoveFault());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
            }
        };
        this.faultCount = function () { return _this.controlledStopOutcome === CompetencyOutcome.DF ? 1 : 0; };
        this.hasSeriousFault = function () { return _this.controlledStopOutcome === CompetencyOutcome.S; };
        this.hasDangerousFault = function () { return _this.controlledStopOutcome === CompetencyOutcome.D; };
    }
    ControlledStopComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.componentState = {
            isRemoveFaultMode$: this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode)),
            isSeriousMode$: this.store$.pipe(select(getTestReportState), select(isSeriousMode)),
            isDangerousMode$: this.store$.pipe(select(getTestReportState), select(isDangerousMode)),
            selectedControlledStop$: currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByCategoryCode(_this.testCategory)(data); }), select(getControlledStop), select(isControlledStopSelected)),
            controlledStopOutcome$: currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByCategoryCode(_this.testCategory)(data); }), select(getControlledStop), select(getControlledStopFault)),
        };
        var _a = this.componentState, isRemoveFaultMode$ = _a.isRemoveFaultMode$, isSeriousMode$ = _a.isSeriousMode$, isDangerousMode$ = _a.isDangerousMode$, selectedControlledStop$ = _a.selectedControlledStop$, controlledStopOutcome$ = _a.controlledStopOutcome$;
        this.subscription = merge(isRemoveFaultMode$.pipe(map(function (toggle) { return _this.isRemoveFaultMode = toggle; })), isSeriousMode$.pipe(map(function (toggle) { return _this.isSeriousMode = toggle; })), isDangerousMode$.pipe(map(function (toggle) { return _this.isDangerousMode = toggle; })), selectedControlledStop$.pipe(map(function (value) { return _this.selectedControlledStop = value; })), controlledStopOutcome$.pipe(map(function (outcome) { return _this.controlledStopOutcome = outcome; }))).subscribe();
    };
    ControlledStopComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ControlledStopComponent.prototype, "testCategory", void 0);
    ControlledStopComponent = __decorate([
        Component({
            selector: 'controlled-stop',
            templateUrl: 'controlled-stop.html',
        }),
        __metadata("design:paramtypes", [Store,
            TestDataByCategoryProvider])
    ], ControlledStopComponent);
    return ControlledStopComponent;
}());
export { ControlledStopComponent };
//# sourceMappingURL=controlled-stop.js.map