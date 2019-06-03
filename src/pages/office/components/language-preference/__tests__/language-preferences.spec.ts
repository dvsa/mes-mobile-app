import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { LanguagePreferencesComponent } from '../language-preferences';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { FormGroup } from '@angular/forms';

describe('LanguagePreferencesComponent', () => {
  let fixture: ComponentFixture<LanguagePreferencesComponent>;
  let component: LanguagePreferencesComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LanguagePreferencesComponent,
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LanguagePreferencesComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
      });
  }));

  describe('ngOnChanges', () => {
    it('should add the form control for the language preference radio', () => {
      component.ngOnChanges();
      expect(component.formGroup.get('languagePreferences')).not.toBeNull;
    });
    it('should set the value of the validation to true if isWelsh is true', () => {
      component.isWelsh = true;
      component.ngOnChanges();
      expect(component.formGroup.get('languagePreferences').value).toEqual(true);
    });
    it('should set the value of the validation to false if isWelsh is false', () => {
      component.isWelsh = false;
      component.ngOnChanges();
      expect(component.formGroup.get('languagePreferences').value).toEqual(false);
    });
  });

});
