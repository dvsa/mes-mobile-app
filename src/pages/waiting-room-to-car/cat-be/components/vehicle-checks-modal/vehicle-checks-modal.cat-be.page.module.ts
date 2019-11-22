import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatBEModal } from './vehicle-checks-modal.cat-be.page';
import { VehicleChecksQuestionComponent } from '../vehicle-checks-question/vehicle-checks-question';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { VehicleChecksModalAnalyticsEffects } from './vehicle-checks-modal.cat-be.analytics.effects';

@NgModule({
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
export class VehicleChecksModalCatBEModule { }
