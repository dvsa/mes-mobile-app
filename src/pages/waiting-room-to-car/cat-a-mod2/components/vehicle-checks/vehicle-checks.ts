import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CAT_A_MOD2 } from '../../../../page-names.constants';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../../app/app.component';
import { VehicleChecksScore } from '../../../../../shared/models/vehicle-checks-score.model';
import { SafetyAndBalanceQuestions } from '@dvsa/mes-test-schema/categories/AM2';
import { get } from 'lodash';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';

@Component({
  selector: 'vehicle-checks-cat-a-mod2',
  templateUrl: 'vehicle-checks.html',
})
export class VehicleChecksCatAMod2Component implements OnChanges {

  @Input() onCloseVehicleChecksModal: () => {};

  @Input() safetyAndBalanceQuestionsScore: VehicleChecksScore;

  @Input() safetyAndBalanceQuestions: SafetyAndBalanceQuestions;

  @Input()
  safetyAndBalanceSelectQuestions: string;

  @Input()
  formGroup: FormGroup;

  formControl: FormControl;

  constructor(
    private modalController: ModalController,
    private app: App,
  ) { }

  openVehicleChecksModal(): void {
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const modal = this.modalController.create(
      CAT_A_MOD2.VEHICLE_CHECKS_MODAL,
      {},
      { cssClass: zoomClass },
    );
    modal.onDidDismiss(() => {
      this.onCloseVehicleChecksModal();
    });
    modal.present();
  }

  everyQuestionHasOutcome(): boolean {
    const hasOutcome = (question: QuestionResult): boolean => {
      const outcome = get(question, 'outcome', undefined);
      return outcome !== undefined;
    };
    return this.safetyAndBalanceQuestions.safetyQuestions.reduce((res, question) => res && hasOutcome(question), true)
      && this.safetyAndBalanceQuestions.balanceQuestions.reduce((res, question) => res && hasOutcome(question), true);
  }

  hasSeriousFault(): boolean {
    return this.safetyAndBalanceQuestionsScore.seriousFaults > 0;
  }

  hasDrivingFault(): boolean {
    return this.safetyAndBalanceQuestionsScore.drivingFaults > 0;
  }

  incompleteVehicleChecks(): { vehicleChecks: boolean } {
    return { vehicleChecks: false };
  }

  validateVehicleChecks(c: FormControl): null | { vehicleChecks: boolean } {
    return this.everyQuestionHasOutcome() ? null : this.incompleteVehicleChecks();
  }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl({
        value: 'Select questions',
        disabled: false,
      },
      [this.validateVehicleChecks.bind(this)]);
      this.formGroup.addControl('safetyAndBalanceSelectQuestions', this.formControl);
    }
    this.formControl.patchValue('Select questions');
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
