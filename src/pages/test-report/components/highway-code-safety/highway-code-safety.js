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
import * as highwayCodeSafetyAction from '../../../../modules/tests/test-data/common/highway-code-safety/highway-code-safety.actions';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { ToggleRemoveFaultMode, ToggleSeriousFaultMode } from '../../test-report.actions';
import { TestDataByCategoryProvider } from '../../../../providers/test-data-by-category/test-data-by-category';
import { getHighwayCodeSafety, } from '../../../../modules/tests/test-data/common/highway-code-safety/highway-code-safety.reducer';
import { isHighwayCodeSafetySelected, getHighwayCodeSafetySeriousFault, getHighwayCodeSafetyDrivingFault, } from '../../../../modules/tests/test-data/common/highway-code-safety/highway-code-safety.selectors';
var HighwayCodeSafetyComponent = /** @class */ (function () {
    function HighwayCodeSafetyComponent(store$, testDataByCategoryProvider) {
        var _this = this;
        this.store$ = store$;
        this.testDataByCategoryProvider = testDataByCategoryProvider;
        this.isRemoveFaultMode = false;
        this.isSeriousMode = false;
        this.isDangerousMode = false;
        this.selectedHighwayCodeSafety = false;
        this.highwayCodeSafetySeriousFault = false;
        this.highwayCodeSafetyDrivingFault = false;
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
        this.toggleHighwayCodeSafety = function () {
            if (_this.hasSeriousFault() || _this.faultCount() > 0) {
                return;
            }
            _this.store$.dispatch(new highwayCodeSafetyAction.ToggleHighwayCodeSafety());
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
                return;
            }
            if (_this.isSeriousMode) {
                _this.store$.dispatch(new highwayCodeSafetyAction.HighwayCodeSafetyAddSeriousFault());
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                return;
            }
            if (wasPress) {
                _this.store$.dispatch(new highwayCodeSafetyAction.HighwayCodeSafetyAddDrivingFault());
            }
        };
        this.removeFault = function () {
            if (_this.hasSeriousFault() && _this.isSeriousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new highwayCodeSafetyAction.HighwayCodeSafetyRemoveFault());
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (!_this.isSeriousMode && !_this.isDangerousMode && _this.isRemoveFaultMode && _this.faultCount() > 0) {
                _this.store$.dispatch(new highwayCodeSafetyAction.HighwayCodeSafetyRemoveFault());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
            }
        };
        this.faultCount = function () { return _this.highwayCodeSafetyDrivingFault ? 1 : 0; };
        this.hasSeriousFault = function () { return _this.highwayCodeSafetySeriousFault; };
        this.hasDangerousFault = function () { return false; };
    }
    HighwayCodeSafetyComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.componentState = {
            isRemoveFaultMode$: this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode)),
            isSeriousMode$: this.store$.pipe(select(getTestReportState), select(isSeriousMode)),
            isDangerousMode$: this.store$.pipe(select(getTestReportState), select(isDangerousMode)),
            selectedHighwayCodeSafety$: currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByCategoryCode(_this.testCategory)(data); }), select(getHighwayCodeSafety), select(isHighwayCodeSafetySelected)),
            highwayCodeSafetySeriousFault$: currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByCategoryCode(_this.testCategory)(data); }), select(getHighwayCodeSafety), select(getHighwayCodeSafetySeriousFault)),
            highwayCodeSafetyDrivingFault$: currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByCategoryCode(_this.testCategory)(data); }), select(getHighwayCodeSafety), select(getHighwayCodeSafetyDrivingFault)),
        };
        var _a = this.componentState, isRemoveFaultMode$ = _a.isRemoveFaultMode$, isSeriousMode$ = _a.isSeriousMode$, isDangerousMode$ = _a.isDangerousMode$, selectedHighwayCodeSafety$ = _a.selectedHighwayCodeSafety$, highwayCodeSafetySeriousFault$ = _a.highwayCodeSafetySeriousFault$, highwayCodeSafetyDrivingFault$ = _a.highwayCodeSafetyDrivingFault$;
        this.subscription = merge(isRemoveFaultMode$.pipe(map(function (toggle) { return _this.isRemoveFaultMode = toggle; })), isSeriousMode$.pipe(map(function (toggle) { return _this.isSeriousMode = toggle; })), isDangerousMode$.pipe(map(function (toggle) { return _this.isDangerousMode = toggle; })), selectedHighwayCodeSafety$.pipe(map(function (value) { return _this.selectedHighwayCodeSafety = value; })), highwayCodeSafetySeriousFault$.pipe(map(function (value) { return _this.highwayCodeSafetySeriousFault = value; })), highwayCodeSafetyDrivingFault$.pipe(map(function (value) { return _this.highwayCodeSafetyDrivingFault = value; }))).subscribe();
    };
    HighwayCodeSafetyComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HighwayCodeSafetyComponent.prototype, "testCategory", void 0);
    HighwayCodeSafetyComponent = __decorate([
        Component({
            selector: 'highway-code-safety',
            templateUrl: 'highway-code-safety.html',
        }),
        __metadata("design:paramtypes", [Store,
            TestDataByCategoryProvider])
    ], HighwayCodeSafetyComponent);
    return HighwayCodeSafetyComponent;
}());
export { HighwayCodeSafetyComponent };
//# sourceMappingURL=highway-code-safety.js.map