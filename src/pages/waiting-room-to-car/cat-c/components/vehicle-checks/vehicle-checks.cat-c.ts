import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CAT_C } from '../../../../page-names.constants';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../../app/app.component';
import { VehicleChecksScore } from '../../../../../shared/models/vehicle-checks-score.model';

// TODO: MES-4254 Import cat c schema
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { get } from 'lodash';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';

@Component({
  selector: 'vehicle-checks-cat-c',
  templateUrl: 'vehicle-checks.cat-c.html',
})
export class VehicleChecksCatCComponent implements OnChanges {

  @Input() onCloseVehicleChecksModal: () => {};

  @Input() vehicleChecksScore: VehicleChecksScore;

  // TODO: MES-4254 Use cat c type
  @Input() vehicleChecks: CatBEUniqueTypes.VehicleChecks;

  @Input()
  vehicleChecksSelectQuestions: string;

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
      CAT_C.VEHICLE_CHECKS_MODAL,
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

    return this.vehicleChecks.showMeQuestions.reduce((res, question) => res && hasOutcome(question), true)
      && this.vehicleChecks.tellMeQuestions.reduce((res, question) => res && hasOutcome(question), true);
  }

  hasSeriousFault(): boolean {
    return this.vehicleChecksScore.seriousFaults > 0;
  }

  hasDrivingFault(): boolean {
    return this.vehicleChecksScore.drivingFaults > 0;
  }

  incompleteVehicleChecks(): { vehicleChecks: boolean } {
    return { vehicleChecks: false };
  }

  validateVehicleChecks(c: FormControl): null | { vehicleChecks: boolean } {
    // TODO reinstate this check when Cat C complete (introduced by MES-4264)
    // disabling validation for ease of testing
    // return this.everyQuestionHasOutcome() ? null : this.incompleteVehicleChecks();
    return null;
  }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl({
        value: 'Select questions',
        disabled: false,
      },
      [this.validateVehicleChecks.bind(this)]);
      this.formGroup.addControl('vehicleChecksSelectQuestions', this.formControl);
    }
    this.formControl.patchValue('Select questions');
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
