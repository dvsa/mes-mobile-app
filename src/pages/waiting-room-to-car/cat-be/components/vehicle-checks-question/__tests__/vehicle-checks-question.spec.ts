
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksQuestionComponent } from '../vehicle-checks-question';
import { AppModule } from '../../../../../../app/app.module';
import { VehicleChecksQuestion } from '../../../../../../providers/question/vehicle-checks-question.model';
import { EventEmitter } from '@angular/core';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/BE/partial';

const vehicleChecksQuestion: VehicleChecksQuestion = {
  code: 'S04',
  description: 'Show me how you would check the parking brake for excessive wear.',
  shortName: 'Parking brake',
};

describe('VehicleChecksQuestionComponent', () => {
  let fixture: ComponentFixture<VehicleChecksQuestionComponent>;
  let component: VehicleChecksQuestionComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleChecksQuestionComponent,
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleChecksQuestionComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    describe('isOptionDisabled', () => {
      it('should return true if the question is in the list of questions to disable', () => {
        component.questionsToDisable = [
          vehicleChecksQuestion,
        ];
        const result = component.isOptionDisabled({ code: 'S04', description: '', shortName: '' });
        expect(result).toEqual(true);
      });
      it('should return false if the question is not in the list of questions to disable', () => {
        component.questionsToDisable = [];
        const result = component.isOptionDisabled({ code: 'S04', description: '', shortName: '' });
        expect(result).toEqual(false);
      });
    });
    describe('vehicleChecksQuestionChanged', () => {
      it('should emit the correct event', () => {
        component.vehicleChecksQuestionChange = new EventEmitter();
        spyOn(component.vehicleChecksQuestionChange, 'emit');

        component.vehicleChecksQuestionChanged(vehicleChecksQuestion);

        expect(component.vehicleChecksQuestionChange.emit).toHaveBeenCalledWith({
          code: 'S04',
          description: 'Parking brake',
        });
      });
    });
    describe('vehicleChecksPassSelected', () => {
      it('should emit the correct event', () => {
        component.vehicleChecksQuestionOutcomeChange = new EventEmitter();
        spyOn(component.vehicleChecksQuestionOutcomeChange, 'emit');

        component.vehicleChecksPassSelected();

        expect(component.vehicleChecksQuestionOutcomeChange.emit).toHaveBeenCalledWith({
          outcome: 'P',
        });
      });
    });
    describe('vehicleChecksDrivingFaultSelected', () => {
      it('should emit the correct event', () => {
        component.vehicleChecksQuestionOutcomeChange = new EventEmitter();
        spyOn(component.vehicleChecksQuestionOutcomeChange, 'emit');

        component.vehicleChecksDrivingFaultSelected();

        expect(component.vehicleChecksQuestionOutcomeChange.emit).toHaveBeenCalledWith({
          outcome: 'DF',
        });
      });
    });
    describe('findQuestion', () => {
      it('should return the question if it is found', () => {
        component.questions = [vehicleChecksQuestion];
        component.questionResult = { code: 'S04' };
        expect(component.findQuestion()).toEqual(vehicleChecksQuestion);
      });
      it('should return undefined if the question is not found', () => {
        component.questions = [vehicleChecksQuestion];
        component.questionResult = { code: 'B04' };
        expect(component.findQuestion()).toEqual(undefined);
      });
    });
    describe('shouldShowOutcomeFields' , () => {
      it('should return true if all the required data is present', () => {
        component.questionResult = {
          code: 'S04',
          description: 'Test',
        } as QuestionResult;

        expect(component.shouldShowOutcomeFields()).toEqual(true);
      });
      it('should return false if question result is not defined', () => {
        expect(component.shouldShowOutcomeFields()).toEqual(false);
      });
      it('should return false if all the question code is missing from the result object', () => {
        component.questionResult = {
          description: 'Test',
        } as QuestionResult;

        expect(component.shouldShowOutcomeFields()).toEqual(false);
      });
      it('should return false if all the question description is missing from the result object', () => {
        component.questionResult = {
          code: 'S04',
          description: 'Test',
        } as QuestionResult;

        expect(component.shouldShowOutcomeFields()).toEqual(false);
      });
    });
  });

  describe('DOM', () => {

  });
});
