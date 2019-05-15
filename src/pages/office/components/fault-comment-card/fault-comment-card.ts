import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommentedCompetency } from '../../../../shared/models/fault-marking.model';

@Component({
  selector: 'fault-comment-card',
  templateUrl: 'fault-comment-card.html',
})
export class FaultCommentCardComponent implements OnChanges {
  @Input()
  outcome: string;

  @Input()
  formGroup: FormGroup;

  @Input()
  faultComments: CommentedCompetency[];

  @Input()
  header: string;

  @Input()
  faultType: string;

  @Input()
  shouldRender: boolean;

  @Output()
  faultCommentsChange = new EventEmitter<CommentedCompetency>();

  faultCommentChanged(faultComment: CommentedCompetency): void {
    this.faultCommentsChange.emit(faultComment);
  }
  ngOnChanges(): void {
    this.faultComments.forEach((value) => {
      const fieldName = `faultComment-${this.faultType}-${value.competencyIdentifier}`;
      const field = this.formGroup.get(fieldName);
      if (field) {
        this.formGroup.get(fieldName).clearValidators();
        this.formGroup.get(fieldName).reset();
        Object.keys(this.formGroup.controls).forEach(controlName => this.formGroup.controls[controlName].markAsDirty());
      }
    });
  }
}
