import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { SpeedCheckModal } from './speed-check-modal';

@NgModule({
  declarations: [
    SpeedCheckModal,
  ],
  imports: [
    IonicPageModule.forChild(SpeedCheckModal),
    ComponentsModule,
  ],
  exports: [
    SpeedCheckModal,
  ],
})
export class SpeedCheckModalModule { }
