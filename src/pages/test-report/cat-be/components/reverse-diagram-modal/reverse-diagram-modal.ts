import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { IonicPage } from 'ionic-angular';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getVehicleDetails } from '../../../../../modules/tests/vehicle-details/vehicle-details.cat-be.reducer';
import {
  getVehicleLength,
  getVehicleWidth,
} from '../../../../../modules/tests/vehicle-details/vehicle-details.cat-be.selector';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';

interface ReverseDiagramPageState {
  vehicleLength$: Observable<number>;
  vehicleWidth$: Observable<number>;
}

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

  componentState: ReverseDiagramPageState;
  subscription: Subscription;
  merged$: Observable<number>;
  aAndA1: number;
  aToA1: number;
  b: number;

  constructor(
    public store$: Store<StoreModel>,
  ) {}

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

  vehicleLengthChanged(vehicleLength: number): void {
    const aAndA1 = vehicleLength * 4;
    const b = vehicleLength * 2;
    this.b = Math.round(b * 100) / 100;
    this.aAndA1 = Math.round(aAndA1 * 100) / 100;
  }

  vehicleWidthChanged(vehicleWidth: number): void {
    const aToA1 = vehicleWidth * 1.5;
    this.aToA1 = Math.round(aToA1 * 100) / 100;
  }

  ionViewWillEnter(): boolean {
    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
      this.vehicleLengthChanged(this.vehicleLength);
      this.vehicleWidthChanged(this.vehicleWidth);
    }

    return true;
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
