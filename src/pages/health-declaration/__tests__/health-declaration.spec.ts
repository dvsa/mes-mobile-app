import { ComponentFixture, async, TestBed, fakeAsync } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, AlertController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, AlertControllerMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { HealthDeclarationPage } from '../health-declaration';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { ComponentsModule } from './../../../components/components.module';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { HealthDeclarationViewDidEnter } from '../health-declaration.actions';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import {
  DeviceAuthenticationProviderMock,
} from '../../../providers/device-authentication/__mocks__/device-authentication.mock';
import * as postTestDeclarationsActions
  from '../../../modules/tests/post-test-declarations/post-test-declarations.actions';
import * as passCompletionActions
  from '../../../modules/tests/pass-completion/pass-completion.actions';
import { of } from 'rxjs/observable/of';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { By } from '@angular/platform-browser';
import { PopulateTestSlotAttributes } from '../../../modules/tests/test-slot-attributes/test-slot-attributes.actions';
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/B';
import { Subscription } from 'rxjs/Subscription';

const mockCandidate = {
  driverNumber: '123',
  candidateName: {
    firstName: 'Joe',
    lastName: 'Bloggs',
  },
};

describe('HealthDeclarationPage', () => {
  let fixture: ComponentFixture<HealthDeclarationPage>;
  let component: HealthDeclarationPage;
  let store$: Store<StoreModel>;
  let deviceAuthenticationProvider: DeviceAuthenticationProvider;
  let translate: TranslateService;

  const testSlotAttributes: TestSlotAttributes = {
    welshTest: false,
    extendedTest: false,
    slotId: 123,
    specialNeeds: false,
    start: '',
    vehicleTypeCode: '',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HealthDeclarationPage],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                postTestDeclarations: {
                  healthDeclarationAccepted: false,
                  passCertificateNumberReceived: false,
                  postTestSignature: '',
                },
                journalData: {
                  testSlotAttributes,
                  candidate: mockCandidate,
                },
              },
            },
          }),
        }),
        TranslateModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: DeviceAuthenticationProvider, useClass: DeviceAuthenticationProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HealthDeclarationPage);
        component = fixture.componentInstance;
        deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch').and.callThrough();
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
        component.subscription = new Subscription();
        store$.dispatch(new passCompletionActions.PopulatePassCompletion()); // Will have been dispatched by prior page
      });

  }));

  describe('Class', () => {
    describe('ionViewDidEnter', () => {
      it('should dispatch HealthDeclarationViewDidEnter', () => {
        component.ionViewDidEnter();
        expect(store$.dispatch).toHaveBeenCalledWith(new HealthDeclarationViewDidEnter());
      });
      describe('clickBack', () => {
        it('should should trigger the lock screen', () => {
          component.clickBack();
          expect(deviceAuthenticationProvider.triggerLockScreen).toHaveBeenCalled();
        });
      });

      describe('Declaration Validation', () => {
        it('form should only be valid when all fields are set', () => {
          const form = component.form;
          form.get('healthCheckboxCtrl').setValue(true);
          expect(form.get('healthCheckboxCtrl').status).toEqual('VALID');
          form.get('receiptCheckboxCtrl').setValue(true);
          expect(form.get('receiptCheckboxCtrl').status).toEqual('VALID');
          expect(form.valid).toEqual(false);
          form.get('signatureAreaCtrl').setValue('any date you like.');
          expect(form.get('signatureAreaCtrl').status).toEqual('VALID');
          expect(form.valid).toEqual(true);
        });
      });
      describe('healthDeclarationChanged', () => {
        it('should dispatch a ToggleHealthDeclaration action', () => {
          component.healthDeclarationChanged();
          expect(store$.dispatch).toHaveBeenCalledWith(new postTestDeclarationsActions.ToggleHealthDeclaration());
        });
      });
      describe('receiptDeclarationChanged', () => {
        it('should dispatch a ToggleReceiptDeclaration action', () => {
          component.receiptDeclarationChanged();
          expect(store$.dispatch).toHaveBeenCalledWith(new postTestDeclarationsActions.ToggleReceiptDeclaration());
        });
      });

      describe('persistAndNavigate', () => {
        it('should dispatch a ProvisionalLicenseNotReceived if passed true and licenseProvided is true', () => {
          component.licenseProvided = true;
          component.persistAndNavigate(true);
          expect(store$.dispatch).not.toHaveBeenCalledWith(new passCompletionActions.ProvisionalLicenseNotReceived());
        });
      });
    });
    describe('onSubmit', () => {
      it('should call the persist and navigate method if all fields set', fakeAsync(() => {
        spyOn(component, 'persistAndNavigate');
        const form = component.form;
        fixture.detectChanges();
        component.pageState.healthDeclarationAccepted$ = of(true);
        component.pageState.passCertificateNumberReceived$ = of(true);
        component.pageState.signature$ = of('sig');
        component.rehydrateFields();
        component.healthDeclarationAccepted = true;
        component.onSubmit();
        fixture.detectChanges();
        expect(form.valid).toEqual(true);
        expect(component.persistAndNavigate).toHaveBeenCalled();
      }));

      it('should show the confirmation modal if health checkbox not set', fakeAsync(() => {
        spyOn(component, 'showConfirmHealthDeclarationModal');
        const form = component.form;
        fixture.detectChanges();
        component.pageState.healthDeclarationAccepted$ = of(false);
        component.pageState.passCertificateNumberReceived$ = of(true);
        component.pageState.signature$ = of('sig');
        component.rehydrateFields();
        component.onSubmit();
        fixture.detectChanges();
        expect(form.valid).toEqual(true);
        expect(component.showConfirmHealthDeclarationModal).toHaveBeenCalled();
      }));

    });
    describe('rehydrateFields', () => {
      it('should set the field values from the page state', () => {
        const form = component.form;

        form.get('healthCheckboxCtrl').setValue(null);
        form.get('receiptCheckboxCtrl').setValue(null);
        form.get('signatureAreaCtrl').setValue(null);

        fixture.detectChanges();

        component.pageState.healthDeclarationAccepted$ = of(true);
        component.pageState.passCertificateNumberReceived$ = of(true);
        component.pageState.signature$ = of('abc123');

        component.rehydrateFields();
        fixture.detectChanges();

        expect(form.get('healthCheckboxCtrl').value).toEqual(true);
        expect(form.get('receiptCheckboxCtrl').value).toEqual(true);
        expect(form.get('signatureAreaCtrl').value).toEqual('abc123');
      });
    });
  });

  describe('DOM', () => {
    describe('multi language support', () => {
      it('should render the page in English by default', () => {
        fixture.detectChanges();
        const declarationIntent = fixture.debugElement.query(By.css('h4')).nativeElement;
        expect(declarationIntent.innerHTML).toBe('I declare that:');
      });
      it('should render the page in Welsh for a Welsh test', (done) => {
        fixture.detectChanges();
        component.isBookedInWelsh = true;
        component.configureI18N(true);
        translate.onLangChange.subscribe(() => {
          fixture.detectChanges();
          const declarationIntent = fixture.debugElement.query(By.css('h4')).nativeElement;
          expect(declarationIntent.innerHTML).toBe('[CY] I declare that:');
          done();
        });
        store$.dispatch(new PopulateTestSlotAttributes({ ...testSlotAttributes, welshTest: true }));
      });
    });
  });
});
