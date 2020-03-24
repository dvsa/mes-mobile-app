import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.reducer';
import {
  getManoeuvresADI2,
} from '../../../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.selector';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../../shared/models/store.model';
import {
  RecordManoeuvresSelection,
} from '../../../../../modules/tests/test-data/cat-adi-part2/manoeuvres/manoeuvres.actions';
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../../modules/tests/test-data/test-data.constants';
import { map } from 'rxjs/operators';
import { some } from 'lodash';

interface ManoeuvresFaultState {
  reverseRight: boolean;
  reverseParkRoad: boolean;
  reverseParkCarpark: boolean;
  forwardPark: boolean;
}

@Component({
  selector: 'manoeuvres-popover-adi-part2',
  templateUrl: 'manoeuvres-popover.html',
})
export class ManoeuvresPopoverComponent {

  manoeuvreTypes = ManoeuvreTypes;
  manoeuvres$: Observable<CatADI2UniqueTypes.Manoeuvres[]>;
  competencies = ManoeuvreCompetencies;
  manoeuvresWithFaults$: Observable<ManoeuvresFaultState[]>;

  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    this.manoeuvres$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getManoeuvresADI2),
    );

    this.manoeuvresWithFaults$ = this.manoeuvres$.pipe(
      map((manoeuvres: CatADI2UniqueTypes.Manoeuvres[]) => {
        return manoeuvres.map(manoeuvre => ({
          reverseRight: this.manoeuvreHasFaults(manoeuvre.reverseRight),
          reverseParkRoad: this.manoeuvreHasFaults(manoeuvre.reverseParkRoad),
          reverseParkCarpark: this.manoeuvreHasFaults(manoeuvre.reverseParkCarpark),
          forwardPark: this.manoeuvreHasFaults(manoeuvre.forwardPark),
        }));
      }),
    );
  }

  recordManoeuvreSelection(manoeuvre: ManoeuvreTypes, index: number): void {
    this.store$.dispatch(new RecordManoeuvresSelection(manoeuvre, index));
  }

  /**
   * @param  {string} manoeuvre
   * @returns Observable<boolean>
   * Called by the manoeuvre input elements in manoeuvres-popover.html
   * Tells the input whether it needs to be disabled based on whether
   * or not another manoeuvre has a fault recorded
   */
  shouldManoeuvreDisable(manoeuvre: ManoeuvreTypes, index: number): Observable<boolean> {
    return this.manoeuvresWithFaults$.pipe(
      map((manoeuvresWithFaults: ManoeuvresFaultState[]) => {
        if (manoeuvre === ManoeuvreTypes.reverseLeft) { return true; }

        const { [manoeuvre]: manoeuvreToOmit, ...otherManoeuvres } = manoeuvresWithFaults[index];
        return some(otherManoeuvres, (value: boolean) => value);
      }),
    );
  }

  /**
   * @param  {string} manoeuvre
   * @returns Observable<boolean>
   * Called by the manoeuvre input elements in manoeuvres-popover.html
   * Tells the input whether the same ManoeuvreType has selected in the preceeding Manoeuvre
   */
  shouldHideManoeuvre(manoeuvre: ManoeuvreTypes, index: number): Observable<boolean> {
    if (index === 0) { return of(false); }

    let prerequisiteManoeuvreSelected: string;

    return this.manoeuvres$.pipe(
      map((manoeuvres) => {
        prerequisiteManoeuvreSelected = Object.keys(manoeuvres[0]).find(
          manoeuvreName => manoeuvres[0][manoeuvreName].selected,
        );

        return !prerequisiteManoeuvreSelected || manoeuvre === prerequisiteManoeuvreSelected;
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
