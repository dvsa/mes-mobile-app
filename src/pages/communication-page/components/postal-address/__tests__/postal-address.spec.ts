import { PostalAddressComponent } from '../postal-address';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { AppModule, createTranslateLoader } from '../../../../../app/app.module';
import { ComponentsModule } from '../../../../../components/components.module';
import {
  initialState as preTestDeclarationInitialState,
} from '../../../../../modules/tests/pre-test-declarations/pre-test-declarations.reducer';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader, TranslateService } from 'ng2-translate';
import { Http } from '@angular/http';
import * as welshTranslations from '../../../../../assets/i18n/cy.json';

describe('PostalAddressComponent', () => {
  let fixture: ComponentFixture<PostalAddressComponent>;
  let component: PostalAddressComponent;
  let store$: Store<StoreModel>;
  let translate: TranslateService;

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
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [Http],
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
        fixture = TestBed.createComponent(PostalAddressComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
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

    describe('i18n', () => {
      it('should render the component in English by default', () => {
        component.isPostalAddressChosen = true;
        component.postalAddress = mockAddress;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.communication-text')).nativeElement.innerHTML.trim())
          .toBe('The following postal address was used when booking the test:');
      });
      it('should render the component in Welsh when its a Welsh test', (done) => {
        component.isPostalAddressChosen = true;
        component.postalAddress = mockAddress;
        translate.use('cy').subscribe(() => {
          fixture.detectChanges();
          expect(fixture.debugElement.query(By.css('.communication-text')).nativeElement.innerHTML.trim())
            .toBe(`${(<any>welshTranslations).communication.byPostDescription}:`);
          done();
        });
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
