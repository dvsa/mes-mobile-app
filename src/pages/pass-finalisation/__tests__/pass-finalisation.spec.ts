import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { PassFinalisationPage } from '../pass-finalisation';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { MockComponent } from 'ng-mocks';
import { PracticeModeBanner } from '../../../components/common/practice-mode-banner/practice-mode-banner';
import { D255Component } from '../../office/components/d255/d255';
import { LanguagePreferencesComponent } from '../../office/components/language-preference/language-preferences';
import { DebriefWitnessedComponent } from '../../office/components/debrief-witnessed/debrief-witnessed';

describe('PassFinalisationPage', () => {
  let fixture: ComponentFixture<PassFinalisationPage>;
  let component: PassFinalisationPage;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PassFinalisationPage,
        MockComponent(PracticeModeBanner),
        MockComponent(LanguagePreferencesComponent),
        MockComponent(D255Component),
        MockComponent(DebriefWitnessedComponent),
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
        fixture = TestBed.createComponent(PassFinalisationPage);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
      });
  }));

  describe('onSubmit', () => {
    // Unit tests for the components TypeScript class
    it('should dispatch the PersistTests action', () => {
      const form = component.form;
      form.get('provisionalLicenseProvidedCtrl').setValue(true);
      form.get('passCertificateNumberCtrl').setValue('A123456*');
      form.get('transmissionCtrl').setValue('Manual');
      component.onSubmit();
      expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
    });
  });
  describe('formControls', () => {
    it('should contain a maxlength validation error when passCertificateNumberCtrl fails to meet maxlength', () => {
      const formCtrl = component.form.controls['passCertificateNumberCtrl'];
      formCtrl.setValue('A123456B1');
      expect(formCtrl.hasError('maxlength')).toBe(true);
    });
    it('should contain no validation errors when passCertificateNumberCtrl ends with digit', () => {
      const formCtrl = component.form.controls['passCertificateNumberCtrl'];
      formCtrl.setValue('A1234567');
      expect(formCtrl.hasError('maxlength')).toBe(false);
    });
    it('should contain no validation errors when passCertificateNumberCtrl ends with underscore', () => {
      const formCtrl = component.form.controls['passCertificateNumberCtrl'];
      formCtrl.setValue('A123456_');
      expect(formCtrl.hasError('pattern')).toBe(false);
      expect(formCtrl.hasError('maxlength')).toBe(false);
    });
    it('should contain no validation errors when passCertificateNumberCtrl ends with letter', () => {
      const formCtrl = component.form.controls['passCertificateNumberCtrl'];
      formCtrl.setValue('A123456B');
      expect(formCtrl.hasError('pattern')).toBe(false);
      expect(formCtrl.hasError('maxlength')).toBe(false);
    });
  });
});
