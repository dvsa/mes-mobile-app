// TO-DO ADI Part2: implement correct category
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
// TO-DO ADI Part2: implement correct category
import { getTestData } from '../../../../../modules/tests/test-data/cat-b/test-data.reducer';
// TO-DO ADI Part2: implement correct category
import { getManoeuvres } from '../../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../../shared/models/store.model';
import { RecordManoeuvresSelection } from '../../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../../modules/tests/test-data/test-data.constants';
import { map } from 'rxjs/operators';

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
  // TO-DO ADI Part2: Implement correct category
  manoeuvres$: Observable<CatBUniqueTypes.Manoeuvres>;
  competencies = ManoeuvreCompetencies;
  manoeuvresWithFaults$: Observable<ManoeuvresFaultState>;

  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    this.manoeuvres$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getManoeuvres),
    );
    this.manoeuvresWithFaults$ = this.manoeuvres$.pipe(
      // TO-DO ADI Part2: implement correct category

      map((manoeuvres: CatBUniqueTypes.Manoeuvres) => ({
        reverseRight: this.manoeuvreHasFaults(manoeuvres.reverseRight),
        reverseParkRoad: this.manoeuvreHasFaults(manoeuvres.reverseParkRoad),
        reverseParkCarpark: this.manoeuvreHasFaults(manoeuvres.reverseParkCarpark),
        forwardPark: this.manoeuvreHasFaults(manoeuvres.forwardPark),
      })),
    );
  }

  recordManoeuvreSelection(manoeuvre: ManoeuvreTypes): void {
    this.store$.dispatch(new RecordManoeuvresSelection(manoeuvre));
  }

  // TODO(MES-5031): implement as part of manoeuvres build
  shouldManoeuvreDisable(manoeuvre: ManoeuvreTypes): Observable<boolean> {
    return of(false);
    // return this.manoeuvresWithFaults$.pipe(
    //   map((manoeuvresWithFaults: ManoeuvresFaultState) => {
    //     // TO-DO ADI Part2: implement correct category
    //     const { [manoeuvre]: manoeuvreToOmit, ...otherManoeuvres } = manoeuvresWithFaults;
    //     return some(otherManoeuvres, (value: boolean) => value);
    //   }),
    // );
  }

  manoeuvreHasFaults = (manoeuvre): boolean => (
    manoeuvre &&
    (manoeuvre.controlFault != null ||
    manoeuvre.observationFault != null)
  )

  getId = (manoeuvre: ManoeuvreTypes, competency: ManoeuvreCompetencies) => `${manoeuvre}-${competency}`;
}
