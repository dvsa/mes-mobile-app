import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ReverseLeftComponent } from './reverse-left/reverse-left';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { ReverseLeftPopoverComponent } from './reverse-left-popover/reverse-left-popover';
import { UncoupleRecoupleComponent } from './uncouple-recouple/uncouple-recouple';

@NgModule({
  declarations: [
    ReverseLeftComponent,
    ReverseLeftPopoverComponent,
    UncoupleRecoupleComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    TestReportComponentsModule,
    IonicModule,
    DirectivesModule,
  ],
  exports: [
    ReverseLeftComponent,
    ReverseLeftPopoverComponent,
    UncoupleRecoupleComponent,
  ],
})
export class TestReportCatBEComponentsModule { }
