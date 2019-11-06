import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { PassFinalisationCatBPage } from '../pass-finalisation.cat-b.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { PersistTests } from '../../../../modules/tests/tests.actions';
import { MockComponent } from 'ng-mocks';
import { PracticeModeBanner } from '../../../../components/common/practice-mode-banner/practice-mode-banner';
import { D255Component } from '../../../../components/test-finalisation/d255/d255';
import { DebriefWitnessedComponent } from
  '../../../../components/test-finalisation/debrief-witnessed/debrief-witnessed';
import { LanguagePreferencesComponent } from
  '../../../../components/test-finalisation/language-preference/language-preferences';
import { FinalisationHeaderComponent } from
  '../../../../components/test-finalisation/finalisation-header/finalisation-header';
import { PassFinalisationViewDidEnter } from '../../pass-finalisation.actions';
import { ProvisionalLicenseReceived, ProvisionalLicenseNotReceived, PassCertificateNumberChanged } from
  '../../../../modules/tests/pass-completion/pass-completion.actions';
import { GearboxCategoryChanged } from '../../../../modules/tests/vehicle-details/vehicle-details.actions';
import { D255Yes, D255No, DebriefWitnessed, DebriefUnwitnessed } from
  '../../../../modules/tests/test-summary/test-summary.actions';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish } from
  '../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { PassCertificateNumberComponent } from '../../components/pass-certificate-number/pass-certificate-number';
import { LicenseProvidedComponent } from '../../components/license-provided/license-provided';
import { TransmissionComponent } from '../../../../components/test-finalisation/transmission/transmission';

describe('PassFinalisationCatBPage', () => {
  let fixture: ComponentFixture<PassFinalisationCatBPage>;
  let component: PassFinalisationCatBPage;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PassFinalisationCatBPage,
        MockComponent(PracticeModeBanner),
        MockComponent(PassCertificateNumberComponent),
        MockComponent(LicenseProvidedComponent),
        MockComponent(TransmissionComponent),
        MockComponent(D255Component),
        MockComponent(DebriefWitnessedComponent),
        MockComponent(FinalisationHeaderComponent),
        MockComponent(LanguagePreferencesComponent),
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
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PassFinalisationCatBPage);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
      });
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
    });
  });
});
