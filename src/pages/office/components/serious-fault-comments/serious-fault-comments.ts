import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SeriousFaultsContainer } from '../../../../shared/constants/competencies/catb-competencies';
import { FaultComment } from '../fault-comment/fault-comment.model';

@Component({
  selector: 'serious-fault-comments',
  templateUrl: 'serious-fault-comments.html',
})
export class SeriousFaultCommentsComponent {

  @Input()
  seriousFaultComments: SeriousFaultsContainer[];

  @Input()
  formGroup: FormGroup;

  @Output()
  seriousFaultCommentChange = new EventEmitter<FaultComment>();

  seriousFaultCommentChanged(seriousFaultComment: FaultComment): void {
    this.seriousFaultCommentChange.emit(seriousFaultComment);
  }

}
