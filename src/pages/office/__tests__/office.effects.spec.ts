import { OfficeEffects } from '../office.effects';
import { ReplaySubject ,  Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as testSummaryActions from '../../../modules/tests/test-summary/common/test-summary.actions';
import { AddDrivingFaultComment } from '../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import { AddSeriousFaultComment } from '../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import {
  AddDangerousFaultComment,
} from '../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import * as testActions  from '../../../modules/tests/tests.actions';
import * as testStatusActions from '../../../modules/tests/test-status/test-status.actions';
import * as officeActions from '../office.actions';
import { StoreModule, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { empty } from 'rxjs/Observable/empty';
import { Competencies } from '../../../modules/tests/test-data/test-data.constants';
import { configureTestSuite } from 'ng-bullet';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream$(source$: Observable<any>) {
    this.source = source$;
  }
}

describe('Test Office Data Effects', () => {

  let effects: OfficeEffects;
  let actions$: any;

  const currentSlotId = '1234';

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [

        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: currentSlotId,
            },
            testStatus: {},
            startedTests: {},
          }),
        }),
      ],
      providers: [
        OfficeEffects,
        provideMockActions(() => actions$),
        Store,
      ],
    });
  });

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
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
      actions$.next(new AddDangerousFaultComment(Competencies.controlsParkingBrake, 'xyz'));
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
      actions$.next(new AddSeriousFaultComment(Competencies.controlsParkingBrake, 'abc'));
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
      actions$.next(new AddDrivingFaultComment(Competencies.controlsParkingBrake, 'def'));
        // ASSERT
      effects.persistOfficeDataEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

  describe('submitWaitingRoomInfoEffect', () => {

    it('should return SET_STATUS_DECIDED & PERSIST_TESTS actions', (done) => {
      actions$.next(new officeActions.CompleteTest());

      effects.completeTestEffect$.subscribe((result) => {
        if (result instanceof testStatusActions.SetTestStatusCompleted) {
          expect(result).toEqual(new testStatusActions.SetTestStatusCompleted(currentSlotId));
        }
        if (result instanceof testActions.PersistTests) {
          expect(result).toEqual(new testActions.PersistTests());
        }
        done();
      });
    });

  });

});
