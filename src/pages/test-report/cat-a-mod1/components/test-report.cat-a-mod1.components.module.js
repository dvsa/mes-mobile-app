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
import { SpeedCheckComponent } from './speed-check/speed-check';
import { SpeedCheckHeaderComponent } from './speed-check-header/speed-check-header';
import { ActivityCode4ModalModule } from './activity-code-4-modal/activity-code-4-modal.module';
import { SpeedCheckModalModule } from './speed-check-modal/speed-check-modal.module';
var TestReportCatAMod1ComponentsModule = /** @class */ (function () {
    function TestReportCatAMod1ComponentsModule() {
    }
    TestReportCatAMod1ComponentsModule = __decorate([
        NgModule({
            declarations: [
                SpeedCheckHeaderComponent,
                SpeedCheckComponent,
            ],
            imports: [
                CommonModule,
                ComponentsModule,
                TestReportComponentsModule,
                IonicModule,
                DirectivesModule,
                ActivityCode4ModalModule,
                SpeedCheckModalModule,
            ],
            exports: [
                SpeedCheckHeaderComponent,
                SpeedCheckComponent,
            ],
        })
    ], TestReportCatAMod1ComponentsModule);
    return TestReportCatAMod1ComponentsModule;
}());
export { TestReportCatAMod1ComponentsModule };
//# sourceMappingURL=test-report.cat-a-mod1.components.module.js.map