import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsScreenNames,
} from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { RekeySearchAnalyticsEffects } from '../rekey-search.analytics.effects';
import * as rekeySearchActions from '../rekey-search.actions';

describe('Rekey Search Analytics Effects', () => {

  let effects: RekeySearchAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  const screenName = AnalyticsScreenNames.REKEY_SEARCH;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      providers: [
        RekeySearchAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(RekeySearchAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
  });

  describe('rekeySearchViewDidEnter', () => {
    it('should call setCurrentPage', (done) => {
      // ACT
      actions$.next(new rekeySearchActions.RekeySearchViewDidEnter());
      // ASSERT
      effects.rekeySearchViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(screenName);
        done();
      });
    });
  });
});
