import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { select, Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { getCurrentTest } from '../../../modules/tests/tests.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { CAT_BE, CAT_C, CAT_D } from '../../../pages/page-names.constants';
import {
  ReverseDiagramClosed,
  ReverseDiagramOpened,
} from '../../../pages/test-report/components/reverse-diagram-modal/reverse-diagram-modal.actions';
import { App } from '../../../app/app.component';

@Component({
  selector: 'reverse-diagram-link',
  templateUrl: 'reverse-diagram-link.html',
})
export class ReverseDiagramLinkComponent implements OnInit {
  subscription: Subscription;
  testCategory: CategoryCode;
  constructor(
    public modalController: ModalController,
    private app: App,
    private store$: Store<StoreModel>,
  ) {}

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    const testCategory$ = currentTest$.pipe(select(getTestCategory));
    this.subscription = testCategory$.pipe(map(result => this.testCategory = result)).subscribe();
  }

  openReverseDiagramModal() {
    const diagramPage = this.getReverseDiagramPage();
    this.store$.dispatch(new ReverseDiagramOpened());
    // Modals are at the same level as the ion-nav so are not getting the zoom level class,
    // this needs to be passed in the create options.
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const reverseDiagramModal = this.modalController.create(
      diagramPage,
      { onClose: this.closeReverseDiagramModal },
      { cssClass: zoomClass });
    reverseDiagramModal.present();
  }

  closeReverseDiagramModal() {
    this.store$.dispatch(new ReverseDiagramClosed());
  }

  getReverseDiagramPage(): string {
    switch (this.testCategory) {
      case 'B+E':
        return CAT_BE.REVERSE_DIAGRAM_PAGE;
      case 'C':
      case 'C+E':
      case 'C1':
      case 'C1+E':
        return CAT_C.REVERSE_DIAGRAM_PAGE;
      case 'D':
      case 'D1':
      case 'D+E':
      case 'D1+E':
        return CAT_D.REVERSE_DIAGRAM_PAGE;
      default:
        return '';
    }
  }
}
