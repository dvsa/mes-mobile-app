import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
import { AppModule } from '../../../../../../app/app.module';
import { QuestionFooterComponent } from '../question-footer';
describe('QuestionFooterComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                QuestionFooterComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(QuestionFooterComponent);
        component = fixture.componentInstance;
    }));
    describe('showPreviousPageButton', function () {
        it('should return false which hides previous question button on Q1', function () {
            component.questionNumber = 1;
            expect(component.showPreviousPageButton()).toEqual(false);
        });
        it('should return true which shows previous question button on Q2', function () {
            component.questionNumber = 2;
            expect(component.showPreviousPageButton()).toEqual(true);
        });
    });
    describe('showNextPageButton', function () {
        it('should return true which shows next question button on Q1', function () {
            component.questionNumber = 1;
            expect(component.showNextPageButton()).toEqual(true);
        });
        it('should return false which hides next question button on Q5', function () {
            component.questionNumber = 5;
            expect(component.showNextPageButton()).toEqual(false);
        });
    });
    describe('showViewSummaryButton', function () {
        it('should return false which hides test summary button on Q4', function () {
            component.questionNumber = 4;
            expect(component.showViewSummaryButton()).toEqual(false);
        });
        it('should return true which shows test summary button on Q5', function () {
            component.questionNumber = 5;
            expect(component.showViewSummaryButton()).toEqual(true);
        });
    });
    describe('goToPreviousQuestion', function () {
        it('should deduct one to the question number and emit the value', function () {
            spyOn(component.questionPageChange, 'emit');
            component.questionNumber = 3;
            component.goToPreviousQuestion();
            expect(component.questionPageChange.emit).toHaveBeenCalledWith(2);
        });
    });
    describe('goToNextQuestion', function () {
        it('should add one to the question number and emit the value', function () {
            spyOn(component.questionPageChange, 'emit');
            component.questionNumber = 3;
            component.goToNextQuestion();
            expect(component.questionPageChange.emit).toHaveBeenCalledWith(4);
        });
    });
});
//# sourceMappingURL=question-footer.spec.js.map