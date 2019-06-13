import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAlertTitleComponent } from './modal-alert-title/modal-alert-title';
import { ModalReturnButtonComponent } from './modal-return-button/modal-return-button';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ModalAlertTitleComponent,
    ModalReturnButtonComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[
    ModalAlertTitleComponent,
    ModalReturnButtonComponent,
  ],
})
export class TestReportModalModule {}
