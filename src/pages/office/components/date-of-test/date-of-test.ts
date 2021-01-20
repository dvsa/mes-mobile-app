import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';

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

  editMode: Boolean = false;
  customTestDate: string = '';

  maxDate: string = '2021-01-17';
  minDate: string = '2020-01-18';

  constructor() {
  }

  ngOnInit() {
    this.customTestDate = this.dateOfTest;
    console.log('custom test date is', this.customTestDate);
    this.maxDate = moment().format('YYYY-MM-DD');
    this.minDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
  }

  datePickerChange(time) {
    console.log('date picker ionChange');
    console.log('param', time);
    console.log('customTestDate', this.customTestDate);
    this.dateOfTestChange.emit(this.customTestDate);
    this.disableEdit();
  }

  onTap(): void {
    console.log('On Tap event fired');
  }

  onPress(): void {
    console.log('On Press event fired');
  }

  enableEdit = (): void => {
    this.editMode = true;
    setTimeout(() => console.log('The inputEl is', this.inputEl));
  }

  disableEdit = () => this.editMode = false;

}
