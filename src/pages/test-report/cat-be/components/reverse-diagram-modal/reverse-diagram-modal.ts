import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { IonicPage, NavParams } from 'ionic-angular';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getVehicleDetails } from '../../../../../modules/tests/vehicle-details/cat-be/vehicle-details.cat-be.reducer';
import {
  getVehicleLength,
  getVehicleWidth,
} from '../../../../../modules/tests/vehicle-details/cat-be/vehicle-details.cat-be.selector';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { ReversingDistancesProvider } from '../../../../../providers/reversing-distances/reversing-distances';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

interface ReverseDiagramPageState {
  vehicleLength$: Observable<number>;
  vehicleWidth$: Observable<number>;
}

type OnCloseFunc = () => void;

@IonicPage()
@Component({
  selector: 'reverse-diagram-modal',
  templateUrl: 'reverse-diagram-modal.html',
})

export class ReverseDiagramCatBEPage implements OnInit {
  @Input()
  vehicleLength: number;

  @Input()
  vehicleWidth: number;

  onClose: OnCloseFunc;

  componentState: ReverseDiagramPageState;
  subscription: Subscription;
  merged$: Observable<number>;
  distanceFromStart: number;
  distanceFromMiddle: number;
  distanceOfBayWidth: number;

  constructor(
    private navParams: NavParams,
    public store$: Store<StoreModel>,
    public reversingDistancesProvider: ReversingDistancesProvider,
  ) {
    this.onClose = this.navParams.get('onClose');
  }

  ngOnInit(): void {

    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.componentState = {
      vehicleLength$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getVehicleLength),
      ),
      vehicleWidth$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getVehicleWidth),
      ),
    };

    const { vehicleLength$, vehicleWidth$ } = this.componentState;

    this.merged$ = merge(
      vehicleLength$.pipe(map(val => this.vehicleLength = val)),
      vehicleWidth$.pipe(map(val => this.vehicleWidth = val)),
    );
  }

  calculateDistanceLength(length: number): void {
    const vehicleDetails = {
      vehicleLength: length,
      vehicleWidth: this.vehicleWidth,
    };
    const reversingLenghts = this.reversingDistancesProvider.getDistanceLength(vehicleDetails, TestCategory.BE);
    this.distanceFromMiddle = reversingLenghts.middleDistance;
    this.distanceFromStart = reversingLenghts.startDistance;
  }

  calculateDistanceWidth(width: number): void {
    const vehicleDetails = {
      vehicleLength: this.vehicleLength,
      vehicleWidth: width,
    };
    this.distanceOfBayWidth = this.reversingDistancesProvider.getDistanceWidth(vehicleDetails, TestCategory.BE);
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
