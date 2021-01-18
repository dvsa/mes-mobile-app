import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// import * as moment from 'moment';

@Component({
  selector: 'date-of-test',
  templateUrl: 'date-of-test.html',
})
export class DateOfTest implements OnInit {

  @Input()
  dateOfTest: string;

  @Output()
  dateOfTestChange = new EventEmitter<string>();

  @ViewChild('editDateInput') inputEl: ElementRef;

  editMode: Boolean = true;
  // customTestDate: string = '';

  // maxDate: string = '2021-01-17';
  // minDate: string = '2020-01-18';

  ngOnInit() {
    // this.customTestDate = this.dateOfTest;
    // this.maxDate = moment().format('YYYY-MM-DD');
    // this.minDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
  }

  onTap(): void {
    console.log('On Tap event fired');
  }

  onPress(): void {
    console.log('On Press event fired');
  }

  enableEdit(): void {
    this.editMode = true;
    setTimeout(() => this.inputEl.nativeElement.focus());
  }

  disableEdit(): void {
    this.editMode = false;
  }

  dateOfTestChanged(dateOfTest: string): void {
    this.dateOfTestChange.emit(dateOfTest);
  }

}
