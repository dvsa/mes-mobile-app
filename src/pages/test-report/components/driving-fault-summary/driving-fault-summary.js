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
import { Store, select } from '@ngrx/store';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { FaultCountProvider } from '../../../../providers/fault-count/fault-count';
import { withLatestFrom, map } from 'rxjs/operators';
import { getTestCategory } from '../../../../modules/tests/category/category.reducer';
var driverType;
(function (driverType) {
    driverType["R"] = "R";
    driverType["D"] = "D";
})(driverType || (driverType = {}));
var DrivingFaultSummaryComponent = /** @class */ (function () {
    function DrivingFaultSummaryComponent(store$, faultCountProvider) {
        this.store$ = store$;
        this.faultCountProvider = faultCountProvider;
    }
    DrivingFaultSummaryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var category$ = currentTest$.pipe(select(getTestCategory));
        this.componentState = {
            count$: currentTest$.pipe(select(getTestData), withLatestFrom(category$), map(function (_a) {
                var testData = _a[0], category = _a[1];
                return _this.faultCountProvider.getDrivingFaultSumCount(category, testData);
            })),
            driverRiderFlag$: currentTest$.pipe(select(getTestCategory), map(function (category) {
                return _this.driverTypeSwitch(category);
            })),
        };
    };
    DrivingFaultSummaryComponent.prototype.ionViewWillEnter = function () {
        if (this.componentState && this.componentState.count$) {
            this.subscription = this.componentState.count$.subscribe();
        }
    };
    DrivingFaultSummaryComponent.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DrivingFaultSummaryComponent.prototype.driverTypeSwitch = function (cat) {
        // switch to determine Driver or Rider based upon category
        if (cat.includes('EUA')) {
            return driverType.R;
        }
        return driverType.D;
    };
    DrivingFaultSummaryComponent = __decorate([
        Component({
            selector: 'driving-fault-summary',
            templateUrl: 'driving-fault-summary.html',
        }),
        __metadata("design:paramtypes", [Store,
            FaultCountProvider])
    ], DrivingFaultSummaryComponent);
    return DrivingFaultSummaryComponent;
}());
export { DrivingFaultSummaryComponent };
//# sourceMappingURL=driving-fault-summary.js.map