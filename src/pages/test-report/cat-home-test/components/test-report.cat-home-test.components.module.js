var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { CommonModule } from '@angular/common';
import { VehicleChecksComponent } from './vehicle-checks/vehicle-checks';
import { HighwayCodeSafetyComponent } from '../../components/highway-code-safety/highway-code-safety';
var TestReportCatHomeTestComponentsModule = /** @class */ (function () {
    function TestReportCatHomeTestComponentsModule() {
    }
    TestReportCatHomeTestComponentsModule = __decorate([
        NgModule({
            declarations: [
                VehicleChecksComponent,
                HighwayCodeSafetyComponent,
            ],
            imports: [
                CommonModule,
                ComponentsModule,
                TestReportComponentsModule,
                IonicModule,
                DirectivesModule,
            ],
            exports: [
                VehicleChecksComponent,
                HighwayCodeSafetyComponent,
            ],
        })
    ], TestReportCatHomeTestComponentsModule);
    return TestReportCatHomeTestComponentsModule;
}());
export { TestReportCatHomeTestComponentsModule };
//# sourceMappingURL=test-report.cat-home-test.components.module.js.map