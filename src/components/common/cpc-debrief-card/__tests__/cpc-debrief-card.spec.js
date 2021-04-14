import { CPCDebriefCardComponent } from '../cpc-debrief-card';
import { async, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { AppModule } from '../../../../app/app.module';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../common-components.module';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
describe('CPCDebriefCardComponent', function () {
    var fixture;
    var component;
    var question;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                IonicModule,
                AppModule,
                ComponentsModule,
                StoreModule.forRoot({}),
                TranslateModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(CPCDebriefCardComponent);
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
    describe('getFormattedQuestion', function () {
        it('should return correct format', function () {
            var result = component.getFormattedQuestion(question);
            expect(result).toEqual('Q12 - Loading the vehicle');
        });
    });
    describe('getQuestionPercentage', function () {
        it('should return the correct percentage', function () {
            var result = component.getQuestionPercentage(question);
            expect(result).toEqual(20);
        });
    });
    describe('shouldTickBox', function () {
        it('should return true when the question score is 15 or greater.', function () {
            var result = component.shouldTickBox(question);
            expect(result).toEqual(true);
        });
        it('should return false when the question score is less than 15', function () {
            question.score = 14;
            var result = component.shouldTickBox(question);
            expect(result).toEqual(false);
        });
    });
    describe('isPass', function () {
        it('should return true if the testOutcome equals Pass', function () {
            component.testOutcome = 'Pass';
            expect(component.isPass()).toEqual(true);
        });
        it('should return false if the testOutcome does not equal Pass', function () {
            component.testOutcome = 'Fail';
            expect(component.isPass()).toEqual(false);
        });
    });
    describe('cardHeader', function () {
        it('should display the header as Debrief if it is a detailed test view', function () {
            component.isDetailedTestView = true;
            expect(component.getCardHeader()).toEqual('Debrief');
        });
        it('should display the header as Test details if it is not a detailed test view', function () {
            component.isDetailedTestView = false;
            expect(component.getCardHeader()).toEqual('Test details');
        });
    });
});
//# sourceMappingURL=cpc-debrief-card.spec.js.map