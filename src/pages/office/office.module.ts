import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { OfficePage } from './office';

@NgModule({
  declarations: [
    OfficePage,
  ],
  imports: [
    IonicPageModule.forChild(OfficePage),
    ComponentsModule,
  ],
})
export class OfficePageModule {}
