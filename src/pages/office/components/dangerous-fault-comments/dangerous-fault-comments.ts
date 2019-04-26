import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SeriousFaultsContainer } from '../../../../shared/constants/competencies/catb-competencies';
import { FaultComment } from './dangerous-fault-comments.model';

@Component({
  selector: 'dangerous-fault-comments',
  templateUrl: 'dangerous-fault-comments.html',
})
export class DangerousFaultCommentsComponent {

  @Input()
  dangerousFaultComments: SeriousFaultsContainer[];

  @Input()
  formGroup: FormGroup;

  @Output()
  dangerousFaultCommentChange = new EventEmitter<FaultComment>();

  dangerousFaultCommentChanged(dangerousFaultComment: FaultComment): void {
    this.dangerousFaultCommentChange.emit(dangerousFaultComment);
  }

}
