import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CommunicationPage } from '../communication';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { DeviceProvider } from '../../../providers/device/device';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import { Insomnia } from '@ionic-native/insomnia';
import { AppModule } from '../../../app/app.module';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { ComponentsModule } from '../../../components/components.module';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DeviceProviderMock } from '../../../providers/device/__mocks__/device.mock';
import { ScreenOrientation } from '@ionic-native/screen-orientation'; import {
  initialState as preTestDeclarationInitialState,
} from '../../../modules/tests/pre-test-declarations/pre-test-declarations.reducer';
import {
  DeviceAuthenticationProviderMock,
} from '../../../providers/device-authentication/__mocks__/device-authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { ScreenOrientationMock } from '../../../shared/mocks/screen-orientation.mock';
import { InsomniaMock } from '../../../shared/mocks/insomnia.mock';
import { ProvidedEmailComponent } from '../components/provided-email/provided-email';
import { NewEmailComponent } from '../components/new-email/new-email';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

describe('CommunicationPage', () => {
  let fixture: ComponentFixture<CommunicationPage>;
  let component: CommunicationPage;
  let store$: Store<StoreModel>;
  let deviceProvider: DeviceProvider;
  let deviceAuthenticationProvider: DeviceAuthenticationProvider;
  let screenOrientation: ScreenOrientation;
  let insomnia: Insomnia;

  const mockCandidate = {
    driverNumber: '123',
    candidateName: {
      firstName: 'Joe',
      lastName: 'Blogs',
    },
    emailAddress: 'testemail@mes',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommunicationPage,
        ProvidedEmailComponent,
        NewEmailComponent,
      ],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        StoreModule.forFeature('tests', () => ({
          currentTest: {
            slotId: '123',
          },
          testLifecycles: {},
          startedTests: {
            123: {
              preTestDeclarations: preTestDeclarationInitialState,
              postTestDeclarations: {
                healthDeclarationAccepted: false,
                passCertificateNumberReceived: false,
                postTestSignature: '',
              },
            },
            journalData: {
              candidate: mockCandidate,
            },
          },
        })),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DeviceProvider, useClass: DeviceProviderMock },
        { provide: DeviceAuthenticationProvider, useClass: DeviceAuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },
        { provide: Insomnia, useClass: InsomniaMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CommunicationPage);
        component = fixture.componentInstance;
        deviceProvider = TestBed.get(DeviceProvider);
        screenOrientation = TestBed.get(ScreenOrientation);
        insomnia = TestBed.get(Insomnia);
        deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
        component.subscription = new Subscription();
      });

  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('Changing preferred email', () => {
      it('should display the provided email input when selected', () => {
        fixture.whenStable().then(() => {
          const providedEmail = fixture.debugElement.query(By.css('#providedEmail'));
          providedEmail.triggerEventHandler('click', null);
          expect(fixture.debugElement.query(By.css('#providedEmailInput'))).toBeDefined();
        });
      });
      it('should display the new email input when selected', () => {
        const newEmail = fixture.debugElement.query(By.css('#newEmail'));
        newEmail.triggerEventHandler('click', null);
        expect(fixture.debugElement.query(By.css('#newEmailInput'))).toBeDefined();
      });
    });

    describe('ionViewDidEnter', () => {
      it('should enable single app mode if on ios', () => {
        component.ionViewDidEnter();
        expect(deviceProvider.enableSingleAppMode).toHaveBeenCalled();
      });

      it('should lock the screen orientation to Portrait Primary', () => {
        component.ionViewDidEnter();
        expect(screenOrientation.lock)
          .toHaveBeenCalledWith(screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      });

      it('should keep the device awake', () => {
        component.ionViewDidEnter();
        expect(insomnia.keepAwake).toHaveBeenCalled();
      });

    });
  });

  describe('clickBack', () => {
    it('should should trigger the lock screen', () => {
      component.clickBack();
      expect(deviceAuthenticationProvider.triggerLockScreen).toHaveBeenCalled();
    });
  });
});
