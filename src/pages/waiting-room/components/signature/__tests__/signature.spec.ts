
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser } from 'ng2-translate';
import { FormGroup } from '@angular/forms';
import { SignatureComponent } from '../signature';
import { MockComponent } from 'ng-mocks';
import { SignatureAreaComponent } from '../../../../../components/common/signature-area/signature-area';

describe('SignatureComponent', () => {
  let fixture: ComponentFixture<SignatureComponent>;
  let component: SignatureComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignatureComponent,
        MockComponent(SignatureAreaComponent),
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
        fixture = TestBed.createComponent(SignatureComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    describe('ngOnChanges', () => {
      it('should correctly setup the form control', () => {
        // ARRANGE
        component.formGroup = new FormGroup({});
        component.signature = 'abcdefg';
        // ACT
        component.ngOnChanges();
        // ASSERT
        const field = component.formGroup.get(SignatureComponent.fieldName);
        expect(field).not.toBeNull();
        expect(field.validator).not.toBeNull();
        expect(field.value).toEqual('abcdefg');
      });
    });
    describe('isInvalid', () => {
      it('should validate the field when it is valid', () => {
        // ARRANGE
        component.formGroup = new FormGroup({});
        component.signature = 'test data';
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
