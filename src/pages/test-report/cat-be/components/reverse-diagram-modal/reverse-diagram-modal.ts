import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { IonicPage, NavParams } from 'ionic-angular';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getVehicleDetails } from '../../../../../modules/tests/vehicle-details/vehicle-details.cat-be.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { ReversingDistancesProvider } from '../../../../../providers/reversing-distances/reversing-distances';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

interface ReverseDiagramPageState {
  vehicleDetails$: Observable<CatBEUniqueTypes.VehicleDetails>;
}

type OnCloseFunc = () => void;

@IonicPage()
@Component({
  selector: 'reverse-diagram-modal',
  templateUrl: 'reverse-diagram-modal.html',
})

export class ReverseDiagramCatBEPage implements OnInit {
  @Input()
  vehicleDetails: CatBEUniqueTypes.VehicleDetails;

  onClose: OnCloseFunc;

  componentState: ReverseDiagramPageState;
  subscription: Subscription;
  merged$: Observable<CatBEUniqueTypes.VehicleDetails>;
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
      vehicleDetails$: currentTest$.pipe(select(getVehicleDetails)),
    };

    const { vehicleDetails$ } = this.componentState;

    this.merged$ = merge(
      vehicleDetails$.pipe(map(val => this.vehicleDetails = val)),
    );
  }

  calculateDistanceLength(): void {
    const reversingLenghts = this.reversingDistancesProvider.getDistanceLength(this.vehicleDetails, TestCategory.BE);
    this.distanceFromMiddle = reversingLenghts.middleDistance;
    this.distanceFromStart = reversingLenghts.startDistance;
  }

  calculateDistanceWidth(): void {
    this.distanceOfBayWidth = this.reversingDistancesProvider.getDistanceWidth(this.vehicleDetails, TestCategory.BE);
  }

  ionViewWillEnter(): boolean {
    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
      this.calculateDistanceLength();
      this.calculateDistanceWidth();
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
