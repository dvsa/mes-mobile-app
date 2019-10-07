
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TransmissionComponent } from '../transmission';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { AppModule } from '../../../../../../app/app.module';

describe('TransmissionComponent', () => {
  let fixture: ComponentFixture<TransmissionComponent>;
  let component: TransmissionComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransmissionComponent,
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TransmissionComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
      });
  }));

  describe('DOM', () => {
    describe('changing transmission', () => {
      it('should call transmissionChanged with Manual when manual is clicked', () => {
        spyOn(component, 'transmissionChanged');
        component.ngOnChanges();
        fixture.detectChanges();
        const manualRadio = fixture.debugElement.query(By.css('#transmission-manual'));
        manualRadio.triggerEventHandler('change', { target: { value: 'Manual' } });
        fixture.detectChanges();
        expect(component.transmissionChanged).toHaveBeenCalledWith('Manual');
      });
      it('should call transmissionChanged with Automatic when automatic is clicked', () => {
        spyOn(component, 'transmissionChanged');
        component.ngOnChanges();
        fixture.detectChanges();
        const automaticRadio = fixture.debugElement.query(By.css('#transmission-automatic'));
        automaticRadio.triggerEventHandler('change', { target: { value: 'Automatic' } });
        fixture.detectChanges();
        expect(component.transmissionChanged).toHaveBeenCalledWith('Automatic');
      });
    });
  });
});
