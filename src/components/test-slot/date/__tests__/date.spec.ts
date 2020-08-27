import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DateComponent } from '../date';
import { IonicModule } from 'ionic-angular';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LogHelper } from '../../../../providers/logs/logsHelper';
import { LogHelperMock } from '../../../../providers/logs/__mocks__/logsHelper.mock';
import { configureTestSuite } from 'ng-bullet';

describe('TimeComponent', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DateComponent],
      imports: [IonicModule],
      providers: [
        { provide: LogHelper, useClass: LogHelperMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    component.date = '2018-12-31T10:04:00+00:00';
  }));

  describe('DOM', () => {
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;
    });

    describe('Date output ', () => {
      it('should be displayed', () => {
        const dateSpan: HTMLElement = componentEl.query(By.css('p'))
          .nativeElement;
        fixture.detectChanges();
        expect(dateSpan.textContent).toBe('31/12/2018');
      });
    });
  });
});
