import { CommunicationEffects } from '../communication.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as communicationActions from '../communication.actions';
import * as testStatusActions from '../../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import { configureTestSuite } from 'ng-bullet';
describe('Communication Effects', function () {
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
                CommunicationEffects,
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(CommunicationEffects);
    });
    describe('submitCommunicationInfoEffect', function () {
        it('should return SET_STATUS_DECIDED & PERSIST_TESTS actions', function (done) {
            actions$.next(new communicationActions.CommunicationSubmitInfo());
            effects.communicationSubmitInfoEffect$.subscribe(function (result) {
                if (result instanceof testStatusActions.SetTestStatusStarted) {
                    expect(result).toEqual(new testStatusActions.SetTestStatusStarted(currentSlotId));
                }
                if (result instanceof testsActions.PersistTests) {
                    expect(result).toEqual(new testsActions.PersistTests());
                }
                done();
            });
        });
    });
});
//# sourceMappingURL=communication.effects.spec.js.map