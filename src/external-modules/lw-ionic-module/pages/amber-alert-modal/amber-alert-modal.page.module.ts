import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { AmberAlertModalPage } from './amber-alert-modal.page';

@NgModule({
  declarations: [
    AmberAlertModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AmberAlertModalPage),
    IonicModule,
  ],
  exports: [
    AmberAlertModalPage,
  ],
})
export class AmberAlertModalPageModule { }
