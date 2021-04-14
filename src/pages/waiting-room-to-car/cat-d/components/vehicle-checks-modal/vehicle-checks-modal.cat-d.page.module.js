var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatDModal } from './vehicle-checks-modal.cat-d.page';
import { VehicleChecksQuestionCatDComponent } from '../vehicle-checks-question/vehicle-checks-question.cat-d';
import { SafetyQuestionComponent } from '../safety-question/safety-question';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { VehicleChecksModalCatDAnalyticsEffects } from './vehicle-checks-modal.cat-d.analytics.effects';
var VehicleChecksModalCatDModule = /** @class */ (function () {
    function VehicleChecksModalCatDModule() {
    }
    VehicleChecksModalCatDModule = __decorate([
        NgModule({
            declarations: [
                VehicleChecksCatDModal,
                VehicleChecksQuestionCatDComponent,
                SafetyQuestionComponent,
            ],
            imports: [
                IonicPageModule.forChild(VehicleChecksCatDModal),
                EffectsModule.forFeature([
                    VehicleChecksModalCatDAnalyticsEffects,
                ]),
                IonicModule,
                ComponentsModule,
            ],
        })
    ], VehicleChecksModalCatDModule);
    return VehicleChecksModalCatDModule;
}());
export { VehicleChecksModalCatDModule };
//# sourceMappingURL=vehicle-checks-modal.cat-d.page.module.js.map