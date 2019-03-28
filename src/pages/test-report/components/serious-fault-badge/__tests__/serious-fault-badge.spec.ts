import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SeriousFaultBadgeComponent } from '../serious-fault-badge';

describe('FaultCounterComponent', () => {
  let fixture: ComponentFixture<SeriousFaultBadgeComponent>;
  let component: SeriousFaultBadgeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SeriousFaultBadgeComponent,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SeriousFaultBadgeComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    it('should display badge if showBadge is true', () => {
      component.showBadge = true;

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#background'))).toBeDefined();
    });
    it('should not display badge if showBadge is false', () => {
      component.showBadge = false;

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#background'))).toBeNull();
    });
  });
});
