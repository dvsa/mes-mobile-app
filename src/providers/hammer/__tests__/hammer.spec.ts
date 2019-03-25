import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { HammerProvider } from '../hammer';
import { Component } from '@angular/core';

@Component({
  selector: 'dummy-component',
  template: '<p>dummy</p>',
})
class DummyComponent {}

describe('HammerProvider', () => {
  let fixture: ComponentFixture<DummyComponent>;
  let hammerProvider: HammerProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DummyComponent,
      ],
      providers: [
        HammerProvider,
      ],
    })
      .compileComponents()
      .then(() => {
        hammerProvider = TestBed.get(HammerProvider);
        fixture = TestBed.createComponent(DummyComponent);
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
