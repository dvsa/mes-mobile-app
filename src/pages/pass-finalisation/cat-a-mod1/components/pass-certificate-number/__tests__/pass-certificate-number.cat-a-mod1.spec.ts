import { PassCertificateNumberCatAMod1Component } from '../pass-certificate-number.cat-a-mod1';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';

describe('PassCertificateNumberCatAMod1Component', () => {
  let fixture: ComponentFixture<PassCertificateNumberCatAMod1Component>;
  let component: PassCertificateNumberCatAMod1Component;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PassCertificateNumberCatAMod1Component,
      ],
      imports: [
        IonicModule,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PassCertificateNumberCatAMod1Component);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
  }));

  describe('Class', () => {
    describe('passCertificateNumberChanged', () => {
      it('should emit pass certificate number if 7 characters and valid', () => {
        spyOn(component.passCertificateNumberChange, 'emit');
        const passCertificateNumber = 'C26754E';
        component.passCertificateNumberChanged(passCertificateNumber);
        expect(component.passCertificateNumberChange.emit).toHaveBeenCalledWith(passCertificateNumber);
      });
    });

    describe('isInvalid', () => {
      it('should return false when the field is valid and not dirty', () => {
        // SETUP
        component.ngOnChanges();
        component.formControl.setValue('C26754E');
        // ACT
        const result: boolean = component.isInvalid();
        // ASSET
        expect(component.formControl.dirty).toEqual(false);
        expect(!component.formControl.valid).toEqual(false);
        expect(result).toEqual(false);
      });

      it('should return false when the field is not valid and is not dirty', () => {
        // SETUP
        component.ngOnChanges();
        component.formControl.setValue('1');
        // ACT
        const result: boolean = component.isInvalid();
        // ASSET
        expect(component.formControl.dirty).toEqual(false);
        expect(!component.formControl.valid).toEqual(true);
        expect(result).toEqual(false);
      });

      it('should return true if the field is empty and is marked as dirty', () => {
        // SETUP
        component.ngOnChanges();
        component.formControl.markAsDirty();
        // ACT
        const result: boolean = component.isInvalid();
        // ASSERT
        expect(component.formControl.dirty).toEqual(true);
        expect(!component.formControl.valid).toEqual(true);
        expect(result).toEqual(true);
      });

      it('should return true if the field has less then 7 characters and is marked as dirty', () => {
        // SETUP
        component.ngOnChanges();
        component.formControl.setValue('1');
        component.formControl.markAsDirty();
        // ACT
        const result: boolean = component.isInvalid();
        // ASSERT
        expect(component.formControl.dirty).toEqual(true);
        expect(!component.formControl.valid).toEqual(true);
        expect(result).toEqual(true);
      });

      it('should return true if the field has more then 7 characters and is marked as dirty', () => {
        // SETUP
        component.ngOnChanges();
        component.formControl.setValue('12345678910');
        component.formControl.markAsDirty();
        // ACT
        const result: boolean = component.isInvalid();
        // ASSERT
        expect(component.formControl.dirty).toEqual(true);
        expect(!component.formControl.valid).toEqual(true);
        expect(result).toEqual(true);
      });
    });
  });
});
