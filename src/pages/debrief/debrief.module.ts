import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebriefPage } from './debrief';

@NgModule({
  declarations: [
    DebriefPage,
  ],
  imports: [
    IonicPageModule.forChild(DebriefPage),
  ],
})
export class DebriefPageModule {}
