import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShowMeQuestion } from '../../../providers/question/show-me-question.model';

@Component({
  selector: 'show-me-question',
  templateUrl: 'show-me-question.html',
})
export class ShowMeQuestionComponent implements OnChanges {

  @Input()
  showMeQuestion: ShowMeQuestion;

  @Input()
  showMeQuestionOptions: ShowMeQuestion[];

  @Input()
  formGroup: FormGroup;

  @Output()
  showMeQuestionChange = new EventEmitter<ShowMeQuestion>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl([], [Validators.required]);
      this.formGroup.addControl('showMeQuestion', this.formControl);
    }
    this.formControl.patchValue(this.showMeQuestion);
  }

  showMeQuestionChanged(showMeQuestion: ShowMeQuestion): void {
    if (this.formControl.valid) {
      this.showMeQuestionChange.emit(showMeQuestion);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
