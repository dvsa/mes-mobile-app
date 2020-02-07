
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { SafetyQuestionComponent } from '../safety-question';
import { AppModule } from '../../../../../../app/app.module';
import { EventEmitter } from '@angular/core';
import { configureTestSuite } from 'ng-bullet';

describe('SafetyQuestionComponent', () => {
  let fixture: ComponentFixture<SafetyQuestionComponent>;
  let component: SafetyQuestionComponent;

  configureTestSuite(() => {
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

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SafetyQuestionComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    describe('safetyQuestionPassSelected', () => {
      it('should emit the correct event', () => {
        component.safetyQuestionOutcomeChange = new EventEmitter();
        spyOn(component.safetyQuestionOutcomeChange, 'emit');

        component.safetyQuestionsPassSelected();

        expect(component.safetyQuestionOutcomeChange.emit).toHaveBeenCalledWith('P');
      });
    });
    describe('safetyQuestionsDrivingFaultSelected', () => {
      it('should emit the correct event', () => {
        component.safetyQuestionOutcomeChange = new EventEmitter();
        spyOn(component.safetyQuestionOutcomeChange, 'emit');

        component.safetyQuestionsDrivingFaultSelected();

        expect(component.safetyQuestionOutcomeChange.emit).toHaveBeenCalledWith('DF');
      });
    });
  });

  describe('DOM', () => {

  });
});
