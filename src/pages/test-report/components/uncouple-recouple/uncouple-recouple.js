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
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { merge } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { isDangerousMode, isRemoveFaultMode, isSeriousMode } from '../../test-report.selector';
import { map } from 'rxjs/operators';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getTestReportState } from '../../test-report.reducer';
import { get } from 'lodash';
import { ToggleDangerousFaultMode, ToggleRemoveFaultMode, ToggleSeriousFaultMode } from '../../test-report.actions';
import { ToggleUncoupleRecouple, UncoupleRecoupleAddDangerousFault, UncoupleRecoupleAddDrivingFault, UncoupleRecoupleAddSeriousFault, UncoupleRecoupleRemoveFault, } from '../../../../modules/tests/test-data/common/uncouple-recouple/uncouple-recouple.actions';
import { TestDataByCategoryProvider } from '../../../../providers/test-data-by-category/test-data-by-category';
var UncoupleRecoupleComponent = /** @class */ (function () {
    function UncoupleRecoupleComponent(store$, testDataByCategory) {
        var _this = this;
        this.store$ = store$;
        this.testDataByCategory = testDataByCategory;
        this.isRemoveFaultMode = false;
        this.isSeriousMode = false;
        this.isDangerousMode = false;
        this.selectedUncoupleRecouple = false;
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
        this.toggleUncoupleRecouple = function () {
            if (_this.hasDangerousFault() || _this.hasSeriousFault() || _this.faultCount() > 0) {
                return;
            }
            _this.store$.dispatch(new ToggleUncoupleRecouple());
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
                _this.store$.dispatch(new UncoupleRecoupleAddDangerousFault());
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                return;
            }
            if (_this.isSeriousMode) {
                _this.store$.dispatch(new UncoupleRecoupleAddSeriousFault());
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                return;
            }
            if (wasPress) {
                _this.store$.dispatch(new UncoupleRecoupleAddDrivingFault());
            }
        };
        this.removeFault = function () {
            if (_this.hasDangerousFault() && _this.isDangerousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new UncoupleRecoupleRemoveFault());
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (_this.hasSeriousFault() && _this.isSeriousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new UncoupleRecoupleRemoveFault());
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (!_this.isSeriousMode && !_this.isDangerousMode && _this.isRemoveFaultMode && _this.faultCount() > 0) {
                _this.store$.dispatch(new UncoupleRecoupleRemoveFault());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
            }
        };
        this.faultCount = function () { return _this.uncoupleRecoupleOutcome === CompetencyOutcome.DF ? 1 : 0; };
        this.hasSeriousFault = function () { return _this.uncoupleRecoupleOutcome === CompetencyOutcome.S; };
        this.hasDangerousFault = function () { return _this.uncoupleRecoupleOutcome === CompetencyOutcome.D; };
    }
    UncoupleRecoupleComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.componentState = {
            isRemoveFaultMode$: this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode)),
            isSeriousMode$: this.store$.pipe(select(getTestReportState), select(isSeriousMode)),
            isDangerousMode$: this.store$.pipe(select(getTestReportState), select(isDangerousMode)),
            selectedUncoupleRecouple$: currentTest$.pipe(map(function (data) { return _this.testDataByCategory.getTestDataByCategoryCode(_this.category)(data); }), select(function (testData) { return get(testData, 'uncoupleRecouple.selected'); })),
            uncoupleRecoupleOutcome$: currentTest$.pipe(map(function (data) { return _this.testDataByCategory.getTestDataByCategoryCode(_this.category)(data); }), select(function (testData) { return get(testData, 'uncoupleRecouple.fault'); })),
        };
        var _a = this.componentState, isRemoveFaultMode$ = _a.isRemoveFaultMode$, isSeriousMode$ = _a.isSeriousMode$, isDangerousMode$ = _a.isDangerousMode$, selectedUncoupleRecouple$ = _a.selectedUncoupleRecouple$, uncoupleRecoupleOutcome$ = _a.uncoupleRecoupleOutcome$;
        this.subscription = merge(isRemoveFaultMode$.pipe(map(function (toggle) { return _this.isRemoveFaultMode = toggle; })), isSeriousMode$.pipe(map(function (toggle) { return _this.isSeriousMode = toggle; })), isDangerousMode$.pipe(map(function (toggle) { return _this.isDangerousMode = toggle; })), selectedUncoupleRecouple$.pipe(map(function (value) { return _this.selectedUncoupleRecouple = value; })), uncoupleRecoupleOutcome$.pipe(map(function (outcome) { return _this.uncoupleRecoupleOutcome = outcome; }))).subscribe();
    };
    UncoupleRecoupleComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], UncoupleRecoupleComponent.prototype, "category", void 0);
    UncoupleRecoupleComponent = __decorate([
        Component({
            selector: 'uncouple-recouple',
            templateUrl: 'uncouple-recouple.html',
        }),
        __metadata("design:paramtypes", [Store,
            TestDataByCategoryProvider])
    ], UncoupleRecoupleComponent);
    return UncoupleRecoupleComponent;
}());
export { UncoupleRecoupleComponent };
//# sourceMappingURL=uncouple-recouple.js.map