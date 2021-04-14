import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../app/app.module';
import { UploadRekeyModal } from '../upload-rekey-modal';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';
describe('UploadRekeyModal', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [UploadRekeyModal],
            imports: [IonicModule, AppModule],
            providers: [
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: ViewController, useFactory: function () { return ViewControllerMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(UploadRekeyModal);
        component = fixture.componentInstance;
        component.onCancel = function () {
        };
        component.onUpload = function () {
        };
    }));
    describe('DOM', function () {
        it('should call the provided onCancel function when cancelling the upload', function () {
            fixture.detectChanges();
            spyOn(component, 'onCancel');
            var button = fixture.debugElement.query(By.css('.cancel-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onCancel).toHaveBeenCalled();
        });
        it('should call the provided onUpload function when confirming the upload', function () {
            fixture.detectChanges();
            spyOn(component, 'onUpload');
            var button = fixture.debugElement.query(By.css('.upload-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onUpload).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=upload-rekey-modal.spec.js.map