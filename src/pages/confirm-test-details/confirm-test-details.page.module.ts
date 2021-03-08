import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmTestDetailsPage } from './confirm-test-details.page';
import { ComponentsModule } from '../../components/common/common-components.module';

@NgModule({
  declarations: [
    ConfirmTestDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmTestDetailsPage),
    ComponentsModule,
  ],
})
export class ConfirmTestDetailsPageModule {}
