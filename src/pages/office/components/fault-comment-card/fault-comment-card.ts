import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SeriousFaultsContainer } from '../../../../shared/constants/competencies/catb-competencies';
import { FaultComment } from '../fault-comment/fault-comment.model';

@Component({
  selector: 'fault-comment-card',
  templateUrl: 'fault-comment-card.html',
})
export class FaultCommentCardComponent implements OnChanges {

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

  private formControls: { [competency: string]: FormControl };

  ngOnChanges() {
    if (!this.formControls) {
      // Create form controls that we'll track for each competency
      this.formControls = this.faultComments.reduce((ctrls, fault) => ({
        ...ctrls,
        [fault.propertyName]: new FormControl(null, Validators.required),
      }), {});
      // Add the form controls to the form group
      Object.entries(this.formControls)
        .forEach(formControl => this.formGroup.addControl(formControl[0], formControl[1]));
    }

    // Patch each value tracked in the form group
    Object.entries(this.formControls)
      .forEach((formControl) => {
        const incomingComment = this.faultComments.find(fc => fc.propertyName === formControl[0]);
        formControl[1].patchValue(incomingComment);
      });
  }

  faultCommentChanged(competency: string, comment: string): void {
    const faultComment: FaultComment = { competency, comment };
    this.faultCommentsChange.emit(faultComment);
  }

}
