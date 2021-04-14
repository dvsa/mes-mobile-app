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
import { getTestData } from '../../../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.reducer';
import { getManoeuvresADI2, } from '../../../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.selector';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
var ManoeuvresComponent = /** @class */ (function () {
    function ManoeuvresComponent(store$, faultCountProvider) {
        this.store$ = store$;
        this.faultCountProvider = faultCountProvider;
        this.drivingFaults = 0;
        this.hasSeriousFault = false;
        this.hasDangerousFault = false;
        this.displayPopover = false;
    }
    ManoeuvresComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.manoeuvres$ = this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getManoeuvresADI2));
        this.subscription = this.manoeuvres$.subscribe(function (manoeuvres) {
            _this.drivingFaults =
                _this.faultCountProvider.getManoeuvreFaultCount("ADI2" /* ADI2 */, manoeuvres, CompetencyOutcome.DF);
            _this.hasSeriousFault =
                _this.faultCountProvider.getManoeuvreFaultCount("ADI2" /* ADI2 */, manoeuvres, CompetencyOutcome.S) > 0;
            _this.hasDangerousFault =
                _this.faultCountProvider.getManoeuvreFaultCount("ADI2" /* ADI2 */, manoeuvres, CompetencyOutcome.D) > 0;
        });
    };
    ManoeuvresComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ManoeuvresComponent.prototype.togglePopoverDisplay = function () {
        this.displayPopover = !this.displayPopover;
        this.toggleOverlay();
    };
    ManoeuvresComponent.prototype.toggleOverlay = function () {
        if (this.clickCallback) {
            this.clickCallback.callbackMethod();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ManoeuvresComponent.prototype, "controlLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ManoeuvresComponent.prototype, "completed", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ManoeuvresComponent.prototype, "clickCallback", void 0);
    ManoeuvresComponent = __decorate([
        Component({
            selector: 'manoeuvres-adi-part2',
            templateUrl: 'manoeuvres.html',
        }),
        __metadata("design:paramtypes", [Store,
            FaultCountProvider])
    ], ManoeuvresComponent);
    return ManoeuvresComponent;
}());
export { ManoeuvresComponent };
//# sourceMappingURL=manoeuvres.js.map