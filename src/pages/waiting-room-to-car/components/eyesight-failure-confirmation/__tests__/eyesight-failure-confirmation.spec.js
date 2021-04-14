import { EyesightFailureConfirmationComponent } from '../eyesight-failure-confirmation';
import { TestBed, async } from '@angular/core/testing';
import { IonicModule, Config, NavController } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ConfigMock, NavControllerMock } from 'ionic-mocks';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { CAT_B } from '../../../../page-names.constants';
import { SetActivityCode } from '../../../../../modules/tests/activity-code/activity-code.actions';
import { configureTestSuite } from 'ng-bullet';
describe('eyesight failure confirmation component', function () {
    var fixture;
    var component;
    var navController;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                EyesightFailureConfirmationComponent,
            ],
            imports: [
                IonicModule,
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(EyesightFailureConfirmationComponent);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('DOM', function () {
        it('should call the cancel function when cancel is pressed', function () {
            var cancelSpy = jasmine.createSpy('onCancel');
            component.cancelFn = cancelSpy;
            var cancelButton = fixture.debugElement.query(By.css('#cancel-eyesight-failure'));
            cancelButton.triggerEventHandler('click', null);
            expect(cancelSpy).toHaveBeenCalled();
        });
        it('should navigate to debrief when continue is pressed', function () {
            var confirmButton = fixture.debugElement.query(By.css('#confirm-eyesight-failure'));
            component.nextPageOnFail = CAT_B.DEBRIEF_PAGE;
            confirmButton.triggerEventHandler('click', null);
            var calls = navController.push.calls;
            expect(calls.argsFor(0)[0]).toBe(CAT_B.DEBRIEF_PAGE);
        });
    });
    describe('Class', function () {
        describe('onContinue', function () {
            it('should dispatch an action to set the activity code to an eyesight failure', function () {
                component.onContinue();
                expect(store$.dispatch).toHaveBeenCalledWith(new SetActivityCode('3'));
            });
        });
    });
});
//# sourceMappingURL=eyesight-failure-confirmation.spec.js.map