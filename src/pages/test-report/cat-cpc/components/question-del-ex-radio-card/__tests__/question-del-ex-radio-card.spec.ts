import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';

import { AppModule } from '../../../../../../app/app.module';
import { QuestionDelExRadioCardComponent } from '../question-del-ex-radio-card';
import { MockComponent } from 'ng-mocks';
import { QuestionTitleComponent } from '../../question-title/question-title';

describe('QuestionDelExRadioCardComponent', () => {
  let fixture: ComponentFixture<QuestionDelExRadioCardComponent>;
  let component: QuestionDelExRadioCardComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestionDelExRadioCardComponent,
        MockComponent(QuestionTitleComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuestionDelExRadioCardComponent);
    component = fixture.componentInstance;
  }));

  describe('questionScoreChanged', () => {
    it('should emit a numeric answer along with the question number', () => {
      spyOn(component.questionScore, 'emit');
      component.questionNumber = 1;
      component.questionScoreChanged(5);

      expect(component.questionScore.emit).toHaveBeenCalledWith({
        questionNumber: 1,
        score: 5,
      });
    });
  });
});
