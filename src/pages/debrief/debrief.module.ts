import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { DebriefPage } from './debrief';

@NgModule({
  declarations: [
    DebriefPage,
  ],
  imports: [
    IonicPageModule.forChild(DebriefPage),
    ComponentsModule,
  ],
})
export class DebriefPageModule {}
