import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import * as welshTranslations from '../../../../../assets/i18n/cy.json';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { createTranslateLoader } from '../../../../../app/app.module';
import { NewEmailComponent } from '../new-email';
import { configureTestSuite } from 'ng-bullet';
describe('NewEmailComponent', function () {
    var fixture;
    var component;
    var translate;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                NewEmailComponent,
            ],
            imports: [
                IonicModule,
                HttpClientModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: createTranslateLoader,
                        deps: [HttpClient],
                    },
                }),
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(NewEmailComponent);
        component = fixture.componentInstance;
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
        component.formGroup = new FormGroup({});
        var radioCtrl = new FormControl('radioCtrl');
        component.formGroup.addControl('radioCtrl', radioCtrl);
        component.radioButtonControl = radioCtrl;
        var newEmailCtrl = new FormControl('newEmailCtrl');
        component.formGroup.addControl('newEmailCtrl', newEmailCtrl);
        component.formControl = newEmailCtrl;
        component.isNewEmailAddressChosen = true;
    }));
    describe('DOM', function () {
        describe('i18n', function () {
            it('should render in English by default', function () {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('.validation-text')).nativeElement.innerHTML.trim())
                    .toBe('Please enter a valid email');
                expect(fixture.debugElement.query(By.css('.communication-text')).nativeElement.innerHTML.trim())
                    .toBe('Enter the email address you want us to send your results to.');
            });
            it('should render in Welsh when its a Welsh test', function (done) {
                translate.use('cy').subscribe(function () {
                    fixture.detectChanges();
                    expect(fixture.debugElement.query(By.css('.validation-text')).nativeElement.innerHTML.trim())
                        .toBe("" + welshTranslations.communication.newEmailValidation);
                    expect(fixture.debugElement.query(By.css('.communication-text')).nativeElement.innerHTML.trim())
                        .toBe(welshTranslations.communication.newEmail);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=new-email.spec.js.map