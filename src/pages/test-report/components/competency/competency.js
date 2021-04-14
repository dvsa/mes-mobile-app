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
import { ThrottleAddDrivingFault, RemoveDrivingFault, } from '../../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import { AddSeriousFault, RemoveSeriousFault, } from '../../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { AddDangerousFault, RemoveDangerousFault, } from '../../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { hasSeriousFault, hasDangerousFault, } from '../../../../modules/tests/test-data/common/test-data.selector';
import { getDrivingFaultCount } from '../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { ToggleRemoveFaultMode, ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../test-report.actions';
import { Competencies } from '../../../../modules/tests/test-data/test-data.constants';
import { competencyLabels } from '../../../../shared/constants/competencies/competencies';
import { getDelegatedTestIndicator } from '../../../../modules/tests/delegated-test/delegated-test.reducer';
import { isDelegatedTest } from '../../../../modules/tests/delegated-test/delegated-test.selector';
var CompetencyComponent = /** @class */ (function () {
    function CompetencyComponent(store$) {
        var _this = this;
        this.store$ = store$;
        this.isRemoveFaultMode = false;
        this.isSeriousMode = false;
        this.hasSeriousFault = false;
        this.isDangerousMode = false;
        this.hasDangerousFault = false;
        this.isDelegated = false;
        this.allowRipple = true;
        this.onTap = function () {
            _this.addOrRemoveFault(_this.isDelegated);
        };
        this.onPress = function () {
            _this.addOrRemoveFault(true);
        };
        this.canButtonRipple = function () {
            if (_this.isRemoveFaultMode) {
                if (_this.hasDangerousFault && _this.isDangerousMode) {
                    _this.allowRipple = true;
                    return;
                }
                if (_this.hasSeriousFault && _this.isSeriousMode) {
                    _this.allowRipple = true;
                    return;
                }
                if (!_this.isSeriousMode && !_this.isDangerousMode && _this.faultCount > 0) {
                    _this.allowRipple = true;
                    return;
                }
                _this.allowRipple = false;
                return;
            }
            if (_this.hasDangerousFault) {
                _this.allowRipple = false;
                return;
            }
            if (_this.isDangerousMode) {
                _this.allowRipple = true;
                return;
            }
            if (_this.hasSeriousFault) {
                _this.allowRipple = false;
                return;
            }
            if (_this.isSeriousMode) {
                _this.allowRipple = true;
                return;
            }
            _this.allowRipple = true;
        };
        this.getLabel = function () {
            if (_this.labelOverride) {
                return competencyLabels[_this.labelOverride];
            }
            return competencyLabels[_this.competency];
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
            if (_this.hasDangerousFault) {
                return;
            }
            if (_this.isDangerousMode) {
                _this.store$.dispatch(new AddDangerousFault(_this.competency));
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                return;
            }
            if (_this.hasSeriousFault) {
                return;
            }
            if (_this.isSeriousMode) {
                _this.store$.dispatch(new AddSeriousFault(_this.competency));
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                return;
            }
            if (wasPress) {
                var competency = _this.competency;
                return _this.store$.dispatch(new ThrottleAddDrivingFault({
                    competency: competency,
                    newFaultCount: _this.faultCount ? _this.faultCount + 1 : 1,
                }));
            }
        };
        this.removeFault = function () {
            if (_this.hasDangerousFault && _this.isDangerousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new RemoveDangerousFault(_this.competency));
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (_this.hasSeriousFault && _this.isSeriousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new RemoveSeriousFault(_this.competency));
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (!_this.isSeriousMode && !_this.isDangerousMode && _this.isRemoveFaultMode && _this.faultCount > 0) {
                _this.store$.dispatch(new RemoveDrivingFault({
                    competency: _this.competency,
                    newFaultCount: _this.faultCount ? _this.faultCount - 1 : 0,
                }));
                _this.store$.dispatch(new ToggleRemoveFaultMode());
            }
        };
        this.competencyHasFault = function () {
            return _this.hasDangerousFault || _this.hasSeriousFault || _this.hasDrivingFault();
        };
        this.hasDrivingFault = function () {
            return _this.faultCount !== undefined;
        };
    }
    CompetencyComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.competencyState = {
            isRemoveFaultMode$: this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode)),
            isSeriousMode$: this.store$.pipe(select(getTestReportState), select(isSeriousMode)),
            isDangerousMode$: this.store$.pipe(select(getTestReportState), select(isDangerousMode)),
            drivingFaultCount$: currentTest$.pipe(select(getTestData), select(function (testData) { return getDrivingFaultCount(testData, _this.competency); })),
            hasSeriousFault$: currentTest$.pipe(select(getTestData), select(function (testData) { return hasSeriousFault(testData, _this.competency); })),
            hasDangerousFault$: currentTest$.pipe(select(getTestData), select(function (testData) { return hasDangerousFault(testData, _this.competency); })),
            isDelegated$: currentTest$.pipe(select(getDelegatedTestIndicator), select(isDelegatedTest)),
        };
        var _a = this.competencyState, drivingFaultCount$ = _a.drivingFaultCount$, isRemoveFaultMode$ = _a.isRemoveFaultMode$, isSeriousMode$ = _a.isSeriousMode$, hasSeriousFault$ = _a.hasSeriousFault$, isDangerousMode$ = _a.isDangerousMode$, hasDangerousFault$ = _a.hasDangerousFault$, isDelegated$ = _a.isDelegated$;
        var merged$ = merge(drivingFaultCount$.pipe(map(function (count) { return _this.faultCount = count; })), isRemoveFaultMode$.pipe(map(function (toggle) { return _this.isRemoveFaultMode = toggle; })), isSeriousMode$.pipe(map(function (toggle) { return _this.isSeriousMode = toggle; })), hasSeriousFault$.pipe(map(function (toggle) { return _this.hasSeriousFault = toggle; })), isDangerousMode$.pipe(map(function (toggle) { return _this.isDangerousMode = toggle; })), hasDangerousFault$.pipe(map(function (toggle) { return _this.hasDangerousFault = toggle; })), isDelegated$.pipe(map(function (toggle) { return _this.isDelegated = toggle; }))).pipe(tap(this.canButtonRipple));
        this.subscription = merged$.subscribe();
    };
    CompetencyComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CompetencyComponent.prototype, "competency", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CompetencyComponent.prototype, "labelOverride", void 0);
    CompetencyComponent = __decorate([
        Component({
            selector: 'competency',
            templateUrl: 'competency.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], CompetencyComponent);
    return CompetencyComponent;
}());
export { CompetencyComponent };
//# sourceMappingURL=competency.js.map