import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalCandidateInfoComponent } from '../journal-candidate-info';
import { IonicModule } from 'ionic-angular';
import { getFormattedCandidateName } from '../../../shared/utils/formatters';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

jest.mock('../../../shared/utils/formatters');
const mockGetFormattedCandidateName = <jest.Mock>getFormattedCandidateName;

describe('JournalCandidateInfoComponent', () => {
  let component: JournalCandidateInfoComponent;
  let fixture: ComponentFixture<JournalCandidateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalCandidateInfoComponent],
      imports: [IonicModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalCandidateInfoComponent);
    component = fixture.componentInstance;
    component.candidateName = { title: 'Mr', firstName: 'Joe', lastName: 'Bloggs' };
    component.testCategory = 'B57mins';
  });

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('getName', () => {
      it('should return the result of passing the candidate name to the name formatter', () => {
        mockGetFormattedCandidateName.mockReturnValue('Joe Bloggs');
        expect(component.name).toBe('Joe Bloggs');
        expect(mockGetFormattedCandidateName).toHaveBeenCalled();
      });
    });

    describe('extractCategoryCode', () => {
      it('should return N/A for a null test category', () => {
        component.testCategory = null;
        expect(component.categoryCode).toBe('N/A');
      });
      it('should extract the textual part of test category', () => {
        component.testCategory = 'B57mins';
        expect(component.categoryCode).toBe('B');
      });
    });
  });

  describe('DOM', () => {
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;
    });

    describe('test completion class', () => {
      const testCompletionClass = 'journal-candidate-info-test-complete-text';
      let topLevelDivEl: HTMLElement;
      let categoryImgEl: HTMLElement;

      beforeEach(() => {
        topLevelDivEl = componentEl.query(By.css('div')).nativeElement;
        categoryImgEl = componentEl.query(By.css('img')).nativeElement;
      });

      describe('when the test is not complete', () => {
        it('should not be applied', () => {
          component.testComplete = false;
          fixture.detectChanges();
          expect(topLevelDivEl.classList).not.toContain(testCompletionClass);
          expect(categoryImgEl.classList).not.toContain(testCompletionClass);
        });
      });
      describe('when the test is complete', () => {
        it('should be applied', () => {
          component.testComplete = true;
          fixture.detectChanges();
          expect(topLevelDivEl.classList).toContain(testCompletionClass);
          // expect(categoryImgEl.classList).toContain(testCompletionClass);
        });
      });
    });

    describe('candidate name', () => {
      it('should be displayed', () => {
        const nameSpan: HTMLElement = componentEl.query(By.css('ion-row:first-child span'))
          .nativeElement;
        fixture.detectChanges();
        expect(nameSpan.textContent).toBe('Joe Bloggs');
      });
    });

    describe('test category', () => {
      it('should be displayed', () => {
        const categorySpan: HTMLElement = componentEl.query(By.css('ion-row:last-child span'))
          .nativeElement;
        fixture.detectChanges();
        expect(categorySpan.textContent).toBe('Cat B');
      });
    });
  });
});
