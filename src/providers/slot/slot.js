var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { DeepDiff } from 'deep-diff';
import { flatten, times, isEmpty, get } from 'lodash';
import { Store } from '@ngrx/store';
import { SlotItem } from '../slot-selector/slot-item';
import { AppConfigProvider } from '../app-config/app-config';
import { DateTime, Duration } from '../../shared/helpers/date-time';
import { SlotHasChanged } from './slot.actions';
import { DateTimeProvider } from '../date-time/date-time';
import { ExaminerRole } from '../app-config/constants/examiner-role.constants';
var MS_PER_DAY = 1000 * 60 * 60 * 24;
var SlotProvider = /** @class */ (function () {
    function SlotProvider(store$, appConfigProvider, dateTimeProvider) {
        var _this = this;
        this.store$ = store$;
        this.appConfigProvider = appConfigProvider;
        this.dateTimeProvider = dateTimeProvider;
        /**
         * Extends the journal with empty days where there was no slots defined in the next 7 days
         * @param slots Journal slots
         * @returns Slots with additional empty days
         */
        this.extendWithEmptyDays = function (slots) {
            var numberOfDaysToView = _this.appConfigProvider.getAppConfig().journal.numberOfDaysToView;
            var days = times(numberOfDaysToView, function (d) { return _this.dateTimeProvider.now().add(d, Duration.DAY).format('YYYY-MM-DD'); });
            var emptyDays = days.reduce(function (days, day) {
                var _a;
                return (__assign(__assign({}, days), (_a = {}, _a[day] = [], _a)));
            }, {});
            return __assign(__assign({}, emptyDays), slots);
        };
        /**
         * @param slots Journal slots
         * @returns Only the relevant slots
         */
        this.getRelevantSlots = function (slots) {
            return Object.keys(slots)
                .reduce(function (acc, date) {
                var _a;
                return (__assign(__assign({}, acc), (_a = {}, _a[date] = slots[date], _a)));
            }, {});
        };
        this.getSlotDate = function (slot) { return DateTime.at(slot.slotData.slotDetail.start).format('YYYY-MM-DD'); };
        this.dateDiffInDays = function (startDate, periodDate) {
            // Discard the time and time-zone information.
            var utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            var utc2 = Date.UTC(periodDate.getFullYear(), periodDate.getMonth(), periodDate.getDate());
            return Math.floor((utc2 - utc1) / MS_PER_DAY);
        };
        this.hasPeriodStartCriteria = function (slotDate, periodFrom) {
            return _this.dateDiffInDays(slotDate, new Date(periodFrom)) <= 0;
        };
        this.hasPeriodEndCriteria = function (slotDate, periodTo) {
            if (!periodTo) {
                return true;
            }
            return _this.dateDiffInDays(slotDate, new Date(periodTo)) >= 0;
        };
    }
    SlotProvider.prototype.detectSlotChanges = function (slots, newJournal) {
        var _this = this;
        var newSlots = flatten([
            newJournal.testSlots || [],
            newJournal.nonTestActivities || [],
        ]);
        var oldJournalSlots = flatten(Object.values(slots));
        newSlots.sort(function (slotA, slotB) { return slotA.slotDetail.start < slotB.slotDetail.start ? -1 : 1; });
        return newSlots.map(function (newSlot) {
            var newSlotId = newSlot.slotDetail.slotId;
            var replacedJournalSlot = oldJournalSlots.find(function (oldSlot) { return oldSlot.slotData.slotDetail.slotId === newSlotId; });
            var differenceFound = false;
            var hasSeenCandidateDetails = false;
            if (replacedJournalSlot) {
                differenceFound = replacedJournalSlot.hasSlotChanged;
                hasSeenCandidateDetails = replacedJournalSlot.hasSeenCandidateDetails;
                var differenceToSlot = DeepDiff(replacedJournalSlot.slotData, newSlot);
                if (Array.isArray(differenceToSlot) && differenceToSlot.some(function (change) { return change.kind === 'E'; })) {
                    _this.store$.dispatch(new SlotHasChanged(newSlotId));
                    differenceFound = true;
                }
            }
            var personalCommitment = null;
            if (!isEmpty(newJournal.personalCommitments)) {
                personalCommitment =
                    newJournal.personalCommitments.filter(function (commitment) { return Number(commitment.slotId) === Number(newSlotId); });
            }
            // add personalCommitment information to SlotItem, component and activityCode set to null
            // as they are not constructed at this stage.
            return new SlotItem(newSlot, differenceFound, hasSeenCandidateDetails, null, null, personalCommitment);
        });
    };
    SlotProvider.prototype.canStartTest = function (testSlot) {
        var _this = this;
        var testPermissionPeriods = this.appConfigProvider.getAppConfig().journal.testPermissionPeriods;
        var testCategory = get(testSlot, 'booking.application.testCategory');
        var startDate = new DateTime(testSlot.slotDetail.start);
        var slotStartDate = new Date(testSlot.slotDetail.start);
        if (!testCategory || startDate.daysDiff(this.dateTimeProvider.now()) < 0) {
            return false;
        }
        var periodsPermittingStart = testPermissionPeriods.filter(function (period) {
            var slotHasPeriodStartCriteria = _this.hasPeriodStartCriteria(slotStartDate, period.from);
            var slotHasPeriodEndCriteria = _this.hasPeriodEndCriteria(slotStartDate, period.to);
            return period.testCategory === testCategory && slotHasPeriodStartCriteria && slotHasPeriodEndCriteria;
        });
        return periodsPermittingStart.length > 0 || this.appConfigProvider.getAppConfig().role === ExaminerRole.DLG;
    };
    SlotProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Store,
            AppConfigProvider,
            DateTimeProvider])
    ], SlotProvider);
    return SlotProvider;
}());
export { SlotProvider };
//# sourceMappingURL=slot.js.map