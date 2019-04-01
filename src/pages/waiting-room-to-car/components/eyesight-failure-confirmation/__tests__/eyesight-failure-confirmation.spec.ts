import { EyesightFailureConfirmationComponent } from '../eyesight-failure-confirmation';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';

describe('eyesight failure confirmation component', () => {
  let fixture: ComponentFixture<EyesightFailureConfirmationComponent>;
  let component: EyesightFailureConfirmationComponent;

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
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EyesightFailureConfirmationComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should call the cancel function when cancel is pressed', () => {
    const cancelSpy = jasmine.createSpy('onCancel');
    component.cancelFn = cancelSpy;
    const cancelButton = fixture.debugElement.query(By.css('#cancel-eyesight-failure'));
    cancelButton.triggerEventHandler('click', null);
    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should call the confirm function when cancel is pressed', () => {
    const confirmSpy = jasmine.createSpy('onConfirm');
    component.confirmFn = confirmSpy;
    const confirmButton = fixture.debugElement.query(By.css('#confirm-eyesight-failure'));
    confirmButton.triggerEventHandler('click', null);
    expect(confirmSpy).toHaveBeenCalled();
  });
});
