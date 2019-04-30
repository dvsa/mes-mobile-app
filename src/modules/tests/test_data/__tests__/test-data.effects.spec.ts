import { TestDataEffects } from '../test-data.effects';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as testDataActions from '../test-data.actions';
import * as testActions  from '../../tests.actions';
import { testDataReducer } from '../test-data.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { empty } from 'rxjs/Observable/empty';
import { Observable } from 'rxjs/Observable';
import { Competencies } from '../test-data.constants';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream$(source$: Observable<any>) {
    this.source = source$;
  }
}

describe('Test Data Effects', () => {

  let effects: TestDataEffects;
  let actions$: any;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [

        StoreModule.forRoot({
          testData: testDataReducer,
        }),
      ],
      providers: [
        TestDataEffects,
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(TestDataEffects);
  });

  describe('AddDangerousFaultComment effect', () => {
    it('should invoke the PersistTest action', (done) => {
      // ACT
      actions$.next(new testDataActions.AddDangerousFaultComment(Competencies.controlsParkingBrake, 'xyz'));
      // ASSERT
      effects.addDangerousFaultCommentEffect$.subscribe((result) => {
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
      effects.addSeriousFaultCommentEffect$.subscribe((result) => {
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
      effects.addDrivingFaultCommentEffect$.subscribe((result) => {
        expect(result instanceof testActions.PersistTests).toBe(true);
        done();
      });
    });
  });

});
