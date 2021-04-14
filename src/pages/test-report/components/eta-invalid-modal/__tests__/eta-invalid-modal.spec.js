import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../app/app.module';
import { EtaInvalidModal } from '../eta-invalid-modal';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { configureTestSuite } from 'ng-bullet';
describe('LegalRequirementsModal', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                EtaInvalidModal,
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
        fixture = TestBed.createComponent(EtaInvalidModal);
        component = fixture.componentInstance;
        component.onCancel = function () {
        };
    }));
    describe('DOM', function () {
        it('should call onCancel when the Return to test button is clicked', function () {
            fixture.detectChanges();
            spyOn(component, 'onCancel');
            var button = fixture.debugElement.query(By.css('button.modal-return-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onCancel).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=eta-invalid-modal.spec.js.map