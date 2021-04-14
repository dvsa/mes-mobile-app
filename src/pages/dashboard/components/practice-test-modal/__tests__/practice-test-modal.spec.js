import { async, TestBed } from '@angular/core/testing';
import { PracticeTestModal } from '../practice-test-modal';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';
describe('PracticeTestModal', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                PracticeTestModal,
            ],
            imports: [
                AppModule,
                IonicModule,
            ],
            providers: [
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: ViewController, useFactory: function () { return ViewControllerMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(PracticeTestModal);
        component = fixture.componentInstance;
        component.onCancel = function () {
        };
        component.onNoFault = function () {
        };
        component.onFault = function () {
        };
    }));
    describe('DOM', function () {
        it('should call onCancel when the Return to test button is clicked', function () {
            fixture.detectChanges();
            spyOn(component, 'onCancel');
            var button = fixture.debugElement.query(By.css('button.cancel-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onCancel).toHaveBeenCalled();
        });
        it('should call onNoFault when the start without any faults button is clicked', function () {
            fixture.detectChanges();
            spyOn(component, 'onNoFault');
            var button = fixture.debugElement.query(By.css('button.no-fault-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onNoFault).toHaveBeenCalled();
        });
        it('should call onFault when the start with a fault button is clicked', function () {
            fixture.detectChanges();
            spyOn(component, 'onFault');
            var button = fixture.debugElement.query(By.css('button.fault-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onFault).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=practice-test-modal.spec.js.map