import { PassCertificateNumberComponent } from '../pass-certificate-number';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';

describe('passCertificateNumberComponent', () => {
  let fixture: ComponentFixture<PassCertificateNumberComponent>;
  let component: PassCertificateNumberComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PassCertificateNumberComponent,
      ],
      imports: [
        IonicModule,
      ],
      providers: [
      ],
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(PassCertificateNumberComponent);
      component = fixture.componentInstance;
      component.form = new FormGroup({});
    });
  }));

  describe('Class', () => {
    describe('passCertificateNumberChanged', () => {
      it('should emit pass certificate number if 8 characters', () => {
        spyOn(component.passCertificateNumberChange, 'emit');
        const passCertificateNumber = '12345678';
        component.passCertificateNumberChanged(passCertificateNumber);
        expect(component.passCertificateNumberChange.emit).toHaveBeenCalledWith(passCertificateNumber);
      });
    });

    describe('isInvalid', () => {
      it('should return false when the field is valid and not dirty', () => {
        // SETUP
        component.ngOnChanges();
        component.formControl.setValue('12345678');
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
      it('should return false when the field is valid and is dirty', () => {
        // SETUP
        component.ngOnChanges();
        component.formControl.setValue('12345678');
        component.formControl.markAsDirty();
        // ACT
        const result: boolean = component.isInvalid();
        // ASSET
        expect(component.formControl.dirty).toEqual(true);
        expect(!component.formControl.valid).toEqual(false);
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
      it('should return true if the field has less then 8 characters and is marked as dirty', () => {
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
      it('should return true if the field has more then 8 characters and is marked as dirty', () => {
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
