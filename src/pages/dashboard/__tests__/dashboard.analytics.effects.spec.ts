import { DashboardAnalyticsEffects } from '../dashboard.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames } from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import * as dashboardActions from '../dashboard.actions';

describe('Dashboard Analytics Effects', () => {

  let effects: DashboardAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  const screenName = AnalyticsScreenNames.DASHBOARD;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      providers: [
        DashboardAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(DashboardAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
  });

  describe('dashboardViewDidEnter', () => {
    it('should call setCurrentPage', (done) => {
      // ACT
      actions$.next(new dashboardActions.DashboardViewDidEnter());
      // ASSERT
      effects.dashboardViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenName);
        done();
      });
    });
  });
});
