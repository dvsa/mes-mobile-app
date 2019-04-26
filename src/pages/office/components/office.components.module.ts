import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DrivingFaultCommentComponent } from './drivingFaultComment/driving-fault-comment';
import { ComponentsModule } from '../../../components/components.module';
import { FaultCommentComponent } from './fault-comment/fault-comment';
import { SeriousFaultCommentComponent } from './seriousFaultComments/serious-fault-component';

@NgModule({
  declarations: [
    DrivingFaultCommentComponent,
    FaultCommentComponent,
    SeriousFaultCommentComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
  ],
  exports: [
    DrivingFaultCommentComponent,
    FaultCommentComponent,
    SeriousFaultCommentComponent,
  ],
})
export class OfficeComponentsModule { }
