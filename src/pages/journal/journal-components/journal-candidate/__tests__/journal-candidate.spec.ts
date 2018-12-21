import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalCandidateComponent } from '../journal-candidate';
import { IonicModule } from 'ionic-angular';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('JournalCandidateComponent', () => {
  let component: JournalCandidateComponent;
  let fixture: ComponentFixture<JournalCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalCandidateComponent],
      imports: [IonicModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalCandidateComponent);
        component = fixture.componentInstance;
        component.name.title =  'Mr';
        component.name.firstName = 'Joe';
        component.name.lastName = 'Bloggs';
        component.testCategory = 'B57mins';
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
  });
});