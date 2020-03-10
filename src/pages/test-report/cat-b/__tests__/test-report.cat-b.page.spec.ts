
import { ManoeuvresComponent } from '../components/manoeuvres/manoeuvres';
import { ManoeuvresPopoverComponent } from '../components/manoeuvres-popover/manoeuvres-popover';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, ModalController } from 'ionic-angular';
import {
  NavControllerMock,
  NavParamsMock,
  ConfigMock,
  PlatformMock,
  ModalControllerMock,
  StatusBarMock,
} from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';

import { AppModule } from '../../../../app/app.module';
import { TestReportCatBPage } from '../test-report.cat-b.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { CompetencyComponent } from '../../components/competency/competency';
import { CompetencyButtonComponent } from '../../components/competency-button/competency-button';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { DrivingFaultSummaryComponent } from '../../components/driving-fault-summary/driving-fault-summary';
import { TickIndicatorComponent } from '../../../../components/common/tick-indicator/tick-indicator';
import { ToolbarComponent } from '../../components/toolbar/toolbar';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { testReportReducer } from '../../test-report.reducer';
import { LegalRequirementComponent } from '../../components/legal-requirement/legal-requirement';
import { EtaComponent } from '../../components/examiner-takes-action/eta';
import { initialState } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { ControlledStopComponent } from '../../components/controlled-stop/controlled-stop';
import { ManoeuvreCompetencyComponent } from '../../components/manoeuvre-competency/manoeuvre-competency';
import { VehicleCheckComponent } from '../components/vehicle-check/vehicle-check';
import { EcoComponent } from '../../components/eco/eco';
import { TestReportValidatorProvider } from '../../../../providers/test-report-validator/test-report-validator';
import {
  TestReportValidatorProviderMock,
} from '../../../../providers/test-report-validator/__mocks__/test-report-validator.mock';
import { ModalEvent } from '../../test-report.constants';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { InsomniaMock } from '../../../../shared/mocks/insomnia.mock';
import { ScreenOrientationMock } from '../../../../shared/mocks/screen-orientation.mock';
import { PracticeModeBanner } from '../../../../components/common/practice-mode-banner/practice-mode-banner';
import { StatusBar } from '@ionic-native/status-bar';
import { CAT_B } from '../../../page-names.constants';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { configureTestSuite } from 'ng-bullet';

describe('TestReportCatBPage', () => {
  let fixture: ComponentFixture<TestReportCatBPage>;
  let component: TestReportCatBPage;
  let navController: NavController;
  let screenOrientation: ScreenOrientation;
  let insomnia: Insomnia;
  let statusBar: StatusBar;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [TestReportCatBPage,
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
        MockComponent(PracticeModeBanner),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forFeature('tests', () => (
          {
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                testData: initialState,
                journalData: {
                  candidate: candidateMock,
                },
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
        { provide: TestReportValidatorProvider, useClass: TestReportValidatorProviderMock },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },
        { provide: Insomnia, useClass: InsomniaMock },
        { provide: StatusBar, useFactory: () => StatusBarMock.instance() },
        { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestReportCatBPage);
    component = fixture.componentInstance;
    navController = TestBed.get(NavController);
    screenOrientation = TestBed.get(ScreenOrientation);
    insomnia = TestBed.get(Insomnia);
    statusBar = TestBed.get(StatusBar);
  }));

  describe('Class', () => {
    describe('onModalDismiss', () => {
      it('should navigate to debrief page when passed a CONTINUE event', () => {
        component.onModalDismiss(ModalEvent.CONTINUE);
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_B.DEBRIEF_PAGE);
      });
    });

    describe('ionViewWillEnter', () => {
      it('should enable the plugins when the test is a practice test', () => {
        component.isPracticeMode = true;
        component.ionViewWillEnter();
        expect(screenOrientation.lock).toHaveBeenCalled();
        expect(insomnia.keepAwake).toHaveBeenCalled();
        expect(statusBar.hide).toHaveBeenCalled();
      });
      it('should not enable the plugins when the test is not a practice test', () => {
        component.isPracticeMode = false;
        component.ionViewWillEnter();
        expect(screenOrientation.lock).not.toHaveBeenCalled();
        expect(insomnia.keepAwake).not.toHaveBeenCalled();
        expect(statusBar.show).not.toHaveBeenCalled();
      });
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

  describe('End Test Button', () => {
    it('should call the end test function', () => {
      spyOn(component, 'onEndTestClick');
      const endTestButton = fixture.debugElement.query(By.css('#end-test-button'));
      endTestButton.triggerEventHandler('click', null);
      expect(component.onEndTestClick).toHaveBeenCalled();
    });
  });

});
