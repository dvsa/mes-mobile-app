import { EyesightFailureConfirmationComponent } from '../eyesight-failure-confirmation';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule, Config, NavController } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ConfigMock, NavControllerMock } from 'ionic-mocks';

describe('eyesight failure confirmation component', () => {
  let fixture: ComponentFixture<EyesightFailureConfirmationComponent>;
  let component: EyesightFailureConfirmationComponent;
  let navController: NavController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EyesightFailureConfirmationComponent,
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EyesightFailureConfirmationComponent);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
      });
  }));

  describe('DOM', () => {
    it('should call the cancel function when cancel is pressed', () => {
      const cancelSpy = jasmine.createSpy('onCancel');
      component.cancelFn = cancelSpy;
      const cancelButton = fixture.debugElement.query(By.css('#cancel-eyesight-failure'));
      cancelButton.triggerEventHandler('click', null);
      expect(cancelSpy).toHaveBeenCalled();
    });
    it('should navigate to debrief when continue is pressed', () => {
      const confirmButton = fixture.debugElement.query(By.css('#confirm-eyesight-failure'));
      confirmButton.triggerEventHandler('click', null);
      const { calls } = navController.push as jasmine.Spy;
      expect(calls.argsFor(0)[0]).toBe('DebriefPage');
    });
  });
});
