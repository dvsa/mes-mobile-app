import { ManoeuvreIndicator } from '@dvsa/mes-test-schema/categories/B';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../shared/models/store.model';
import { RecordMenoeuvresSelection } from '../../../../modules/tests/test_data/test-data.actions';
interface ManoeuvresState {
  selectedForwardPark$:  Observable<ManoeuvreIndicator>;
  selectedReverseRight$:  Observable<ManoeuvreIndicator>;
  selectedReverseParkCarpark$:  Observable<ManoeuvreIndicator>;
  selectedReverseParkRoad$:  Observable<ManoeuvreIndicator>;
}
@Component({
  selector: 'manoeuvres-popover',
  templateUrl: 'manoeuvres-popover.html',
})
export class ManoeuvresPopoverComponent {
  public manoeuvres: ManoeuvresState;
  constructor(private store$: Store<StoreModel>) { }
  ngOnInit(): void {
    this.manoeuvres = {
      selectedForwardPark$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select('manoeuvres', 'selectedForwardPark'),
      ),
      selectedReverseRight$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select('manoeuvres', 'selectedReverseRight'),
      ),
      selectedReverseParkCarpark$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select('manoeuvres', 'selectedReverseParkCarpark'),
      ),
      selectedReverseParkRoad$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select('manoeuvres', 'selectedReverseParkRoad'),
      ),
    };

  }
  recordManoeuvreSelection(name: string): void {
    this.store$.dispatch(new RecordMenoeuvresSelection(name));
  }
}
