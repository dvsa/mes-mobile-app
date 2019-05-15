import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentedCompetency, MultiFaultAssignableCompetency } from '../../../../shared/models/fault-marking.model';
import { OutcomeBehaviourMapProvider } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';

@Component({
  selector: 'fault-comment',
  templateUrl: 'fault-comment.html',
})
export class FaultCommentComponent implements OnChanges {

  @Input()
  outcome: string;

  @Input()
  parentForm: FormGroup;

  @Input()
  faultComment: CommentedCompetency | (CommentedCompetency & MultiFaultAssignableCompetency);

  @Input()
  faultType: string;

  @Output()
  faultCommentChange = new EventEmitter<CommentedCompetency>();

  private formControl: FormControl;
  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.parentForm.addControl(this.formControlName, this.formControl);
    }
    // this.parentForm.get(this.formControlName).clearValidators();
    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, 'faultComment');
    if (visibilityType !== 'N') {
      this.parentForm.get(this.formControlName).setValidators([Validators.required]);
    } else {
      this.parentForm.get(this.formControlName).clearValidators();
    }
    this.formControl.patchValue(this.faultComment.comment);
  }

  faultCommentChanged(newComment: string): void {
    const { comment, ...commentedCompetencyWithoutComment } = this.faultComment;
    const commentedCompetency: CommentedCompetency | (CommentedCompetency & MultiFaultAssignableCompetency) = {
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
