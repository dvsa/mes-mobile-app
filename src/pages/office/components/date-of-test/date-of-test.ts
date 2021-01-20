import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';

const PRESS_TIME_TO_ENABLE_EDIT = 10000;

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

  isPressed: Boolean = false;
  timeoutId: NodeJS.Timeout;
  editMode: Boolean = false;

  customTestDate: string = '';
  maxDate: string = '2021-01-17';
  minDate: string = '2020-01-18';

  ngOnInit() {
    this.customTestDate = moment(this.dateOfTest, 'DD/MM/YYYY').format('YYYY-MM-DD');
    this.maxDate = moment().format('YYYY-MM-DD');
    this.minDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
  }

  datePickerChange() {
    this.dateOfTestChange.emit(this.customTestDate);
    this.disableEdit();
  }

  datePickerCancel() {
    this.disableEdit();
  }

  onTouchStart() {
    this.isPressed = true;
    this.timeoutId = setTimeout((component: DateOfTest) => {
      if (component.isPressed) {
        component.editMode = true;
      }
    }, PRESS_TIME_TO_ENABLE_EDIT, this);
  }

  onTouchEnd() {
    this.isPressed = false;
    clearTimeout(this.timeoutId);
  }

  enableEdit = (): void => {
    this.editMode = true;
  }

  disableEdit = () => this.editMode = false;

}
