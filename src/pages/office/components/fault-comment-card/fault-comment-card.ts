import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommentedCompetency } from '../../../../shared/models/fault-marking.model';

@Component({
  selector: 'fault-comment-card',
  templateUrl: 'fault-comment-card.html',
})
export class FaultCommentCardComponent {

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

}
