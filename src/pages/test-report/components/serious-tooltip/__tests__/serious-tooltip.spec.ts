import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { SeriousTooltipComponent } from '../serious-tooltip';

describe('SeriousTooltipComponenet', () => {
  let fixture: ComponentFixture<SeriousTooltipComponent>;
  let component: SeriousTooltipComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SeriousTooltipComponent,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SeriousTooltipComponent);
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
