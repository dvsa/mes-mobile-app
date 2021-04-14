import { HealthDeclarationEffects } from '../health-declaration.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as healthDeclarationActions from '../health-declaration.actions';
import * as testStatusActions from '../../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import { configureTestSuite } from 'ng-bullet';
describe('Health Declaration Effects', function () {
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
                HealthDeclarationEffects,
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(HealthDeclarationEffects);
    });
    describe('endHealthDeclarationEffect', function () {
        it('should return SET_TEST_STATUS_WRITE_UP & PERSIST_TESTS actions', function (done) {
            actions$.next(new healthDeclarationActions.ContinueFromDeclaration());
            effects.endHealthDeclarationEffect$.subscribe(function (result) {
                if (result instanceof testStatusActions.SetTestStatusWriteUp) {
                    expect(result).toEqual(new testStatusActions.SetTestStatusWriteUp(currentSlotId));
                }
                if (result instanceof testsActions.PersistTests) {
                    expect(result).toEqual(new testsActions.PersistTests());
                    done();
                }
            });
        });
    });
});
//# sourceMappingURL=health-declaration.effects.spec.js.map