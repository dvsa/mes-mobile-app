import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DangerousTooltipComponent } from '../dangerous-tooltip';

describe('DangerousTooltipComponent', () => {
  let fixture: ComponentFixture<DangerousTooltipComponent>;
  let component: DangerousTooltipComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DangerousTooltipComponent,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DangerousTooltipComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {

  });
});
