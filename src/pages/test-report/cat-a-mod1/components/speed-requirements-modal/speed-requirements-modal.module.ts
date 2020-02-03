import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeedRequirementsModal } from './speed-requirements-modal';
import { ComponentsModule } from '../../../../../components/common/common-components.module';

@NgModule({
  declarations: [
    SpeedRequirementsModal,
  ],
  imports: [
    IonicPageModule.forChild(SpeedRequirementsModal),
    ComponentsModule,
  ],
  exports: [
    SpeedRequirementsModal,
  ],
})
export class SpeedRequirementsModalModule { }
