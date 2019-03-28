import { ToolbarComponent } from '../toolbar';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DrivingFaultSummaryComponent } from '../../driving-fault-summary/driving-fault-summary';
import { IonicModule, Config } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { ConfigMock } from 'ionic-mocks';

describe('ToolbarComponent', () => {
  let fixture: ComponentFixture<ToolbarComponent>;
  let component: ToolbarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        DrivingFaultSummaryComponent,
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer }),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
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
