var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { journalReducer } from './journal.reducer';
import { JournalEffects } from './journal.effects';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { JournalProvider } from '../../providers/journal/journal';
import { SlotProvider } from '../../providers/slot/slot';
import { JournalLogsEffects } from './journal.logs.effects';
var JournalModule = /** @class */ (function () {
    function JournalModule() {
    }
    JournalModule = __decorate([
        NgModule({
            imports: [
                StoreModule.forFeature('journal', journalReducer),
                EffectsModule.forFeature([
                    JournalEffects,
                    JournalLogsEffects,
                ]),
            ],
            providers: [
                JournalProvider,
                SlotProvider,
                SlotSelectorProvider,
                DateTimeProvider,
            ],
        })
    ], JournalModule);
    return JournalModule;
}());
export { JournalModule };
//# sourceMappingURL=journal.module.js.map