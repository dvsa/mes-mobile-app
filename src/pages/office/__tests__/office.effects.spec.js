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
import { OfficeEffects } from '../office.effects';
import { ReplaySubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as testSummaryActions from '../../../modules/tests/test-summary/common/test-summary.actions';
import { AddDrivingFaultComment } from '../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import { AddSeriousFaultComment } from '../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { AddDangerousFaultComment, } from '../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import * as testActions from '../../../modules/tests/tests.actions';
import * as testStatusActions from '../../../modules/tests/test-status/test-status.actions';
import * as officeActions from '../office.actions';
import { StoreModule, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { empty } from 'rxjs/Observable/empty';
import { Competencies } from '../../../modules/tests/test-data/test-data.constants';
import { configureTestSuite } from 'ng-bullet';
var TestActions = /** @class */ (function (_super) {
    __extends(TestActions, _super);
    function TestActions() {
        return _super.call(this, empty()) || this;
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
describe('Test Office Data Effects', function () {
    var effects;
    var actions$;
    var currentSlotId = '1234';
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: function () { return ({
                        currentTest: {
                            slotId: currentSlotId,
                        },
                        testStatus: {},
                        startedTests: {},
                    }); },
                }),
            ],
            providers: [
                OfficeEffects,
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(OfficeEffects);
    });
    describe('additionalInformationChanged effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new testSummaryActions.AdditionalInformationChanged('xyz'));
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('candidateDescriptionChanged effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new testSummaryActions.CandidateDescriptionChanged('xyz'));
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('routeNumberChanged effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new testSummaryActions.RouteNumberChanged(14));
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('debriefWitnessedChanged effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new testSummaryActions.DebriefWitnessed());
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('debriefUnWitnessedChanged effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new testSummaryActions.DebriefUnwitnessed());
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('identificationUsedChanged effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new testSummaryActions.IdentificationUsedChanged('Licence'));
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('independentDrivingTypeChanged effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new testSummaryActions.IndependentDrivingTypeChanged('Sat nav'));
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('d255Yes effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new testSummaryActions.D255Yes());
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('d255No effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new testSummaryActions.D255No());
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('weatherConditionsChanged effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new testSummaryActions.WeatherConditionsChanged(['Icy']));
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('AddDangerousFaultComment effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new AddDangerousFaultComment(Competencies.controlsParkingBrake, 'xyz'));
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('AddSeriousFaultComment effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new AddSeriousFaultComment(Competencies.controlsParkingBrake, 'abc'));
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('AddDrivingFaultComment effect', function () {
        it('should invoke the PersistTest action', function (done) {
            // ACT
            actions$.next(new AddDrivingFaultComment(Competencies.controlsParkingBrake, 'def'));
            // ASSERT
            effects.persistOfficeDataEffect$.subscribe(function (result) {
                expect(result instanceof testActions.PersistTests).toBe(true);
                done();
            });
        });
    });
    describe('submitWaitingRoomInfoEffect', function () {
        it('should return SET_STATUS_DECIDED & PERSIST_TESTS actions', function (done) {
            actions$.next(new officeActions.CompleteTest());
            effects.completeTestEffect$.subscribe(function (result) {
                if (result instanceof testStatusActions.SetTestStatusCompleted) {
                    expect(result).toEqual(new testStatusActions.SetTestStatusCompleted(currentSlotId));
                }
                if (result instanceof testActions.PersistTests) {
                    expect(result).toEqual(new testActions.PersistTests());
                }
                done();
            });
        });
    });
});
//# sourceMappingURL=office.effects.spec.js.map