import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { SafetyQuestionComponent } from '../safety-question';
import { AppModule } from '../../../../../../app/app.module';
import { EventEmitter } from '@angular/core';
import { configureTestSuite } from 'ng-bullet';
var safetyQuestion = {
    description: 'Fuel cutoff',
};
describe('SafetyQuestionComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                SafetyQuestionComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(SafetyQuestionComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('safetyQuestionPassSelected', function () {
            it('should emit the correct event', function () {
                component.safetyQuestionOutcomeChange = new EventEmitter();
                spyOn(component.safetyQuestionOutcomeChange, 'emit');
                component.safetyQuestionsPassSelected();
                expect(component.safetyQuestionOutcomeChange.emit).toHaveBeenCalledWith('P');
            });
        });
        describe('safetyQuestionsDrivingFaultSelected', function () {
            it('should emit the correct event', function () {
                component.safetyQuestionOutcomeChange = new EventEmitter();
                spyOn(component.safetyQuestionOutcomeChange, 'emit');
                component.safetyQuestionsDrivingFaultSelected();
                expect(component.safetyQuestionOutcomeChange.emit).toHaveBeenCalledWith('DF');
            });
        });
        describe('findQuestion', function () {
            it('should return the question if it is found', function () {
                component.questions = [safetyQuestion];
                component.questionResult = { description: 'Fuel cutoff' };
                expect(component.findQuestion()).toEqual(safetyQuestion);
            });
            it('should return undefined if the question is not found', function () {
                component.questions = [safetyQuestion];
                component.questionResult = { description: 'Bad question' };
                expect(component.findQuestion()).toEqual(undefined);
            });
        });
    });
    describe('DOM', function () {
    });
});
//# sourceMappingURL=safety-question.spec.js.map