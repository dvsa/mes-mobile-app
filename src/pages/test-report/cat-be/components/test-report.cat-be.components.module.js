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
import { VehicleChecksComponent } from './vehicle-checks/vehicle-checks';
var TestReportCatBEComponentsModule = /** @class */ (function () {
    function TestReportCatBEComponentsModule() {
    }
    TestReportCatBEComponentsModule = __decorate([
        NgModule({
            declarations: [
                VehicleChecksComponent,
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
            ],
        })
    ], TestReportCatBEComponentsModule);
    return TestReportCatBEComponentsModule;
}());
export { TestReportCatBEComponentsModule };
//# sourceMappingURL=test-report.cat-be.components.module.js.map