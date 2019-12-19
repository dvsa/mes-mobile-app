import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { IonicPage, NavParams } from 'ionic-angular';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { getVehicleDetails } from '../../../../../modules/tests/vehicle-details/vehicle-details.cat-c.reducer';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';

import {
  getVehicleLength,
  getVehicleWidth,
} from '../../../../../modules/tests/vehicle-details/vehicle-details.cat-c.selector';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';

interface ReverseDiagramPageState {
  testCategory$: Observable<CategoryCode>;
  vehicleLength$: Observable<number>;
  vehicleWidth$: Observable<number>;
}

type OnCloseFunc = () => void;

@IonicPage()
@Component({
  selector: 'reverse-diagram-modal-cat-c',
  templateUrl: 'reverse-diagram-modal.cat-c.html',
})

export class ReverseDiagramCatCPage implements OnInit {
  @Input()
  vehicleLength: number;

  @Input()
  vehicleWidth: number;

  testCategory: CategoryCode;

  onClose: OnCloseFunc;

  componentState: ReverseDiagramPageState;
  subscription: Subscription;
  merged$: Observable<number | CategoryCode>;
  distanceFromStart: number;
  distanceFromMiddle: number;
  distanceOfBayWidth: number;

  constructor(
    private navParams: NavParams,
    public store$: Store<StoreModel>,
  ) {
    this.onClose = this.navParams.get('onClose');
  }

  ngOnInit(): void {

    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.componentState = {
      testCategory$: currentTest$.pipe(
        map(test => test.category),
      ),
      vehicleLength$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getVehicleLength),
      ),
      vehicleWidth$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getVehicleWidth),
      ),
    };

    const { testCategory$, vehicleLength$, vehicleWidth$ } = this.componentState;

    this.merged$ = merge(
      testCategory$.pipe(map(val => this.testCategory = val)),
      vehicleLength$.pipe(map(val => this.vehicleLength = val)),
      vehicleWidth$.pipe(map(val => this.vehicleWidth = val)),
    );
  }

  calculateDistanceLength(vehicleLength: number): void {
    let distanceFromStartMultiplier: number;
    let distanceFromMiddleMultiplier: number;
    switch (this.testCategory) {
      case TestCategory.C:
        distanceFromStartMultiplier = 4;
        distanceFromMiddleMultiplier = 2;
        break;
      default:
        distanceFromStartMultiplier = 4;
        distanceFromMiddleMultiplier = 2;
    }
    const distanceFromStart = vehicleLength * distanceFromStartMultiplier;
    const distanceFromMiddle = vehicleLength * distanceFromMiddleMultiplier;
    this.distanceFromMiddle = Math.round(distanceFromMiddle * 100) / 100;
    this.distanceFromStart = Math.round(distanceFromStart * 100) / 100;
  }

  calculateDistanceWidth(vehicleWidth: number): void {
    let distanceOfBayWidthMultiplier: number;
    switch (this.testCategory) {
      case TestCategory.C:
        distanceOfBayWidthMultiplier = 3.5;
        break;
      default:
        distanceOfBayWidthMultiplier = 3.5;
    }
    const distanceOfBayWidth = vehicleWidth * distanceOfBayWidthMultiplier;
    this.distanceOfBayWidth = Math.round(distanceOfBayWidth * 100) / 100;
  }

  ionViewWillEnter(): boolean {
    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
      this.calculateDistanceLength(this.vehicleLength);
      this.calculateDistanceWidth(this.vehicleWidth);
    }

    return true;
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeModal(): void {
    this.onClose();
  }
}
