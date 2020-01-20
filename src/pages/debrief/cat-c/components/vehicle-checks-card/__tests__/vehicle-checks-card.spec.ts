import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleChecksCardCatCComponent } from '../vehicle-checks-card.cat-c';
import { Config, IonicModule } from 'ionic-angular';
import { Store, StoreModule } from '@ngrx/store';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../../../shared/models/store.model';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import {
  InitializeVehicleChecks,
  ShowMeQuestionOutcomeChanged,
  ShowMeQuestionSelected,
} from '../../../../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';
import { TranslateLoader, TranslateModule, TranslateService } from 'ng2-translate';
import { createTranslateLoader } from '../../../../../../app/app.module';
import { Http } from '@angular/http';
import * as welshTranslations from '../../../../../../assets/i18n/cy.json';
import * as englishTranslations from '../../../../../../assets/i18n/en.json';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { PopulateTestCategory } from '../../../../../../modules/tests/category/category.actions';
import { PopulateCandidateDetailsCatC, } from '../../../../../../modules/tests/journal-data/cat-c/candidate/candidate.cat-c.actions';
import { candidateMock } from '../../../../../../modules/tests/__mocks__/tests.mock';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('VehicleChecksCardComponentCatC', () => {
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

        store$.dispatch(new StartTest(105, TestCategory.C));
        store$.dispatch(new PopulateTestCategory(TestCategory.C));
        store$.dispatch(new PopulateCandidateDetailsCatC(candidateMock));

        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
      });
  }));

  describe('DOM', () => {
    describe('Vehicle check reporting', () => {
      it('should show results', () => {
        const showMeQuestion: QuestionResult = {
          code: 'S1',
          description: 'Show me how you would check that all doors including cargo doors are secure.',
        };
        // Configure show me/tell me questions
        store$.dispatch(new InitializeVehicleChecks(TestCategory.C));
        store$.dispatch(new ShowMeQuestionSelected(showMeQuestion, 1));
        store$.dispatch(new ShowMeQuestionOutcomeChanged('P', 1));

        fixture.detectChanges();

        const tellMeQuestionText = fixture.debugElement
          .query(By.css('#vehicle-checks .counter-label')).nativeElement;

        expect(tellMeQuestionText.innerHTML.trim())
          .toContain((<any>englishTranslations).debrief.showMeTellMeQuestions[TestCategory.C].S1);
      });

      it('should show results in Welsh for a Welsh test', (done) => {
        const showMeQuestion: QuestionResult = {
          code: 'S1',
          description: 'Show me how you would check that all doors including cargo doors are secure.',
        };
        // Configure show me/tell me questions
        store$.dispatch(new InitializeVehicleChecks(TestCategory.C));
        store$.dispatch(new ShowMeQuestionSelected(showMeQuestion, 1));
        store$.dispatch(new ShowMeQuestionOutcomeChanged('P', 1));

        fixture.detectChanges();

        // Language change handled by parent page component, force the switch
        translate.use('cy').subscribe(() => {
          fixture.detectChanges();
          const tellMeQuestionText = fixture.debugElement
            .query(By.css('#vehicle-checks .counter-label')).nativeElement;

          expect(tellMeQuestionText.innerHTML.trim())
            .toContain((<any>welshTranslations).debrief.showMeTellMeQuestions[TestCategory.C].S1);
          done();
        });
      });
    });
  });

});
