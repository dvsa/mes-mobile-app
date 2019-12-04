import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DangerousFaultBadgeComponent } from '../dangerous-fault-badge';
import { configureTestSuite } from 'ng-bullet';

describe('DangerousFaultBadgeComponenet', () => {
  let fixture: ComponentFixture<DangerousFaultBadgeComponent>;
  let component: DangerousFaultBadgeComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DangerousFaultBadgeComponent,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DangerousFaultBadgeComponent);
    component = fixture.componentInstance;
  }));

  describe('DOM', () => {
    it('should display badge if showBadge is true', () => {
      component.showBadge = true;

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.background'))).toBeDefined();
    });
    it('should not display badge if showBadge is false', () => {
      component.showBadge = false;

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.background'))).toBeNull();
    });
  });
});
