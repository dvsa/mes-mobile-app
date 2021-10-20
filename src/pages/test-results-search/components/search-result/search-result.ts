import { Component, Input } from '@angular/core';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { DateTime } from '../../../../shared/helpers/date-time';
import { Name } from '@dvsa/mes-test-schema/categories/common';
import { ModalController } from 'ionic-angular';
import {
  CAT_A_MOD1,
  CAT_A_MOD2,
  CAT_ADI_PART2,
  CAT_B,
  CAT_BE,
  CAT_C,
  CAT_D,
  CAT_HOME_TEST,
  CAT_CPC,
  CAT_MANOEUVRES,
} from '../../../page-names.constants';
import { App } from '../../../../app/app.component';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import moment from 'moment';

@Component({
  selector: 'search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultComponent {

  @Input()
  searchResult: SearchResultTestSchema;

  constructor(public modalController: ModalController, private app: App) { }

  getDate(): string {
    return new DateTime(this.searchResult.testDate).format('DD/MM/YYYY');
  }

  getTime(): string {
    return moment(this.searchResult.testDate).format('HH:mm');
  }

  getName(): string {
    const name: Name = this.searchResult.candidateName;
    return name.title ? `${name.title} ${name.firstName} ${name.lastName}` : `${name.firstName} ${name.lastName}`;
  }

  openTestResult(): void {
    // Modals are at the same level as the ion-nav so are not getting the zoom level class,
    // this needs to be passed in the create options.
    let pageToOpen: string = '';

    switch (this.searchResult.category) {
      case TestCategory.B:
        pageToOpen = CAT_B.VIEW_TEST_RESULT_PAGE;
        break;
      case TestCategory.BE:
        pageToOpen = CAT_BE.VIEW_TEST_RESULT_PAGE;
        break;
      case TestCategory.C:
      case TestCategory.CE:
      case TestCategory.C1:
      case TestCategory.C1E:
        pageToOpen = CAT_C.VIEW_TEST_RESULT_PAGE;
        break;
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        pageToOpen = CAT_A_MOD1.VIEW_TEST_RESULT_PAGE;
        break;
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2:
        pageToOpen = CAT_A_MOD2.VIEW_TEST_RESULT_PAGE;
        break;
      case TestCategory.D:
      case TestCategory.DE:
      case TestCategory.D1:
      case TestCategory.D1E:
        pageToOpen = CAT_D.VIEW_TEST_RESULT_PAGE;
        break;
      case TestCategory.F:
      case TestCategory.G:
      case TestCategory.H:
      case TestCategory.K:
        pageToOpen = CAT_HOME_TEST.VIEW_TEST_RESULT_PAGE;
        break;
      case TestCategory.ADI2:
        pageToOpen = CAT_ADI_PART2.VIEW_TEST_RESULT_PAGE;
        break;
      case TestCategory.CCPC:
      case TestCategory.DCPC:
        pageToOpen = CAT_CPC.VIEW_TEST_RESULT_PAGE;
        break;
      case TestCategory.CM:
      case TestCategory.C1M:
      case TestCategory.CEM:
      case TestCategory.C1EM:
      case TestCategory.DM:
      case TestCategory.D1M:
      case TestCategory.DEM:
      case TestCategory.D1EM:
        pageToOpen = CAT_MANOEUVRES.VIEW_TEST_RESULT_PAGE;
    }

    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const testResultModal = this.modalController.create(
      pageToOpen,
      { applicationReference: this.searchResult.applicationReference },
      { cssClass: zoomClass },
    );

    testResultModal.present();
  }
}
