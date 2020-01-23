import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CandidateDescriptionComponent } from '../candidate-description';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { OutcomeBehaviourMapProvider } from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../../../../pages/office/office-behaviour-map';
import { configureTestSuite } from 'ng-bullet';

describe('CandidateDescriptionComponent', () => {
  let fixture: ComponentFixture<CandidateDescriptionComponent>;
  let component: CandidateDescriptionComponent;
  let behaviourMapProvider: OutcomeBehaviourMapProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CandidateDescriptionComponent,
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
      providers: [
        { provide: OutcomeBehaviourMapProvider, useClass: OutcomeBehaviourMapProvider },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CandidateDescriptionComponent);
    behaviourMapProvider = TestBed.get(OutcomeBehaviourMapProvider);
    behaviourMapProvider.setBehaviourMap(behaviourMap);
    component = fixture.componentInstance;
  }));

  describe('class', () => {
    it('should emit candidate description', () => {
      spyOn(component.candidateDescriptionChange, 'emit');
      const candidateDescription = 'this is the candidate description';
      component.candidateDescriptionChanged(candidateDescription);
      expect(component.candidateDescriptionChange.emit).toHaveBeenCalledWith(candidateDescription);
    });
  });
});
