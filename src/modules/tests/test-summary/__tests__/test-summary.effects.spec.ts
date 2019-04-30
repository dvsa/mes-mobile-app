import { TestSummaryEffects } from '../test-summary.effects';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as testSummaryActions from '../test-summary.actions';
import * as testActions  from '../../tests.actions';
import { testSummaryReducer } from '../test-summary.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { empty } from 'rxjs/Observable/empty';
import { Observable } from 'rxjs/Observable';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream$(source$: Observable<any>) {
    this.source = source$;
  }
}

describe('Test Summary Effects', () => {

  let effects: TestSummaryEffects;
  let actions$: any;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [

        StoreModule.forRoot({
          testSummary: testSummaryReducer,
        }),
      ],
      providers: [
        TestSummaryEffects,
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(TestSummaryEffects);
  });

  describe('additionalInformationChanged effect', () => {
    it('should invoke the PersistTest action', (done) => {
      // ACT
      actions$.next(new testSummaryActions.AdditionalInformationChanged('xyz'));
      // ASSERT
      effects.additionalInformationChangedEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('candidateDescriptionChanged effect', () => {
    it('should invoke the PersistTest action', (done) => {
      // ACT
      actions$.next(new testSummaryActions.CandidateDescriptionChanged('xyz'));
      // ASSERT
      effects.candidateDescriptionChangedEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('routeNumberChanged effect', () => {
    it('should invoke the PersistTest action', (done) => {
      // ACT
      actions$.next(new testSummaryActions.RouteNumberChanged(14));
      // ASSERT
      effects.routeNumberChangedEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('debriefWitnessedChanged effect', () => {
    it('should invoke the PersistTest action', (done) => {
      // ACT
      actions$.next(new testSummaryActions.DebriefWitnessed());
      // ASSERT
      effects.debriefWitnessedChangedEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('debriefUnWitnessedChanged effect', () => {
    it('should invoke the PersistTest action', (done) => {
      // ACT
      actions$.next(new testSummaryActions.DebriefUnwitnessed());
      // ASSERT
      effects.debriefUnWitnessedChangedEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('identificationUsedChanged effect', () => {
    it('should invoke the PersistTest action', (done) => {
      // ACT
      actions$.next(new testSummaryActions.IdentificationUsedChanged('Licence'));
      // ASSERT
      effects.identificationUsedChangedEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('independentDrivingTypeChanged effect', () => {
    it('should invoke the PersistTest action', (done) => {
      // ACT
      actions$.next(new testSummaryActions.IndependentDrivingTypeChanged('Sat nav'));
      // ASSERT
      effects.independentDrivingTypeChangedEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('d255Yes effect', () => {
    it('should invoke the PersistTest action', (done) => {
      // ACT
      actions$.next(new testSummaryActions.D255Yes());
      // ASSERT
      effects.d255YesEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('d255No effect', () => {
    it('should invoke the PersistTest action', (done) => {
      // ACT
      actions$.next(new testSummaryActions.D255No());
      // ASSERT
      effects.d255NoEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('weatherConditionsChanged effect', () => {
    it('should invoke the PersistTest action', (done) => {
      // ACT
      actions$.next(new testSummaryActions.WeatherConditionsChanged(['Icy']));
      // ASSERT
      effects.weatherConditionsChangedEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

});
