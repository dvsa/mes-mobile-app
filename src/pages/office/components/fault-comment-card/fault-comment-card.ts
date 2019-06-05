import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentedCompetency } from '../../../../shared/models/fault-marking.model';

@Component({
  selector: 'fault-comment-card',
  templateUrl: 'fault-comment-card.html',
})
export class FaultCommentCardComponent {
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

  @Input()
  faultCount: number;

  @Output()
  faultCommentsChange = new EventEmitter<CommentedCompetency>();

  ngOnInit() {
    this.faultComments.forEach((value) => {
      const control = new FormControl(null);
      console.log(`adding control faultComment-${value.source}-${this.faultType}-${value.competencyIdentifier}`);
      this.formGroup.addControl(
        `faultComment-${value.source}-${this.faultType}-${value.competencyIdentifier}`, control);
    });
  }

  faultCommentChanged(faultComment: CommentedCompetency): void {
    this.faultCommentsChange.emit(faultComment);
  }
}
