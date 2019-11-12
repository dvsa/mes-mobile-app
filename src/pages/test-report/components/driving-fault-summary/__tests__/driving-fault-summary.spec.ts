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
import { StartTest } from '../../../../../modules/tests/tests.actions';
import { AddDrivingFault } from '../../../../../modules/tests/test-data/driving-faults/driving-faults.actions';
import { Competencies } from '../../../../../modules/tests/test-data/test-data.constants';
import { TestCategory } from '../../../../../shared/models/test-category';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';

describe('DrivingFaultSummary', () => {
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
        FaultCountProvider,
      ],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DrivingFaultSummaryComponent);
        component = fixture.componentInstance;
        component.subscription = new Subscription();
      });

    store$ = TestBed.get(Store);
  }));

  describe('DOM', () => {
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;

      store$.dispatch(new StartTest(103, TestCategory.B));
    });

    it('should display 0 driving faults for a new test', () => {
      fixture.detectChanges();
      const summaryCount: HTMLElement = componentEl.query(By.css('#summary-count')).nativeElement;
      expect(summaryCount.textContent).toBe('0');
    });

    it('should display 3 driving faults when 3 driving faults have been marked', () => {
      store$.dispatch(new AddDrivingFault({ competency: Competencies.clearance, newFaultCount: 1 }));
      store$.dispatch(new AddDrivingFault({ competency: Competencies.controlsSteering, newFaultCount: 1 }));
      store$.dispatch(new AddDrivingFault({ competency: Competencies.moveOffControl, newFaultCount: 1 }));

      fixture.detectChanges();

      const summaryCount: HTMLElement = componentEl.query(By.css('#summary-count')).nativeElement;
      expect(summaryCount.textContent).toBe('3');
    });
  });
});
