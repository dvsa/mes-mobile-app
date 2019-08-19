import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';

import { AppModule } from '../../../../../app/app.module';
import { UploadRekeyModal } from '../upload-rekey-modal';
import { By } from '@angular/platform-browser';

describe('UploadRekeyModal', () => {
  let fixture: ComponentFixture<UploadRekeyModal>;
  let component: UploadRekeyModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadRekeyModal],
      imports: [IonicModule, AppModule],
      providers: [
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UploadRekeyModal);
        component = fixture.componentInstance;
        component.onCancel = () => {};
        component.onUpload = () => {};
      });
  }));

  describe('DOM', () => {
    it('should call the provided onCancel function when cancelling the upload', () => {
      fixture.detectChanges();
      spyOn(component, 'onCancel');
      const button = fixture.debugElement.query(By.css('.cancel-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onCancel).toHaveBeenCalled();

    });
    it('should call the provided onUpload function when confirming the upload', () => {
      fixture.detectChanges();
      spyOn(component, 'onUpload');
      const button = fixture.debugElement.query(By.css('.upload-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onUpload).toHaveBeenCalled();
    });
  });
});
