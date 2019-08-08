import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CommentedCompetency, MultiFaultAssignableCompetency } from '../../../../shared/models/fault-marking.model';
import {
  OutcomeBehaviourMapProvider,
  VisibilityType,
} from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';

enum ValidFaultTypes {
  DRIVING = 'driving',
  SERIOUS = 'serious',
  DANGEROUS = 'dangerous',
}

@Component({
  selector: 'fault-comment',
  templateUrl: 'fault-comment.html',
})

export class FaultCommentComponent implements OnChanges {
  static readonly maxFaultCount = 15;
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

  @Input()
  shouldRender: boolean;

  @Output()
  faultCommentChange = new EventEmitter<CommentedCompetency>();

  faultCommentCharsRemaining: number = null;
  static readonly fieldName: string = 'faultComment';
  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

  ngOnChanges(): void {

    // mes 2393 - need to remove validations if < 16 faults as comments can
    // only be entered if 16 or more
    if (this.isFieldNotVisible || this.shouldClearDrivingFaultValidators()) {
      this.parentForm.get(this.formControlName).clearValidators();
    } else {
      this.parentForm.get(this.formControlName).setValidators([Validators.required, Validators.maxLength(1000)]);
    }
    this.parentForm.get(this.formControlName).patchValue(this.faultComment.comment);
  }

  shouldClearDrivingFaultValidators(): boolean {
    if (this.faultType !== ValidFaultTypes.DRIVING) {
      return false;
    }

    if (!this.shouldRender) {
      return true;
    }

    if (this.faultCount && this.faultCount <= FaultCommentComponent.maxFaultCount) {
      return true;
    }
  }

  faultCommentChanged(newComment: string): void {
    const { comment, ...commentedCompetencyWithoutComment } = this.faultComment;
    const commentedCompetency: CommentedCompetency | (CommentedCompetency & MultiFaultAssignableCompetency) = {
      comment: newComment,
      ...commentedCompetencyWithoutComment,
    };
    this.faultCommentChange.emit(commentedCompetency);
  }

  characterCountChanged(charactersRemaining: number) {
    this.faultCommentCharsRemaining = charactersRemaining;
  }

  getCharacterCountText() {
    const characterString = Math.abs(this.faultCommentCharsRemaining) === 1 ? 'character' : 'characters';
    const endString = this.faultCommentCharsRemaining < 0 ? 'too many' : 'remaining';
    return `You have ${Math.abs(this.faultCommentCharsRemaining)} ${characterString} ${endString}`;
  }

  charactersExceeded(): boolean {
    return this.faultCommentCharsRemaining < 0;
  }

  get invalid(): boolean {
    return !this.parentForm.get(this.formControlName).valid && this.parentForm.get(this.formControlName).dirty;
  }

  get formControlName() {
    return `faultComment-${this.faultComment.source}-${this.faultType}-${this.faultComment.competencyIdentifier}`;
  }

  get isFieldNotVisible(): boolean {
    const fieldVisibility = this.outcomeBehaviourProvider.getVisibilityType(
      this.outcome, FaultCommentComponent.fieldName);

    return fieldVisibility === VisibilityType.NotVisible;
  }

}
