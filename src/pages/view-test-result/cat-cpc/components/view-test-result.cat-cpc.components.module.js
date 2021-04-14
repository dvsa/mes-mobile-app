var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ViewTestResultComponentsModule } from '../../components/view-test-result.components.module';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { CPCVehicleDetailsCardComponent } from './vehicle-details-card/vehicle-details-card';
import { CPCTestSummaryCardComponent } from './test-summary-card/test-summary-card';
var ViewTestResultCatCPCComponentsModule = /** @class */ (function () {
    function ViewTestResultCatCPCComponentsModule() {
    }
    ViewTestResultCatCPCComponentsModule = __decorate([
        NgModule({
            declarations: [
                CPCVehicleDetailsCardComponent,
                CPCTestSummaryCardComponent,
            ],
            imports: [
                CommonModule,
                IonicModule,
                ComponentsModule,
                ViewTestResultComponentsModule,
            ],
            exports: [
                CPCVehicleDetailsCardComponent,
                CPCTestSummaryCardComponent,
            ],
        })
    ], ViewTestResultCatCPCComponentsModule);
    return ViewTestResultCatCPCComponentsModule;
}());
export { ViewTestResultCatCPCComponentsModule };
//# sourceMappingURL=view-test-result.cat-cpc.components.module.js.map