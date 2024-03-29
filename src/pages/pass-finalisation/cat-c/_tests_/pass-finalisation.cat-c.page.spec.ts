import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { PersistTests } from '../../../../modules/tests/tests.actions';
import { MockComponent } from 'ng-mocks';
import { PassCertificateNumberComponent } from '../../components/pass-certificate-number/pass-certificate-number';
import { LicenseProvidedComponent } from '../../components/license-provided/license-provided';
import { D255Component } from '../../../../components/test-finalisation/d255/d255';
import { DebriefWitnessedComponent } from
  '../../../../components/test-finalisation/debrief-witnessed/debrief-witnessed';
import { LanguagePreferencesComponent } from
  '../../../../components/test-finalisation/language-preference/language-preferences';
import { FinalisationHeaderComponent } from
  '../../../../components/test-finalisation/finalisation-header/finalisation-header';
import { ProvisionalLicenseReceived, ProvisionalLicenseNotReceived, PassCertificateNumberChanged } from
  '../../../../modules/tests/pass-completion/pass-completion.actions';
import {
  PassFinalisationViewDidEnter,
  PassFinalisationValidationError,
} from '../../pass-finalisation.actions';
import { GearboxCategoryChanged } from '../../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { D255Yes, D255No, DebriefWitnessed, DebriefUnwitnessed } from
  '../../../../modules/tests/test-summary/common/test-summary.actions';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish } from
  '../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { PassFinalisationCatCPage } from '../pass-finalisation.cat-c.page';
import { WarningBannerComponent } from '../../../../components/common/warning-banner/warning-banner';
import { TransmissionComponent } from '../../../../components/common/transmission/transmission';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PASS_CERTIFICATE_NUMBER_CTRL }
  from '../../components/pass-certificate-number/pass-certificate-number.constants';
import { Code78Component } from '../../components/code-78/code-78';
import { TransmissionType } from '../../../../shared/models/transmission-type';
import { configureTestSuite } from 'ng-bullet';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { LicenceProvidedWarningBannerComponent } from
    '../../components/licence-provided-warning-banner/licence-provided-warning-banner';

describe('PassFinalisationCatCPage', () => {
  let fixture: ComponentFixture<PassFinalisationCatCPage>;
  let component: PassFinalisationCatCPage;
  let store$: Store<StoreModel>;

  const automaticManualBannerConditions = [
    { category: TestCategory.C,
      code78: true,
      transmission: TransmissionType.Automatic,
      automaticBanner: true,
      manualBanner: false,
      desc: 'Automatic banner shown when automatic transmission and code78 present',
    },
    {
      category: TestCategory.C,
      code78: false,
      transmission: TransmissionType.Automatic,
      automaticBanner: false,
      manualBanner: true,
      desc: 'Manual banner shown when automatic transmission and no code78 present',
    },
    {
      category: TestCategory.C,
      code78: false,
      transmission: TransmissionType.Manual,
      automaticBanner: false,
      manualBanner: true,
      desc: 'Manual banner shown when manual transmission and no code78 present',
    },
    {
      category: TestCategory.C,
      code78: true,
      transmission: TransmissionType.Manual,
      automaticBanner: false,
      manualBanner: true,
      desc: 'Manual banner shown when manual transmission and code78 present',
    },
    {
      category: TestCategory.CE,
      code78: true,
      transmission: TransmissionType.Automatic,
      automaticBanner: true,
      manualBanner: false,
      desc: 'Automatic banner shown when automatic transmission and code78 present',
    },
    {
      category: TestCategory.CE,
      code78: false,
      transmission: TransmissionType.Automatic,
      automaticBanner: false,
      manualBanner: true,
      desc: 'Manual banner shown when automatic transmission and no code78 present',
    },
    {
      category: TestCategory.CE,
      code78: false,
      transmission: TransmissionType.Manual,
      automaticBanner: false,
      manualBanner: true,
      desc: 'Manual banner shown when manual transmission and no code78 present',
    },
    {
      category: TestCategory.CE,
      code78: true,
      transmission: TransmissionType.Manual,
      automaticBanner: false,
      manualBanner: true,
      desc: 'Manual banner shown when manual transmission and code78 present',
    },
    {
      category: TestCategory.C1,
      code78: true,
      transmission: TransmissionType.Automatic,
      automaticBanner: true,
      manualBanner: false,
      desc: 'Automatic banner shown when automatic transmission and code78 present',
    },
    {
      category: TestCategory.C1,
      code78: false,
      transmission: TransmissionType.Automatic,
      automaticBanner: false,
      manualBanner: true,
      desc: 'Manual banner shown when automatic transmission and no code78 present',
    },
    {
      category: TestCategory.C1,
      code78: false,
      transmission: TransmissionType.Manual,
      automaticBanner: false,
      manualBanner: true,
      desc: 'Manual banner shown when manual transmission and no code78 present',
    },
    {
      category: TestCategory.C1,
      code78: true,
      transmission: TransmissionType.Manual,
      automaticBanner: false,
      manualBanner: true,
      desc: 'Manual banner shown when manual transmission and code78 present',
    },
    {
      category: TestCategory.C1E,
      code78: true,
      transmission: TransmissionType.Automatic,
      automaticBanner: true,
      manualBanner: false,
      desc: 'Automatic banner shown when automatic transmission and code78 present',
    },
    {
      category: TestCategory.C1E,
      code78: false,
      transmission: TransmissionType.Automatic,
      automaticBanner: false,
      manualBanner: true,
      desc: 'Manual banner shown when automatic transmission and no code78 present',
    },
    {
      category: TestCategory.C1E,
      code78: false,
      transmission: TransmissionType.Manual,
      automaticBanner: false,
      manualBanner: true,
      desc: 'Manual banner shown when manual transmission and no code78 present',
    },
    {
      category: TestCategory.C1E,
      code78: true,
      transmission: TransmissionType.Manual,
      automaticBanner: false,
      manualBanner: true,
      desc: 'Manual banner shown when manual transmission and code78 present',
    },
  ];

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PassFinalisationCatCPage,
        MockComponent(PassCertificateNumberComponent),
        MockComponent(LicenseProvidedComponent),
        MockComponent(TransmissionComponent),
        MockComponent(D255Component),
        MockComponent(DebriefWitnessedComponent),
        MockComponent(FinalisationHeaderComponent),
        MockComponent(LanguagePreferencesComponent),
        MockComponent(WarningBannerComponent),
        MockComponent(Code78Component),
        MockComponent(LicenceProvidedWarningBannerComponent),
      ],
      imports: [IonicModule, AppModule],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PassFinalisationCatCPage);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    describe('ionViewDidEnter', () => {
      it('should dispatch the VIEW_DID_ENTER action when the function is run', () => {
        component.ionViewDidEnter();
        expect(store$.dispatch).toHaveBeenCalledWith(new PassFinalisationViewDidEnter());
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
    });
    describe('provisionalLicenseReceived', () => {
      it('should dispatch the correct action when called', () => {
        component.provisionalLicenseReceived();
        expect(store$.dispatch).toHaveBeenCalledWith(new ProvisionalLicenseReceived());
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
    });
    describe('provisionalLicenseNotReceived', () => {
      it('should dispatch the correct action when called', () => {
        component.provisionalLicenseNotReceived();
        expect(store$.dispatch).toHaveBeenCalledWith(new ProvisionalLicenseNotReceived());
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
    });
    describe('transmissionChanged', () => {
      it('should dispatch the correct action when called', () => {
        component.transmissionChanged('Manual');
        expect(store$.dispatch).toHaveBeenCalledWith(new GearboxCategoryChanged('Manual'));
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
    });
    describe('passCertificateNumberChanged', () => {
      it('should dispatch the correct action when called', () => {
        component.passCertificateNumberChanged('1e3f5y64');
        expect(store$.dispatch).toHaveBeenCalledWith(new PassCertificateNumberChanged('1e3f5y64'));
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
    });
    describe('d255Changed', () => {
      it('should dispatch the correct action if the inputted value is true', () => {
        component.d255Changed(true);
        expect(store$.dispatch).toHaveBeenCalledWith(new D255Yes());
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
      it('should dispatch the correct action if the inputted value is false', () => {
        component.d255Changed(false);
        expect(store$.dispatch).toHaveBeenCalledWith(new D255No());
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
    });
    describe('debriefWitnessedChanged', () => {
      it('should dispatch the correct action if the inputted value is true', () => {
        component.debriefWitnessedChanged(true);
        expect(store$.dispatch).toHaveBeenCalledWith(new DebriefWitnessed());
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
      it('should dispatch the correct action if the inputted value is false', () => {
        component.debriefWitnessedChanged(false);
        expect(store$.dispatch).toHaveBeenCalledWith(new DebriefUnwitnessed());
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
    });
    describe('isWelshChanged', () => {
      it('should dispatch the correct action if the isWelsh flag is true', () => {
        component.isWelshChanged(true);
        expect(store$.dispatch).toHaveBeenCalledWith(new CandidateChoseToProceedWithTestInWelsh('Cymraeg'));
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
      it('should dispatch the correct action if the isWelsh flag is false', () => {
        component.isWelshChanged(false);
        expect(store$.dispatch).toHaveBeenCalledWith(new CandidateChoseToProceedWithTestInEnglish('English'));
        expect(store$.dispatch).toHaveBeenCalledTimes(1);
      });
    });
    describe('onSubmit', () => {
      // Unit tests for the components TypeScript class
      it('should dispatch the PersistTests action', () => {
        component.onSubmit();
        expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
      });

      it('should dispatch the appropriate ValidationError actions', fakeAsync(() => {
        component.form = new FormGroup({
          requiredControl1: new FormControl(null, [Validators.required]),
          requiredControl2: new FormControl(null, [Validators.required]),
          [PASS_CERTIFICATE_NUMBER_CTRL]: new FormControl(null, [Validators.required]),
          notRequiredControl: new FormControl(null),
        });

        component.onSubmit();
        tick();
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new PassFinalisationValidationError('requiredControl1 is blank'));
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new PassFinalisationValidationError('requiredControl2 is blank'));
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new PassFinalisationValidationError(`${PASS_CERTIFICATE_NUMBER_CTRL} is invalid`));
        expect(store$.dispatch)
          .not
          .toHaveBeenCalledWith(new PassFinalisationValidationError('notRequiredControl is blank'));
      }));
    });

    automaticManualBannerConditions.forEach((cat) => {
      it(`${cat.desc} (${cat.category})`, () => {
        component.transmission = cat.transmission;
        component.code78Present = cat.code78;
        component.testCategory = cat.category;
        expect(component.shouldShowAutomaticBanner()).toEqual(cat.automaticBanner);
        expect(component.shouldShowManualBanner()).toEqual(cat.manualBanner);

      });
    });

    describe('shouldHideBanner', () => {
      it('should hide banner when only transmission is selected', () => {
        component.transmission = TransmissionType.Manual;
        expect(component.shouldShowCode78Banner()).toEqual(false);
      });
    });
  });
});
