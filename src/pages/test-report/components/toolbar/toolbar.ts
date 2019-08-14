import { Component } from '@angular/core';
import { ToggleRemoveFaultMode, ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../test-report.actions';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode, noFaultToRemoveWarning } from '../../test-report.selector';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

interface ToolbarComponentState {
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  isRemoveFaultMode$: Observable<boolean>;
  noFaultToRemove$: Observable<boolean>;
}

@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.html',
})
export class ToolbarComponent {

  componentState: ToolbarComponentState;
  subscription: Subscription;

  isRemoveFaultMode: boolean = false;
  isSeriousMode: boolean = false;
  isDangerousMode: boolean = false;
  noFaultToRemove: boolean = false;

  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    this.componentState = {
      isRemoveFaultMode$: this.store$.pipe(
        select(getTestReportState),
        select(isRemoveFaultMode),
      ),
      isSeriousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isSeriousMode),
      ),
      isDangerousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isDangerousMode),
      ),
      noFaultToRemove$: this.store$.pipe(
        select(getTestReportState),
        select(noFaultToRemoveWarning),
      ),
    };

    const { isRemoveFaultMode$, isSeriousMode$, isDangerousMode$, noFaultToRemove$ } = this.componentState;

    const merged$ = merge(
      isRemoveFaultMode$.pipe(map(result => this.isRemoveFaultMode = result)),
      isSeriousMode$.pipe(map(result => this.isSeriousMode = result)),
      isDangerousMode$.pipe(map(result => this.isDangerousMode = result)),
      noFaultToRemove$.pipe(map((result) => {
        this.noFaultToRemove = result;
        console.log(result);
      })),
    );

    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleRemoveFaultMode(): void {
    this.store$.dispatch(new ToggleRemoveFaultMode());
  }

  toggleSeriousMode(): void {
    if (this.isDangerousMode) {
      this.store$.dispatch(new ToggleDangerousFaultMode());
    }
    this.store$.dispatch(new ToggleSeriousFaultMode());
  }

  toggleDangerousMode(): void {
    if (this.isSeriousMode) {
      this.store$.dispatch(new ToggleSeriousFaultMode());
    }
    this.store$.dispatch(new ToggleDangerousFaultMode());
  }

}
