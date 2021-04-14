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
import { getIncompleteTestsCount } from './incomplete-tests-banner.selector';
import { SlotProvider } from '../../../providers/slot/slot';
import { DateTime } from '../../../shared/helpers/date-time';
import { getJournalState } from '../../../modules/journal/journal.reducer';
import { getTests } from '../../../modules/tests/tests.reducer';
import { map, withLatestFrom } from 'rxjs/operators';
var IncompleteTestsBanner = /** @class */ (function () {
    function IncompleteTestsBanner(store$, slotProvider) {
        this.store$ = store$;
        this.slotProvider = slotProvider;
    }
    IncompleteTestsBanner.prototype.ngOnInit = function () {
        var _this = this;
        this.componentState = {
            count$: this.store$.pipe(select(getJournalState), withLatestFrom(this.store$.pipe(select(getTests))), map(function (_a) {
                var journal = _a[0], tests = _a[1];
                return getIncompleteTestsCount(journal, tests, _this.todaysDate, _this.slotProvider);
            })),
        };
    };
    __decorate([
        Input(),
        __metadata("design:type", DateTime)
    ], IncompleteTestsBanner.prototype, "todaysDate", void 0);
    IncompleteTestsBanner = __decorate([
        Component({
            selector: 'incomplete-tests-banner',
            templateUrl: 'incomplete-tests-banner.html',
        }),
        __metadata("design:paramtypes", [Store,
            SlotProvider])
    ], IncompleteTestsBanner);
    return IncompleteTestsBanner;
}());
export { IncompleteTestsBanner };
//# sourceMappingURL=incomplete-tests-banner.js.map