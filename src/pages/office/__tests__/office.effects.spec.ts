import { OfficeEffects } from '../office.effects';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as testSummaryActions from '../../../modules/tests/test-summary/test-summary.actions';
import * as testDataActions from '../../../modules/tests/test-data/test-data.actions';
import * as testActions  from '../../../modules/tests/tests.actions';
import { testSummaryReducer } from '../../../modules/tests/test-summary/test-summary.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { empty } from 'rxjs/Observable/empty';
import { Observable } from 'rxjs/Observable';
import { testDataReducer } from '../../../modules/tests/test-data/test-data.reducer';
import { Competencies } from '../../../modules/tests/test-data/test-data.constants';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream$(source$: Observable<any>) {
    this.source = source$;
  }
}

fdescribe('Test Office Data Effects', () => {

  let effects: OfficeEffects;
  let actions$: any;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [

        StoreModule.forRoot({
          testSummary: testSummaryReducer,
          testData: testDataReducer,
        }),
      ],
      providers: [
        OfficeEffects,
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(OfficeEffects);
  });

  describe('additionalInformationChanged effect', () => {
    it('should invoke the PersistTest action', (done) => {
      // ACT
      actions$.next(new testSummaryActions.AdditionalInformationChanged('xyz'));
      // ASSERT
      effects.persistOfficeDataEffect$.subscribe((result) => {
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
      effects.persistOfficeDataEffect$.subscribe((result) => {
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
      effects.persistOfficeDataEffect$.subscribe((result) => {
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
      effects.persistOfficeDataEffect$.subscribe((result) => {
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
      effects.persistOfficeDataEffect$.subscribe((result) => {
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
      effects.persistOfficeDataEffect$.subscribe((result) => {
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
      effects.persistOfficeDataEffect$.subscribe((result) => {
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
      effects.persistOfficeDataEffect$.subscribe((result) => {
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
      effects.persistOfficeDataEffect$.subscribe((result) => {
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
      effects.persistOfficeDataEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('AddDangerousFaultComment effect', () => {
    it('should invoke the PersistTest action', (done) => {
        // ACT
      actions$.next(new testDataActions.AddDangerousFaultComment(Competencies.controlsParkingBrake, 'xyz'));
        // ASSERT
      effects.persistOfficeDataEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('AddSeriousFaultComment effect', () => {
    it('should invoke the PersistTest action', (done) => {
        // ACT
      actions$.next(new testDataActions.AddSeriousFaultComment(Competencies.controlsParkingBrake, 'abc'));
        // ASSERT
      effects.persistOfficeDataEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('AddDrivingFaultComment effect', () => {
    it('should invoke the PersistTest action', (done) => {
        // ACT
      actions$.next(new testDataActions.AddDrivingFaultComment(Competencies.controlsParkingBrake, 'def'));
        // ASSERT
      effects.persistOfficeDataEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

});
