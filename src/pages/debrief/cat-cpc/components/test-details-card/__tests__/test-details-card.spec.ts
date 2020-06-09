import { Question } from '@dvsa/mes-test-schema/categories/CPC';
import { QuestionUnion, TestDetailsCardComponent } from '../test-details-card';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { AppModule } from '../../../../../../app/app.module';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../../../components/common/common-components.module';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

fdescribe('CPC TestDetailsCardComponent', () => {
  let fixture: ComponentFixture<TestDetailsCardComponent>;
  let component: TestDetailsCardComponent;
  let question: Question;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [TestDetailsCardComponent],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        StoreModule.forRoot({}),
        TranslateModule,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestDetailsCardComponent);
    component = fixture.componentInstance;
    question = {
      questionCode: 'Q12',
      subtitle: 'Show me: ',
      answer1: {
        selected: true,
        label: '',
      },
      answer2: {
        selected: true,
        label: '',
      },
      answer3: {
        selected: true,
        label: '',
      },
      answer4: {
        selected: true,
        label: '',
      },
      additionalItems: [],
      title: 'Loading the vehicle',
      score: 20,
    };
  }));

  describe('getFormattedQuestion', () => {
    it('should return correct format', () => {
      const result = component.getFormattedQuestion(question);
      expect(result).toEqual('Q12 - Loading the vehicle');
    });
  });

  describe('getQuestionPercentage', () => {
    it('should return the correct percentage', () => {
      const result = component.getQuestionPercentage(question);
      expect(result).toEqual(20);
    });
  });

  describe('shouldTickBox', () => {
    it('should return true when the question score is 15 or greater.', () => {
      const result = component.shouldTickBox(question);
      expect(result).toEqual(true);
    });
    it('should return false when the question score is less than 15', () => {
      question.score = 14;
      const result = component.shouldTickBox(question);
      expect(result).toEqual(false);
    });
  });

  describe('getTotalScore', () => {
    it('should return a total score of 100', () => {
      const questions: QuestionUnion[] = [question, question, question, question, question];
      component.questions = questions;
      const result = component.getTotalScore();
      expect(result).toEqual(100);
    });
  });

  describe('isPass', () => {
    it('should return true if all questions have 15% and a minimum of 1 question with 20%', () => {
      const questions: QuestionUnion[] = [question, question, question, question, question];
      component.questions = questions;
      const result = component.isPass();
      expect(result).toEqual(true);
    });
    it('should return false if there is a question below 15%', () => {
      const malformedQuestion: Question = JSON.parse(JSON.stringify(question));
      malformedQuestion.score = 14;
      const questions: QuestionUnion[] = [question, question, question, question, malformedQuestion];
      component.questions = questions;
      const result = component.isPass();
      expect(result).toEqual(false);
    });
    it('should return false if there is no question with 20%', () => {
      question.score = 15;
      const questions: QuestionUnion[] = [question, question, question, question, question];
      component.questions = questions;
      const result = component.isPass();
      expect(result).toEqual(false);
    });
  });
});
