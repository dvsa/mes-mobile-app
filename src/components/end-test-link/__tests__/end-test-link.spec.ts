import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { EndTestLinkComponent } from '../end-test-link';
import { IonicModule, ModalController } from 'ionic-angular';
import { ModalControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';

describe('EndTestLinkComponent', () => {
  let fixture: ComponentFixture<EndTestLinkComponent>;
  let component: EndTestLinkComponent;
  let modalController: ModalController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EndTestLinkComponent],
      imports: [IonicModule, AppModule],
      providers: [
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EndTestLinkComponent);
        component = fixture.componentInstance;
        modalController = TestBed.get(ModalController);
      });
  }));

  describe('DOM', () => {
    describe('opening test termination confirmation modal', () => {
      it('should open a modal for test termination', () => {
        component.openEndTestModal();
        expect(modalController.create).toHaveBeenCalled();
        const { calls } = modalController.create as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe('TerminateTestModal');
      });
      it('should pass the termination and cancellation callbacks to the modal creation', () => {
        component.openEndTestModal();
        expect(modalController.create).toHaveBeenCalled();
        const { calls } = modalController.create as jasmine.Spy;
        const navParams = calls.argsFor(0)[1];
        expect(navParams.onCancel).toBe(component.onCancel);
        expect(navParams.onTerminate).toBe(component.onTerminate);
      });
    });
  });
});
