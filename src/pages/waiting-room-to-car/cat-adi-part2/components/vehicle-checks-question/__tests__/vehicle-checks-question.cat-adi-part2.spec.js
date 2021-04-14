import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksQuestionComponent } from '../vehicle-checks-question.cat-adi-part2';
import { AppModule } from '../../../../../../app/app.module';
import { EventEmitter } from '@angular/core';
import { configureTestSuite } from 'ng-bullet';
var vehicleChecksQuestion = {
    code: 'T4',
    // tslint:disable-next-line:max-line-length
    description: "Tell me how you would check the tyres to ensure that they have sufficient tread depth and that their general condition is safe to use on the road.",
    shortName: 'Sufficient tread',
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
                component.questionResult = { code: 'T3' };
                component.questionsToDisable = [
                    vehicleChecksQuestion,
                ];
                var result = component.isOptionDisabled({ code: 'T4', description: '', shortName: '' });
                expect(result).toEqual(true);
            });
            it('should return false if the question is not in the list of questions to disable', function () {
                component.questionResult = { code: 'T4' };
                component.questionsToDisable = [];
                var result = component.isOptionDisabled({ code: 'T4', description: '', shortName: '' });
                expect(result).toEqual(false);
            });
            it("should return false if the question is not in the list of questions to disable\n          and is equal to the currently selected question", function () {
                component.questionResult = { code: 'T5' };
                component.questionsToDisable = [{ code: 'T4' }];
                var result = component.isOptionDisabled({ code: 'T5', description: '', shortName: '' });
                expect(result).toEqual(false);
            });
        });
        describe('vehicleChecksQuestionChanged', function () {
            it('should emit the correct event', function () {
                component.vehicleChecksQuestionChange = new EventEmitter();
                spyOn(component.vehicleChecksQuestionChange, 'emit');
                component.vehicleChecksQuestionChanged(vehicleChecksQuestion);
                expect(component.vehicleChecksQuestionChange.emit).toHaveBeenCalledWith({
                    code: 'T4',
                    description: 'Sufficient tread',
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
                component.questionResult = { code: 'T4' };
                expect(component.findQuestion()).toEqual(vehicleChecksQuestion);
            });
            it('should return undefined if the question is not found', function () {
                component.questions = [vehicleChecksQuestion];
                component.questionResult = { code: 'B4' };
                expect(component.findQuestion()).toEqual(undefined);
            });
        });
        describe('shouldShowOutcomeFields', function () {
            it('should return true if all the required data is present', function () {
                component.questionResult = {
                    code: 'T4',
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
                    code: 'T4',
                };
                expect(component.shouldShowOutcomeFields()).toEqual(false);
            });
        });
    });
});
//# sourceMappingURL=vehicle-checks-question.cat-adi-part2.spec.js.map