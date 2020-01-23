import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { LicenseProvidedComponent } from '../license-provided';
import { configureTestSuite } from 'ng-bullet';

describe('licenseProvidedComponent', () => {
  let fixture: ComponentFixture<LicenseProvidedComponent>;
  let component: LicenseProvidedComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        LicenseProvidedComponent,
      ],
      imports: [
        IonicModule,
      ],
      providers: [
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LicenseProvidedComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
  }));

  describe('Class', () => {
    describe('ProvisionalLicenseReceived', () => {
      it('should emit license received if license received is selected', () => {
        spyOn(component.licenseReceived, 'emit');
        component.provisionalLicenseReceived();
        expect(component.licenseReceived.emit).toHaveBeenCalled();
      });
    });

    describe('ProvisionalLicneseNotReceived', () => {
      it('should emit license not received if license not received is selected', () => {
        spyOn(component.licenseNotReceived, 'emit');
        component.provisionalLicenseNotReceived();
        expect(component.licenseNotReceived.emit).toHaveBeenCalled();
      });
    });

    describe('isInvalid', () => {
      it('should validate the field when it is valid', () => {
        component.license = true;
        component.ngOnChanges();
        fixture.detectChanges();
        const result: boolean = component.isInvalid();
        expect(result).toEqual(false);
      });

      it('should not validate the field when it is dirty', () => {
        component.license = null;
        component.ngOnChanges();
        component.formControl.markAsDirty();
        fixture.detectChanges();
        const result: boolean = component.isInvalid();
        expect(result).toEqual(true);
      });
    });
  });
});
