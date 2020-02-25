import { Observable } from 'rxjs/Observable';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { IonicPage, NavParams } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { ReversingDistancesProvider } from '../../../../providers/reversing-distances/reversing-distances';
import { select, Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestCategory } from '../../../../modules/tests/category/category.reducer';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';
import {
  ReverseDiagramLengthChanged,
  ReverseDiagramWidthChanged,
} from './reverse-diagram-modal.actions';
import { CategorySpecificVehicleDetails, VehicleDetailsByCategoryProvider }
  from '../../../../providers/vehicle-details-by-category/vehicle-details-by-category';

interface ReverseDiagramPageState {
  vehicleLength$: Observable<number>;
  vehicleWidth$: Observable<number>;
  category$: Observable<CategoryCode>;
}

type OnCloseFunc = () => void;

@IonicPage()
@Component({
  selector: 'reverse-diagram-modal',
  templateUrl: 'reverse-diagram-modal.html',
})
export class ReverseDiagramPage implements OnInit {
  @Input()
  vehicleLength: number;

  @Input()
  vehicleWidth: number;

  componentState: ReverseDiagramPageState;
  subscription: Subscription;
  merged$: Observable<number | CategoryCode>;
  reversingLengthStart: number;
  reversingLengthMiddle: number;
  reversingWidth: number;
  category: TestCategory;
  onClose: OnCloseFunc;
  vehicleDetails: CategorySpecificVehicleDetails;

  constructor(
    private navParams: NavParams,
    public store$: Store<StoreModel>,
    public reversingDistancesProvider: ReversingDistancesProvider,
    public vehicleDetailsProvider: VehicleDetailsByCategoryProvider,
  ) {
    this.onClose = this.navParams.get('onClose');
  }

  ngOnInit(): void {

    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    let category: TestCategory;
    currentTest$.pipe(select(getTestCategory)).subscribe((value) => {
      category = value as TestCategory;
      const vehicleDetails = this.vehicleDetailsProvider.getVehicleDetailsByCategoryCode(category);
      this.componentState = {
        vehicleLength$: currentTest$.pipe(
          select(vehicleDetails.vehicleDetails),
          select(vehicleDetails.vehicleLength),
        ),
        vehicleWidth$: currentTest$.pipe(
          select(vehicleDetails.vehicleDetails),
          select(vehicleDetails.vehicleWidth),
        ),
        category$: currentTest$.pipe(
          select(getTestCategory),
        ),
      };
    });

    const { vehicleLength$, vehicleWidth$, category$ } = this.componentState;

    this.merged$ = merge(
      vehicleLength$.pipe(map(val => this.vehicleLength = val)),
      vehicleWidth$.pipe(map(val => this.vehicleWidth = val)),
      category$.pipe(map(val => this.category = val as TestCategory)),
    );
  }

  calculateReversingLengths(vehicleLength: number): void {
    const vehicleDetails = {
      vehicleLength,
      vehicleWidth: this.vehicleWidth,
    };

    const reversingLengths = this.reversingDistancesProvider.getDistanceLength(vehicleDetails, this.category);
    this.reversingLengthStart = reversingLengths.startDistance;
    this.reversingLengthMiddle = reversingLengths.middleDistance;
    this.vehicleLength = vehicleLength;
  }

  calculateReversingWidth(vehicleWidth: number): void {
    const vehicleDetails = {
      vehicleWidth,
      vehicleLength: this.vehicleLength,
    };

    this.reversingWidth = this.reversingDistancesProvider.getDistanceWidth(vehicleDetails, this.category);
    this.vehicleWidth = vehicleWidth;
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

  onLengthKeyup(vehicleLength: number) : void {
    this.store$.dispatch(new ReverseDiagramLengthChanged(this.vehicleLength , vehicleLength));
    this.calculateReversingLengths(vehicleLength);
  }

  onWidthKeyup(vehicleWidth: number) : void {
    this.store$.dispatch(new ReverseDiagramWidthChanged(this.vehicleWidth, vehicleWidth));
    this.calculateReversingWidth(vehicleWidth);
  }
}