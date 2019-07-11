import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Store } from '@ngrx/store';
import { TestReportAnalyticsEffects } from '../test-report.analytics.effects';
import * as journalActions from '../../journal/journal.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as testDataActions from '../../../modules/tests/test-data/test-data.actions';
import * as testReportActions from '../test-report.actions';
import { StoreModel } from '../../../shared/models/store.model';
import { Competencies } from '../../../modules/tests/test-data/test-data.constants';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsScreenNames,
  AnalyticsEventCategories,
  AnalyticsEvents,
} from '../../../providers/analytics/analytics.model';
import { fullCompetencyLabels } from '../../../shared/constants/competencies/catb-competencies';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { testReportPracticeModeSlot } from '../../../modules/tests/__mocks__/tests.mock';

describe('Test Report Analytics Effects', () => {

  let effects: TestReportAnalyticsEffects;
  let actions: ReplaySubject<any>;
  let analyticsProviderMock;
  let store$: Store<StoreModel>;

  beforeEach(() => {
    actions = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        TestReportAnalyticsEffects,
        provideMockActions(() => actions),
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        Store,
      ],
    });
    effects = TestBed.get(TestReportAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
  });

  describe('testReportViewDidEnter', () => {
    it('should call setCurrentPage and addCustomDimension', () => {
      // ARRANGE
      spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
      // ACT
      actions.next(new testReportActions.TestReportViewDidEnter());
      // ASSERT
      effects.testReportViewDidEnter$.subscribe((result) => {
        expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
      });
    });
  });

  describe('addDrivingFault', () => {

    it('should call logEvent for this competency', () => {
      // ARRANGE
      spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
      store$.dispatch(new journalActions.StartTest(123456));
      // ACT
      actions.next(new testDataActions.AddDrivingFault({
        competency: Competencies.controlsGears,
        newFaultCount: 1,
      }));
      // ASSERT
      effects.addDrivingFault$.subscribe((result) => {
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DRIVING_FAULT,
          fullCompetencyLabels[Competencies.controlsGears],
          1,
        );
      });
    });

    it('should not call logEvent for this competency when it is a practice test', () => {
      // ARRANGE
      spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
      // ACT
      actions.next(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      actions.next(new testDataActions.AddDrivingFault({
        competency: Competencies.controlsGears,
        newFaultCount: 1,
      }));
      // ASSERT
      effects.addDrivingFault$.subscribe((result) => {
        expect(analyticsProviderMock.logEvent).toHaveBeenCalled();
      });
    });
  });

  // describe('addManoeuvreDrivingFault', () => {
  //   it('should call logEvent for this competency', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  //   it('should not call logEvent for this competency when it is a practice test', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  // });

  // describe('controlledStopAddDrivingFault', () => {
  //   it('should call logEvent for this competency', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  //   it('should not call logEvent for this competency when it is a practice test', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  // });

  // describe('showMeQuestionDrivingFault', () => {
  //   it('should call logEvent for this competency', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  //   it('should not call logEvent for this competency when it is a practice test', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  // });

  // describe('removeDrivingFault', () => {
  //   it('should call logEvent for this competency', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  //   it('should not call logEvent for this competency when it is a practice test', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  // });

  // describe('removeManoeuvreDrivingFault', () => {
  //   it('should call logEvent for this competency', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  //   it('should not call logEvent for this competency when it is a practice test', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  // });

  // describe('controlledStopRemoveFault', () => {
  //   it('should call logEvent for this competency', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  //   it('should not call logEvent for this competency when it is a practice test', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  // });

  // describe('showMeQuestionRemoveFault', () => {
  //   it('should call logEvent for this competency', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  //   it('should not call logEvent for this competency when it is a practice test', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  //     // ACT
  //     actions.next(new testReportActions.TestReportViewDidEnter());
  //     tick();
  //     // ASSERT
  //     effects.testReportViewDidEnter$.subscribe((result) => {
  //       expect(result instanceof of).toBe(true);
  //       expect(effects.analytics.logEvent).toHaveBeenCalledWith(AnalyticsScreenNames.TEST);
  //       done();
  //     });
  //   }));
  // });

});
