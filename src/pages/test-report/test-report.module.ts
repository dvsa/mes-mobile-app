import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { TestReportPage } from './test-report';

@NgModule({
  declarations: [
    TestReportPage,
  ],
  imports: [
    IonicPageModule.forChild(TestReportPage),
    ComponentsModule,
  ],
})
export class TestReportPageModule {}
