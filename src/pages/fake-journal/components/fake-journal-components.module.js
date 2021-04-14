var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FakeTestSlotComponent } from './fake-test-slot/fake-test-slot';
import { JournalComponentsModule } from '../../journal/components/journal-components.module';
import { TestSlotComponentsModule } from '../../../components/test-slot/test-slot-components.module';
var FakeJournalComponentsModule = /** @class */ (function () {
    function FakeJournalComponentsModule() {
    }
    FakeJournalComponentsModule = __decorate([
        NgModule({
            declarations: [
                FakeTestSlotComponent,
            ],
            imports: [
                CommonModule,
                IonicModule,
                JournalComponentsModule,
                TestSlotComponentsModule,
            ],
            entryComponents: [
                FakeTestSlotComponent,
            ],
            exports: [
                FakeTestSlotComponent,
            ],
        })
    ], FakeJournalComponentsModule);
    return FakeJournalComponentsModule;
}());
export { FakeJournalComponentsModule };
//# sourceMappingURL=fake-journal-components.module.js.map