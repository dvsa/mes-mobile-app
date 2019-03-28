import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DrivingFaultSummaryComponent } from '../driving-fault-summary';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { IonicModule, Config } from 'ionic-angular';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';
import { Subscription } from 'rxjs/Subscription';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { TestOutcomeStartTest } from '../../../../journal/components/test-outcome/test-outcome.actions';
import { AddDrivingFault } from '../../../../../modules/tests/test_data/test-data.actions';
import { Competencies } from '../../../../../modules/tests/test_data/test-data.constants';

fdescribe('DrivingFaultSummary', () => {
  let fixture: ComponentFixture<DrivingFaultSummaryComponent>;
  let component: DrivingFaultSummaryComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DrivingFaultSummaryComponent,
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer }),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DrivingFaultSummaryComponent);
        component = fixture.componentInstance;
        component.subscription = new Subscription();
      });

    store$ = TestBed.get(Store);
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;

      store$.dispatch(new TestOutcomeStartTest({ slotDetail: { slotId: 103 } }));
    });

    it('should display 0 driving faults', () => {
      fixture.detectChanges();
      const summaryCount: HTMLElement = componentEl.query(By.css('#summary-count')).nativeElement;
      expect(summaryCount.textContent).toBe('0');
    });

    it('should display 3 driving faults', () => {
      store$.dispatch(new AddDrivingFault({ competency: Competencies.clearance, newFaultCount: 1 }));
      store$.dispatch(new AddDrivingFault({ competency: Competencies.controlsSteering, newFaultCount: 1 }));
      store$.dispatch(new AddDrivingFault({ competency: Competencies.moveOffControl, newFaultCount: 1 }));

      fixture.detectChanges();

      const summaryCount: HTMLElement = componentEl.query(By.css('#summary-count')).nativeElement;
      expect(summaryCount.textContent).toBe('3');
    });
  });
});
