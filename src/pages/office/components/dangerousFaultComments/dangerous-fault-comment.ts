import { Observable } from 'rxjs/Observable';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FaultComment } from '../dangerous-fault-comments/dangerous-fault-comments.model';

interface DangerousFaultCommentComponentState {
  competencyComment$: Observable<string>;
}

@Component({
  selector: 'dangerous-fault-comment',
  templateUrl: 'dangerous-fault-comment.html',
})
export class DangerousFaultCommentComponent implements OnChanges {
  pageState: DangerousFaultCommentComponentState;

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

  dangerousFaultCommentChanged(comment: string): void {
    const dangerousFaultComment: FaultComment = { comment, competency: this.competency };
    this.faultCommentChange.emit(dangerousFaultComment);
  }

  get invalid() {
    return this.formControl.dirty && !this.formControl.valid;
  }

  get formControlName() {
    return `dangerousFaultComment${this.competency}`;
  }

}
