import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DrivingFaultCommentComponent } from './drivingFaultComment/driving-fault-comment';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    DrivingFaultCommentComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
  ],
  exports:[
    DrivingFaultCommentComponent,
  ],
})
export class OfficeComponentsModule {}
