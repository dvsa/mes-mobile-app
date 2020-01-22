import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HammerProvider } from '../hammer';
import { Component } from '@angular/core';
import { configureTestSuite } from 'ng-bullet';
@Component({
  selector: 'mock-component',
  template: '<button>Test</button>',
})
class MockComponent  {
  constructor() {}
}

describe('HammerProvider', () => {
  let fixture: ComponentFixture<MockComponent>;
  let hammerProvider: HammerProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent,
      ],
      providers: [
        HammerProvider,
      ],
    })
      .compileComponents()
      .then(() => {
        hammerProvider = TestBed.get(HammerProvider);
        fixture = TestBed.createComponent(MockComponent);
      });
  });

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
