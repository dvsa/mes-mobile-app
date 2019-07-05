import { Component, Input } from '@angular/core';
import { ExaminerDetailsModel } from './examiner-details.model';

@Component({
  selector: 'examiner-details',
  templateUrl: 'examiner-details.html',
})
export class ExaminerDetailsComponent {

  @Input()
  data: ExaminerDetailsModel;

  constructor() {}

}
