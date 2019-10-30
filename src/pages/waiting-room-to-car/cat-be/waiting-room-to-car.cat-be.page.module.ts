import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatBEPage } from './waiting-room-to-car.cat-be.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';
import { WaitingRoomToCarCatBEComponentsModule } from './components/waiting-room-to-car.cat-be.components.module';

@NgModule({
  declarations: [
    WaitingRoomToCarCatBEPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarCatBEPage),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
    WaitingRoomToCarComponentsModule,
    WaitingRoomToCarCatBEComponentsModule,
  ],
})
export class WaitingRoomToCarCatBEPageModule { }
