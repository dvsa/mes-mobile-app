import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DebriefCardComponent } from './debrief-card/debrief-card';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ViewTestResultComponentsModule } from '../../components/view-test-result.components.module';
import { SpeedCardComponent } from './speed-card/speed-card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DebriefCardComponent,
    SpeedCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    ViewTestResultComponentsModule,
    TranslateModule,
  ],
  exports: [
    DebriefCardComponent,
    SpeedCardComponent,
  ],
})
export class ViewTestResultCatAMod1ComponentsModule {}
