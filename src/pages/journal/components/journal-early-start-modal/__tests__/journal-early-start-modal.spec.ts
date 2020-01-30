import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalEarlyStartModal } from '../journal-early-start-modal';
import { AppModule } from '../../../../../app/app.module';
import { ViewControllerMock } from 'ionic-mocks';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { By } from '@angular/platform-browser';
import { JournalEarlyStartModalMock } from '../__mocks__/journal-early-start-modal.mock';
import { NavParamsMock } from '../__mocks__/nav-params.mock';

fdescribe('JournalEarlyStartModal', () => {
  let modalFixture: ComponentFixture<JournalEarlyStartModal>;
  let modalComponent: JournalEarlyStartModal;
  const mockFile: JournalEarlyStartModalMock = new JournalEarlyStartModalMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JournalEarlyStartModal,
      ],
      imports: [
        AppModule,
        IonicModule,
        ComponentsModule,
      ],
      providers: [
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() } ,
        { provide: NavParams, useFactory: () => NavParamsMock },
      ],
    }).compileComponents();
    spyOn(NavParamsMock, 'get').and.callFake(mockFile.mockSlotDetail);
    modalFixture = TestBed.createComponent(JournalEarlyStartModal);
    modalComponent = modalFixture.componentInstance;
    modalComponent.onCancel = () => {
    };
    modalComponent.onStart = () => {
    };
  }));

  describe('DOM', () => {
    it('should call onStart when the Start test button is clicked', () => {
      modalFixture.detectChanges();
      spyOn(modalComponent, 'onStart');
      const button = modalFixture.debugElement.query(By.css('button.early-start-start-test-button'));
      button.triggerEventHandler('click', null);
      modalFixture.detectChanges();
      expect(modalComponent.onStart).toHaveBeenCalled();
    });
    it('should call onCancel when the Cancel button is clicked', () => {
      modalFixture.detectChanges();
      spyOn(modalComponent, 'onCancel');
      const button = modalFixture.debugElement.query(By.css('button.early-start-cancel-button'));
      button.triggerEventHandler('click', null);
      modalFixture.detectChanges();
      expect(modalComponent.onCancel).toHaveBeenCalled();
    });
  });
});
