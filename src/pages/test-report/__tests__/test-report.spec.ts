
import { ManoeuvresComponent } from './../components/manoeuvres/manoeuvres';
import { ManoeuvresPopoverComponent } from './../components/manoeuvres-popover/manoeuvres-popover';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, ModalController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, ModalControllerMock, AppMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';

import { AppModule } from '../../../app/app.module';
import { TestReportPage } from '../test-report';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { CompetencyComponent } from '../components/competency/competency';
import { CompetencyButtonComponent } from '../components/competency-button/competency-button';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { DrivingFaultSummaryComponent } from '../components/driving-fault-summary/driving-fault-summary';
import { TickIndicatorComponent } from '../components/tick-indicator/tick-indicator';
import { ToolbarComponent } from '../components/toolbar/toolbar';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { testReportReducer } from '../test-report.reducer';
import { LegalRequirementComponent } from '../components/legal-requirement/legal-requirement';
import { EtaComponent } from '../components/examiner-takes-action/eta';
import { initialState } from '../../../modules/tests/test-data/test-data.reducer';
import { ControlledStopComponent } from '../components/controlled-stop/controlled-stop';
import { ManoeuvreCompetencyComponent } from '../components/manoeuvre-competency/manoeuvre-competency';
import { VehicleCheckComponent } from '../components/vehicle-check/vehicle-check';
import { EcoComponent } from '../components/eco/eco';

describe('TestReportPage', () => {
  let fixture: ComponentFixture<TestReportPage>;
  let component: TestReportPage;

  const mockCandidate = {
    driverNumber: '123',
    candidateName: {
      firstName: 'Joe',
      lastName: 'Bloggs',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestReportPage,
        MockComponent(ManoeuvresPopoverComponent),
        MockComponent(ManoeuvresComponent),
        MockComponent(TickIndicatorComponent),
        MockComponent(CompetencyComponent),
        MockComponent(CompetencyButtonComponent),
        MockComponent(LegalRequirementComponent),
        MockComponent(EtaComponent),
        MockComponent(DrivingFaultSummaryComponent),
        MockComponent(ToolbarComponent),
        MockComponent(ControlledStopComponent),
        MockComponent(ManoeuvreCompetencyComponent),
        MockComponent(VehicleCheckComponent),
        MockComponent(EcoComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forFeature('tests', () => (
          {
            currentTest: {
              slotId: '123',
            },
            testLifecycles: {},
            startedTests: {
              123: {
                testData: initialState,
                candidate: mockCandidate,
              },
            },
          })),
        StoreModule.forFeature('testReport', testReportReducer),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestReportPage);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {

    describe('Fault Modes Styling', () => {
      it('should not have any fault mode styles applied when serious and dangerous mode is disabled', () => {
        expect(fixture.debugElement.query(By.css('.serious-mode'))).toBeNull();
        expect(fixture.debugElement.query(By.css('.dangerous-mode'))).toBeNull();
      });
      it('should have serious fault mode styles applied when serious mode is enabled', () => {
        component.isSeriousMode = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.serious-mode'))).toBeDefined();
        expect(fixture.debugElement.query(By.css('.dangerous-mode'))).toBeNull();
      });
      it('should have dangerous fault mode styles applied when dangerous mode is enabled', () => {
        component.isDangerousMode = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.serious-mode'))).toBeNull();
        expect(fixture.debugElement.query(By.css('.dangerous-mode'))).toBeDefined();
      });
    });

  });
});
