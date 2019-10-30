
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { EventEmitter } from '@angular/core';
import { HealthDeclarationComponent } from '../health-declaration';
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser } from 'ng2-translate';
import { FormGroup } from '@angular/forms';

describe('HealthDeclarationComponent', () => {
  let fixture: ComponentFixture<HealthDeclarationComponent>;
  let component: HealthDeclarationComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HealthDeclarationComponent,
      ],
      imports: [
        IonicModule,
        TranslateModule,
      ],
      providers: [
        TranslateService,
        TranslateLoader,
        TranslateParser,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HealthDeclarationComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    describe('ngOnChanges', () => {
      it('should correctly setup the form control', () => {
        // ARRANGE
        component.formGroup = new FormGroup({});
        component.selected = 'true';
        // ACT
        component.ngOnChanges();
        // ASSERT
        const field = component.formGroup.get(HealthDeclarationComponent.fieldName);
        expect(field).not.toBeNull();
        expect(field.validator).not.toBeNull();
        expect(field.value).toEqual('true');
      });
    });
    describe('healthDeclarationChanged', () => {
      it('should emit a healthDeclarationChange event', () => {
        // ARRANGE
        component.formGroup = new FormGroup({});
        component.ngOnChanges();
        component.healthDeclarationChange = new EventEmitter();
        spyOn(component.healthDeclarationChange, 'emit');

        // ACT
        component.healthDeclarationChanged();
        fixture.detectChanges();

        // ASSERT
        expect(component.healthDeclarationChange.emit).toHaveBeenCalled();
      });
    });
    describe('isInvalid', () => {
      it('should validate the field when it is valid', () => {
        // ARRANGE
        component.formGroup = new FormGroup({});
        component.selected = 'true';
        component.ngOnChanges();
        fixture.detectChanges();
        // ACT
        const result: boolean = component.isInvalid();

        // ASSERT
        expect(result).toEqual(false);
      });
      it('should not validate the field when it is dirty', () => {
        // ARRANGE
        component.formGroup = new FormGroup({});
        component.ngOnChanges();
        component.formControl.markAsDirty();
        fixture.detectChanges();

        // ACT
        const result: boolean = component.isInvalid();

        // ASSERT
        expect(result).toEqual(true);
      });
    });
  });
});
