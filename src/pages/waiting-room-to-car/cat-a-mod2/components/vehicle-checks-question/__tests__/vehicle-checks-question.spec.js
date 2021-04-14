import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksQuestionComponent } from '../vehicle-checks-question';
import { AppModule } from '../../../../../../app/app.module';
import { EventEmitter } from '@angular/core';
import { configureTestSuite } from 'ng-bullet';
var safetyAndBalanceQuestion = {
    code: 'S04',
    description: 'Show me how you would check the parking brake for excessive wear.',
    shortName: 'Parking brake',
};
describe('VehicleChecksQuestionComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleChecksQuestionComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleChecksQuestionComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('isOptionDisabled', function () {
            it("should return true if the question is in the list of questions to disable\n          and not equal to the currently selected question", function () {
                component.questionResult = { code: 'S03' };
                component.questionsToDisable = [
                    safetyAndBalanceQuestion,
                ];
                var result = component.isOptionDisabled({ code: 'S04', description: '', shortName: '' });
                expect(result).toEqual(true);
            });
            it('should return false if the question is not in the list of questions to disable', function () {
                component.questionResult = { code: 'S04' };
                component.questionsToDisable = [];
                var result = component.isOptionDisabled({ code: 'S04', description: '', shortName: '' });
                expect(result).toEqual(false);
            });
            it("should return false if the question is not in the list of questions to disable\n          and is equal to the currently selected question", function () {
                component.questionResult = { code: 'S05' };
                component.questionsToDisable = [{ code: 'S04' }];
                var result = component.isOptionDisabled({ code: 'S05', description: '', shortName: '' });
                expect(result).toEqual(false);
            });
        });
        describe('safetyAndBalanceQuestionChanged', function () {
            it('should emit the correct event', function () {
                component.safetyAndBalanceQuestionChange = new EventEmitter();
                spyOn(component.safetyAndBalanceQuestionChange, 'emit');
                component.safetyAndBalanceQuestionChanged(safetyAndBalanceQuestion);
                expect(component.safetyAndBalanceQuestionChange.emit).toHaveBeenCalledWith({
                    code: 'S04',
                    description: 'Parking brake',
                });
            });
        });
        describe('safetyAndBalancePassSelected', function () {
            it('should emit the correct event', function () {
                component.safetyAndBalanceQuestionOutcomeChange = new EventEmitter();
                spyOn(component.safetyAndBalanceQuestionOutcomeChange, 'emit');
                component.safetyAndBalancePassSelected();
                expect(component.safetyAndBalanceQuestionOutcomeChange.emit).toHaveBeenCalledWith('P');
            });
        });
        describe('safetyAndBalanceDrivingFaultSelected', function () {
            it('should emit the correct event', function () {
                component.safetyAndBalanceQuestionOutcomeChange = new EventEmitter();
                spyOn(component.safetyAndBalanceQuestionOutcomeChange, 'emit');
                component.safetyAndBalanceDrivingFaultSelected();
                expect(component.safetyAndBalanceQuestionOutcomeChange.emit).toHaveBeenCalledWith('DF');
            });
        });
        describe('findQuestion', function () {
            it('should return the question if it is found', function () {
                component.questions = [safetyAndBalanceQuestion];
                component.questionResult = { code: 'S04' };
                expect(component.findQuestion()).toEqual(safetyAndBalanceQuestion);
            });
            it('should return undefined if the question is not found', function () {
                component.questions = [safetyAndBalanceQuestion];
                component.questionResult = { code: 'B04' };
                expect(component.findQuestion()).toEqual(undefined);
            });
        });
        describe('shouldShowOutcomeFields', function () {
            it('should return true if all the required data is present', function () {
                component.questionResult = {
                    code: 'S04',
                    description: 'Test',
                };
                expect(component.shouldShowOutcomeFields()).toEqual(true);
            });
            it('should return false if question result is not defined', function () {
                expect(component.shouldShowOutcomeFields()).toEqual(false);
            });
            it('should return false if all the question code is missing from the result object', function () {
                component.questionResult = {
                    description: 'Test',
                };
                expect(component.shouldShowOutcomeFields()).toEqual(false);
            });
            it('should return false if all the question description is missing from the result object', function () {
                component.questionResult = {
                    code: 'S04',
                };
                expect(component.shouldShowOutcomeFields()).toEqual(false);
            });
        });
    });
    describe('DOM', function () {
    });
});
//# sourceMappingURL=vehicle-checks-question.spec.js.map