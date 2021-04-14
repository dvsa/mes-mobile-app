var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatADIPart2Modal } from './vehicle-checks-modal.cat-adi-part2.page';
import { VehicleChecksQuestionComponent, } from '../../../cat-adi-part2/components/vehicle-checks-question/vehicle-checks-question.cat-adi-part2';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { VehicleChecksModalAnalyticsEffects } from './vehicle-checks-modal.cat-adi-part2.analytics.effects';
var VehicleChecksModalCatADIPart2Module = /** @class */ (function () {
    function VehicleChecksModalCatADIPart2Module() {
    }
    VehicleChecksModalCatADIPart2Module = __decorate([
        NgModule({
            declarations: [
                VehicleChecksCatADIPart2Modal,
                VehicleChecksQuestionComponent,
            ],
            imports: [
                IonicPageModule.forChild(VehicleChecksCatADIPart2Modal),
                EffectsModule.forFeature([
                    VehicleChecksModalAnalyticsEffects,
                ]),
                IonicModule,
                ComponentsModule,
            ],
        })
    ], VehicleChecksModalCatADIPart2Module);
    return VehicleChecksModalCatADIPart2Module;
}());
export { VehicleChecksModalCatADIPart2Module };
//# sourceMappingURL=vehicle-checks-modal.cat-adi-part2.page.module.js.map