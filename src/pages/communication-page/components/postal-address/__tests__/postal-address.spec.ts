import { PostalAddressComponent } from '../postal-address';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { DeviceProvider } from '../../../../../providers/device/device';
import { DeviceAuthenticationProvider } from '../../../../../providers/device-authentication/device-authentication';
import { Insomnia } from '@ionic-native/insomnia';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { ComponentsModule } from '../../../../../components/components.module';
import {
  initialState as preTestDeclarationInitialState,
} from '../../../../../modules/tests/pre-test-declarations/pre-test-declarations.reducer';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../../providers/authentication/__mocks__/authentication.mock';
import { DeviceProviderMock } from '../../../../../providers/device/__mocks__/device.mock';
import {
  DeviceAuthenticationProviderMock,
} from '../../../../../providers/device-authentication/__mocks__/device-authentication.mock';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { InsomniaMock } from '../../../../../shared/mocks/insomnia.mock';
import { By } from '@angular/platform-browser';

describe('PostalAddressComponent', () => {
  let fixture: ComponentFixture<PostalAddressComponent>;
  let component: PostalAddressComponent;
  let store$: Store<StoreModel>;

  const mockAddress = {
    addressLine1: '1 Somewhere',
    addressLine2: '2 Someplace',
    addressLine3: '3 Sometown',
    addressLine4: '4 Somecity',
    addressLine5: '5 Somecountry',
    postcode: 'AB12 3CD',
  };

  const mockCandidate = {
    driverNumber: '123',
    candidateName: {
      firstName: 'Joe',
      lastName: 'Blogs',
    },
    emailAddress: 'testemail@mes',
    candidateAddress: mockAddress,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostalAddressComponent,
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
              journalData: {
                candidate: mockCandidate,
              },
              communicationPreferences: {
                updatedEmail: '',
                communicationMethod: 'Post',
              },
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
        { provide: Insomnia, useClass: InsomniaMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PostalAddressComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
      });

  }));

  describe('DOM', () => {

    it('should display the correct address fields when address populated', () => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('#addressLine1'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('#addressLine2'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('#addressLine3'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('#addressLine4'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('#addressLine5'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('#postcode'))).not.toBeNull();
      });
    });

    it('should display the no address fields when address is empty', () => {
      component.postalAddress = null;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('#addressLine1'))).toBeNull();
        expect(fixture.debugElement.query(By.css('#addressLine2'))).toBeNull();
        expect(fixture.debugElement.query(By.css('#addressLine3'))).toBeNull();
        expect(fixture.debugElement.query(By.css('#addressLine4'))).toBeNull();
        expect(fixture.debugElement.query(By.css('#addressLine5'))).toBeNull();
        expect(fixture.debugElement.query(By.css('#postcode'))).toBeNull();
      });
    });
  });

  describe('formatAddress', () => {
    it('should replace all numbers with x`s', () => {
      const formatted = component.formatAddress(mockAddress);
      expect(formatted.addressLine1).toEqual('x Somewhere');
      expect(formatted.addressLine2).toEqual('x Someplace');
      expect(formatted.addressLine3).toEqual('x Sometown');
      expect(formatted.addressLine4).toEqual('x Somecity');
      expect(formatted.addressLine5).toEqual('x Somecountry');
      expect(formatted.postcode).toEqual('ABxx xCD');
    });
  });

});
