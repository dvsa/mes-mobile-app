import { async, TestBed } from '@angular/core/testing';
import { EndTestModal } from '../end-test-modal';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';
describe('EndTestModal', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                EndTestModal,
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
        fixture = TestBed.createComponent(EndTestModal);
        component = fixture.componentInstance;
        component.onContinue = function () { };
        component.onCancel = function () { };
        component.onTerminate = function () { };
    }));
    describe('DOM', function () {
        it('should call onContinue when the Continue to debrief button is clicked', function () {
            fixture.detectChanges();
            spyOn(component, 'onContinue');
            var button = fixture.debugElement.query(By.css('button.mes-primary-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onContinue).toHaveBeenCalled();
        });
        it('should call onCancel when the Return to test button is clicked', function () {
            fixture.detectChanges();
            spyOn(component, 'onCancel');
            var button = fixture.debugElement.query(By.css('button.return-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onCancel).toHaveBeenCalled();
        });
        it('should call onTerminate when the Terminate test button is clicked', function () {
            fixture.detectChanges();
            spyOn(component, 'onTerminate');
            var button = fixture.debugElement.query(By.css('button.terminate-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onTerminate).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=end-test-modal.spec.js.map