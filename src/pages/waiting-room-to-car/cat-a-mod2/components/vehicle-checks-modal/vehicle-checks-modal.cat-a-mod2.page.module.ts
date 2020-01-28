import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatAMod2Modal } from './vehicle-checks-modal.cat-a-mod2.page';
import { VehicleChecksQuestionComponent } from '../vehicle-checks-question/vehicle-checks-question';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { SafetyAndBalanceModalCatAMod2AnalyticsEffects } from './vehicle-checks-modal.cat-a-mod2.analytics.effects';

@NgModule({
  declarations: [
    VehicleChecksCatAMod2Modal,
    VehicleChecksQuestionComponent,
  ],
  imports: [
    IonicPageModule.forChild(VehicleChecksCatAMod2Modal),
    EffectsModule.forFeature([
      SafetyAndBalanceModalCatAMod2AnalyticsEffects,
    ]),
    IonicModule,
    ComponentsModule,
  ],
})
export class VehicleChecksModalCatAMod2Module {

}
