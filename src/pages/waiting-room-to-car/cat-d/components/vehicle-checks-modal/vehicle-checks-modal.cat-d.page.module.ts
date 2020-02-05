import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatDModal } from './vehicle-checks-modal.cat-d.page';
import { VehicleChecksQuestionCatDComponent } from '../vehicle-checks-question/vehicle-checks-question.cat-d';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { VehicleChecksModalCatDAnalyticsEffects } from './vehicle-checks-modal.cat-d.analytics.effects';

@NgModule({
  declarations: [
    VehicleChecksCatDModal,
    VehicleChecksQuestionCatDComponent,
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
export class VehicleChecksModalCatDModule { }
