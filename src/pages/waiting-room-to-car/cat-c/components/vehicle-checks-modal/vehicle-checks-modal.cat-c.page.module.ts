import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatCModal } from './vehicle-checks-modal.cat-c.page';
import { VehicleChecksQuestionCatCComponent } from '../vehicle-checks-question/vehicle-checks-question.cat-c';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { VehicleChecksModalCatCAnalyticsEffects } from './vehicle-checks-modal.cat-c.analytics.effects';

@NgModule({
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
export class VehicleChecksModalCatCModule { }
