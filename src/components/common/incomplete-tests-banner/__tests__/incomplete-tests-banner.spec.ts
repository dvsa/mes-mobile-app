import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IncompleteTestsBanner } from '../incomplete-tests-banner';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';
import { StoreModule } from '@ngrx/store';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { testsReducer } from '../../../../modules/tests/tests.reducer';
import { journalReducer } from '../../../../modules/journal/journal.reducer';
import { SlotProvider } from '../../../../providers/slot/slot';
import { AppConfigProvider } from '../../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../../providers/app-config/__mocks__/app-config.mock';

describe('IncompleteTestsBanner', () => {
  let fixture: ComponentFixture<IncompleteTestsBanner>;
  let component: IncompleteTestsBanner;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IncompleteTestsBanner],
      imports: [
        IonicModule,
        StoreModule.forRoot({
          tests: testsReducer,
          journal: journalReducer,
        }),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: SlotProvider, useClass: SlotProvider },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(IncompleteTestsBanner);
        component = fixture.componentInstance;
      });
  }));

  describe('DOM', () => {
    it('should display the number of incomplete tests', () => {
      fixture.detectChanges();
      component.componentState = { count$: of(1) };

      fixture.detectChanges();
      const rendered = fixture.debugElement.query(By.css('span')).nativeElement.innerHTML;
      expect(rendered).toBe('You have 1 incomplete test');
    });
    it('should display the number of incomplete tests as plural', () => {
      fixture.detectChanges();
      component.componentState = { count$: of(5) };

      fixture.detectChanges();
      const rendered = fixture.debugElement.query(By.css('span')).nativeElement.innerHTML;
      expect(rendered).toBe('You have 5 incomplete tests');
    });
    it('should not be visible when the fault count is 0', () => {
      fixture.detectChanges();
      component.componentState = { count$: of(0) };

      fixture.detectChanges();
      const rendered = fixture.debugElement.query(By.css('div'));
      expect(rendered).toBeNull();
    });
  });
});
