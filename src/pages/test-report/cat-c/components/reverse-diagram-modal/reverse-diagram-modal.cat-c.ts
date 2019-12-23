import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { IonicPage, NavParams } from 'ionic-angular';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getVehicleDetails } from '../../../../../modules/tests/vehicle-details/vehicle-details.cat-c.reducer';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';
import { ReversingDistancesProvider } from '../../../../../providers/reversing-distances/reversing-distances';
import {
  getVehicleLength,
  getVehicleWidth,
} from '../../../../../modules/tests/vehicle-details/vehicle-details.cat-c.selector';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';

interface ReverseDiagramPageState {
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

  onClose: OnCloseFunc;

  componentState: ReverseDiagramPageState;
  subscription: Subscription;
  merged$: Observable<number>;
  reversingLengthStart: number;
  reversingLengthMiddle: number;
  reversingWidth: number;

  constructor(
    private navParams: NavParams,
    public store$: Store<StoreModel>,

    private reversingDistancesProvider: ReversingDistancesProvider,
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

  calculateReversingLengths(vehicleLength: number): void {
    const vehicleDetails = {
      vehicleLength,
      vehicleWidth: this.vehicleWidth,
    };

    const reversingLengths = this.reversingDistancesProvider.getDistanceLength(vehicleDetails, TestCategory.C);
    this.reversingLengthStart = reversingLengths.startDistance;
    this.reversingLengthMiddle = reversingLengths.middleDistance;
  }

  calculateReversingWidth(vehicleWidth: number): void {
    const vehicleDetails = {
      vehicleWidth,
      vehicleLength: this.vehicleLength,
    };

    this.reversingWidth = this.reversingDistancesProvider.getDistanceWidth(vehicleDetails, TestCategory.C);
  }

  ionViewWillEnter(): boolean {
    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
      this.calculateReversingLengths(this.vehicleLength);
      this.calculateReversingWidth(this.vehicleWidth);
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
