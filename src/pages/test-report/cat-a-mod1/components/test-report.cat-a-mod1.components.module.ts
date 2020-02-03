import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { SpeedCheckComponent } from './speed-check/speed-check';
import { SpeedCheckHeaderComponent } from './speed-check-header/speed-check-header';
import { ActivityCode4ModalModule } from './activity-code-4-modal/activity-code-4-modal.module';
import { SpeedCheckModal } from './speed-check-modal/speed-check-modal';

@NgModule({
  declarations: [
    SpeedCheckHeaderComponent,
    SpeedCheckComponent,
    SpeedCheckModal,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    TestReportComponentsModule,
    IonicModule,
    DirectivesModule,
    ActivityCode4ModalModule,
  ],
  exports: [
    SpeedCheckHeaderComponent,
    SpeedCheckComponent,
    SpeedCheckModal,
  ],
})
export class TestReportCatAMod1ComponentsModule { }
