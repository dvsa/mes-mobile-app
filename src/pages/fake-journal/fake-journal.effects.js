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
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as fakeJournalActions from './fake-journal.actions';
import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import { fakeJournalTestSlots } from './__mocks__/fake-journal.mock';
import { PopulateApplicationReference, } from '../../modules/tests/journal-data/common/application-reference/application-reference.actions';
import { PopulateCandidateDetails } from '../../modules/tests/journal-data/common/candidate/candidate.actions';
import { PopulateTestSlotAttributes, } from '../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.actions';
import { PopulateTestCentre } from '../../modules/tests/journal-data/common/test-centre/test-centre.actions';
import { extractTestSlotAttributes, } from '../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { PopulateTestCategory } from '../../modules/tests/category/category.actions';
import { PopulateExaminer } from '../../modules/tests/journal-data/common/examiner/examiner.actions';
var FakeJournalEffects = /** @class */ (function () {
    function FakeJournalEffects(actions$) {
        this.actions$ = actions$;
        this.startE2EPracticeTestEffect$ = this.actions$.pipe(ofType(fakeJournalActions.START_E2E_PRACTICE_TEST), switchMap(function (action) {
            var startTestAction = action;
            var slot = fakeJournalTestSlots.find(function (s) { return s.slotDetail.slotId === startTestAction.slotId; });
            var examiner = {
                staffNumber: '01234567',
            };
            return [
                new PopulateExaminer(examiner),
                new PopulateTestCategory(slot.booking.application.testCategory),
                new PopulateApplicationReference(slot.booking.application),
                new PopulateCandidateDetails(slot.booking.candidate),
                new PopulateTestSlotAttributes(extractTestSlotAttributes(slot)),
                new PopulateTestCentre({ centreId: slot.testCentre.centreId, costCode: slot.testCentre.costCode }),
                new testStatusActions.SetTestStatusBooked(slot.slotDetail.slotId),
            ];
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], FakeJournalEffects.prototype, "startE2EPracticeTestEffect$", void 0);
    FakeJournalEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions])
    ], FakeJournalEffects);
    return FakeJournalEffects;
}());
export { FakeJournalEffects };
//# sourceMappingURL=fake-journal.effects.js.map