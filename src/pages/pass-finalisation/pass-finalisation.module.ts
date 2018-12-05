import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { PassFinalisationPage } from './pass-finalisation';

@NgModule({
  declarations: [
    PassFinalisationPage,
  ],
  imports: [
    IonicPageModule.forChild(PassFinalisationPage),
    ComponentsModule,
  ],
})
export class PassFinalisationPageModule {}
