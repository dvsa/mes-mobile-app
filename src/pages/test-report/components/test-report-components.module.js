var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ComponentsModule } from '../../../components/common/common-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { EtaComponent } from './examiner-takes-action/eta';
import { CompetencyComponent } from './competency/competency';
import { CompetencyButtonComponent } from './competency-button/competency-button';
import { DrivingFaultSummaryComponent } from './driving-fault-summary/driving-fault-summary';
import { ToolbarComponent } from './toolbar/toolbar';
import { SeriousTooltipComponent } from './serious-tooltip/serious-tooltip';
import { DangerousTooltipComponent } from './dangerous-tooltip/dangerous-tooltip';
import { LegalRequirementComponent } from './legal-requirement/legal-requirement';
import { EcoComponent } from './eco/eco';
import { TimerComponent } from './timer/timer';
import { EndTestModalModule } from './end-test-modal/end-test-modal.module';
import { LegalRequirementsModalModule } from './legal-requirements-modal/legal-requirements-modal.module';
import { EtaInvalidModalModule } from './eta-invalid-modal/eta-invalid-modal.module';
import { ManoeuvreCompetencyComponent } from './manoeuvre-competency/manoeuvre-competency';
import { UncoupleRecoupleComponent } from './uncouple-recouple/uncouple-recouple';
import { MultiLegalRequirementComponent } from './multi-legal-requirement/multi-legal-requirement';
import { SingleFaultCompetencyComponent } from './single-fault-competency/single-fault-competency';
import { ControlledStopComponent } from './controlled-stop/controlled-stop';
import { SpecialLegalRequirementModalModule, } from './special-legal-requirement-modal/special-legal-requirement-modal.module';
import { TestFinalisationInvalidTestDataModalModule, } from './test-finalisation-invalid-test-data-modal/test-finalisation-invalid-test-data-modal.module';
var TestReportComponentsModule = /** @class */ (function () {
    function TestReportComponentsModule() {
    }
    TestReportComponentsModule = __decorate([
        NgModule({
            declarations: [
                EtaComponent,
                CompetencyComponent,
                SingleFaultCompetencyComponent,
                CompetencyButtonComponent,
                ManoeuvreCompetencyComponent,
                DrivingFaultSummaryComponent,
                ToolbarComponent,
                SeriousTooltipComponent,
                DangerousTooltipComponent,
                LegalRequirementComponent,
                MultiLegalRequirementComponent,
                EcoComponent,
                TimerComponent,
                UncoupleRecoupleComponent,
                ControlledStopComponent,
            ],
            imports: [
                ComponentsModule,
                CommonModule,
                IonicModule,
                EndTestModalModule,
                LegalRequirementsModalModule,
                SpecialLegalRequirementModalModule,
                EtaInvalidModalModule,
                TestFinalisationInvalidTestDataModalModule,
            ],
            exports: [
                EtaComponent,
                CompetencyComponent,
                SingleFaultCompetencyComponent,
                CompetencyButtonComponent,
                ManoeuvreCompetencyComponent,
                DrivingFaultSummaryComponent,
                ToolbarComponent,
                SeriousTooltipComponent,
                DangerousTooltipComponent,
                LegalRequirementComponent,
                MultiLegalRequirementComponent,
                EcoComponent,
                TimerComponent,
                UncoupleRecoupleComponent,
                ControlledStopComponent,
            ],
        })
    ], TestReportComponentsModule);
    return TestReportComponentsModule;
}());
export { TestReportComponentsModule };
//# sourceMappingURL=test-report-components.module.js.map