
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksQuestionComponent } from '../vehicle-checks-question';
import { AppModule } from '../../../../../../app/app.module';
import { VehicleChecksQuestion } from '../../../../../../providers/question/vehicle-checks-question.model';
import { EventEmitter } from '@angular/core';

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
  });

  describe('DOM', () => {

  });
});
