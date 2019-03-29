import { ToolbarComponent } from '../toolbar';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DrivingFaultSummaryComponent } from '../../driving-fault-summary/driving-fault-summary';
import { IonicModule, Config, NavController } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { ConfigMock, NavControllerMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { SeriousTooltipComponent } from '../../serious-tooltip/serious-tooltip';

describe('ToolbarComponent', () => {
  let fixture: ComponentFixture<ToolbarComponent>;
  let component: ToolbarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        MockComponent(DrivingFaultSummaryComponent),
        MockComponent(SeriousTooltipComponent),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer }),
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
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {

  });
});
