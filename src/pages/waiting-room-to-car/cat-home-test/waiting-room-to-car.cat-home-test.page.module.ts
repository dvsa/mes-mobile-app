import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatHomeTestPage } from './waiting-room-to-car.cat-home-test.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';
import { WaitingRoomToCarCatHomeTestComponentsModule }
  from './components/waiting-room-to-car.cat-home-test.components.module';

@NgModule({
  declarations: [
    WaitingRoomToCarCatHomeTestPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarCatHomeTestPage),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
    WaitingRoomToCarComponentsModule,
    WaitingRoomToCarCatHomeTestComponentsModule,
  ],
})
export class WaitingRoomToCarCatHomeTestPageModule { }
