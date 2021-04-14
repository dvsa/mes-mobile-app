var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { FaultCommentComponent } from './fault-comment/fault-comment';
import { FaultCommentCardComponent } from './fault-comment-card/fault-comment-card';
import { RouteNumberComponent } from './route-number/route-number';
import { CandidateDescriptionComponent } from './candidate-description/candidate-description';
import { IdentificationComponent } from './identification/identification';
import { ShowMeQuestionComponent } from './show-me-question/show-me-question';
import { WeatherConditionsComponent } from './weather-conditions/weather-conditions';
import { AdditionalInformationComponent } from './additional-information/additional-information';
import { DirectivesModule } from '../../../directives/directives.module';
import { VehicleChecksOfficeCardComponent } from './vehicle-checks/vehicle-checks-office-card';
import { IndependentDrivingComponent } from './independent-driving/independent-driving';
import { CandidateSectionComponent } from './candidate-section/candidate-section';
import { DateOfTest } from './date-of-test/date-of-test';
var OfficeComponentsModule = /** @class */ (function () {
    function OfficeComponentsModule() {
    }
    OfficeComponentsModule = __decorate([
        NgModule({
            declarations: [
                FaultCommentComponent,
                FaultCommentCardComponent,
                RouteNumberComponent,
                CandidateDescriptionComponent,
                IdentificationComponent,
                IndependentDrivingComponent,
                ShowMeQuestionComponent,
                WeatherConditionsComponent,
                AdditionalInformationComponent,
                VehicleChecksOfficeCardComponent,
                CandidateSectionComponent,
                DateOfTest,
            ],
            imports: [
                CommonModule,
                ComponentsModule,
                IonicModule,
                DirectivesModule,
            ],
            exports: [
                FaultCommentComponent,
                FaultCommentCardComponent,
                RouteNumberComponent,
                CandidateDescriptionComponent,
                IdentificationComponent,
                IndependentDrivingComponent,
                ShowMeQuestionComponent,
                WeatherConditionsComponent,
                AdditionalInformationComponent,
                VehicleChecksOfficeCardComponent,
                CandidateSectionComponent,
                DateOfTest,
            ],
        })
    ], OfficeComponentsModule);
    return OfficeComponentsModule;
}());
export { OfficeComponentsModule };
//# sourceMappingURL=office.components.module.js.map