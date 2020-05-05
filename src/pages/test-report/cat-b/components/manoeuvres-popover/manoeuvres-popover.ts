import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getManoeuvres } from '../../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../../shared/models/store.model';
import { RecordManoeuvresSelection } from '../../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../../modules/tests/test-data/test-data.constants';
import { map } from 'rxjs/operators';
import { some } from 'lodash';
import { getTestReportState } from '../../../test-report.reducer';
import { isRemoveFaultMode } from '../../../test-report.selector';

interface ManoeuvresFaultState {
  reverseRight: boolean;
  reverseParkRoad: boolean;
  reverseParkCarpark: boolean;
  forwardPark: boolean;
}

@Component({
  selector: 'manoeuvres-popover',
  templateUrl: 'manoeuvres-popover.html',
})
export class ManoeuvresPopoverComponent {

  manoeuvreTypes = ManoeuvreTypes;
  manoeuvres$: Observable<CatBUniqueTypes.Manoeuvres>;
  competencies = ManoeuvreCompetencies;
  manoeuvresWithFaults$: Observable<ManoeuvresFaultState>;
  isRemoveFaultMode$: Observable<boolean>;

  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    this.manoeuvres$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getManoeuvres),
    );
    this.manoeuvresWithFaults$ = this.manoeuvres$.pipe(
      map((manoeuvres: CatBUniqueTypes.Manoeuvres) => ({
        reverseRight: this.manoeuvreHasFaults(manoeuvres.reverseRight),
        reverseParkRoad: this.manoeuvreHasFaults(manoeuvres.reverseParkRoad),
        reverseParkCarpark: this.manoeuvreHasFaults(manoeuvres.reverseParkCarpark),
        forwardPark: this.manoeuvreHasFaults(manoeuvres.forwardPark),
      })),
    );
  }

  ngOnChanges(): void {
    this.isRemoveFaultMode$ = this.store$.pipe(
      select(getTestReportState),
      select(isRemoveFaultMode),
    );
  }

  recordManoeuvreSelection(manoeuvre: ManoeuvreTypes): void {
    this.store$.dispatch(new RecordManoeuvresSelection(manoeuvre));
  }
  /**
   * @param  {string} manoeuvre
   * @returns Observable<boolean>
   * Called by the manoeuvre input elements in manoeuvres-popover.html
   * Tells the input whether it needs to be disabled based on whether
   * or not another manoeuvre has a fault recorded
   */
  shouldManoeuvreDisable(manoeuvre: ManoeuvreTypes): Observable<boolean> {
    return this.manoeuvresWithFaults$.pipe(
      map((manoeuvresWithFaults: ManoeuvresFaultState) => {
        const { [manoeuvre]: manoeuvreToOmit, ...otherManoeuvres } = manoeuvresWithFaults;
        return some(otherManoeuvres, (value: boolean) => value);
      }),
    );
  }

  manoeuvreHasFaults = (manoeuvre): boolean => (
    manoeuvre &&
    (manoeuvre.controlFault != null ||
    manoeuvre.observationFault != null)
  )

  getId = (manoeuvre: ManoeuvreTypes, competency: ManoeuvreCompetencies) => `${manoeuvre}-${competency}`;
}
