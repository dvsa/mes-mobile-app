import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TestDetailsComponent } from './test-details/test-details';
import { ExaminerDetailsComponent } from './examiner-details/examiner-details';

@NgModule({
  declarations: [
    TestDetailsComponent,
    ExaminerDetailsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    TestDetailsComponent,
    ExaminerDetailsComponent,
  ],
})
export class ViewTestResultComponentsModule {}
