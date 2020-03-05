import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatADIPart2Page } from './waiting-room-to-car.cat-adi-part2.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';
import { WaitingRoomToCarCatADIPart2ComponentsModule } from './components/waiting-room-to-car.cat-adi-part2.components.module';

@NgModule({
  declarations: [
    WaitingRoomToCarCatADIPart2Page,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarCatADIPart2Page),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
    WaitingRoomToCarComponentsModule,
    WaitingRoomToCarCatADIPart2ComponentsModule,
  ],
})
export class WaitingRoomToCarCatADIPart2PageModule { }
