import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../../app/app.module';
import { PassFinalisationPage } from '../pass-finalisation';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { PersistTests } from '../../../../modules/tests/tests.actions';
import { MockComponent } from 'ng-mocks';
import { PracticeModeBanner } from '../../../../components/common/practice-mode-banner/practice-mode-banner';
import { TestFinalisationComponentsModule } from '../../components/test-finalisation.module';

describe('PassFinalisationPage', () => {
  let fixture: ComponentFixture<PassFinalisationPage>;
  let component: PassFinalisationPage;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PassFinalisationPage,
        MockComponent(PracticeModeBanner),
      ],
      imports: [IonicModule, AppModule, TestFinalisationComponentsModule],
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
      // note: needs to be a valid pass certificate
      form.get('passCertificateNumberCtrl').setValue('C867544H');
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

  describe('calculateMod37CheckDigit', () => {
    it('should return invalid if second character is not a digit', () => {
      const checkDigit = component.calculateMod37CheckDigit('CX23458');
      expect(checkDigit).toBe('invalid');
    });
  });
  describe('calculateMod37CheckDigit', () => {
    it('should return invalid if third character is not a digit', () => {
      const checkDigit = component.calculateMod37CheckDigit('C1X3458');
      expect(checkDigit).toBe('invalid');
    });
  });
  describe('calculateMod37CheckDigit', () => {
    it('should return invalid if fourth character is not a digit', () => {
      const checkDigit = component.calculateMod37CheckDigit('C12X458');
      expect(checkDigit).toBe('invalid');
    });
  });
  describe('calculateMod37CheckDigit', () => {
    it('should return invalid if fifth character is not a digit', () => {
      const checkDigit = component.calculateMod37CheckDigit('C123X58');
      expect(checkDigit).toBe('invalid');
    });
  });
  describe('calculateMod37CheckDigit', () => {
    it('should return invalid if sixth character is not a digit', () => {
      const checkDigit = component.calculateMod37CheckDigit('C1234X8');
      expect(checkDigit).toBe('invalid');
    });
  });
  describe('calculateMod37CheckDigit', () => {
    it('should return invalid if seventh character is not a digit', () => {
      const checkDigit = component.calculateMod37CheckDigit('C12345X');
      expect(checkDigit).toBe('invalid');
    });
  });
  describe('calculateMod37CheckDigit', () => {
    it('should return a check digit of N if passed C758920', () => {
      const checkDigit = component.calculateMod37CheckDigit('C758920');
      expect(checkDigit).toBe('N');
    });
  });
  describe('calculateMod37CheckDigit', () => {
    it('should return a check digit of W if passed C839255', () => {
      const checkDigit = component.calculateMod37CheckDigit('C839255');
      expect(checkDigit).toBe('W');
    });
  });

  describe('isLetter', () => {
    it('should return true if passed a alpha character', () => {
      const result = component.isLetter('C');
      expect(result).toBeTruthy();
    });
  });
  describe('isLetter', () => {
    it('should return false if passed a numeric character', () => {
      const result = component.isLetter('9');
      expect(result).toBeFalsy();
    });
  });
  describe('isLetter', () => {
    it('should return false if passed a punctuation character', () => {
      const result = component.isLetter('@');
      expect(result).toBeFalsy();
    });
  });

  describe('isPassCertificateValid', () => {
    it('should return false if passed a short certificate', () => {
      const result = component.isPassCertificateValid('C123');
      expect(result).toBeFalsy();
    });
  });
  describe('isPassCertificateValid', () => {
    it('should return false if passed a certificate starting with a non alphabet character', () => {
      const result = component.isPassCertificateValid('1123456X');
      expect(result).toBeFalsy();
    });
  });
  describe('isPassCertificateValid', () => {
    it('should return false if passed a certificate with a letter in place of a number', () => {
      const result = component.isPassCertificateValid('C12X456X');
      expect(result).toBeFalsy();
    });
  });
  describe('isPassCertificateValid', () => {
    it('should return false if passed a certificate with an incorrect check digit', () => {
      const result = component.isPassCertificateValid('C839255T');
      expect(result).toBeFalsy();
    });
  });
  describe('isPassCertificateValid', () => {
    it('should return true if passed a valid certificate', () => {
      const result = component.isPassCertificateValid('C839255W');
      expect(result).toBeTruthy();
    });
  });
  describe('isPassCertificateValid', () => {
    it('should return true if passed a valid certificate with lowercase letters', () => {
      const result = component.isPassCertificateValid('c839255w');
      expect(result).toBeTruthy();
    });
  });

});
