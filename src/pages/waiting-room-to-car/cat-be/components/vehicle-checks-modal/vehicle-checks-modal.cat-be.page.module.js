var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatBEModal } from './vehicle-checks-modal.cat-be.page';
import { VehicleChecksQuestionComponent } from '../vehicle-checks-question/vehicle-checks-question';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { VehicleChecksModalAnalyticsEffects } from './vehicle-checks-modal.cat-be.analytics.effects';
var VehicleChecksModalCatBEModule = /** @class */ (function () {
    function VehicleChecksModalCatBEModule() {
    }
    VehicleChecksModalCatBEModule = __decorate([
        NgModule({
            declarations: [
                VehicleChecksCatBEModal,
                VehicleChecksQuestionComponent,
            ],
            imports: [
                IonicPageModule.forChild(VehicleChecksCatBEModal),
                EffectsModule.forFeature([
                    VehicleChecksModalAnalyticsEffects,
                ]),
                IonicModule,
                ComponentsModule,
            ],
        })
    ], VehicleChecksModalCatBEModule);
    return VehicleChecksModalCatBEModule;
}());
export { VehicleChecksModalCatBEModule };
//# sourceMappingURL=vehicle-checks-modal.cat-be.page.module.js.map