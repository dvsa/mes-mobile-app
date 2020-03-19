import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatHomeTestModal } from './vehicle-checks-modal.cat-home-test.page';
import { VehicleChecksQuestionComponent } from '../vehicle-checks-question/vehicle-checks-question';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { VehicleChecksModalAnalyticsEffects } from './vehicle-checks-modal.cat-home-test.analytics.effects';

@NgModule({
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
export class VehicleChecksModalCatHomeTestModule { }
