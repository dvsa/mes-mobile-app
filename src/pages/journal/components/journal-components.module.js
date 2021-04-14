var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ActivitySlotComponent } from '../components/activity-slot/activity-slot';
import { EmptySlotComponent } from '../components/empty-slot/empty-slot';
import { JournalNavigationComponent } from '../components/journal-navigation/journal-navigation';
import { TestSlotComponentsModule } from '../../../components/test-slot/test-slot-components.module';
import { PersonalCommitmentSlotComponent } from '../personal-commitment/personal-commitment';
var JournalComponentsModule = /** @class */ (function () {
    function JournalComponentsModule() {
    }
    JournalComponentsModule = __decorate([
        NgModule({
            declarations: [
                ActivitySlotComponent,
                EmptySlotComponent,
                JournalNavigationComponent,
                PersonalCommitmentSlotComponent,
            ],
            imports: [
                CommonModule,
                IonicModule,
                TestSlotComponentsModule,
            ],
            entryComponents: [
                PersonalCommitmentSlotComponent,
            ],
            exports: [
                ActivitySlotComponent,
                EmptySlotComponent,
                JournalNavigationComponent,
                PersonalCommitmentSlotComponent,
            ],
        })
    ], JournalComponentsModule);
    return JournalComponentsModule;
}());
export { JournalComponentsModule };
//# sourceMappingURL=journal-components.module.js.map