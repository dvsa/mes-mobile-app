import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatCPage } from './waiting-room-to-car.cat-c.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';
import { WaitingRoomToCarCatCComponentsModule } from './components/waiting-room-to-car.cat-c.components.module';

@NgModule({
  declarations: [
    WaitingRoomToCarCatCPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarCatCPage),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
    WaitingRoomToCarComponentsModule,
    WaitingRoomToCarCatCComponentsModule,
  ],
})
export class WaitingRoomToCarCatCPageModule { }
