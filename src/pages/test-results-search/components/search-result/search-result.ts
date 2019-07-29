import { Component, Input } from '@angular/core';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { DateTime } from '../../../../shared/helpers/date-time';
import { Name } from '@dvsa/mes-test-schema/categories/B';
import { ModalController } from 'ionic-angular';
import { VIEW_TEST_RESULT_PAGE } from '../../../page-names.constants';
import { App } from '../../../../app/app.component';

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
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const testResultModal = this.modalController.create(
      VIEW_TEST_RESULT_PAGE,
      { applicationReference: this.searchResult.applicationReference },
      { cssClass: zoomClass },
    );

    testResultModal.present();
  }
}
