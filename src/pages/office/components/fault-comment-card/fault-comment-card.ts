import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SeriousFaultsContainer } from '../../../../shared/constants/competencies/catb-competencies';
import { FaultComment } from '../fault-comment/fault-comment.model';

@Component({
  selector: 'fault-comment-card',
  templateUrl: 'fault-comment-card.html',
})
export class FaultCommentCardComponent {

  @Input()
  formGroup: FormGroup;

  @Input()
  faultComments: SeriousFaultsContainer[];

  @Input()
  header: string;

  @Input()
  faultType: string;

  @Input()
  shouldRender: boolean;

  @Output()
  faultCommentsChange = new EventEmitter<FaultComment>();

  faultCommentChanged(competency: string, comment: string): void {
    const faultComment: FaultComment = { competency, comment };
    this.faultCommentsChange.emit(faultComment);
  }

}
