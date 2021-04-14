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
import { getJournalState } from '../../../../modules/journal/journal.reducer';
import { map } from 'rxjs/operators';
import { getSelectedDate, canNavigateToPreviousDay, canNavigateToNextDay } from '../../../../modules/journal/journal.selector';
import { SelectPreviousDay, SelectNextDay } from '../../../../modules/journal/journal.actions';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
var JournalNavigationComponent = /** @class */ (function () {
    function JournalNavigationComponent(store$, dateTimeProvider) {
        this.store$ = store$;
        this.dateTimeProvider = dateTimeProvider;
    }
    JournalNavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageState = {
            selectedDate$: this.store$.pipe(select(getJournalState), map(getSelectedDate)),
            canNavigateToPreviousDay$: this.store$.pipe(select(getJournalState), map(function (journal) { return canNavigateToPreviousDay(journal, _this.dateTimeProvider.now()); })),
            canNavigateToNextDay$: this.store$.pipe(select(getJournalState), map(canNavigateToNextDay)),
            isSelectedDateToday$: this.store$.pipe(select(getJournalState), map(getSelectedDate), map(function (selectedDate) { return selectedDate === _this.dateTimeProvider.now().format('YYYY-MM-DD'); })),
        };
    };
    JournalNavigationComponent.prototype.onPreviousDayClick = function () {
        this.store$.dispatch(new SelectPreviousDay());
    };
    JournalNavigationComponent.prototype.onNextDayClick = function () {
        this.store$.dispatch(new SelectNextDay());
    };
    JournalNavigationComponent = __decorate([
        Component({
            selector: 'journal-navigation',
            templateUrl: 'journal-navigation.html',
        }),
        __metadata("design:paramtypes", [Store,
            DateTimeProvider])
    ], JournalNavigationComponent);
    return JournalNavigationComponent;
}());
export { JournalNavigationComponent };
//# sourceMappingURL=journal-navigation.js.map