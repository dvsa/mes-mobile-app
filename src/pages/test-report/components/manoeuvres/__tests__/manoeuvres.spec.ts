import { TickIndicatorComponent } from '../../../../../components/common/tick-indicator/tick-indicator';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ManoeuvresComponent } from '../manoeuvres';
import { AppModule } from '../../../../../app/app.module';
import { MockComponent } from 'ng-mocks';
import {
  DrivingFaultsBadgeComponent,
} from '../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { SeriousFaultBadgeComponent } from '../../../../../components/common/serious-fault-badge/serious-fault-badge';
import {
  DangerousFaultBadgeComponent,
} from '../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../test-report.reducer';
import { StartTest } from '../../../../../modules/tests/tests.actions';

describe('ManoeuvresComponent', () => {
  let fixture: ComponentFixture<ManoeuvresComponent>;
  let component: ManoeuvresComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManoeuvresComponent,
        TickIndicatorComponent,
        MockComponent(DrivingFaultsBadgeComponent),
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DangerousFaultBadgeComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({ tests: testsReducer, testReport: testReportReducer }),
      ],
      providers: [
        { provide: DateTimeProvider, useCalss: DateTimeProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ManoeuvresComponent);
        component = fixture.componentInstance;
        const store$ = TestBed.get(Store);

        store$.dispatch(new StartTest(103));
      });
  }));

  describe('DOM', () => {
    describe('Button', () => {
      it('should show provided label', () => {
        component.controlLabel = 'a label';
        fixture.detectChanges();
        const label = fixture.debugElement.query(By.css('.label'));
        expect(label.nativeElement.innerHTML).toBe('a label');
      });
    });
    describe('Button', () => {
      it('should display popover type control content when displayPopover is true', () => {
        component.displayPopover = true;
        fixture.detectChanges();
        const tickDe = fixture.debugElement.query(By.css('.popover'));
        expect(tickDe).toBeDefined();
      });
    });
  });
});
