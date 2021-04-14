import { DashboardAnalyticsEffects } from '../dashboard.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames } from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import * as dashboardActions from '../dashboard.actions';
import { configureTestSuite } from 'ng-bullet';
describe('Dashboard Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var screenName = AnalyticsScreenNames.DASHBOARD;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                DashboardAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(DashboardAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
    });
    describe('dashboardViewDidEnter', function () {
        it('should call setCurrentPage', function (done) {
            // ACT
            actions$.next(new dashboardActions.DashboardViewDidEnter());
            // ASSERT
            effects.dashboardViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenName);
                done();
            });
        });
    });
});
//# sourceMappingURL=dashboard.analytics.effects.spec.js.map