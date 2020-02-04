import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { VehicleChecksCardComponent } from '../vehicle-checks-card';
import { IonicModule, Config } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';
import { TranslateService, TranslateModule, TranslateLoader } from 'ng2-translate';
import { createTranslateLoader } from '../../../../../app/app.module';
import { Http } from '@angular/http';
import * as welshTranslations from '../../../../../assets/i18n/cy.json';
import * as englishTranslations from '../../../../../assets/i18n/en.json';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { configureTestSuite } from 'ng-bullet';

describe('VehicleChecksCardComponent', () => {
  let fixture: ComponentFixture<VehicleChecksCardComponent>;
  let component: VehicleChecksCardComponent;
  let translate: TranslateService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleChecksCardComponent,
      ],
      imports: [
        IonicModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [Http],
        }),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VehicleChecksCardComponent);
    component = fixture.componentInstance;
    translate = TestBed.get(TranslateService);
    translate.setDefaultLang('en');
  }));

  describe('DOM', () => {
    describe('Vehicle check reporting', () => {
      it('should show results', () => {
        component.category = TestCategory.BE;
        component.tellMeShowMeQuestions = [
          {
            code: 'S01',
            description: 'Show me how you would check that the direction indicators are working.',
            outcome: 'P',
          },
        ];
        fixture.detectChanges();

        const tellMeQuestionText = fixture.debugElement
          .query(By.css('#vehicle-checks .counter-label')).nativeElement;

        expect(tellMeQuestionText.innerHTML.trim())
          .toContain((<any>englishTranslations).debrief.showMeTellMeQuestions[TestCategory.BE].S01);
      });

      it('should show results in Welsh for a Welsh test', (done) => {
        component.category = TestCategory.BE;
        component.tellMeShowMeQuestions = [
          {
            code: 'S01',
            description: 'Show me how you would check that the direction indicators are working.',
            outcome: 'P',
          },
        ];

        fixture.detectChanges();

        // Language change handled by parent page component, force the switch
        translate.use('cy').subscribe(() => {
          fixture.detectChanges();
          const tellMeQuestionText = fixture.debugElement
            .query(By.css('#vehicle-checks .counter-label')).nativeElement;

          expect(tellMeQuestionText.innerHTML.trim())
            .toContain((<any>welshTranslations).debrief.showMeTellMeQuestions[TestCategory.BE].S01);
          done();
        });
      });
    });
  });

});
