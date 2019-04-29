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
      // Create form controls that we'll track for each competency and add them to FormGroup
      this.formControls = this.faultComments.reduce((ctrls, fault) => {
        const formControl = new FormControl(null, Validators.required);
        const formControlName = `${this.faultType}Comment-${fault.propertyName}`;
        this.formGroup.addControl(formControlName, formControl);
        return {
          ...ctrls,
          [formControlName]: formControl,
        };
      }, {});
    }

    // Patch each value tracked in the form group
    Object.entries(this.formControls)
      .forEach((formControl) => {
        const incomingComment = this.faultComments
          .find(fc => fc.propertyName === formControl[0].slice(formControl[0].indexOf('-') + 1)).comment;
        formControl[1].patchValue(incomingComment);
      });
  }

  faultCommentChanged(competency: string, comment: string): void {
    const faultComment: FaultComment = { competency, comment };
    this.faultCommentsChange.emit(faultComment);
  }

  invalid(competency: string) {
    const formControl = this.formControls[`${this.faultType}Comment-${competency}`];
    const invalid = formControl.dirty && !formControl.valid;
    console.log(`invalid ${competency} (${this.faultType}) ${invalid}`);
    return invalid;
  }

  seriousFaultContainerToFaultComment(faultContainer: SeriousFaultsContainer): FaultComment {
    const { comment, propertyName } = faultContainer;
    return { comment, competency: propertyName };
  }

}
