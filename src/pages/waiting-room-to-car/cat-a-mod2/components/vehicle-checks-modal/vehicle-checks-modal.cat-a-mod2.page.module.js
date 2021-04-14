var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatAMod2Modal } from './vehicle-checks-modal.cat-a-mod2.page';
import { VehicleChecksQuestionComponent } from '../vehicle-checks-question/vehicle-checks-question';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { VehicleChecksModalCatAMod2AnalyticsEffects } from './vehicle-checks-modal.cat-a-mod2.analytics.effects';
var VehicleChecksModalCatAMod2Module = /** @class */ (function () {
    function VehicleChecksModalCatAMod2Module() {
    }
    VehicleChecksModalCatAMod2Module = __decorate([
        NgModule({
            declarations: [
                VehicleChecksCatAMod2Modal,
                VehicleChecksQuestionComponent,
            ],
            imports: [
                IonicPageModule.forChild(VehicleChecksCatAMod2Modal),
                EffectsModule.forFeature([
                    VehicleChecksModalCatAMod2AnalyticsEffects,
                ]),
                IonicModule,
                ComponentsModule,
            ],
        })
    ], VehicleChecksModalCatAMod2Module);
    return VehicleChecksModalCatAMod2Module;
}());
export { VehicleChecksModalCatAMod2Module };
//# sourceMappingURL=vehicle-checks-modal.cat-a-mod2.page.module.js.map