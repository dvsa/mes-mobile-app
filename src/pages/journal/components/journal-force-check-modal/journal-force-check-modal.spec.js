import { JournalForceCheckModal } from './journal-force-check-modal';
import { async, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../app/app.module';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { configureTestSuite } from 'ng-bullet';
describe('JournalForceCheckModal', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                JournalForceCheckModal,
            ],
            imports: [
                AppModule,
                IonicModule,
                ComponentsModule,
            ],
            providers: [
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: ViewController, useFactory: function () { return ViewControllerMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(JournalForceCheckModal);
        component = fixture.componentInstance;
        component.onCancel = function () {
        };
    }));
    describe('Class', function () {
        it('should create', function () {
            expect(component).toBeDefined();
        });
    });
    describe('DOM', function () {
        it('should call onCancel when the Cancel button is clicked', function () {
            fixture.detectChanges();
            spyOn(component, 'onCancel');
            var button = fixture.debugElement.query(By.css('modal-return-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onCancel).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=journal-force-check-modal.spec.js.map