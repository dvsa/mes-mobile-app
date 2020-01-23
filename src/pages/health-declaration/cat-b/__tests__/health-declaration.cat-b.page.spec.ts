import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, AlertController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, AlertControllerMock } from 'ionic-mocks';

import { AppModule } from '../../../../app/app.module';
import { HealthDeclarationCatBPage } from '../health-declaration.cat-b.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import {
  HealthDeclarationViewDidEnter,
  HealthDeclarationValidationError,
} from '../../health-declaration.actions';
import { DeviceAuthenticationProvider } from '../../../../providers/device-authentication/device-authentication';
import {
  DeviceAuthenticationProviderMock,
} from '../../../../providers/device-authentication/__mocks__/device-authentication.mock';
import * as postTestDeclarationsActions
  from '../../../../modules/tests/post-test-declarations/post-test-declarations.actions';
import * as passCompletionActions
  from '../../../../modules/tests/pass-completion/pass-completion.actions';
import { of } from 'rxjs/observable/of';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { By } from '@angular/platform-browser';
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/common';
import { Subscription } from 'rxjs/Subscription';
import * as welshTranslations from '../../../../assets/i18n/cy.json';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { MockComponent } from 'ng-mocks';
import { Language } from '../../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../../shared/helpers/translation.helpers';
import { SignatureComponent } from '../../components/signature/signature';
import { HealthDeclarationComponent } from '../../components/health-declaration/health-declaration';
import { ReceiptDeclarationComponent } from '../../components/receipt-declaration/receipt-declaration';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';

describe('HealthDeclarationCatBPage', () => {
  let fixture: ComponentFixture<HealthDeclarationCatBPage>;
  let component: HealthDeclarationCatBPage;
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

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        HealthDeclarationCatBPage,
        MockComponent(SignatureComponent),
        MockComponent(HealthDeclarationComponent),
        MockComponent(ReceiptDeclarationComponent),
      ],
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
                  candidate: candidateMock,
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
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HealthDeclarationCatBPage);
    component = fixture.componentInstance;
    deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch').and.callThrough();
    translate = TestBed.get(TranslateService);
    translate.setDefaultLang('en');
    component.subscription = new Subscription();
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
        component.pageState.receiptDeclarationAccepted$ = of(true);
        component.pageState.signature$ = of('sig');
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
        component.pageState.receiptDeclarationAccepted$ = of(true);
        component.pageState.signature$ = of('sig');
        component.onSubmit();
        fixture.detectChanges();
        expect(form.valid).toEqual(true);
        expect(component.showConfirmHealthDeclarationModal).toHaveBeenCalled();
      }));

      it('should dispatch the appropriate ValidationError actions', fakeAsync(() => {
        component.form = new FormGroup({
          requiredControl1: new FormControl(null, [Validators.required]),
          requiredControl2: new FormControl(null, [Validators.required]),
          notRequiredControl: new FormControl(null),
        });

        component.onSubmit();
        tick();
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new HealthDeclarationValidationError('requiredControl1 is blank'));
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new HealthDeclarationValidationError('requiredControl2 is blank'));
        expect(store$.dispatch)
          .not
          .toHaveBeenCalledWith(new HealthDeclarationValidationError('notRequiredControl is blank'));
      }));
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
        configureI18N(Language.CYMRAEG, translate);
        translate.onLangChange.subscribe(() => {
          fixture.detectChanges();
          const declarationIntent = fixture.debugElement.query(By.css('h4')).nativeElement;
          expect(declarationIntent.innerHTML)
            .toBe(`${(<any>welshTranslations).healthDeclaration.declarationIntent}:`);
          done();
        });
      });
    });
  });
});
