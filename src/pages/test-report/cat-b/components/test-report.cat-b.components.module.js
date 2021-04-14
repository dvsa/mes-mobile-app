var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ManoeuvresComponent } from './manoeuvres/manoeuvres';
import { VehicleCheckComponent } from './vehicle-check/vehicle-check';
import { ManoeuvresPopoverComponent } from './manoeuvres-popover/manoeuvres-popover';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
var TestReportCatBComponentsModule = /** @class */ (function () {
    function TestReportCatBComponentsModule() {
    }
    TestReportCatBComponentsModule = __decorate([
        NgModule({
            declarations: [
                ManoeuvresComponent,
                ManoeuvresPopoverComponent,
                VehicleCheckComponent,
            ],
            imports: [
                IonicModule,
                CommonModule,
                ComponentsModule,
                TestReportComponentsModule,
            ],
            exports: [
                ManoeuvresComponent,
                ManoeuvresPopoverComponent,
                VehicleCheckComponent,
            ],
        })
    ], TestReportCatBComponentsModule);
    return TestReportCatBComponentsModule;
}());
export { TestReportCatBComponentsModule };
//# sourceMappingURL=test-report.cat-b.components.module.js.map