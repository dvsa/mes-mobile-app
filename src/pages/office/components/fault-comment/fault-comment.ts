import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FaultComment } from './fault-comment.model';

@Component({
  selector: 'fault-comment',
  templateUrl: 'fault-comment.html',
})
export class FaultCommentComponent implements OnChanges {

  @Input()
  parentForm: FormGroup;

  @Input()
  invalidIndicator: boolean;

  @Input()
  index: number;

  @Input()
  competency: string;

  @Input()
  comment: string;

  @Output()
  faultCommentChange = new EventEmitter<FaultComment>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, Validators.required);
      this.parentForm.addControl(this.formControlName, this.formControl);
    }
    this.formControl.patchValue(this.comment);
  }

  faultCommentChanged(comment: string): void {
    const faultComment: FaultComment = { comment, competency: this.competency };
    this.faultCommentChange.emit(faultComment);
  }

  get invalid() {
    return this.formControl.dirty && !this.formControl.valid;
  }

  get formControlName() {
    return `dangerousFaultComment${this.competency}`;
  }

}
