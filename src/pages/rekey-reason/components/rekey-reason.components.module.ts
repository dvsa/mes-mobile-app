import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { IpadIssueComponent } from './ipad-issue/ipad-issue';
import { TransferComponent } from './transfer/transfer';
import { OtherReasonComponent } from './other-reason/other-reason';

@NgModule({
  declarations: [
    IpadIssueComponent,
    TransferComponent,
    OtherReasonComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    DirectivesModule,
  ],
  exports: [
    IpadIssueComponent,
    TransferComponent,
    OtherReasonComponent,
  ],
})
export class RekeyReasonComponentsModule { }
