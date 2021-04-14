var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ManoeuvresComponent } from './manoeuvres/manoeuvres';
import { VehicleCheckComponent } from './vehicle-check/vehicle-check';
import { ManoeuvresPopoverComponentAdiPart2 } from './manoeuvres-popover/manoeuvres-popover';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { ManoeuvreCompetencyComponentAdiPart2 } from './manoeuvre-competency/manoeuvre-competency';
var TestReportCatADIPart2ComponentsModule = /** @class */ (function () {
    function TestReportCatADIPart2ComponentsModule() {
    }
    TestReportCatADIPart2ComponentsModule = __decorate([
        NgModule({
            declarations: [
                ManoeuvresComponent,
                ManoeuvresPopoverComponentAdiPart2,
                ManoeuvreCompetencyComponentAdiPart2,
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
                ManoeuvresPopoverComponentAdiPart2,
                ManoeuvreCompetencyComponentAdiPart2,
                VehicleCheckComponent,
            ],
        })
    ], TestReportCatADIPart2ComponentsModule);
    return TestReportCatADIPart2ComponentsModule;
}());
export { TestReportCatADIPart2ComponentsModule };
//# sourceMappingURL=test-report.cat-adi-part2.components.module.js.map