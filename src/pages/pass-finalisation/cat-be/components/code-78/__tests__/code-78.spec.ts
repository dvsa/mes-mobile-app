import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { Code78Component } from '../code-78';
import { MockComponent } from 'ng-mocks';
import { WarningBannerComponent } from '../../../../../../components/common/warning-banner/warning-banner';
import { TestCategory } from '../../../../../../shared/models/test-category';
import { TransmissionType } from '../../../../../../shared/models/transmission-type';

describe('code78Component', () => {
  let fixture: ComponentFixture<Code78Component>;
  let component: Code78Component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Code78Component,
        MockComponent(WarningBannerComponent),
      ],
      imports: [
        IonicModule,
      ],
      providers: [
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(Code78Component);
        component = fixture.componentInstance;
        component.form = new FormGroup({});
      });
  }));

  describe('Class', () => {
    describe('Code78Present', () => {
      it('should emit code 78 present if code 78 is present is selected', () => {
        spyOn(component.code78Present, 'emit');
        component.code78IsPresent();
        expect(component.code78Present.emit).toHaveBeenCalled();
      });
    });

    describe('Code78NotPresent', () => {
      it('should emit code 78 not present if code 78 is not present is selected', () => {
        spyOn(component.code78NotPresent, 'emit');
        component.code78IsNotPresent();
        expect(component.code78NotPresent.emit).toHaveBeenCalled();
      });
    });

    describe('isInvalid', () => {
      it('should validate the field when it is valid', () => {
        component.ngOnChanges();
        component.form.get(Code78Component.fieldName).setValue('yes');
        fixture.detectChanges();
        const result: boolean = component.isInvalid();
        expect(result).toEqual(false);
      });

      it('should not validate the field when it is dirty', () => {
        component.ngOnChanges();
        component.formControl.markAsDirty();
        fixture.detectChanges();
        const result: boolean = component.isInvalid();
        expect(result).toEqual(true);
      });
    });

    describe('showAutomaticBanner', () => {
      it('should show the automatic banner when it is valid', () => {
        component.ngOnChanges();
        component.category = TestCategory.BE;
        component.transmission = TransmissionType.Automatic;
        component.form.get(Code78Component.fieldName).setValue('yes');
        fixture.detectChanges();
        expect(component.shouldShowAutomaticBanner()).toEqual(true);
      });
    });

    describe('should show manual banner', () => {
      it('should show the manual banner when it is valid', () => {
        component.ngOnChanges();
        component.category = TestCategory.BE;
        component.transmission = TransmissionType.Manual;
        component.form.get(Code78Component.fieldName).setValue('yes');
        fixture.detectChanges();
        expect(component.shouldShowManualBanner()).toEqual(true);
      });
    });

    describe('shouldHideBanner', () => {
      it('should hide banner when only transmission is selected', () => {
        component.ngOnChanges();
        component.transmission = TransmissionType.Manual;
        fixture.detectChanges();
        expect(component.shouldHideBanner()).toEqual(true);
      });

      it('should hide banner when only code78 is selected', () => {
        component.ngOnChanges();
        component.form.get(Code78Component.fieldName).setValue('yes');
        fixture.detectChanges();
        expect(component.shouldHideBanner()).toEqual(true);
      });

      it('should hide banner nothing is selected', () => {
        component.ngOnChanges();
        component.formControl.markAsDirty();
        fixture.detectChanges();
        expect(component.shouldHideBanner()).toEqual(true);
      });
    });
  });
});
