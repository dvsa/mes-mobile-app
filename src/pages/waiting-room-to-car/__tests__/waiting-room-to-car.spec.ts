import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { WaitingRoomToCarPage } from '../waiting-room-to-car';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { By } from '@angular/platform-browser';
import {
  GearboxCategoryChanged,
  SchoolCarToggled,
  DualControlsToggled,
} from '../../../modules/tests/vehicle-details/vehicle-details.actions';
import {
  InstructorAccompanimentToggled,
  SupervisorAccompanimentToggled,
  OtherAccompanimentToggled,
} from '../../../modules/tests/accompaniment/accompaniment.actions';
import { MockComponent } from 'ng-mocks';
import {
  EyesightFailureConfirmationComponent,
} from '../components/eyesight-failure-confirmation/eyesight-failure-confirmation';
import {
  EyesightPassPressed,
  EyesightFailPressed,
  EyesightFailCancelled,
  EyesightFailConfirmed,
} from '../waiting-room-to-car.actions';
import { EyesightRadioState } from '../waiting-room-to-car.reducer';
import { of } from 'rxjs/observable/of';

describe('WaitingRoomToCarPage', () => {
  let fixture: ComponentFixture<WaitingRoomToCarPage>;
  let component: WaitingRoomToCarPage;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WaitingRoomToCarPage,
        MockComponent(EyesightFailureConfirmationComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            startedTests: {
              123: {
                vehicleDetails: {},
                accompaniment: {},
                candidate: {
                  candidateName: 'Joe Bloggs',
                },
              },
            },
          }),
          waitingRoomToCar: () => ({
            eyesightRadioState: EyesightRadioState.Unselected,
          }),
        }),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WaitingRoomToCarPage);
        component = fixture.componentInstance;
      });
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    describe('changing transmission', () => {
      it('should dispatch a change to manual gearbox category action when manual is clicked', () => {
        const manualRadio = fixture.debugElement.query(By.css('#transmission-manual'));
        manualRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new GearboxCategoryChanged('Manual'));
      });
      it('should dispatch a change to automatic gearbox category action when automatic is clicked', () => {
        const automaticRadio = fixture.debugElement.query(By.css('#transmission-automatic'));
        automaticRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new GearboxCategoryChanged('Automatic'));
      });
    });

    describe('changing accompaniment status', () => {
      it('should dispatch a toggle instructor accompaniment action when Ins is clicked', () => {
        const instructorCb = fixture.debugElement.query(By.css('#accompaniment-instructor'));
        instructorCb.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new InstructorAccompanimentToggled());
      });
      it('should dispatch a toggle supervisor accompaniment action when Sup is clicked', () => {
        const supervisorCb = fixture.debugElement.query(By.css('#accompaniment-supervisor'));
        supervisorCb.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new SupervisorAccompanimentToggled());
      });
      it('should dispatch a toggle other accompaniment action when Other is clicked', () => {
        const otherCb = fixture.debugElement.query(By.css('#accompaniment-other'));
        otherCb.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new OtherAccompanimentToggled());
      });
    });

    describe('setting optional vehicle details', () => {
      it('should dispatch a toggle school car action when school car is selected', () => {
        const schoolCarCb = fixture.debugElement.query(By.css('#school-car'));
        schoolCarCb.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new SchoolCarToggled());
      });
      it('should dispatch a toggle dual controls action when dual controls is selected', () => {
        const dualControlCb = fixture.debugElement.query(By.css('#dual-control'));
        dualControlCb.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new DualControlsToggled());
      });
    });

    describe('eyesight failure confirmation', () => {
      it('should dispatch an EyesightPassPressed action when Pass is pressed', () => {
        const passEyesightRadio = fixture.debugElement.query(By.css('#eyesight-pass'));
        passEyesightRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new EyesightPassPressed());
      });
      it('should dispatch an EyesightFailPressed action when Fail is pressed', () => {
        const failEyesightRadio = fixture.debugElement.query(By.css('#eyesight-fail'));
        failEyesightRadio.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(store$.dispatch).toHaveBeenCalledWith(new EyesightFailPressed());
      });
      // tslint:disable-next-line:max-line-length
      it('should hide the rest of the form and show eyesight failure confirmation when page state indicates fail is selected', () => {
        fixture.detectChanges();
        component.pageState.eyesightFailRadioChecked$ = of(true);
        fixture.detectChanges();
        const eyesightFailureConfirmation = fixture.debugElement.query(By.css('eyesight-failure-confirmation'));
        const formAfterEyesight = fixture.debugElement.query(By.css('#post-eyesight-form-content'));
        expect(eyesightFailureConfirmation).toBeTruthy();
        expect(formAfterEyesight.nativeElement.hidden).toBeTruthy();
      });
      // tslint:disable-next-line:max-line-length
      it('should show the rest of the form and not render eyesight failure confirmation when page state indicates pass is selected', () => {
        fixture.detectChanges();
        component.pageState.eyesightPassRadioChecked$ = of(true);
        fixture.detectChanges();
        const eyesightFailureConfirmation = fixture.debugElement.query(By.css('eyesight-failure-confirmation'));
        const formAfterEyesight = fixture.debugElement.query(By.css('#post-eyesight-form-content'));
        expect(eyesightFailureConfirmation).toBeNull();
        expect(formAfterEyesight.nativeElement.hidden).toBeFalsy();
      });
      it('should dispatch an eyesight failure cancelled action when the when the method is called', () => {
        component.eyesightFailCancelled();
        expect(store$.dispatch).toHaveBeenCalledWith(new EyesightFailCancelled());
      });
      it('should dispatch an eyesight failure confirm action when the when the method is called', () => {
        component.eyesightFailConfirmed();
        expect(store$.dispatch).toHaveBeenCalledWith(new EyesightFailConfirmed());
      });
    });
  });
});
