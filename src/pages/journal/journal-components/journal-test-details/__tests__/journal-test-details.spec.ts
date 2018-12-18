import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { JournalTestDetailsComponent } from '../journal-test-details';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Journal Test Details', () => {
  let fixture: ComponentFixture<JournalTestDetailsComponent>;
  let component: JournalTestDetailsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalTestDetailsComponent],
      imports: [IonicModule.forRoot(JournalTestDetailsComponent)],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalTestDetailsComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {

    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;
    });

    it('should correctly display to test centre name', () => {
      const nameToTest = 'example test centre';
      component.testCentreName = nameToTest;
      fixture.detectChanges();
      const centreName = componentEl.query(By.css('span'));
      expect(centreName.nativeElement.innerHTML).toBe(nameToTest);
    });

  });
});
