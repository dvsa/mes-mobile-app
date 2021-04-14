var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { VehicleDetailsCardCatBComponent } from './vehicle-details-card/vehicle-details-card.cat-b';
import { DebriefCardComponent } from './debrief-card/debrief-card';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ViewTestResultComponentsModule } from '../../components/view-test-result.components.module';
var ViewTestResultCatBComponentsModule = /** @class */ (function () {
    function ViewTestResultCatBComponentsModule() {
    }
    ViewTestResultCatBComponentsModule = __decorate([
        NgModule({
            declarations: [
                VehicleDetailsCardCatBComponent,
                DebriefCardComponent,
            ],
            imports: [
                CommonModule,
                IonicModule,
                ComponentsModule,
                ViewTestResultComponentsModule,
            ],
            exports: [
                VehicleDetailsCardCatBComponent,
                DebriefCardComponent,
            ],
        })
    ], ViewTestResultCatBComponentsModule);
    return ViewTestResultCatBComponentsModule;
}());
export { ViewTestResultCatBComponentsModule };
//# sourceMappingURL=view-test-result.cat-b.components.module.js.map