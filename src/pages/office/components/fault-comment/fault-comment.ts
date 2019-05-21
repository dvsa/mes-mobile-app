import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CommentedCompetency, MultiFaultAssignableCompetency } from '../../../../shared/models/fault-marking.model';
import {
  OutcomeBehaviourMapProvider,
  VisibilityType,
} from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';

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

  @Input()
  faultCount: number;
  @Output()
  faultCommentChange = new EventEmitter<CommentedCompetency>();

  static readonly fieldName: string = 'faultComment';
  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

  ngOnChanges(): void {
    if (this.outcomeBehaviourProvider.getVisibilityType(this.outcome, FaultCommentComponent.fieldName) ===
      VisibilityType.NotVisible) {
      this.parentForm.get(this.formControlName).clearValidators();
    } else {
      console.log(`faultType ${this.faultType} fault count ${this.faultCount}`);
      if (this.faultType !== 'driving' ||
        (this.faultType === 'driving' && this.faultCount &&
          this.faultCount > 15)) {
        this.parentForm.get(this.formControlName).setValidators(Validators.required);
      } else {
        this.parentForm.get(this.formControlName).clearValidators();
      }
    }
    this.parentForm.get(this.formControlName).patchValue(this.faultComment.comment);
  }

  faultCommentChanged(newComment: string): void {
    const { comment, ...commentedCompetencyWithoutComment } = this.faultComment;
    const commentedCompetency: CommentedCompetency | (CommentedCompetency & MultiFaultAssignableCompetency) = {
      comment: newComment,
      ...commentedCompetencyWithoutComment,
    };
    this.faultCommentChange.emit(commentedCompetency);
  }

  get invalid(): boolean {
    return !this.parentForm.get(this.formControlName).valid && this.parentForm.get(this.formControlName).dirty;
  }

  get formControlName() {
    return `faultComment-${this.faultType}-${this.faultComment.competencyIdentifier}`;
  }

}
