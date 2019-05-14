
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { EyesightTestComponent } from '../eyesight-test';

describe('EyesightTestComponent', () => {
  let fixture: ComponentFixture<EyesightTestComponent>;
  let component: EyesightTestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EyesightTestComponent,
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EyesightTestComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
      });
  }));

  describe('DOM', () => {
    it('should call EyesightResultChanged with P when Pass is pressed', () => {
      spyOn(component, 'eyesightTestResultChanged');
      component.ngOnChanges();
      const passEyesightRadio = fixture.debugElement.query(By.css('#eyesight-pass'));
      passEyesightRadio.triggerEventHandler('change', { target: { value: 'P' } });
      fixture.detectChanges();
      expect(component.eyesightTestResultChanged).toHaveBeenCalledWith('P');
    });
    it('should call EyesightResultChanged with F when Fail is pressed', () => {
      spyOn(component, 'eyesightTestResultChanged');
      component.ngOnChanges();
      const passEyesightRadio = fixture.debugElement.query(By.css('#eyesight-fail'));
      passEyesightRadio.triggerEventHandler('change', { target: { value: 'F' } });
      fixture.detectChanges();
      expect(component.eyesightTestResultChanged).toHaveBeenCalledWith('F');
    });
  });
});
