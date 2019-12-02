import { Component, Input } from '@angular/core';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { DateTime } from '../../../../shared/helpers/date-time';
import { Name } from '@dvsa/mes-test-schema/categories/Common';
import { ModalController } from 'ionic-angular';
import { CAT_B, CAT_BE } from '../../../page-names.constants';
import { App } from '../../../../app/app.component';
import { TestCategory } from '../../../../shared/models/test-category';

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
