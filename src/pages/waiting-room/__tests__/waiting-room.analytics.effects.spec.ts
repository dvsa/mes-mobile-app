import { WaitingRoomAnalyticsEffects } from '../waiting-room.analytics.effects';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as waitingRoomActions from '../waiting-room.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { of } from 'rxjs/observable/of';
import {
  AnalyticsDimensionIndices,
  AnalyticsScreenNames,
  AnalyticsErrorTypes,
} from '../../../providers/analytics/analytics.model';

describe('Waiting Room Analytics Effects', () => {

  let effects: WaitingRoomAnalyticsEffects;
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
        WaitingRoomAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(WaitingRoomAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
  });

  describe('waitingRoomViewDidEnter', () => {
    it('should call setCurrentPage and addCustomDimension', fakeAsync((done) => {
      // ARRANGE
      spyOn(analyticsProviderMock, 'addCustomDimension').and.callThrough();
      spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
      // ACT
      actions$.next(new waitingRoomActions.WaitingRoomViewDidEnter());
      tick();
      // ASSERT
      effects.waitingRoomViewDidEnter$.subscribe((result) => {
        expect(result instanceof of).toBe(true);
        expect(effects.analytics.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1001');
        expect(effects.analytics.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_ID, '123');
        expect(effects.analytics.setCurrentPage)
          .toHaveBeenCalledWith(AnalyticsScreenNames.WAITING_ROOM);
        done();
      });
    }));

  });

  describe('submitWaitingRoomInfoError', () => {
    it('should call logError', fakeAsync((done) => {
      // ARRANGE
      spyOn(analyticsProviderMock, 'logError').and.callThrough();
      // ACT
      actions$.next(new waitingRoomActions.SubmitWaitingRoomInfoError('error 123'));
      tick();
      // ASSERT
      effects.submitWaitingRoomInfoError$.subscribe((result) => {
        expect(result instanceof of).toBe(true);

        expect(effects.analytics.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${AnalyticsScreenNames.WAITING_ROOM})`,
          'error 123');
        done();
      });
    }));

  });

  describe('submitWaitingRoomInfoErrorValidation', () => {
    it('should call logError', fakeAsync((done) => {
      // ARRANGE
      spyOn(analyticsProviderMock, 'logError').and.callThrough();
      // ACT
      actions$.next(new waitingRoomActions.WaitingRoomValidationError('formControl1'));
      tick();
      // ASSERT
      effects.submitWaitingRoomInfoErrorValidation$.subscribe((result) => {
        expect(result instanceof of).toBe(true);
        expect(effects.analytics.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${AnalyticsScreenNames.WAITING_ROOM})`,
          'formControl1');
        done();
      });
    }));

  });

});
