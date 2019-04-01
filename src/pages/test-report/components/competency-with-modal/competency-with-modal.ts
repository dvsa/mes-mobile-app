import { Component, Input } from '@angular/core';
import { OverlayCallback } from '../../test-report';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { ManoeuvreIndicator } from '@dvsa/mes-test-schema/categories/B';
import { Observable } from 'rxjs/Observable';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getManoeuvres, getSelectedReverseParkRoad } from '../../../../modules/tests/test_data/test-data.selector';
interface ManoeuvresState {
  selectedReverseLeft$: Observable<ManoeuvreIndicator>;
  selectedReverseRight$: Observable<ManoeuvreIndicator>;
  selectedReverseParkRoad$: Observable<ManoeuvreIndicator>;
  selectedForwardPark$: Observable<ManoeuvreIndicator>;
  selectedControlledStop$: Observable<ManoeuvreIndicator>;
}
@Component({
  selector: 'competency-with-modal',
  templateUrl: 'competency-with-modal.html',
})
export class CompetencyWithModalComponent {

  @Input()
  controlLabel: String;

  @Input()
  clickCallback: OverlayCallback;
  manoeuvres: ManoeuvresState;
  popoverComplete: boolean;
  displayPopover: boolean;

  constructor(private store$: Store<StoreModel>) {
    this.manoeuvres = this.getCompetencyState();
    this.displayPopover = false;
  }

  togglePromote(): void {
    this.displayPopover = !this.displayPopover;
    this.toggleOverlay();
  }
  toggleOverlay(): void {
    if (this.clickCallback) {
      this.clickCallback.callbackMethod();
    }
  }
  getCompetencyState(): ManoeuvresState {
    return {
      selectedReverseLeft$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getManoeuvres),
        select(getSelectedReverseParkRoad),
      ),
      selectedReverseRight$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getManoeuvres),
        select(getSelectedReverseParkRoad),
      ),
      selectedReverseParkRoad$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getManoeuvres),
        select(getSelectedReverseParkRoad),
      ),
      selectedForwardPark$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getManoeuvres),
        select(getSelectedReverseParkRoad),
      ),
      selectedControlledStop$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getManoeuvres),
        select(getSelectedReverseParkRoad),
      ),
    };
  }

  ngOnInit(): void {
  }
}
