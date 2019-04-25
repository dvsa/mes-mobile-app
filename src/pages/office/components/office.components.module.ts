import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DrivingFaultCommentComponent } from './drivingFaultComment/driving-fault-comment';
import { ComponentsModule } from '../../../components/components.module';
import { DangerousFaultCommentComponent } from './dangerousFaultComments/dangerous-fault-comment';
import { SeriousFaultCommentComponent } from './seriousFaultComments/serious-fault-component';

@NgModule({
  declarations: [
    DrivingFaultCommentComponent,
    DangerousFaultCommentComponent,
    SeriousFaultCommentComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
  ],
  exports:[
    DrivingFaultCommentComponent,
    DangerousFaultCommentComponent,
    SeriousFaultCommentComponent,
  ],
})
export class OfficeComponentsModule {}
