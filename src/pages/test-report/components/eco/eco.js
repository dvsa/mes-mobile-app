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
import { merge } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getEco } from '../../../../modules/tests/test-data/common/test-data.selector';
import { ToggleEco, ToggleControlEco, TogglePlanningEco, } from '../../../../modules/tests/test-data/common/eco/eco.actions';
import { map } from 'rxjs/operators';
var EcoComponent = /** @class */ (function () {
    function EcoComponent(store$) {
        var _this = this;
        this.store$ = store$;
        this.adviceGivenPlanning = false;
        this.adviceGivenControl = false;
        this.toggleEco = function () {
            if (_this.adviceGivenPlanning || _this.adviceGivenControl) {
                return;
            }
            _this.store$.dispatch(new ToggleEco());
        };
        this.toggleEcoPlanning = function () {
            _this.store$.dispatch(new TogglePlanningEco());
        };
        this.toggleEcoControl = function () {
            _this.store$.dispatch(new ToggleControlEco());
        };
    }
    EcoComponent.prototype.ngOnInit = function () {
        var _this = this;
        var eco$ = this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getEco));
        this.componentState = {
            completed$: eco$.pipe(map(function (eco) { return eco.completed; })),
            adviceGivenPlanning$: eco$.pipe(map(function (eco) { return eco.adviceGivenPlanning; })),
            adviceGivenControl$: eco$.pipe(map(function (eco) { return eco.adviceGivenControl; })),
        };
        var _a = this.componentState, completed$ = _a.completed$, adviceGivenPlanning$ = _a.adviceGivenPlanning$, adviceGivenControl$ = _a.adviceGivenControl$;
        var merged$ = merge(completed$, adviceGivenPlanning$.pipe(map(function (toggle) { return _this.adviceGivenPlanning = toggle; })), adviceGivenControl$.pipe(map(function (toggle) { return _this.adviceGivenControl = toggle; })));
        this.subscription = merged$.subscribe();
    };
    EcoComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    EcoComponent = __decorate([
        Component({
            selector: 'eco',
            templateUrl: 'eco.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], EcoComponent);
    return EcoComponent;
}());
export { EcoComponent };
//# sourceMappingURL=eco.js.map