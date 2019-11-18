import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { EndTestLinkComponent } from '../end-test-link';
import { IonicModule, ModalController, NavController } from 'ionic-angular';
import { ModalControllerMock, NavControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { CAT_B, CAT_BE } from '../../../../pages/page-names.constants';

describe('EndTestLinkComponent', () => {
  let fixture: ComponentFixture<EndTestLinkComponent>;
  let component: EndTestLinkComponent;
  let modalController: ModalController;
  let navController: NavController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EndTestLinkComponent],
      imports: [IonicModule, AppModule],
      providers: [
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EndTestLinkComponent);
        component = fixture.componentInstance;
        modalController = TestBed.get(ModalController);
        navController = TestBed.get(NavController);
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

  describe('Class', () => {
    describe('onTerminate', () => {
      it('should dismiss the dialog termination confirmation dialog and navigate to CAT B debrief', () => {
        component.category = 'B';
        component.terminateTestModal = jasmine.createSpyObj('terminateTestModal', ['dismiss']);
        component.onTerminate();
        expect(component.terminateTestModal.dismiss).toHaveBeenCalled();
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_B.DEBRIEF_PAGE);
      });
      it('should dismiss the dialog termination confirmation dialog and navigate to CAT BE debrief', () => {
        component.category = 'B+E';
        component.terminateTestModal = jasmine.createSpyObj('terminateTestModal', ['dismiss']);
        component.onTerminate();
        expect(component.terminateTestModal.dismiss).toHaveBeenCalled();
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_BE.DEBRIEF_PAGE);
      });

    });
  });
});
