import { Component, Input } from '@angular/core';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { DateTime } from '../../../../shared/helpers/date-time';
import { Name } from '@dvsa/mes-test-schema/categories/common';
import { ModalController } from 'ionic-angular';
import { CAT_A_MOD1, CAT_B, CAT_BE, CAT_C } from '../../../page-names.constants';
import { App } from '../../../../app/app.component';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

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
    return new DateTime(this.searchResult.testDate).format('HH:mm');
  }

  getName(): string {
    const name: Name = this.searchResult.candidateName;
    return `${name.title} ${name.firstName} ${name.lastName}`;
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
