import { async, TestBed } from '@angular/core/testing';
import { LanguagePreferencesComponent } from '../language-preferences';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../app/app.module';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
describe('LanguagePreferencesComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                LanguagePreferencesComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(LanguagePreferencesComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('ngOnChanges', function () {
        it('should add the form control for the language preference radio', function () {
            component.ngOnChanges();
            expect(component.formGroup.get('languagePreferences')).not.toBeNull;
        });
        it('should set the value of the validation to true if isWelsh is true', function () {
            component.isWelsh = true;
            component.ngOnChanges();
            expect(component.formGroup.get('languagePreferences').value).toEqual(true);
        });
        it('should set the value of the validation to false if isWelsh is false', function () {
            component.isWelsh = false;
            component.ngOnChanges();
            expect(component.formGroup.get('languagePreferences').value).toEqual(false);
        });
        it('should set the value to isWelsh if not a delegated test', function () {
            component.isWelsh = false;
            component.isDelegated = false;
            component.ngOnChanges();
            expect(component.formGroup.get('languagePreferences').value).toEqual(false);
        });
        it('should set the value to false if its a delegated test and form isnt dirty', function () {
            component.isDelegated = true;
            component.ngOnChanges();
            expect(component.formGroup.get('languagePreferences').value).toEqual('false');
        });
    });
});
//# sourceMappingURL=language-preferences.spec.js.map