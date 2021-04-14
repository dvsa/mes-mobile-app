var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { VehicleChecksCompactCatDComponent } from './vehicle-checks-compact/vehicle-checks-compact.cat-d';
import { SafetyQuestionsCatDComponent } from './safety-questions/safety-questions.cat-d';
import { PcvDoorExerciseComponent } from './pcv-door-exercise/pcv-door-exercise';
var TestReportCatDComponentsModule = /** @class */ (function () {
    function TestReportCatDComponentsModule() {
    }
    TestReportCatDComponentsModule = __decorate([
        NgModule({
            declarations: [
                VehicleChecksCompactCatDComponent,
                SafetyQuestionsCatDComponent,
                PcvDoorExerciseComponent,
            ],
            imports: [
                CommonModule,
                ComponentsModule,
                TestReportComponentsModule,
                IonicModule,
                DirectivesModule,
            ],
            exports: [
                VehicleChecksCompactCatDComponent,
                SafetyQuestionsCatDComponent,
                PcvDoorExerciseComponent,
            ],
        })
    ], TestReportCatDComponentsModule);
    return TestReportCatDComponentsModule;
}());
export { TestReportCatDComponentsModule };
//# sourceMappingURL=test-report.cat-d.components.module.js.map