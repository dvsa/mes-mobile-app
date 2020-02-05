import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from 'ng2-translate';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { SpeedCheckDebriefCardComponent } from './speed-check-debrief-card/speed-check-debrief-card';

@NgModule({
  declarations: [
    SpeedCheckDebriefCardComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [
    SpeedCheckDebriefCardComponent,
  ],
})
export class DebriefCatAMod1ComponentsModule { }
