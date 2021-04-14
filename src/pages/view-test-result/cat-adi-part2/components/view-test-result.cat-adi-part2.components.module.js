var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DebriefCardComponent } from './debrief-card/debrief-card';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ViewTestResultComponentsModule } from '../../components/view-test-result.components.module';
import { VehicleDetailsCatADIPt2Component } from './vehicle-details/vehicle-details';
import { TestDetailsCardCatADI2Component } from './test-details/test-details.cat-adi-part2';
var ViewTestResultCatADIPart2ComponentsModule = /** @class */ (function () {
    function ViewTestResultCatADIPart2ComponentsModule() {
    }
    ViewTestResultCatADIPart2ComponentsModule = __decorate([
        NgModule({
            declarations: [
                DebriefCardComponent,
                VehicleDetailsCatADIPt2Component,
                TestDetailsCardCatADI2Component,
            ],
            imports: [
                CommonModule,
                IonicModule,
                ComponentsModule,
                ViewTestResultComponentsModule,
            ],
            exports: [
                DebriefCardComponent,
                VehicleDetailsCatADIPt2Component,
                TestDetailsCardCatADI2Component,
            ],
        })
    ], ViewTestResultCatADIPart2ComponentsModule);
    return ViewTestResultCatADIPart2ComponentsModule;
}());
export { ViewTestResultCatADIPart2ComponentsModule };
//# sourceMappingURL=view-test-result.cat-adi-part2.components.module.js.map