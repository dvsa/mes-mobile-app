import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Config, IonicModule, ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { ConfigMock, ModalControllerMock, NavControllerMock, NavParamsMock, PlatformMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';

import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { CompetencyComponent } from '../../components/competency/competency';
import { initialState } from '../../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { testReportReducer } from '../../test-report.reducer';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { configureTestSuite } from 'ng-bullet';
import { StoreModel } from '../../../../shared/models/store.model';
import { CPCQuestionProvider } from '../../../../providers/cpc-questions/cpc-questions';
import { CpcQuestionsMock } from '../../../../providers/cpc-questions/_mocks_/cpc-questions.mock';
import { TestReportCatCPCPage } from '../test-report.cat-cpc.page';
import {
  AnswerToggled,
  PopulateQuestionScore,
} from '../../../../modules/tests/test-data/cat-cpc/questions/questions.action';
import { PopulateTestScore } from '../../../../modules/tests/test-data/cat-cpc/overall-score/total-percentage.action';
import { QuestionFiveCardComponent } from '../components/question-five-card/question-five-card';
import { ModuleAssessmentComponent } from '../components/module-assessment/module-assessment';
import { QuestionAnswerComponent } from '../components/question-answer/question-answer';
import { QuestionCardComponent } from '../components/question-card/question-card';
import { QuestionFooterComponent } from '../components/question-footer/question-footer';
import { QuestionScoreComponent } from '../components/question-score/question-score';
import { QuestionSubtitleComponent } from '../components/question-subtitle/question-subtitle';
import { QuestionTitleComponent } from '../components/question-title/question-title';
import { catCPCTestData, mockToggleEvent } from '../__mocks__/test-report.cat-cpc.mock';
import { QuestionNumber } from '../../../../shared/constants/cpc-questions/cpc-question-combinations.constants';

describe('TestReportCatCPCPage', () => {
  let fixture: ComponentFixture<TestReportCatCPCPage>;
  let component: TestReportCatCPCPage;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestReportCatCPCPage,
        MockComponent(CompetencyComponent),
        MockComponent(ModuleAssessmentComponent),
        MockComponent(QuestionAnswerComponent),
        MockComponent(QuestionCardComponent),
        MockComponent(QuestionFiveCardComponent),
        MockComponent(QuestionFooterComponent),
        MockComponent(QuestionScoreComponent),
        MockComponent(QuestionSubtitleComponent),
        MockComponent(QuestionTitleComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forFeature('tests', () => (
          {
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                testData: initialState,
                journalData: {
                  candidate: candidateMock,
                },
              },
            },
          })),
        StoreModule.forFeature('testReport', testReportReducer),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: CPCQuestionProvider, useClass: CpcQuestionsMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestReportCatCPCPage);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
  }));

  describe('Class', () => {

    describe('questionPageChanged', () => {
      it('should should set the value passed into the function to a variable', () => {
        expect(component.pageNumber).toEqual(1);
        component.questionPageChanged(2);
        expect(component.pageNumber).toEqual(2);
      });
    });

    describe('populateAnswer', () => {
      it('should dispatch actions populating the answer selected value & the question scores', () => {
        spyOn(store$, 'dispatch');
        spyOn(component.cpcQuestionProvider, 'getQuestionScore').and.returnValue(5);
        spyOn(component.cpcQuestionProvider, 'getTotalQuestionScore').and.returnValue(40);

        component.testData = catCPCTestData;
        component.populateAnswer(mockToggleEvent);

        expect(store$.dispatch)
          .toHaveBeenCalledWith(new AnswerToggled(true, QuestionNumber.ONE, '2'));

        expect(store$.dispatch)
          .toHaveBeenCalledWith(new PopulateQuestionScore(QuestionNumber.ONE, 5));

        expect(store$.dispatch)
          .toHaveBeenCalledWith(new PopulateTestScore(40));
      });
    });

  });

});
