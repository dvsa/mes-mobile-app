import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';

import { CandidateSectionComponent } from '../candidate-section';
import { AppModule } from '../../../../../app/app.module';
import { TestOutcome } from '../../../../../modules/tests/tests.constants';

describe('CandidateSectionComponent', () => {
  let fixture: ComponentFixture<CandidateSectionComponent>;
  let component: CandidateSectionComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CandidateSectionComponent,
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
      providers: [],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CandidateSectionComponent);
    component = fixture.componentInstance;
  }));

  describe('getTestOutcomeClass', () => {
    it('should return pass when the TestOutcome is passed', () => {
      expect(component.getTestOutcomeClass(TestOutcome.Passed)).toEqual('pass');
    });
    it('should return fail when the TestOutcome is Failed', () => {
      expect(component.getTestOutcomeClass(TestOutcome.Failed)).toEqual('fail');
    });
    it('should return terminated when the TestOutcome is Terminated', () => {
      expect(component.getTestOutcomeClass(TestOutcome.Terminated)).toEqual('terminated');
    });
  });
});
