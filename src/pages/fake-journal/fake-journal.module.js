var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FakeJournalPage } from './fake-journal';
import { JournalComponentsModule } from '../journal/components/journal-components.module';
import { ComponentsModule } from '../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { FakeJournalEffects } from './fake-journal.effects';
import { FakeJournalComponentsModule } from './components/fake-journal-components.module';
import { TestSlotComponentsModule } from '../../components/test-slot/test-slot-components.module';
import { JournalModule } from '../../modules/journal/journal.module';
var FakeJournalPageModule = /** @class */ (function () {
    function FakeJournalPageModule() {
    }
    FakeJournalPageModule = __decorate([
        NgModule({
            declarations: [
                FakeJournalPage,
            ],
            imports: [
                JournalModule,
                FakeJournalComponentsModule,
                JournalComponentsModule,
                TestSlotComponentsModule,
                IonicPageModule.forChild(FakeJournalPage),
                ComponentsModule,
                EffectsModule.forFeature([
                    FakeJournalEffects,
                ]),
            ],
            providers: [],
        })
    ], FakeJournalPageModule);
    return FakeJournalPageModule;
}());
export { FakeJournalPageModule };
//# sourceMappingURL=fake-journal.module.js.map