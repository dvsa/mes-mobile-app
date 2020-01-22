import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatAMod1Page } from './waiting-room-to-car.cat-a-mod1.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';

@NgModule({
  declarations: [
    WaitingRoomToCarCatAMod1Page,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarCatAMod1Page),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
    WaitingRoomToCarComponentsModule,
  ],
})
export class WaitingRoomToCarCatAMod1PageModule { }
