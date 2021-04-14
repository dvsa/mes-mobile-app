var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CandidateLinkComponent } from './candidate-link/candidate-link';
import { IndicatorsComponent } from './indicators/indicators';
import { LanguageComponent } from './language/language';
import { ProgressiveAccessComponent } from './progressive-access/progressive-access';
import { SubmissionStatusComponent } from './submission-status/submission-status';
import { TestCategoryComponent } from './test-category/test-category';
import { TestOutcomeComponent } from './test-outcome/test-outcome';
import { TestSlotComponent } from './test-slot/test-slot';
import { TimeComponent } from './time/time';
import { DateComponent } from './date/date';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details';
import { LocationComponent } from './location/location';
import { AdditionalCandidateDetailsComponent } from './additional-candidate-details/additional-candidate-details';
var TestSlotComponentsModule = /** @class */ (function () {
    function TestSlotComponentsModule() {
    }
    TestSlotComponentsModule = __decorate([
        NgModule({
            declarations: [
                AdditionalCandidateDetailsComponent,
                CandidateLinkComponent,
                IndicatorsComponent,
                LanguageComponent,
                ProgressiveAccessComponent,
                SubmissionStatusComponent,
                TestCategoryComponent,
                TestOutcomeComponent,
                TestSlotComponent,
                TimeComponent,
                DateComponent,
                VehicleDetailsComponent,
                LocationComponent,
            ],
            imports: [
                CommonModule,
                IonicModule,
            ],
            entryComponents: [
                TestSlotComponent,
            ],
            exports: [
                AdditionalCandidateDetailsComponent,
                CandidateLinkComponent,
                IndicatorsComponent,
                LanguageComponent,
                ProgressiveAccessComponent,
                SubmissionStatusComponent,
                TestCategoryComponent,
                TestOutcomeComponent,
                TestSlotComponent,
                TimeComponent,
                DateComponent,
                VehicleDetailsComponent,
                LocationComponent,
            ],
        })
    ], TestSlotComponentsModule);
    return TestSlotComponentsModule;
}());
export { TestSlotComponentsModule };
//# sourceMappingURL=test-slot-components.module.js.map