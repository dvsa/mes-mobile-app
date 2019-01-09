import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { TestCategoryIconComponent } from '../test-category-icon';

describe('Test Category Icon', () => {
  let fixture: ComponentFixture<TestCategoryIconComponent>;
  let component: TestCategoryIconComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestCategoryIconComponent],
      imports: [IonicModule.forRoot(TestCategoryIconComponent)],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestCategoryIconComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should show athe correct icon', () => {
      component.category = 'A';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/A.png');

      component.category = 'A1';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/A1.png');

      component.category = 'A2';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/A2.png');

      component.category = 'AM';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/AM.png');

      component.category = 'B';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/B.png');

      component.category = 'B1';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/B1.png');

      component.category = 'B+E';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/BE.png');

      component.category = 'C';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/C.png');

      component.category = 'C1';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/C1.png');

      component.category = 'C1+E';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/C1E.png');

      component.category = 'C+E';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/CE.png');

      component.category = 'D';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/D.png');

      component.category = 'D1';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/D1.png');

      component.category = 'D1+E';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/D1E.png');

      component.category = 'D+E';
      expect(component.getCategoryIcon()).toBe('assets/icon/test-categories/DE.png');
    })
  });

  describe('DOM', () => {

  });
});
