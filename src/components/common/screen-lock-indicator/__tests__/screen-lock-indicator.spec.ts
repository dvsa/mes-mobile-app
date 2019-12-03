import { LockScreenIndicator } from '../lock-screen-indicator';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { translateServiceMock } from '../../../../shared/__mocks__/translate';
import { configureTestSuite } from 'ng-bullet';

describe('LockScreenIndicator', () => {
  let fixture: ComponentFixture<LockScreenIndicator>;
  let component: LockScreenIndicator;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        LockScreenIndicator,
      ],
      imports: [
        TranslateModule,
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    });
  });

  beforeEach(async(() => {
        fixture = TestBed.createComponent(LockScreenIndicator);
        component = fixture.componentInstance;
  }));
  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });
});
