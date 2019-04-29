import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentedCompetency } from '../../../../shared/models/fault-marking.model';

@Component({
  selector: 'fault-comment',
  templateUrl: 'fault-comment.html',
})
export class FaultCommentComponent implements OnChanges {

  @Input()
  parentForm: FormGroup;

  @Input()
  faultComment: CommentedCompetency;

  @Input()
  faultType: string;

  @Output()
  faultCommentChange = new EventEmitter<CommentedCompetency>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, Validators.required);
      this.parentForm.addControl(this.formControlName, this.formControl);
    }
    this.formControl.patchValue(this.faultComment.comment);
  }

  faultCommentChanged(newComment: string): void {
    const { comment, ...commentedCompetencyWithoutComment } = this.faultComment;
    const commentedCompetency: CommentedCompetency = {
      comment: newComment,
      ...commentedCompetencyWithoutComment,
    };
    this.faultCommentChange.emit(commentedCompetency);
  }

  get invalid() {
    return this.formControl.dirty && !this.formControl.valid;
  }

  get formControlName() {
    return `faultComment-${this.faultType}-${this.faultComment.competencyIdentifier}`;
  }

}
