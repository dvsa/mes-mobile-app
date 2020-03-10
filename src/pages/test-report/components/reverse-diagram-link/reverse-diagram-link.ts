import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { select, Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getTestCategory } from '../../../../modules/tests/category/category.reducer';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { REVERSE_DIAGRAM_PAGE } from '../../../page-names.constants';
import {
  ReverseDiagramClosed,
  ReverseDiagramOpened,
} from '../reverse-diagram-modal/reverse-diagram-modal.actions';
import { App } from '../../../../app/app.component';

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
    const diagramPage = REVERSE_DIAGRAM_PAGE;
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
}
