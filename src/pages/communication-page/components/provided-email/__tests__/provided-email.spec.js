import { async, TestBed } from '@angular/core/testing';
import { ProvidedEmailComponent } from '../provided-email';
import { FormGroup, FormControl } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import * as welshTranslations from '../../../../../assets/i18n/cy.json';
import { createTranslateLoader } from '../../../../../app/app.module';
import { configureTestSuite } from 'ng-bullet';
import { HttpClient, HttpClientModule } from '@angular/common/http';
describe('ProvidedEmailComponent', function () {
    var fixture;
    var component;
    var translate;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ProvidedEmailComponent,
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
        fixture = TestBed.createComponent(ProvidedEmailComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
        component.formGroup.addControl('radioCtrl', new FormControl());
        component.shouldRender = true;
        component.isProvidedEmailAddressChosen = true;
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
    }));
    describe('DOM', function () {
        describe('i18n', function () {
            it('should render in English by default', function () {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('.communication-text')).nativeElement.innerHTML.trim())
                    .toBe('The following email address was used when booking the test:');
                expect(fixture.debugElement.query(By.css('#providedEmail + label')).nativeElement.innerHTML.trim())
                    .toBe('By email (provided at time of booking)');
            });
            it('should render in Welsh when its a Welsh test', function (done) {
                translate.use('cy').subscribe(function () {
                    fixture.detectChanges();
                    expect(fixture.debugElement.query(By.css('.communication-text')).nativeElement.innerHTML.trim())
                        .toBe(welshTranslations.communication.bookingEmail + ":");
                    expect(fixture.debugElement.query(By.css('#providedEmail + label')).nativeElement.innerHTML.trim())
                        .toBe(welshTranslations.communication.byEmailLabel);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=provided-email.spec.js.map