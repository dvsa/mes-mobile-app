import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { IonicPage, NavParams } from 'ionic-angular';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';

// TODO: MES-4287 Import cat-c reducer
import { getVehicleDetails } from '../../../../../modules/tests/vehicle-details/vehicle-details.cat-be.reducer';

// TODO: MES-4287 Import cat c selector
import {
  getVehicleLength,
  getVehicleWidth,
} from '../../../../../modules/tests/vehicle-details/vehicle-details.cat-be.selector';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';

interface ReverseDiagramPageState {
  vehicleLength$: Observable<number>;
  vehicleWidth$: Observable<number>;
}

type OnCloseFunc = () => void;

@IonicPage()
@Component({

  // TODO: MES-4287 Think we should name the file with cat c?
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

  calculateDistanceLength(vehicleLength: number): void {
    const distanceFromStart = vehicleLength * 4;
    const distanceFromMiddle = vehicleLength * 2;
    this.distanceFromMiddle = Math.round(distanceFromMiddle * 100) / 100;
    this.distanceFromStart = Math.round(distanceFromStart * 100) / 100;
  }

  calculateDistanceWidth(vehicleWidth: number): void {
    const distanceOfBayWidth = vehicleWidth * 1.5;
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
