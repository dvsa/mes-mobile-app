import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';

import { AppModule } from '../../../../../../app/app.module';
import { ShowMeQuestionsCatADI2Component } from '../show-me-questions';
import { VehicleChecksQuestion } from '../../../../../../providers/question/vehicle-checks-question.model';

const vehicleChecksQuestion: VehicleChecksQuestion = {
  code: 'A15',
  description: 'When it is safe to do so can you show me how you wash and clean the rear windscreen.',
  shortName: 'Rear windscreen',
};

describe('ShowMeQuestionsCatADI2Component', () => {
  let fixture: ComponentFixture<ShowMeQuestionsCatADI2Component>;
  let component: ShowMeQuestionsCatADI2Component;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShowMeQuestionsCatADI2Component,
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowMeQuestionsCatADI2Component);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    describe('isOptionDisabled', () => {
      it(`should return true if the question is in the list of questions to disable
          and not equal to the currently selected question`,
        () => {
          component.questionResult = { code: 'A14' };
          component.questionsToDisable = [
            vehicleChecksQuestion,
          ];
          const result = component.isOptionDisabled({ code: 'A15', description: '', shortName: '' });
          expect(result).toEqual(true);
        });
      it('should return false if the question is not in the list of questions to disable', () => {
        component.questionResult = { code: 'A15' };
        component.questionsToDisable = [];
        const result = component.isOptionDisabled({ code: 'A15', description: '', shortName: '' });
        expect(result).toEqual(false);
      });
      it(`should return false if the question is not in the list of questions to disable
          and is equal to the currently selected question`,
        () => {
          component.questionResult = { code: 'A15' };
          component.questionsToDisable = [{ code: 'A15' }];
          const result = component.isOptionDisabled({ code: 'A15', description: '', shortName: '' });
          expect(result).toEqual(false);
        });
    });

    describe('vehicleChecksQuestionChanged', () => {
      it('should emit the correct event', () => {
        component.showMeQuestionsChange = new EventEmitter();
        spyOn(component.showMeQuestionsChange, 'emit');
        component.showMeQuestionsChanged(vehicleChecksQuestion);
        expect(component.showMeQuestionsChange.emit).toHaveBeenCalledWith({
          code: 'A15',
          description: 'Rear windscreen',
        });
      });
    });

    describe('findQuestion', () => {
      it('should return the question if it is found', () => {
        component.questions = [vehicleChecksQuestion];
        component.questionResult = { code: 'A15' };
        expect(component.findQuestion()).toEqual(vehicleChecksQuestion);
      });
      it('should return undefined if the question is not found', () => {
        component.questions = [vehicleChecksQuestion];
        component.questionResult = { code: 'A17' };
        expect(component.findQuestion()).toEqual(undefined);
      });
    });
  });
});