import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/components.module';
import { FaultCommentComponent } from './fault-comment/fault-comment';
import { FaultCommentCardComponent } from './fault-comment-card/fault-comment-card';

@NgModule({
  declarations: [
    FaultCommentComponent,
    FaultCommentCardComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
  ],
  exports: [
    FaultCommentComponent,
    FaultCommentCardComponent,
  ],
})
export class OfficeComponentsModule { }
