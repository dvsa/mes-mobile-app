import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'date-of-test',
  templateUrl: 'date-of-test.html',
})
export class DateOfTest {

  @Input()
  dateOfTest: string;

  @Output()
  dateOfTestChange = new EventEmitter<string>();

  @ViewChild('editDateInput') inputEl: ElementRef;

  editMode: Boolean = false;

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
