import { Component, Input } from '@angular/core';
import { CAT_BE } from '../../../../page-names.constants';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../../app/app.component';
import { VehicleChecksScore } from '../../../../../shared/models/vehicle-checks-score.model';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { get } from 'lodash';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/Common';

@Component({
  selector: 'vehicle-checks-cat-be',
  templateUrl: 'vehicle-checks.html',
})
export class VehicleChecksCatBEComponent {

  @Input() vehicleChecksScore: VehicleChecksScore;
  @Input() vehicleChecks: CatBEUniqueTypes.VehicleChecks;

  constructor(
    private modalController: ModalController,
    private app: App,
  ) { }

  isInvalid(): boolean {
    // TODO - need to implment validation + unit test
    return false;
  }

  openVehicleChecksModal(): void {
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const modal = this.modalController.create(
      CAT_BE.VEHICLE_CHECKS_MODAL,
      {},
      { cssClass: zoomClass },
    );
    modal.present();
  }

  everyQuestionIsSelected(): boolean {
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
}
