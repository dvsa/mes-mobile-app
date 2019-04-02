import { Component } from '@angular/core';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../test-report.actions';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { getTestReportState } from '../../test-report.reducer';
import { isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

interface ToolbarComponentState {
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
}

@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.html',
})
export class ToolbarComponent {

  componenetState: ToolbarComponentState;
  subscription: Subscription;

  isSeriousMode: boolean = false;
  isDangerousMode: boolean = false;

  constructor(private store$: Store<StoreModel>) {}

  ngOnInit(): void {
    this.componenetState = {
      isSeriousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isSeriousMode),
      ),
      isDangerousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isDangerousMode),
      ),
    };

    const { isSeriousMode$, isDangerousMode$ } = this.componenetState;

    const merged$ = merge(
      isSeriousMode$.pipe(map(result => this.isSeriousMode = result)),
      isDangerousMode$.pipe(map(result => this.isDangerousMode = result)),
    );

    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleSeriousMode(): void {
    if (this.isDangerousMode) {
      this.store$.dispatch(new ToggleDangerousFaultMode());
    }
    this.store$.dispatch(new ToggleSeriousFaultMode());
  }

  toggleDangerousMode(): void {
    this.store$.dispatch(new ToggleDangerousFaultMode());
  }

}
