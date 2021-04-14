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
import { select, Store } from '@ngrx/store';
import { ReverseLeftPopoverClosed, ReverseLeftPopoverOpened } from './reverse-left.actions';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { RecordManoeuvresDeselection, RecordManoeuvresSelection, } from '../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { ManoeuvreTypes } from '../../../../modules/tests/test-data/test-data.constants';
import { FaultCountProvider } from '../../../../providers/fault-count/fault-count';
import { TestDataByCategoryProvider } from '../../../../providers/test-data-by-category/test-data-by-category';
import { ManoeuvresByCategoryProvider, } from '../../../../providers/manoeuvres-by-category/manoeuvres-by-category';
import { getReverseLeftSelected } from '../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.selectors';
import { map } from 'rxjs/operators';
var ReverseLeftComponent = /** @class */ (function () {
    function ReverseLeftComponent(store$, faultCountProvider, testDataByCategory, manoeuvresByCategory) {
        var _this = this;
        this.store$ = store$;
        this.faultCountProvider = faultCountProvider;
        this.testDataByCategory = testDataByCategory;
        this.manoeuvresByCategory = manoeuvresByCategory;
        this.completedReverseLeft = false;
        this.drivingFaults = 0;
        this.hasSeriousFault = false;
        this.hasDangerousFault = false;
        this.displayPopover = false;
        this.toggleReverseLeft = function () {
            if (_this.completedReverseLeft && !_this.hasFaults()) {
                _this.store$.dispatch(new RecordManoeuvresDeselection(ManoeuvreTypes.reverseLeft));
                return;
            }
            _this.store$.dispatch(new RecordManoeuvresSelection(ManoeuvreTypes.reverseLeft));
        };
        this.hasFaults = function () {
            return _this.drivingFaults > 0 || _this.hasSeriousFault || _this.hasDangerousFault;
        };
        this.togglePopoverDisplay = function () {
            if (_this.displayPopover) {
                _this.store$.dispatch(new ReverseLeftPopoverClosed());
                _this.displayPopover = false;
            }
            else {
                _this.store$.dispatch(new ReverseLeftPopoverOpened());
                _this.displayPopover = true;
            }
            _this.toggleOverlay();
        };
    }
    ReverseLeftComponent.prototype.ngOnInit = function () {
        var _this = this;
        var manoeuvres$ = this.store$.pipe(select(getTests), select(getCurrentTest), map(function (data) { return _this.testDataByCategory.getTestDataByCategoryCode(_this.testCategory)(data); }), select(this.manoeuvresByCategory.getManoeuvresByCategoryCode(this.testCategory)));
        this.subscription = manoeuvres$.subscribe(function (manoeuvres) {
            _this.drivingFaults =
                _this.faultCountProvider.getManoeuvreFaultCount(_this.testCategory, manoeuvres, CompetencyOutcome.DF);
            _this.hasSeriousFault =
                _this.faultCountProvider.getManoeuvreFaultCount(_this.testCategory, manoeuvres, CompetencyOutcome.S) > 0;
            _this.hasDangerousFault =
                _this.faultCountProvider.getManoeuvreFaultCount(_this.testCategory, manoeuvres, CompetencyOutcome.D) > 0;
            _this.completedReverseLeft = getReverseLeftSelected(manoeuvres);
        });
    };
    ReverseLeftComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ReverseLeftComponent.prototype.toggleOverlay = function () {
        if (this.clickCallback) {
            this.clickCallback.callbackMethod();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ReverseLeftComponent.prototype, "completed", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ReverseLeftComponent.prototype, "controlLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ReverseLeftComponent.prototype, "testCategory", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ReverseLeftComponent.prototype, "clickCallback", void 0);
    ReverseLeftComponent = __decorate([
        Component({
            selector: 'reverse-left',
            templateUrl: 'reverse-left.html',
        }),
        __metadata("design:paramtypes", [Store,
            FaultCountProvider,
            TestDataByCategoryProvider,
            ManoeuvresByCategoryProvider])
    ], ReverseLeftComponent);
    return ReverseLeftComponent;
}());
export { ReverseLeftComponent };
//# sourceMappingURL=reverse-left.js.map