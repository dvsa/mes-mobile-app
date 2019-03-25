import { FaultCounterComponent } from '../fault-counter';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('FaultCounterComponent', () => {
  let fixture: ComponentFixture<FaultCounterComponent>;
  let component: FaultCounterComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FaultCounterComponent,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FaultCounterComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    it('should display the number of faults in the DOM', () => {
      component.count = 5;

      fixture.detectChanges();

      const renderedCount = fixture.debugElement.query(By.css('#count')).nativeElement.innerHTML;
      expect(renderedCount).toBe('5');
    });
  });

  it('should not be visible when the fault count is 0', () => {
    const divsInContainer = fixture.debugElement.queryAll(By.css('div'));

    expect(divsInContainer.length).toBe(0);
  });
});
