import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
import { AppModule } from '../../../../../../app/app.module';
import { QuestionDelExRadioCardComponent } from '../question-del-ex-radio-card';
import { MockComponent } from 'ng-mocks';
import { QuestionTitleComponent } from '../../question-title/question-title';
describe('QuestionDelExRadioCardComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
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
    beforeEach(async(function () {
        fixture = TestBed.createComponent(QuestionDelExRadioCardComponent);
        component = fixture.componentInstance;
    }));
    describe('questionScoreChanged', function () {
        it('should emit a numeric answer along with the question number', function () {
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
//# sourceMappingURL=question-del-ex-radio-card.spec.js.map