import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { TransmissionComponent } from '../transmission';

describe('transmissionComponent', () => {
  let fixture: ComponentFixture<TransmissionComponent>;
  let component: TransmissionComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransmissionComponent,
      ],
      imports: [
        IonicModule,
      ],
      providers: [
      ],
    })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(TransmissionComponent);
          component = fixture.componentInstance;
          component.form = new FormGroup({});
        });
  }));

  describe('Class', () => {
    describe('TransmissionChanged', () => {
      it('should emit manual if manual transmission selected', () => {
        spyOn(component.gearBoxCategoryChange, 'emit');
        const transmission = 'Manual';
        component.transmissionChanged(transmission);
        expect(component.gearBoxCategoryChange.emit).toHaveBeenCalledWith(transmission);
      });

      it('should emit automatic if automatic transmission selected', () => {
        spyOn(component.gearBoxCategoryChange, 'emit');
        const transmission = 'Automatic';
        component.transmissionChanged(transmission);
        expect(component.gearBoxCategoryChange.emit).toHaveBeenCalledWith(transmission);
      });
    });

    describe('isInvalid', () => {
      it('should validate the field when it is valid', () => {
        component.ngOnChanges();
        component.form.get(TransmissionComponent.fieldName).setValue('Manual');
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
  });
});
