var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DataRowWithListComponent } from './data-row-with-list/data-list-with-row';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { FaultsDataRowComponent } from './faults-data-row/faults-data-row';
import { TestDetailsCardComponent } from './test-details-card/test-details-card';
import { ViewTestHeaderComponent } from './view-test-header/view-test-header';
import { ExaminerDetailsCardComponent } from './examiner-details-card/examiner-details';
import { RekeyDetailsCardComponent } from './rekey-details-card/rekey-details';
import { RekeyReasonCardComponent } from './rekey-reason-card/rekey-reason';
import { VehicleChecksDataRowComponent } from './vehicle-checks-data-row/vehicle-checks-data-row';
import { TestSummaryCardComponent } from './test-summary-card/test-summary-card';
import { ContactDetailsCardComponent } from './contact-details-card/contact-details-card';
import { BusinessDetailsCardComponent } from './business-details-card/business-details-card';
import { VehicleDetailsCardComponent } from './vehicle-details-card/vehicle-details-card';
import { VehicleDetailsCardCatAComponent } from './vehicle-details-card-cat-a/vehicle-details-card-cat-a';
import { SafetyAndBalanceDataRowComponent } from './safety-and-balance-data-row/safety-and-balance-data-row';
var ViewTestResultComponentsModule = /** @class */ (function () {
    function ViewTestResultComponentsModule() {
    }
    ViewTestResultComponentsModule = __decorate([
        NgModule({
            declarations: [
                DataRowWithListComponent,
                FaultsDataRowComponent,
                ViewTestHeaderComponent,
                TestDetailsCardComponent,
                ExaminerDetailsCardComponent,
                RekeyDetailsCardComponent,
                RekeyReasonCardComponent,
                VehicleChecksDataRowComponent,
                SafetyAndBalanceDataRowComponent,
                TestSummaryCardComponent,
                ContactDetailsCardComponent,
                BusinessDetailsCardComponent,
                VehicleDetailsCardComponent,
                VehicleDetailsCardCatAComponent,
            ],
            imports: [
                CommonModule,
                IonicModule,
                ComponentsModule,
            ],
            exports: [
                DataRowWithListComponent,
                FaultsDataRowComponent,
                ViewTestHeaderComponent,
                TestDetailsCardComponent,
                ExaminerDetailsCardComponent,
                RekeyDetailsCardComponent,
                RekeyReasonCardComponent,
                VehicleChecksDataRowComponent,
                SafetyAndBalanceDataRowComponent,
                TestSummaryCardComponent,
                ContactDetailsCardComponent,
                BusinessDetailsCardComponent,
                VehicleDetailsCardComponent,
                VehicleDetailsCardCatAComponent,
            ],
        })
    ], ViewTestResultComponentsModule);
    return ViewTestResultComponentsModule;
}());
export { ViewTestResultComponentsModule };
//# sourceMappingURL=view-test-result.components.module.js.map