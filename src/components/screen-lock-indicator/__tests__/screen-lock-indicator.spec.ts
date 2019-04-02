import { LockScreenIndicator } from '../lock-screen-indicator';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

describe('LockScreenIndicator', () => {
  let fixture: ComponentFixture<LockScreenIndicator>;
  let component: LockScreenIndicator;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LockScreenIndicator],
    })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(LockScreenIndicator);
          component = fixture.componentInstance;
        });
  }));
  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });
});
