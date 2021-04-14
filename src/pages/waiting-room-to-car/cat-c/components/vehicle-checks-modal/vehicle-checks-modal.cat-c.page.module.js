var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatCModal } from './vehicle-checks-modal.cat-c.page';
import { VehicleChecksQuestionCatCComponent } from '../vehicle-checks-question/vehicle-checks-question.cat-c';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { VehicleChecksModalCatCAnalyticsEffects } from './vehicle-checks-modal.cat-c.analytics.effects';
var VehicleChecksModalCatCModule = /** @class */ (function () {
    function VehicleChecksModalCatCModule() {
    }
    VehicleChecksModalCatCModule = __decorate([
        NgModule({
            declarations: [
                VehicleChecksCatCModal,
                VehicleChecksQuestionCatCComponent,
            ],
            imports: [
                IonicPageModule.forChild(VehicleChecksCatCModal),
                EffectsModule.forFeature([
                    VehicleChecksModalCatCAnalyticsEffects,
                ]),
                IonicModule,
                ComponentsModule,
            ],
        })
    ], VehicleChecksModalCatCModule);
    return VehicleChecksModalCatCModule;
}());
export { VehicleChecksModalCatCModule };
//# sourceMappingURL=vehicle-checks-modal.cat-c.page.module.js.map