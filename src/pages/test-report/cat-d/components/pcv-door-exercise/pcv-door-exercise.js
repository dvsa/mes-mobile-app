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
import { Store, select } from '@ngrx/store';
import { merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PcvDoorExerciseAddDangerousFault, PcvDoorExerciseAddDrivingFault, PcvDoorExerciseAddSeriousFault, PcvDoorExerciseRemoveSeriousFault, PcvDoorExerciseRemoveDangerousFault, PcvDoorExerciseRemoveDrivingFault, } from '../../../../../modules/tests/test-data/cat-d/pcv-door-exercise/pcv-door-exercise.actions';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-d/test-data.cat-d.reducer';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getTestReportState } from '../../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../../test-report.selector';
import { ToggleRemoveFaultMode, ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../../test-report.actions';
import { getPcvDoorExercise } from '../../../../../modules/tests/test-data/cat-d/pcv-door-exercise/pcv-door-exercise.reducer';
import { get } from 'lodash';
var PcvDoorExerciseComponent = /** @class */ (function () {
    function PcvDoorExerciseComponent(store$) {
        var _this = this;
        this.store$ = store$;
        this.oneFaultLimit = false;
        this.isRemoveFaultMode = false;
        this.isSeriousMode = false;
        this.isDangerousMode = false;
        this.allowRipple = true;
        this.onTap = function () {
            _this.addOrRemoveFault();
        };
        this.onPress = function () {
            _this.addOrRemoveFault(true);
        };
        this.canButtonRipple = function () {
            if (_this.isRemoveFaultMode) {
                if (_this.hasDangerousFault() && _this.isDangerousMode) {
                    _this.allowRipple = true;
                    return;
                }
                if (_this.hasSeriousFault() && _this.isSeriousMode) {
                    _this.allowRipple = true;
                    return;
                }
                if (!_this.isSeriousMode && !_this.isDangerousMode && _this.hasDrivingFault()) {
                    _this.allowRipple = true;
                    return;
                }
                _this.allowRipple = false;
            }
            else {
                if (_this.hasDangerousFault()) {
                    _this.allowRipple = false;
                    return;
                }
                if (_this.isDangerousMode) {
                    _this.allowRipple = true;
                    return;
                }
                if (_this.hasSeriousFault()) {
                    _this.allowRipple = false;
                    return;
                }
                if (_this.isSeriousMode) {
                    _this.allowRipple = true;
                    return;
                }
                _this.allowRipple = true;
            }
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
            if (_this.hasDangerousFault()) {
                return;
            }
            if (_this.isDangerousMode) {
                _this.store$.dispatch(new PcvDoorExerciseAddDangerousFault());
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                return;
            }
            if (_this.hasSeriousFault()) {
                return;
            }
            if (_this.isSeriousMode) {
                _this.store$.dispatch(new PcvDoorExerciseAddSeriousFault());
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                return;
            }
            if (wasPress) {
                _this.store$.dispatch(new PcvDoorExerciseAddDrivingFault());
                return;
            }
        };
        this.removeFault = function () {
            if (_this.hasDangerousFault() && _this.isDangerousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new PcvDoorExerciseRemoveDangerousFault());
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (_this.hasSeriousFault() && _this.isSeriousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new PcvDoorExerciseRemoveSeriousFault());
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (!_this.isSeriousMode && !_this.isDangerousMode && _this.isRemoveFaultMode && _this.hasDrivingFault()) {
                _this.store$.dispatch(new PcvDoorExerciseRemoveDrivingFault());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
        };
        this.competencyHasFault = function () {
            return _this.hasDangerousFault() || _this.hasSeriousFault() || _this.hasDrivingFault();
        };
        this.hasDrivingFault = function () {
            return get(_this.pcvDoorExercise, 'drivingFault', false);
        };
        this.hasSeriousFault = function () {
            return get(_this.pcvDoorExercise, 'seriousFault', false);
        };
        this.hasDangerousFault = function () {
            return get(_this.pcvDoorExercise, 'dangerousFault', false);
        };
    }
    PcvDoorExerciseComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.competencyState = {
            isRemoveFaultMode$: this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode)),
            isSeriousMode$: this.store$.pipe(select(getTestReportState), select(isSeriousMode)),
            isDangerousMode$: this.store$.pipe(select(getTestReportState), select(isDangerousMode)),
            pcvDoorExercise$: currentTest$.pipe(select(getTestData), select(getPcvDoorExercise)),
        };
        var _a = this.competencyState, isRemoveFaultMode$ = _a.isRemoveFaultMode$, isSeriousMode$ = _a.isSeriousMode$, isDangerousMode$ = _a.isDangerousMode$, pcvDoorExercise$ = _a.pcvDoorExercise$;
        var merged$ = merge(isRemoveFaultMode$.pipe(map(function (toggle) { return _this.isRemoveFaultMode = toggle; })), isSeriousMode$.pipe(map(function (toggle) { return _this.isSeriousMode = toggle; })), isDangerousMode$.pipe(map(function (toggle) { return _this.isDangerousMode = toggle; })), pcvDoorExercise$.pipe(map(function (toggle) { return _this.pcvDoorExercise = toggle; }))).pipe(tap(this.canButtonRipple));
        this.subscription = merged$.subscribe();
    };
    PcvDoorExerciseComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PcvDoorExerciseComponent.prototype, "oneFaultLimit", void 0);
    PcvDoorExerciseComponent = __decorate([
        Component({
            selector: 'pcv-door-exercise',
            templateUrl: 'pcv-door-exercise.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], PcvDoorExerciseComponent);
    return PcvDoorExerciseComponent;
}());
export { PcvDoorExerciseComponent };
//# sourceMappingURL=pcv-door-exercise.js.map