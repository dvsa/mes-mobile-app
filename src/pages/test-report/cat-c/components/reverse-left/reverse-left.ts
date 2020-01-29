import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';

// TODO: MES-4287  Import cat c reducer
import { getTestData } from '../../../../../modules/tests/test-data/cat-be';

// TODO: MES-4287 Import cat c selector
import { getManoeuvres } from '../../../../../modules/tests/test-data/cat-be/test-data.cat-be.selector';

// TODO: MES-4287 Import cat C schema
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { OverlayCallback } from '../../../test-report.model';
import { ReverseLeftPopoverOpened, ReverseLeftPopoverClosed } from './reverse-left.actions';
import { RecordManoeuvresSelection } from '../../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { ManoeuvreTypes } from '../../../../../modules/tests/test-data/test-data.constants';

// TODO: MES-4287 Import cat c selector
import { getReverseLeftSelected }
  from '../../../../../modules/tests/test-data/cat-be/manoeuvres/manoeuvres.cat-be.selectors';

// TODO: MES-4287 Import cat c actions
import { DeselectReverseLeftManoeuvre }
  from '../../../../../modules/tests/test-data/cat-be/manoeuvres/manoeuvres.cat-be.actions';

@Component({
  selector: 'reverse-left',
  templateUrl: 'reverse-left.html',
})
export class ReverseLeftComponent implements OnInit, OnDestroy  {

  @Input()
  completed: boolean;

  @Input()
  controlLabel: string;

  @Input()
  clickCallback: OverlayCallback;

  completedReverseLeft: boolean = false;

  drivingFaults: number = 0;
  hasSeriousFault: boolean = false;
  hasDangerousFault: boolean = false;

  subscription: Subscription;

  displayPopover: boolean = false;

  constructor(
    private store$: Store<StoreModel>,
    private faultCountProvider: FaultCountProvider,
  ) {}

  ngOnInit(): void {
    const manoeuvres$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getManoeuvres),
    );

    // TODO: MES-4287 use category c types
    this.subscription = manoeuvres$.subscribe((manoeuvres: CatBEUniqueTypes.Manoeuvres) => {
      this.drivingFaults =
        this.faultCountProvider.getManoeuvreFaultCount(TestCategory.BE, manoeuvres, CompetencyOutcome.DF);
      this.hasSeriousFault =
        this.faultCountProvider.getManoeuvreFaultCount(TestCategory.BE, manoeuvres, CompetencyOutcome.S) > 0;
      this.hasDangerousFault =
        this.faultCountProvider.getManoeuvreFaultCount(TestCategory.BE, manoeuvres, CompetencyOutcome.D) > 0;
      this.completedReverseLeft = getReverseLeftSelected(manoeuvres);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleReverseLeft = (): void => {
    if (this.completedReverseLeft && !this.hasFaults()) {
      this.store$.dispatch(new DeselectReverseLeftManoeuvre());
      return;
    }
    this.store$.dispatch(new RecordManoeuvresSelection(ManoeuvreTypes.reverseLeft));
  }

  hasFaults = (): boolean => {
    return this.drivingFaults > 0 || this.hasSeriousFault || this.hasDangerousFault;
  }

  togglePopoverDisplay = (): void => {
    if (this.displayPopover) {
      this.store$.dispatch(new ReverseLeftPopoverClosed());
      this.displayPopover = false;
    } else {
      this.store$.dispatch(new ReverseLeftPopoverOpened());
      this.displayPopover = true;
    }
    this.toggleOverlay();
  }

  toggleOverlay(): void {
    if (this.clickCallback) {
      this.clickCallback.callbackMethod();
    }
  }
}
