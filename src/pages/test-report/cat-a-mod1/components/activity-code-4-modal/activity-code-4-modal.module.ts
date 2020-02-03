import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityCode4Modal } from './activity-code-4-modal';
import { ComponentsModule } from '../../../../../components/common/common-components.module';

@NgModule({
  declarations: [
    ActivityCode4Modal,
  ],
  imports: [
    IonicPageModule.forChild(ActivityCode4Modal),
    ComponentsModule,
  ],
  exports: [
    ActivityCode4Modal,
  ],
})
export class ActivityCode4ModalModule { }
