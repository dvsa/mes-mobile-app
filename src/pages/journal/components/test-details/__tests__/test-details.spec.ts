import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { TestDetailsComponent } from '../test-details';
import { By } from '@angular/platform-browser';

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
    it('should show additional details correctly', () => {
      component.category = 'A';
      expect(component.showAdditionalInformation()).toBeFalsy();

      component.category = 'A1';
      expect(component.showAdditionalInformation()).toBeFalsy();

      component.category = 'A2';
      expect(component.showAdditionalInformation()).toBeFalsy();

      component.category = 'AM';
      expect(component.showAdditionalInformation()).toBeFalsy();

      component.category = 'B';
      expect(component.showAdditionalInformation()).toBeFalsy();

      component.category = 'B1';
      expect(component.showAdditionalInformation()).toBeFalsy();

      component.category = 'B+E';
      expect(component.showAdditionalInformation()).toBeFalsy();

      component.category = 'C';
      expect(component.showAdditionalInformation()).toBeTruthy();

      component.category = 'C1';
      expect(component.showAdditionalInformation()).toBeTruthy();

      component.category = 'C1+E';
      expect(component.showAdditionalInformation()).toBeTruthy();

      component.category = 'C+E';
      expect(component.showAdditionalInformation()).toBeTruthy();

      component.category = 'D';
      expect(component.showAdditionalInformation()).toBeTruthy();

      component.category = 'D1';
      expect(component.showAdditionalInformation()).toBeTruthy();

      component.category = 'D1+E';
      expect(component.showAdditionalInformation()).toBeTruthy();

      component.category = 'D+E';
      expect(component.showAdditionalInformation()).toBeTruthy();
    });
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

    it('should show transmission if show additional info is true', () => {
      component.category = 'C';
      fixture.detectChanges();
      const additionalInfo = fixture.debugElement.queryAll(By.css('.transmission'));
      expect(additionalInfo).toHaveLength(1);
    });

    it('should not show transmission if show additional info is false', () => {
      component.category = 'B';
      fixture.detectChanges();
      const additionalInfo = fixture.debugElement.queryAll(By.css('.transmission'));
      expect(additionalInfo).toHaveLength(0);
    });

    it('should show additional information if show additional info is true', () => {
      component.category = 'C';
      fixture.detectChanges();
      const additionalInfo = fixture.debugElement.queryAll(By.css('.additional-test-information'));
      expect(additionalInfo).toHaveLength(1);
    });

    it('should not show additional information if show additional info is false', () => {
      component.category = 'B';
      fixture.detectChanges();
      const additionalInfo = fixture.debugElement.queryAll(By.css('.additional-test-information'));
      expect(additionalInfo).toHaveLength(0);
    });

  });
});
