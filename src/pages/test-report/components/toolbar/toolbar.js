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
import { ToggleRemoveFaultMode, ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../test-report.actions';
import { Store, select } from '@ngrx/store';
import { merge } from 'rxjs';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { map } from 'rxjs/operators';
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent(store$) {
        this.store$ = store$;
        this.isRemoveFaultMode = false;
        this.isSeriousMode = false;
        this.isDangerousMode = false;
    }
    ToolbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.componentState = {
            isRemoveFaultMode$: this.store$.pipe(select(getTestReportState), select(isRemoveFaultMode)),
            isSeriousMode$: this.store$.pipe(select(getTestReportState), select(isSeriousMode)),
            isDangerousMode$: this.store$.pipe(select(getTestReportState), select(isDangerousMode)),
        };
        var _a = this.componentState, isRemoveFaultMode$ = _a.isRemoveFaultMode$, isSeriousMode$ = _a.isSeriousMode$, isDangerousMode$ = _a.isDangerousMode$;
        var merged$ = merge(isRemoveFaultMode$.pipe(map(function (result) { return _this.isRemoveFaultMode = result; })), isSeriousMode$.pipe(map(function (result) { return _this.isSeriousMode = result; })), isDangerousMode$.pipe(map(function (result) { return _this.isDangerousMode = result; })));
        this.subscription = merged$.subscribe();
    };
    ToolbarComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ToolbarComponent.prototype.toggleRemoveFaultMode = function () {
        this.store$.dispatch(new ToggleRemoveFaultMode(true));
    };
    ToolbarComponent.prototype.toggleSeriousMode = function () {
        if (this.isDangerousMode) {
            this.store$.dispatch(new ToggleDangerousFaultMode());
        }
        this.store$.dispatch(new ToggleSeriousFaultMode(true));
    };
    ToolbarComponent.prototype.toggleDangerousMode = function () {
        if (this.isSeriousMode) {
            this.store$.dispatch(new ToggleSeriousFaultMode());
        }
        this.store$.dispatch(new ToggleDangerousFaultMode(true));
    };
    ToolbarComponent = __decorate([
        Component({
            selector: 'toolbar',
            templateUrl: 'toolbar.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], ToolbarComponent);
    return ToolbarComponent;
}());
export { ToolbarComponent };
//# sourceMappingURL=toolbar.js.map