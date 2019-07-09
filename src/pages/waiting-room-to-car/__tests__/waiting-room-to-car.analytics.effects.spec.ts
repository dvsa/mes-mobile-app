import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { of } from 'rxjs/observable/of';
import {
  AnalyticsDimensionIndices,
  AnalyticsScreenNames,
  AnalyticsErrorTypes,
} from '../../../providers/analytics/analytics.model';

describe('Waiting Room To Car Analytics Effects', () => {

  let effects: WaitingRoomToCarAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                vehicleDetails: {},
                accompaniment: {},
                testData: {},
                journalData: {
                  candidate: {
                    candidateId: 1001,
                  },
                },
              },
            },
          }),
        }),
      ],
      providers: [
        WaitingRoomToCarAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(WaitingRoomToCarAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
  });

  describe('waitingRoomToCarViewDidEnter', () => {
    it('should call setCurrentPage and addCustomDimension', fakeAsync((done) => {
      // ARRANGE
      spyOn(analyticsProviderMock, 'addCustomDimension').and.callThrough();
      spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
      // ACT
      actions$.next(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
      tick();
      // ASSERT
      effects.waitingRoomToCarViewDidEnter$.subscribe((result) => {
        expect(result instanceof of).toBe(true);
        expect(effects.analytics.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1001');
        expect(effects.analytics.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_ID, '123');
        expect(effects.analytics.setCurrentPage)
          .toHaveBeenCalledWith(AnalyticsScreenNames.WAITING_ROOM_TO_CAR);
        done();
      });
    }));

  });

  describe('waitingRoomToCarError', () => {
    it('should call logError', fakeAsync((done) => {
      // ARRANGE
      spyOn(analyticsProviderMock, 'logError').and.callThrough();
      // ACT
      actions$.next(new waitingRoomToCarActions.WaitingRoomToCarError('error 123'));
      tick();
      // ASSERT
      effects.waitingRoomToCarError$.subscribe((result) => {
        expect(result instanceof of).toBe(true);
        expect(effects.analytics.logError)
        // tslint:disable-next-line:max-line-length
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${AnalyticsScreenNames.WAITING_ROOM_TO_CAR})`,
          'error 123');
        done();
      });
    }));

  });

  describe('waitingRoomToCarValidationError', () => {
    it('should call logError', fakeAsync((done) => {
      // ARRANGE
      spyOn(analyticsProviderMock, 'logError').and.callThrough();
      // ACT
      actions$.next(new waitingRoomToCarActions.WaitingRoomToCarValidationError('formControl1'));
      tick();
      // ASSERT
      effects.waitingRoomToCarValidationError$.subscribe((result) => {
        expect(result instanceof of).toBe(true);
        expect(effects.analytics.logError)
        // tslint:disable-next-line:max-line-length
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${AnalyticsScreenNames.WAITING_ROOM_TO_CAR})`,
          'formControl1');
        done();
      });
    }));

  });

});
