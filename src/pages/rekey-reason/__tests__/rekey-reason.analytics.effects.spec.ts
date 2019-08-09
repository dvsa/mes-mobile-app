import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsScreenNames,
} from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import * as rekeyReasonActions from '../rekey-reason.actions';
import { RekeyReasonAnalyticsEffects } from '../rekey-reason.analytics.effects';

describe('Rekey Reason Analytics Effects', () => {

  let effects: RekeyReasonAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  const screenName = AnalyticsScreenNames.REKEY_REASON;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      providers: [
        RekeyReasonAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(RekeyReasonAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
  });

  describe('rekeyReasonViewDidEnter', () => {
    it('should call setCurrentPage', (done) => {
      // ACT
      actions$.next(new rekeyReasonActions.RekeyReasonViewDidEnter());
      // ASSERT
      effects.rekeyReasonViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(screenName);
        done();
      });
    });
  });
});
