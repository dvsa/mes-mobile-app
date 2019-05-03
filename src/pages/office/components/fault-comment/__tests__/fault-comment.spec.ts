
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FaultCommentComponent } from '../fault-comment';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { DrivingFaultsBadgeComponent } from '../../../../../components/driving-faults-badge/driving-faults-badge';
import { SeriousFaultBadgeComponent } from '../../../../../components/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent } from '../../../../../components/dangerous-fault-badge/dangerous-fault-badge';
import { FormGroup } from '@angular/forms';

describe('FaultCommentComponent', () => {
  let fixture: ComponentFixture<FaultCommentComponent>;
  let component: FaultCommentComponent;

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
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FaultCommentComponent);
        component = fixture.componentInstance;
        component.parentForm = new FormGroup({});
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
