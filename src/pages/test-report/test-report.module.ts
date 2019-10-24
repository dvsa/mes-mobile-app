import { NgModule } from '@angular/core';
import { TestReportCatBPageModule } from './cat-b/test-report.cat-b.page.module';
import { TestReportCatBEPageModule } from './cat-be/test-report.cat-be.page.module';

@NgModule({
  imports: [
    TestReportCatBPageModule,
    TestReportCatBEPageModule,
  ],
})
export class TestReportPageModule {}
