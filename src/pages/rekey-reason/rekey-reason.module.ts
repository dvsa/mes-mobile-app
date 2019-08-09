import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RekeyReasonPage } from './rekey-reason';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RekeyReasonPage,
  ],
  imports: [
    IonicPageModule.forChild(RekeyReasonPage),
    ComponentsModule,
  ],
})
export class RekeyReasonPageModule {}
