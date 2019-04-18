import { Manoeuvres } from '@dvsa/mes-test-schema/categories/B';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getManoeuvres } from '../../../../modules/tests/test_data/test-data.selector';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../shared/models/store.model';
import { RecordManoeuvresSelection } from '../../../../modules/tests/test_data/test-data.actions';
import { ManoeuvreTypes } from './manoeuvres-popover.constants';
import { ManoeuvreCompetencies } from '../../../../modules/tests/test_data/test-data.constants';
import { map } from 'rxjs/operators';
import { startsWith, pickBy, isEmpty, some } from 'lodash';

enum ManoeuvrePrefix {
  reverseRight = 'outcomeReverseRight',
  reverseParkRoad = 'outcomeReverseParkRoad',
  reverseParkCarpark = 'outcomeReverseParkCarpark',
  forwardPark = 'outcomeForwardPark',
}

interface ManoeuvresDisabledState {
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

  public manoeuvreTypes = ManoeuvreTypes;
  manoeuvres$: Observable<Manoeuvres>;
  competencies = ManoeuvreCompetencies;
  manoeuvresWithFaults$: Observable<ManoeuvresDisabledState>;

  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    this.manoeuvres$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getManoeuvres),
    );
    this.manoeuvresWithFaults$ = this.manoeuvres$.pipe(
      map(manoeuvres => ({
        reverseRight: this.manoeuvreHasFaults(ManoeuvrePrefix.reverseRight, manoeuvres),
        reverseParkRoad: this.manoeuvreHasFaults(ManoeuvrePrefix.reverseParkRoad, manoeuvres),
        reverseParkCarpark: this.manoeuvreHasFaults(ManoeuvrePrefix.reverseParkCarpark, manoeuvres),
        forwardPark: this.manoeuvreHasFaults(ManoeuvrePrefix.forwardPark, manoeuvres),
      })),
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
  shouldManoeuvreDisable(manoeuvre: string): Observable<boolean> {
    return this.manoeuvresWithFaults$.pipe(
      map((manoeuvresWithFaults: ManoeuvresDisabledState) => {
        const { [manoeuvre]: manoeuvreToOmit, ...otherManoeuvres } = manoeuvresWithFaults;
        return some(otherManoeuvres, (value: boolean) => value);
      }),
    );
  }
  /**
   * @param  {ManoeuvrePrefix} manoeuvrePrefix
   * @param  {Manoeuvres} manoeuvres
   * @returns boolean
   * Looks up the manoeuvre 'outcome' keys and returns true if they exist
   */
  manoeuvreHasFaults(manoeuvrePrefix: ManoeuvrePrefix, manoeuvres: Manoeuvres): boolean {
    return !isEmpty(pickBy(manoeuvres, (value, key) => startsWith(key, manoeuvrePrefix)));
  }
}
