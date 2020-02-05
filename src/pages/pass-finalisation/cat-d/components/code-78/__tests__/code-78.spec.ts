import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { Code78Component } from '../code-78';
import { MockComponent } from 'ng-mocks';
import { WarningBannerComponent } from '../../../../../../components/common/warning-banner/warning-banner';
import { configureTestSuite } from 'ng-bullet';

describe('code78Component', () => {
  let fixture: ComponentFixture<Code78Component>;
  let component: Code78Component;

  configureTestSuite(() => {
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
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Code78Component);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
  }));

  describe('Class', () => {
    describe('Code78Present', () => {
      it('should emit code 78 present if code 78 is present is selected', () => {
        spyOn(component.code78Present, 'emit');
        component.code78IsPresent();
        expect(component.code78Present.emit).toHaveBeenCalledWith(true);
      });
    });

    describe('Code78NotPresent', () => {
      it('should emit code 78 not present if code 78 is not present is selected', () => {
        spyOn(component.code78Present, 'emit');
        component.code78IsNotPresent();
        expect(component.code78Present.emit).toHaveBeenCalledWith(false);
      });
    });

    describe('isInvalid', () => {
      it('should validate the field when it is valid', () => {
        component.code78 = true;
        component.ngOnChanges();
        fixture.detectChanges();
        const result: boolean = component.isInvalid();
        expect(result).toEqual(false);
      });

      it('should not validate the field when it is dirty', () => {
        component.code78 = null;
        component.ngOnChanges();
        component.formControl.markAsDirty();
        fixture.detectChanges();
        const result: boolean = component.isInvalid();
        expect(result).toEqual(true);
      });
    });

  });
});
