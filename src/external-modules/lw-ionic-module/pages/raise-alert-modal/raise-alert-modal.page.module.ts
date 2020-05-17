import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { RaiseAlertModalPage } from './raise-alert-modal.page';
import { RaiseAlertButtonComponent } from '../../components/alert-button/alert-button.component';
import { LocationProvider } from '../../providers/location.provider';

@NgModule({
  declarations: [
    RaiseAlertModalPage,
    RaiseAlertButtonComponent,
  ],
  imports: [
    IonicPageModule.forChild(RaiseAlertModalPage),
    IonicModule,
  ],
  providers: [
    LocationProvider,
  ],
  exports: [
    RaiseAlertModalPage,
  ],
})
export class RaiseAlertModalPageModule { }
