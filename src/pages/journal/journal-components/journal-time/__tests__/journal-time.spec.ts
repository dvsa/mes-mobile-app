import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalTimeComponent } from '../journal-time';
import { IonicModule } from 'ionic-angular';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('JournalTimeComponent', () => {
  let component: JournalTimeComponent;
  let fixture: ComponentFixture<JournalTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalTimeComponent],
      imports: [IonicModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalTimeComponent);
        component = fixture.componentInstance;
        component.time =  '2018-12-10T10:04:00+00:00';
        component.testComplete = true;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

  describe('DOM', () => {
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;
    });

    describe('Time output ', () => {
      it('should be displayed', () => {
        const timeSpan: HTMLElement = componentEl.query(By.css('ion-row:first-child span'))
          .nativeElement;
        fixture.detectChanges();
        expect(timeSpan.textContent).toBe('10:04');
      });
    });

    describe('class if test complete ', () => {
      it('should be journal-time-test-complete-text', () => {
        fixture.detectChanges();
        const timeSpan: any = componentEl.query(By.css('ion-row:first-child span'));
        expect(timeSpan.classes['journal-time-test-complete-text']).toBeTruthy();
      });
    });



    });
  });
});