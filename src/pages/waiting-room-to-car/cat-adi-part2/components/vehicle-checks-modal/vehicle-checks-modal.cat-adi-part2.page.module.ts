import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatADIPart2Modal } from './vehicle-checks-modal.cat-adi-part2.page';
import { VehicleChecksQuestionComponent } from '../../../cat-adi-part2/components/vehicle-checks-question/vehicle-checks-question.cat-adi-part2';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { VehicleChecksModalAnalyticsEffects } from './vehicle-checks-modal.cat-adi-part2.analytics.effects';

@NgModule({
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
export class VehicleChecksModalCatADIPart2Module { }
