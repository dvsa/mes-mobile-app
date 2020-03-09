import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames, AnalyticsDimensionIndices } from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { ViewTestResultAnalyticsEffects } from '../view-test-result.analytics.effects';
import * as viewTestResultActions from '../view-test-result.actions';
import { configureTestSuite } from 'ng-bullet';

describe('View Test Results Analytics Effects', () => {

  let effects: ViewTestResultAnalyticsEffects ;
  let analyticsProviderMock;
  let actions$: any;
  const screenName = AnalyticsScreenNames.VIEW_TEST_RESULT;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        ViewTestResultAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
      ],
    });
  });

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    effects = TestBed.get(ViewTestResultAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
  });

  describe('viewTestResultViewDidEnter', () => {
    it('should call setCurrentPage', (done) => {
      // ACT
      actions$.next(new viewTestResultActions.ViewTestResultViewDidEnter('12345'));
      // ASSERT
      effects.viewTestResultViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenName);
        expect(analyticsProviderMock.addCustomDimension).toHaveBeenCalledWith(
          AnalyticsDimensionIndices.APPLICATION_REFERENCE,
          '12345',
        );
        done();
      });
    });
  });
});
