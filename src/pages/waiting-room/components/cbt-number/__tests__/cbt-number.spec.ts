
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { FormGroup } from '@angular/forms';
import { CBTNumberComponent } from '../cbt-number';
import { configureTestSuite } from 'ng-bullet';

describe('CBTNumberComponent', () => {
  let fixture: ComponentFixture<CBTNumberComponent>;
  let component: CBTNumberComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CBTNumberComponent,
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CBTNumberComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({});
  }));

  describe('Class', () => {
    describe('cbtNumberChanged', () => {
      it('It should emit a cbt number if the characters only contain numbers', () => {
        spyOn(component.cbtNumberChange, 'emit');
        const cbtNumber = '12345678';
        component.cbtNumberChanged(cbtNumber);
        expect(component.cbtNumberChange.emit).toHaveBeenCalledWith(cbtNumber);
      });
    });

    describe('invalid', () => {
      it('should validate the field when it is valid', () => {
        component.cbtNumber = '12345678';
        component.ngOnChanges();
        const result: boolean = component.invalid();
        expect(result).toEqual(false);
      });
      it('should validate the field when it is empty', () => {
        component.cbtNumber = '';
        component.ngOnChanges();
        const result: boolean = component.invalid();
        expect(result).toEqual(false);
      });
    });
  });
});
