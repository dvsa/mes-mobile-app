var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { merge } from 'rxjs';
import { Component, Input } from '@angular/core';
import { SingleFaultCompetencyNames } from '../../../../modules/tests/test-data/test-data.constants';
import { Store, select } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { ToggleDangerousFaultMode, ToggleRemoveFaultMode, ToggleSeriousFaultMode } from '../../test-report.actions';
import { RemoveSingleFaultCompetencyOutcome, SetSingleFaultCompetencyOutcome, RemoveSingleDangerousFaultCompetencyOutcome, RemoveSingleSeriousFaultCompetencyOutcome, } from '../../../../modules/tests/test-data/common/single-fault-competencies/single-fault-competencies.actions';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { getSingleFaultCompetencies, hasCompetencyDrivingFault, hasCompetencySeriousFault, hasCompetencyDangerousFault, } from '../../../../modules/tests/test-data/common/single-fault-competencies/single-fault-competencies.selector';
import { competencyLabels } from '../../../../shared/constants/competencies/competencies';
var SingleFaultCompetencyComponent = /** @class */ (function () {
    function SingleFaultCompetencyComponent(store$) {
        var _this = this;
        this.store$ = store$;
        this.isRemoveFaultMode = false;
        this.hasDrivingFault = false;
        this.isSeriousMode = false;
        this.hasSeriousFault = false;
        this.isDangerousMode = false;
        this.hasDangerousFault = false;
        this.allowRipple = true;
        this.onTap = function () {
            _this.addOrRemoveFault();
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
                if (!_this.isSeriousMode && !_this.isDangerousMode && _this.hasDrivingFault) {
                    _this.allowRipple = true;
                    return;
                }
                _this.allowRipple = false;
                return;
            }
            if (_this.competencyHasFault()) {
                _this.allowRipple = false;
                return;
            }
            _this.allowRipple = true;
        };
        this.getLabel = function () { return competencyLabels[_this.competency]; };
        this.addOrRemoveFault = function (wasPress) {
            if (wasPress === void 0) { wasPress = false; }
            if (_this.isRemoveFaultMode) {
                _this.removeFault();
            }
            else {
                _this.addFault(wasPress);
            }
        };
        this.removeFault = function () {
            if (_this.hasDangerousFault && _this.isDangerousMode) {
                _this.store$.dispatch(new RemoveSingleDangerousFaultCompetencyOutcome(_this.competency));
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (_this.hasSeriousFault && _this.isSeriousMode) {
                _this.store$.dispatch(new RemoveSingleSeriousFaultCompetencyOutcome(_this.competency));
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (!_this.isSeriousMode && !_this.isDangerousMode && _this.hasDrivingFault) {
                _this.store$.dispatch(new RemoveSingleFaultCompetencyOutcome(_this.competency));
                _this.store$.dispatch(new ToggleRemoveFaultMode());
            }
        };
        this.addFault = function (wasPress) {
            if (_this.competencyHasFault()) {
                return;
            }
            if (_this.isDangerousMode) {
                _this.store$.dispatch(new SetSingleFaultCompetencyOutcome(_this.competency, CompetencyOutcome.D));
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                return;
            }
            if (_this.isSeriousMode) {
                _this.store$.dispatch(new SetSingleFaultCompetencyOutcome(_this.competency, CompetencyOutcome.S));
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                return;
            }
            if (wasPress) {
                _this.store$.dispatch(new SetSingleFaultCompetencyOutcome(_this.competency, CompetencyOutcome.DF));
            }
        };
        this.competencyHasFault = function () {
            return _this.hasDangerousFault || _this.hasSeriousFault || _this.hasDrivingFault;
        };
        this.getFaultCount = function () {
            return _this.hasDrivingFault ? 1 : 0;
        };
    }
    SingleFaultCompetencyComponent.prototype.ngOnInit = function () {
        var _this = this;
        var singleFaultCompetencies$ = this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getSingleFaultCompetencies));
        this.singleFaultCompetencyState = {
            isRemoveFaultMode$: this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode)),
            isSeriousMode$: this.store$.pipe(select(getTestReportState), select(isSeriousMode)),
            isDangerousMode$: this.store$.pipe(select(getTestReportState), select(isDangerousMode)),
            hasDrivingFault$: singleFaultCompetencies$.pipe(select(function (singleFaultCompetencies) { return hasCompetencyDrivingFault(singleFaultCompetencies, _this.competency); })),
            hasSeriousFault$: singleFaultCompetencies$.pipe(select(function (singleFaultCompetencies) { return hasCompetencySeriousFault(singleFaultCompetencies, _this.competency); })),
            hasDangerousFault$: singleFaultCompetencies$.pipe(select(function (singleFaultCompetencies) { return hasCompetencyDangerousFault(singleFaultCompetencies, _this.competency); })),
        };
        var _a = this.singleFaultCompetencyState, isRemoveFaultMode$ = _a.isRemoveFaultMode$, isSeriousMode$ = _a.isSeriousMode$, isDangerousMode$ = _a.isDangerousMode$, hasDrivingFault$ = _a.hasDrivingFault$, hasSeriousFault$ = _a.hasSeriousFault$, hasDangerousFault$ = _a.hasDangerousFault$;
        var merged$ = merge(isRemoveFaultMode$.pipe(map(function (toggle) { return _this.isRemoveFaultMode = toggle; })), isSeriousMode$.pipe(map(function (toggle) { return _this.isSeriousMode = toggle; })), isDangerousMode$.pipe(map(function (toggle) { return _this.isDangerousMode = toggle; })), hasDrivingFault$.pipe(map(function (hasfault) { return _this.hasDrivingFault = hasfault; })), hasSeriousFault$.pipe(map(function (hasfault) { return _this.hasSeriousFault = hasfault; })), hasDangerousFault$.pipe(map(function (hasfault) { return _this.hasDangerousFault = hasfault; }))).pipe(tap(this.canButtonRipple));
        this.subscription = merged$.subscribe();
    };
    SingleFaultCompetencyComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SingleFaultCompetencyComponent.prototype, "competency", void 0);
    SingleFaultCompetencyComponent = __decorate([
        Component({
            selector: 'single-fault-competency',
            templateUrl: 'single-fault-competency.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], SingleFaultCompetencyComponent);
    return SingleFaultCompetencyComponent;
}());
export { SingleFaultCompetencyComponent };
//# sourceMappingURL=single-fault-competency.js.map