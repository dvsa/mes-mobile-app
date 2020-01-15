import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatAMod2Page } from './waiting-room-to-car.cat-a-mod2.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarCatAMod2ComponentsModule }
  from './components/waiting-room-to-car.cat-a-mod2.components.module';

@NgModule({
  declarations: [
    WaitingRoomToCarCatAMod2Page,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarCatAMod2Page),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
    WaitingRoomToCarCatAMod2ComponentsModule,
    WaitingRoomToCarCatAMod2ComponentsModule,
  ],
})
export class WaitingRoomToCarCatAMod2PageModule { }
