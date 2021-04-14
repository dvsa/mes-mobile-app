var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { JournalPage } from './journal';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { ActivitySlotComponent } from './components/activity-slot/activity-slot';
import { EmptySlotComponent } from './components/empty-slot/empty-slot';
import { JournalProvider } from '../../providers/journal/journal';
import { SlotProvider } from '../../providers/slot/slot';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { JournalComponentsModule } from './components/journal-components.module';
import { TestsEffects } from '../../modules/tests/tests.effects';
import { TestSlotComponentsModule } from '../../components/test-slot/test-slot-components.module';
import { ComponentsModule } from '../../components/common/common-components.module';
import { JournalAnalyticsEffects } from './journal.analytics.effects';
var JournalPageModule = /** @class */ (function () {
    function JournalPageModule() {
    }
    JournalPageModule = __decorate([
        NgModule({
            declarations: [
                JournalPage,
            ],
            imports: [
                JournalComponentsModule,
                TestSlotComponentsModule,
                IonicPageModule.forChild(JournalPage),
                EffectsModule.forFeature([
                    JournalAnalyticsEffects,
                    TestsEffects,
                ]),
                ComponentsModule,
            ],
            entryComponents: [
                ActivitySlotComponent,
                EmptySlotComponent,
            ],
            providers: [
                JournalProvider,
                SlotProvider,
                SlotSelectorProvider,
                DateTimeProvider,
            ],
        })
    ], JournalPageModule);
    return JournalPageModule;
}());
export { JournalPageModule };
//# sourceMappingURL=journal.module.js.map