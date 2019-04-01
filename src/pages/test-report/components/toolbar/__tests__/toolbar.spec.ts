import { ToolbarComponent } from '../toolbar';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DrivingFaultSummaryComponent } from '../../driving-fault-summary/driving-fault-summary';
import { IonicModule, Config, NavController } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { ConfigMock, NavControllerMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { SeriousTooltipComponent } from '../../serious-tooltip/serious-tooltip';
import { StoreModel } from '../../../../../shared/models/store.model';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../../test-report.actions';
import { testReportReducer } from '../../../test-report.reducer';
import { DangerousTooltipComponent } from '../../dangerous-tooltip/dangerous-tooltip';

describe('ToolbarComponent', () => {
  let fixture: ComponentFixture<ToolbarComponent>;
  let component: ToolbarComponent;
  let store$: Store<StoreModel>;
  let storeDispatchSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        MockComponent(DrivingFaultSummaryComponent),
        MockComponent(SeriousTooltipComponent),
        MockComponent(DangerousTooltipComponent),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer, testReport : testReportReducer }),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        storeDispatchSpy = spyOn(store$, 'dispatch');
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('toggleSeriousMode', () => {
      it('should dispatch a TOGGLE_SERIOUS_FAULT_MODE action', () => {
        component.toggleSeriousMode();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
      it('should dispatch a TOGGLE_DANGEROUS_FAULT_MODE action if dangerous mode is active', () => {
        component.isDangerousMode = true;
        component.toggleSeriousMode();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
    });

    describe('toggleDangerousMode', () => {
      it('should dispatch a TOGGLE_DANGEROUS_FAULT_MODE action', () => {
        component.toggleDangerousMode();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
    });
  });

  describe('DOM', () => {

  });
});
