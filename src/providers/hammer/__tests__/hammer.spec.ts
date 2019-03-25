import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { HammerProvider } from '../hammer';
import { CompetencyComponent } from '../../../pages/test-report/components/competency/competency';

describe('HammerProvider', () => {
  let fixture: ComponentFixture<CompetencyComponent>;
  let hammerProvider: HammerProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompetencyComponent,
      ],
      providers: [
        HammerProvider,
      ],
    })
      .compileComponents()
      .then(() => {
        hammerProvider = TestBed.get(HammerProvider);
        fixture = TestBed.createComponent(CompetencyComponent);
      });
  }));

  describe('addPressAndHoldEvent', () => {
    it('should invoke the provided callback when "pressAndHold" is emitted', () => {
      const { elementRef } = fixture;
      hammerProvider.init(elementRef);
      const postHoldCallback = jasmine.createSpy('someCallback');
      hammerProvider.addPressAndHoldEvent(postHoldCallback);

      hammerProvider.hammerManager.emit('pressAndHold', {});

      expect(postHoldCallback).toHaveBeenCalled();
    });
  });

  describe('addPressEvent', () => {
    it('should invoke the provided callback when "press" is emitted', () => {
      const { elementRef } = fixture;
      hammerProvider.init(elementRef);
      const pressCallback = jasmine.createSpy('someCallback');
      hammerProvider.addPressEvent(pressCallback);

      hammerProvider.hammerManager.emit('press', {});

      expect(pressCallback).toHaveBeenCalled();
    });
  });
});
