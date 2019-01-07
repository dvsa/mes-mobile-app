import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateComponent } from '../candidate';
import { IonicModule } from 'ionic-angular';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('CandidateComponent', () => {
  let component: CandidateComponent;
  let fixture: ComponentFixture<CandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateComponent],
      imports: [IonicModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CandidateComponent);
        component = fixture.componentInstance;
        component.testCategory = 'B57mins';
        component.name = { title: '', firstName: '', lastName: ''}
        component.name.title =  'Mr';
        component.name.firstName = 'Joe';
        component.name.lastName = 'Bloggs';
        component.welshLanguage = false;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('getTestCategory', () => {
      it('should return N/A for a null test category', () => {
        component.testCategory = null;
        fixture.detectChanges();
        expect(component.testCategoryDescription).toBe('N/A');
      });
      it('should extract the textual part of test category', () => {
        component.testCategory = 'B57mins';
        fixture.detectChanges();
        expect(component.testCategoryDescription).toBe('Cat B');
      });
    });
  });

  describe('DOM', () => {
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;
    });

    describe('candidate name', () => {
      it('should be displayed', () => {
        const nameSpan: HTMLElement = componentEl.query(By.css('ion-row:first-child h5'))
          .nativeElement;
        fixture.detectChanges();
        expect(nameSpan.textContent).toBe('Mr Joe Bloggs');
      });
    });

    describe('test category', () => {
      it('should be displayed', () => {
        const categorySpan: HTMLElement = componentEl.query(By.css('ion-row:last-child h5'))
          .nativeElement;
        fixture.detectChanges();
        expect(categorySpan.textContent).toBe('Cat B');
      });
    });

    describe('test category b image', () => {
      it ('should be displayed', () => {
        const categoryImage: HTMLImageElement = componentEl.query(By.css('img'))
          .nativeElement;
        fixture.detectChanges();
        expect(categoryImage.src).toContain('assets/icon/test-categories/category-b.png');
      });
    });
    
    describe('test welsh languge true', () => {
      it ('should display welsh language image', () => {
        component.welshLanguage = true;
        fixture.detectChanges();
        const renderedImages = fixture.debugElement.queryAll(By.css('.welsh-language-indicator'));
        expect(renderedImages).toHaveLength(1);
      });
    });

    describe('test welsh languge false', () => {
      it ('should not display welsh language image', () => {
        component.welshLanguage = false;
        fixture.detectChanges();
        const renderedImages = fixture.debugElement.queryAll(By.css('.welsh-language-indicator'));
        expect(renderedImages).toHaveLength(0);
      });
    });

  });
});
