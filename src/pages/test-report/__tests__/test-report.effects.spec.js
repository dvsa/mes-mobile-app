var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { async, TestBed } from '@angular/core/testing';
import { ReplaySubject, EMPTY, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { TestReportEffects } from '../test-report.effects';
import * as etaActions from '../../../modules/tests/test-data/common/eta/eta.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as testReportActions from '../test-report.actions';
import * as activityCodeActions from '../../../modules/tests/activity-code/activity-code.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { TestResultProvider } from '../../../providers/test-result/test-result';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { ExaminerActions } from '../../../modules/tests/test-data/test-data.constants';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { PopulateTestCategory } from '../../../modules/tests/category/category.actions';
import { configureTestSuite } from 'ng-bullet';
var TestActions = /** @class */ (function (_super) {
    __extends(TestActions, _super);
    function TestActions() {
        return _super.call(this, EMPTY) || this;
    }
    Object.defineProperty(TestActions.prototype, "stream$", {
        set: function (source$) {
            this.source = source$;
        },
        enumerable: false,
        configurable: true
    });
    return TestActions;
}(Actions));
export { TestActions };
describe('Test Report Effects', function () {
    var effects;
    var actions$;
    var testResultProvider;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                TestReportEffects,
                provideMockActions(function () { return actions$; }),
                TestResultProvider,
                FaultCountProvider,
                Store,
            ],
        });
    });
    beforeEach(async(function () {
        actions$ = new ReplaySubject(1);
        testResultProvider = TestBed.get(TestResultProvider);
        effects = TestBed.get(TestReportEffects);
        store$ = TestBed.get(Store);
    }));
    describe('calculateTestResult', function () {
        beforeEach(function () {
            store$.dispatch(new testsActions.StartTest(123456, "B" /* B */));
            store$.dispatch(new PopulateTestCategory("B" /* B */));
        });
        it('should dispatch an action containing the correct result for a test', function (done) {
            // ARRANGE
            spyOn(testResultProvider, 'calculateTestResult').and.returnValue(of(ActivityCodes.PASS));
            // ACT
            actions$.next(new testReportActions.CalculateTestResult());
            // ASSERT
            effects.calculateTestResult$.subscribe(function (result) {
                expect(testResultProvider.calculateTestResult).toHaveBeenCalled();
                expect(result).toEqual(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
                done();
            });
        });
    });
    describe('persistTestReport', function () {
        beforeEach(function () {
            store$.dispatch(new testsActions.StartTest(123456, "B" /* B */));
        });
        it('should dispatch an action requesting the test data to be saved when triggered', function (done) {
            // ACT
            actions$.next(new etaActions.ToggleETA(ExaminerActions.physical));
            // ASSERT
            effects.persistTestReport$.subscribe(function (result) {
                expect(result).toEqual(new testsActions.PersistTests());
                done();
            });
        });
        it('should not dispatch an action requesting the test data to be saved when triggered', function () {
            // When something is filtered, nothing happens - the pipe function will not call the next operator.
            // TODO - think about how this could be tested
        });
    });
    describe('terminateTestReport', function () {
        beforeEach(function () {
            store$.dispatch(new testsActions.StartTest(123456, "B" /* B */));
        });
        it('should dispatch an action terminating the test', function (done) {
            // ACT
            actions$.next(new testReportActions.TerminateTestFromTestReport());
            // ASSERT
            effects.terminateTestFromTestReport$.subscribe(function (result) {
                expect(result).toEqual(new activityCodeActions.SetActivityCode(null));
                done();
            });
        });
    });
});
//# sourceMappingURL=test-report.effects.spec.js.map