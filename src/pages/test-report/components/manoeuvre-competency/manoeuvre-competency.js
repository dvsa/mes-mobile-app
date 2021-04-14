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
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../modules/tests/test-data/test-data.constants';
import { AddManoeuvreDrivingFault, AddManoeuvreSeriousFault, AddManoeuvreDangerousFault, RemoveManoeuvreFault, } from '../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getManoeuvres } from '../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { manoeuvreCompetencyLabels } from '../../../../shared/constants/competencies/catb-manoeuvres';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode, ToggleRemoveFaultMode } from '../../test-report.actions';
import { getDelegatedTestIndicator } from '../../../../modules/tests/delegated-test/delegated-test.reducer';
import { isDelegatedTest } from '../../../../modules/tests/delegated-test/delegated-test.selector';
var ManoeuvreCompetencyComponent = /** @class */ (function () {
    function ManoeuvreCompetencyComponent(store$) {
        var _this = this;
        this.store$ = store$;
        this.touchStateDelay = 100;
        this.touchState = false;
        this.rippleState = false;
        this.rippleEffectAnimationDuration = 300;
        this.isRemoveFaultMode = false;
        this.isSeriousMode = false;
        this.isDangerousMode = false;
        this.isDelegated = false;
        this.getLabel = function () { return manoeuvreCompetencyLabels[_this.competency]; };
        // Not a very good practice to use a boolean variable like wasPress
        // Because at this point it takes effort to understand what does it represents
        this.addOrRemoveFault = function (wasPress) {
            if (wasPress === void 0) { wasPress = false; }
            if (wasPress) {
                _this.applyRippleEffect();
            }
            if (_this.isRemoveFaultMode) {
                _this.removeFault();
            }
            else {
                _this.addFault(wasPress);
            }
        };
        this.addFault = function (wasPress) {
            if (_this.hasDrivingFault() || _this.hasSeriousFault() || _this.hasDangerousFault()) {
                return;
            }
            var payload = {
                competency: _this.competency,
                manoeuvre: _this.manoeuvre,
            };
            if (_this.isDangerousMode) {
                _this.store$.dispatch(new AddManoeuvreDangerousFault(payload));
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                return;
            }
            if (_this.isSeriousMode) {
                _this.store$.dispatch(new AddManoeuvreSeriousFault(payload));
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                return;
            }
            if (wasPress) {
                _this.store$.dispatch(new AddManoeuvreDrivingFault(payload));
                return;
            }
        };
        this.removeFault = function () {
            // Toggle modes off appropariately if competency outcome doesn't exist, then exit
            if (_this.manoeuvreCompetencyOutcome == null) {
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                if (_this.isSeriousMode)
                    _this.store$.dispatch(new ToggleSeriousFaultMode());
                if (_this.isDangerousMode)
                    _this.store$.dispatch(new ToggleDangerousFaultMode());
                return;
            }
            var payload = {
                competency: _this.competency,
                manoeuvre: _this.manoeuvre,
            };
            if (_this.hasDangerousFault() && _this.isDangerousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new RemoveManoeuvreFault(payload));
                _this.store$.dispatch(new ToggleDangerousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (_this.hasSeriousFault() && _this.isSeriousMode && _this.isRemoveFaultMode) {
                _this.store$.dispatch(new RemoveManoeuvreFault(payload));
                _this.store$.dispatch(new ToggleSeriousFaultMode());
                _this.store$.dispatch(new ToggleRemoveFaultMode());
                return;
            }
            if (!_this.isSeriousMode &&
                !_this.isDangerousMode &&
                _this.isRemoveFaultMode &&
                _this.manoeuvreCompetencyOutcome === CompetencyOutcome.DF) {
                _this.store$.dispatch(new RemoveManoeuvreFault(payload));
                _this.store$.dispatch(new ToggleRemoveFaultMode());
            }
        };
        this.hasDrivingFault = function () { return _this.manoeuvreCompetencyOutcome === CompetencyOutcome.DF ? 1 : 0; };
        this.hasSeriousFault = function () { return _this.manoeuvreCompetencyOutcome === CompetencyOutcome.S; };
        this.hasDangerousFault = function () { return _this.manoeuvreCompetencyOutcome === CompetencyOutcome.D; };
        /**
         * Manages the addition and removal of the ripple effect animation css class
         * @returns any
         */
        this.applyRippleEffect = function () {
            _this.rippleState = true;
            _this.rippleTimeout = setTimeout(function () { return _this.removeRippleEffect(); }, _this.rippleEffectAnimationDuration);
        };
        this.removeRippleEffect = function () {
            _this.rippleState = false;
            clearTimeout(_this.rippleTimeout);
        };
    }
    ManoeuvreCompetencyComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.componentState = {
            isRemoveFaultMode$: this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode)),
            isSeriousMode$: this.store$.pipe(select(getTestReportState), select(isSeriousMode)),
            isDangerousMode$: this.store$.pipe(select(getTestReportState), select(isDangerousMode)),
            manoeuvreCompetencyOutcome$: currentTest$.pipe(select(getTestData), select(getManoeuvres), select(function (manoeuvres) {
                if (manoeuvres) {
                    var manoeuvre = manoeuvres[_this.manoeuvre];
                    if (typeof manoeuvre !== 'undefined') {
                        return manoeuvre[_this.competency];
                    }
                }
                return null;
            })),
            delegatedTest$: currentTest$.pipe(select(getDelegatedTestIndicator), select(isDelegatedTest)),
        };
        var _a = this.componentState, isRemoveFaultMode$ = _a.isRemoveFaultMode$, isSeriousMode$ = _a.isSeriousMode$, isDangerousMode$ = _a.isDangerousMode$, manoeuvreCompetencyOutcome$ = _a.manoeuvreCompetencyOutcome$, delegatedTest$ = _a.delegatedTest$;
        var merged$ = merge(isRemoveFaultMode$.pipe(map(function (toggle) { return _this.isRemoveFaultMode = toggle; })), isSeriousMode$.pipe(map(function (toggle) { return _this.isSeriousMode = toggle; })), isDangerousMode$.pipe(map(function (toggle) { return _this.isDangerousMode = toggle; })), delegatedTest$.pipe(map(function (toggle) { return _this.isDelegated = toggle; })), manoeuvreCompetencyOutcome$.pipe(map(function (outcome) { return _this.manoeuvreCompetencyOutcome = outcome; })));
        this.subscription = merged$.subscribe();
    };
    ManoeuvreCompetencyComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ManoeuvreCompetencyComponent.prototype.onTouchStart = function () {
        clearTimeout(this.touchTimeout);
        this.touchState = true;
    };
    ManoeuvreCompetencyComponent.prototype.onTouchEnd = function () {
        var _this = this;
        // defer the removal of the touch state to allow the page to render
        this.touchTimeout = setTimeout(function () { return _this.touchState = false; }, this.touchStateDelay);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ManoeuvreCompetencyComponent.prototype, "competency", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ManoeuvreCompetencyComponent.prototype, "manoeuvre", void 0);
    ManoeuvreCompetencyComponent = __decorate([
        Component({
            selector: 'manoeuvre-competency',
            templateUrl: 'manoeuvre-competency.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], ManoeuvreCompetencyComponent);
    return ManoeuvreCompetencyComponent;
}());
export { ManoeuvreCompetencyComponent };
//# sourceMappingURL=manoeuvre-competency.js.map