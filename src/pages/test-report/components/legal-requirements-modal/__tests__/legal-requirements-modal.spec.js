import { async, TestBed } from '@angular/core/testing';
import { LegalRequirementsModal } from '../legal-requirements-modal';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { configureTestSuite } from 'ng-bullet';
describe('LegalRequirementsModal', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                LegalRequirementsModal,
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
        fixture = TestBed.createComponent(LegalRequirementsModal);
        component = fixture.componentInstance;
        component.onCancel = function () {
        };
        component.onTerminate = function () {
        };
    }));
    describe('Class', function () {
    });
    describe('DOM', function () {
        it('should call onCancel when the Return to test button is clicked', function () {
            component.legalRequirements = [];
            fixture.detectChanges();
            spyOn(component, 'onCancel');
            var button = fixture.debugElement.query(By.css('button.modal-return-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onCancel).toHaveBeenCalled();
        });
        it('should call onTerminate when the Terminate test button is clicked', function () {
            component.legalRequirements = [];
            fixture.detectChanges();
            spyOn(component, 'onTerminate');
            var button = fixture.debugElement.query(By.css('button.terminate-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onTerminate).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=legal-requirements-modal.spec.js.map