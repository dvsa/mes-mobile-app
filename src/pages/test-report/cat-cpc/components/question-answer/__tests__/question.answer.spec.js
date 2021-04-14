import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
import { AppModule } from '../../../../../../app/app.module';
import { QuestionAnswerComponent } from '../question-answer';
import { mockAnswer, mockAnswerNumber } from '../__mocks__/question-answer.mock';
describe('QuestionAnswerComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                QuestionAnswerComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(QuestionAnswerComponent);
        component = fixture.componentInstance;
    }));
    describe('getID', function () {
        it('should return a string of answer#, hash being the number passed in', function () {
            expect(component.getID('1')).toEqual('answer1');
            expect(component.getID('2')).toEqual('answer2');
            expect(component.getID('7')).toEqual('answer7');
        });
    });
    describe('getLabel', function () {
        it('should return a string of answer-label-#, hash being the number passed in', function () {
            expect(component.getLabel('1')).toEqual('answer-label-1');
            expect(component.getLabel('2')).toEqual('answer-label-2');
            expect(component.getLabel('7')).toEqual('answer-label-7');
        });
    });
    describe('answerChanged', function () {
        it('should emit an object containing the answer ', function () {
            spyOn(component.answerToggled, 'emit');
            component.answer = mockAnswer;
            component.answerNumber = mockAnswerNumber;
            component.answerChanged();
            expect(component.answerToggled.emit).toHaveBeenCalledWith({
                answer: mockAnswer,
                answerNumber: mockAnswerNumber,
            });
        });
    });
});
//# sourceMappingURL=question.answer.spec.js.map