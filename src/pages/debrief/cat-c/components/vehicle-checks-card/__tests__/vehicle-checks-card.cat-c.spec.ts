import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { VehicleChecksCardCatCComponent } from '../vehicle-checks-card.cat-c';
import { IonicModule, Config } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../../../shared/models/store.model';
import { StartTest } from '../../../../../../modules/tests/tests.actions';

// TODO: MES-4254 Import cat c actions
import {
  ShowMeQuestionSelected,
  ShowMeQuestionOutcomeChanged,
} from '../../../../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.action';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';
import { TranslateService, TranslateModule, TranslateLoader } from 'ng2-translate';
import { createTranslateLoader } from '../../../../../../app/app.module';
import { Http } from '@angular/http';
import * as welshTranslations from '../../../../../../assets/i18n/cy.json';
import * as englishTranslations from '../../../../../../assets/i18n/en.json';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { PopulateTestCategory } from '../../../../../../modules/tests/category/category.actions';
import { PopulateCandidateDetailsCatBE }
  from '../../../../../../modules/tests/journal-data/cat-be/candidate/candidate.cat-be.actions';
import { candidateMock } from '../../../../../../modules/tests/__mocks__/tests.mock';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('VehicleChecksCardCatCComponent', () => {
  let fixture: ComponentFixture<VehicleChecksCardCatCComponent>;
  let store$: Store<StoreModel>;
  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleChecksCardCatCComponent,
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer }),
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [Http],
        }),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleChecksCardCatCComponent);
        store$ = TestBed.get(Store);

        // TODO: MES-4254 Use category C
        store$.dispatch(new StartTest(105, TestCategory.BE));
        store$.dispatch(new PopulateTestCategory(TestCategory.BE));
        store$.dispatch(new PopulateCandidateDetailsCatBE(candidateMock));

        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
      });
  }));

  describe('DOM', () => {
    describe('Vehicle check reporting', () => {
      it('should show results', () => {
        const showMeQuestion: QuestionResult = {
          code: 'S01',
          description: 'Show me how you would check that the direction indicators are working.',
        };
        // Configure show me/tell me questions
        store$.dispatch(new ShowMeQuestionSelected(showMeQuestion, 1));
        store$.dispatch(new ShowMeQuestionOutcomeChanged('P', 1));

        fixture.detectChanges();

        const tellMeQuestionText = fixture.debugElement
          .query(By.css('#vehicle-checks .counter-label')).nativeElement;

        expect(tellMeQuestionText.innerHTML.trim())
          .toContain((<any>englishTranslations).debrief.showMeTellMeQuestions.S01);
      });

      it('should show results in Welsh for a Welsh test', (done) => {
        const showMeQuestion: QuestionResult = {
          code: 'S01',
          description: 'Show me how you would check that the direction indicators are working.',
        };
        // Configure show me/tell me questions
        store$.dispatch(new ShowMeQuestionSelected(showMeQuestion, 1));
        store$.dispatch(new ShowMeQuestionOutcomeChanged('P', 1));

        fixture.detectChanges();

        // Language change handled by parent page component, force the switch
        translate.use('cy').subscribe(() => {
          fixture.detectChanges();
          const tellMeQuestionText = fixture.debugElement
            .query(By.css('#vehicle-checks .counter-label')).nativeElement;

          expect(tellMeQuestionText.innerHTML.trim())
            .toContain((<any>welshTranslations).debrief.showMeTellMeQuestions.S01);
          done();
        });
      });
    });
  });

});
