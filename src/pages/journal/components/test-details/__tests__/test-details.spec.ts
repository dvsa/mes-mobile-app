import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { TestDetailsComponent } from '../test-details';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Test Details', () => {
  let fixture: ComponentFixture<TestDetailsComponent>;
  let component: TestDetailsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestDetailsComponent],
      imports: [IonicModule.forRoot(TestDetailsComponent)],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestDetailsComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
    it('should get correct icon for cat B test', () => {
      component.category = 'B';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/category-b.png');
    });
    it('should not show additional details for a cat B test', () => {
      component.category = 'B';
      expect(component.showAdditionalInformation()).toBeFalsy();
    })
  });

  describe('DOM', () => {

    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;
    });

  });
});
