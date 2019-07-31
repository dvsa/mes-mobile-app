
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FaultCommentComponent } from '../fault-comment';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { DrivingFaultsBadgeComponent } from '../../../../../components/driving-faults-badge/driving-faults-badge';
import { SeriousFaultBadgeComponent } from '../../../../../components/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent } from '../../../../../components/dangerous-fault-badge/dangerous-fault-badge';
import { FormGroup, FormControl } from '@angular/forms';
import { OutcomeBehaviourMapProvider } from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../../../../pages/office/office-behaviour-map';

describe('FaultCommentComponent', () => {
  let fixture: ComponentFixture<FaultCommentComponent>;
  let component: FaultCommentComponent;
  let behaviourMapProvider: OutcomeBehaviourMapProvider;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FaultCommentComponent,
        MockComponent(DrivingFaultsBadgeComponent),
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DangerousFaultBadgeComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
      providers: [
        { provide: OutcomeBehaviourMapProvider, useClass: OutcomeBehaviourMapProvider },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FaultCommentComponent);
        behaviourMapProvider = TestBed.get(OutcomeBehaviourMapProvider);
        behaviourMapProvider.setBehaviourMap(behaviourMap);
        component = fixture.componentInstance;
        component.parentForm = new FormGroup({});
        const control = new FormControl(null);
        component.parentForm.addControl('faultComment-driving-id', control);
      });
  }));

  describe('DOM', () => {
    it('should display the fault competency display name', () => {
      component.faultComment = { comment: 'comment', competencyDisplayName: 'display', competencyIdentifier: 'id' };
      component.faultType = 'driving';
      component.ngOnChanges();
      fixture.detectChanges();

      const displayName = fixture.debugElement.query(By.css('.fault-label')).nativeElement;

      expect(displayName.innerHTML).toBe('display');
    });

    it('should add validators to the form field if > 15 driving faults.', () => {
      component.faultComment = {
        comment: 'comment',
        competencyDisplayName: 'Signals - timed',
        competencyIdentifier: 'signalsTimed',
        faultCount: 16,
      };
      component.faultType = 'driving';
      component.faultCount = 16;
      component.outcome = '5';
      const control = new FormControl(null);
      component.parentForm.addControl(`faultComment-driving-signalsTimed`, control);

      component.ngOnChanges();
      fixture.detectChanges();
      expect(component.parentForm.get('faultComment-driving-signalsTimed').validator).not.toBeNull();
    });
    it('should clear validators from the form field if < 16 driving faults.', () => {
      component.faultComment = {
        comment: 'comment',
        competencyDisplayName: 'Signals - timed',
        competencyIdentifier: 'signalsTimed',
        faultCount: 4,
      };
      component.faultType = 'driving';
      component.faultCount = 15;
      component.outcome = '5';
      const control = new FormControl(null);
      component.parentForm.addControl(`faultComment-driving-signalsTimed`, control);

      component.ngOnChanges();
      fixture.detectChanges();
      expect(component.parentForm.get('faultComment-driving-signalsTimed').validator).toBeNull();
    });

    it('should pass the fault count down to the driving-fault-badge', () => {
      component.faultComment = {
        comment: 'comment',
        competencyDisplayName: 'display',
        competencyIdentifier: 'id',
        faultCount: 3,
      };
      component.faultType = 'driving';
      component.ngOnChanges();
      fixture.detectChanges();

      const drivingFaultBadge: DrivingFaultsBadgeComponent = fixture.debugElement
        .query(By.css('driving-faults-badge')).componentInstance;
      expect(drivingFaultBadge.count).toBe(3);
    });
  });

});
