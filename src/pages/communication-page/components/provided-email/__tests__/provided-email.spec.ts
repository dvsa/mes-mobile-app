import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ProvidedEmailComponent } from '../provided-email';
import { FormGroup, FormControl } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { TranslateService, TranslateModule, TranslateLoader } from 'ng2-translate';
import * as welshTranslations from '../../../../../assets/i18n/cy.json';
import { createTranslateLoader } from '../../../../../app/app.module';
import { Http } from '@angular/http';
import { configureTestSuite } from 'ng-bullet';

describe('ProvidedEmailComponent', () => {
  let fixture: ComponentFixture<ProvidedEmailComponent>;
  let component: ProvidedEmailComponent;
  let translate: TranslateService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProvidedEmailComponent,
      ],
      imports: [
        IonicModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [Http],
        }),
      ],
    });
  });

  beforeEach(async(() => {
        fixture = TestBed.createComponent(ProvidedEmailComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
        component.formGroup.addControl('radioCtrl', new FormControl());
        component.shouldRender = true;
        component.isProvidedEmailAddressChosen = true;
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
  }));

  describe('DOM', () => {
    describe('i18n', () => {
      it('should render in English by default', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.communication-text')).nativeElement.innerHTML.trim())
          .toBe('The following email address was used when booking the test:');
        expect(fixture.debugElement.query(By.css('#providedEmail + label')).nativeElement.innerHTML.trim())
          .toBe('By email (provided at time of booking)');
      });
      it('should render in Welsh when its a Welsh test', (done) => {
        translate.use('cy').subscribe(() => {
          fixture.detectChanges();
          expect(fixture.debugElement.query(By.css('.communication-text')).nativeElement.innerHTML.trim())
            .toBe(`${(<any>welshTranslations).communication.bookingEmail}:`);
          expect(fixture.debugElement.query(By.css('#providedEmail + label')).nativeElement.innerHTML.trim())
            .toBe((<any>welshTranslations).communication.byEmailLabel);
          done();
        });
      });
    });
  });
});
