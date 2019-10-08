import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatBePage } from './waiting-room-to-car.cat-be.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';

@NgModule({
  declarations: [
    WaitingRoomToCarCatBePage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarCatBePage),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
    WaitingRoomToCarComponentsModule,
  ],
})
export class WaitingRoomToCarCatBEPageModule { }
