var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatHomeTestModal } from './vehicle-checks-modal.cat-home-test.page';
import { VehicleChecksQuestionComponent } from '../vehicle-checks-question/vehicle-checks-question';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { VehicleChecksModalAnalyticsEffects } from './vehicle-checks-modal.cat-home-test.analytics.effects';
var VehicleChecksModalCatHomeTestModule = /** @class */ (function () {
    function VehicleChecksModalCatHomeTestModule() {
    }
    VehicleChecksModalCatHomeTestModule = __decorate([
        NgModule({
            declarations: [
                VehicleChecksCatHomeTestModal,
                VehicleChecksQuestionComponent,
            ],
            imports: [
                IonicPageModule.forChild(VehicleChecksCatHomeTestModal),
                EffectsModule.forFeature([
                    VehicleChecksModalAnalyticsEffects,
                ]),
                IonicModule,
                ComponentsModule,
            ],
        })
    ], VehicleChecksModalCatHomeTestModule);
    return VehicleChecksModalCatHomeTestModule;
}());
export { VehicleChecksModalCatHomeTestModule };
//# sourceMappingURL=vehicle-checks-modal.cat-home-test.page.module.js.map