import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksQuestionComponent } from '../vehicle-checks-question';
import { AppModule } from '../../../../../../app/app.module';
import { EventEmitter } from '@angular/core';
import { configureTestSuite } from 'ng-bullet';
var vehicleChecksQuestion = {
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
                    vehicleChecksQuestion,
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
        describe('vehicleChecksQuestionChanged', function () {
            it('should emit the correct event', function () {
                component.vehicleChecksQuestionChange = new EventEmitter();
                spyOn(component.vehicleChecksQuestionChange, 'emit');
                component.vehicleChecksQuestionChanged(vehicleChecksQuestion);
                expect(component.vehicleChecksQuestionChange.emit).toHaveBeenCalledWith({
                    code: 'S04',
                    description: 'Parking brake',
                });
            });
        });
        describe('vehicleChecksPassSelected', function () {
            it('should emit the correct event', function () {
                component.vehicleChecksQuestionOutcomeChange = new EventEmitter();
                spyOn(component.vehicleChecksQuestionOutcomeChange, 'emit');
                component.vehicleChecksPassSelected();
                expect(component.vehicleChecksQuestionOutcomeChange.emit).toHaveBeenCalledWith('P');
            });
        });
        describe('vehicleChecksDrivingFaultSelected', function () {
            it('should emit the correct event', function () {
                component.vehicleChecksQuestionOutcomeChange = new EventEmitter();
                spyOn(component.vehicleChecksQuestionOutcomeChange, 'emit');
                component.vehicleChecksDrivingFaultSelected();
                expect(component.vehicleChecksQuestionOutcomeChange.emit).toHaveBeenCalledWith('DF');
            });
        });
        describe('findQuestion', function () {
            it('should return the question if it is found', function () {
                component.questions = [vehicleChecksQuestion];
                component.questionResult = { code: 'S04' };
                expect(component.findQuestion()).toEqual(vehicleChecksQuestion);
            });
            it('should return undefined if the question is not found', function () {
                component.questions = [vehicleChecksQuestion];
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
});
//# sourceMappingURL=vehicle-checks-question.spec.js.map