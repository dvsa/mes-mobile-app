import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CAT_C } from '../../../../page-names.constants';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../../app/app.component';
import { VehicleChecksScore } from '../../../../../shared/models/vehicle-checks-score.model';
import { get } from 'lodash';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestCategory } from '../../../../../modules/tests/category/category.reducer';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

@Component({
  selector: 'vehicle-checks-cat-c',
  templateUrl: 'vehicle-checks.cat-c.html',
})
export class VehicleChecksCatCComponent implements OnChanges, OnInit {
  @Input() fullLicenceHeld: boolean = null;

  @Input() onCloseVehicleChecksModal: () => {};

  @Input() vehicleChecksScore: VehicleChecksScore;

  @Input() vehicleChecks: CatCUniqueTypes.VehicleChecks;

  @Input()
  vehicleChecksSelectQuestions: string;

  @Input()
  formGroup: FormGroup;

  formControl: FormControl;

  category: TestCategory;

  @Output() fullLicenceHeldChange = new EventEmitter<boolean>();

  constructor(
    private modalController: ModalController,
    private app: App,
    private store$: Store<StoreModel>,
  ) {
  }

  ngOnInit() {
    this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestCategory),
    ).subscribe((category) => {
      this.category = category as TestCategory;
    });
  }

  openVehicleChecksModal(): void {
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const modal = this.modalController.create(
      CAT_C.VEHICLE_CHECKS_MODAL,
      { category: this.category, fullLicenceHeld: this.fullLicenceHeld },
      { cssClass: zoomClass },
    );
    modal.onDidDismiss((licenceHeld: string) => {
      this.onCloseVehicleChecksModal();
      this.fullLicenceHeldChange.emit(licenceHeld === 'Y');
    });
    modal.present();
  }

  everyQuestionHasOutcome(): boolean {
    const hasOutcome = (question: QuestionResult): boolean => {
      const outcome = get(question, 'outcome', undefined);
      return outcome !== undefined;
    };

    const showMeQuestions = (
      this.fullLicenceHeld ? [this.vehicleChecks.showMeQuestions[0]] : this.vehicleChecks.showMeQuestions);
    const tellMeQuestions =
      this.fullLicenceHeld ? [this.vehicleChecks.tellMeQuestions[0]] : this.vehicleChecks.tellMeQuestions;

    return showMeQuestions.reduce((res, question) => res && hasOutcome(question), true)
      && tellMeQuestions.reduce((res, question) => res && hasOutcome(question), true)
      && this.vehicleChecks.tellMeQuestions.reduce((res, question) => res && hasOutcome(question), true);
  }

  hasSeriousFault(): boolean {
    return this.vehicleChecksScore.seriousFaults > 0;
  }

  hasDrivingFault(): boolean {
    return this.vehicleChecksScore.drivingFaults > 0;
  }

  incompleteVehicleChecks(): VehicleCheckFormState {
    return { vehicleChecks: false };
  }

  validateVehicleChecks(c: FormControl): null | VehicleCheckFormState {
    return this.everyQuestionHasOutcome() ? null : this.incompleteVehicleChecks();
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

interface VehicleCheckFormState {
  vehicleChecks: boolean;
}
