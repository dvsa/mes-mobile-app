import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatBPage } from './waiting-room-to-car.cat-b.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';
import { WaitingRoomToCarCatBComponentsModule } from './components/waiting-room-to-car.cat-b.components.module';
import { LoneWorkerIonicModule } from '../../../external-modules/lw-ionic-module/lone-worker.module';
import {
  LoneWorkerIntegrationProvider,
} from '../../../providers/lone-worker-integration/lone-worker-integration.provider';

@NgModule({
  declarations: [
    WaitingRoomToCarCatBPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarCatBPage),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
    WaitingRoomToCarComponentsModule,
    WaitingRoomToCarCatBComponentsModule,
    LoneWorkerIonicModule.forRoot({
      apiRoot: 'http://localhost:3000',
    }),
  ],
  providers: [
    LoneWorkerIntegrationProvider,
  ],
})
export class WaitingRoomToCarCatBPageModule { }
