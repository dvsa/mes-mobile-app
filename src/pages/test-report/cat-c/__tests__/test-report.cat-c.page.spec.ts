
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, ModalController } from 'ionic-angular';
import {
  NavControllerMock,
  NavParamsMock,
  ConfigMock,
  PlatformMock,
  ModalControllerMock,
} from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';

import { AppModule } from '../../../../app/app.module';
import { TestReportCatCPage } from '../test-report.cat-c.page';
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
import { initialState } from '../../../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import { EcoComponent } from '../../components/eco/eco';
import { TestReportValidatorProvider } from '../../../../providers/test-report-validator/test-report-validator';
import {
  TestReportValidatorProviderMock,
} from '../../../../providers/test-report-validator/__mocks__/test-report-validator.mock';
import { ModalEvent } from '../../test-report.constants';
import { CAT_C } from '../../../page-names.constants';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { UncoupleRecoupleComponent } from '../../components/uncouple-recouple/uncouple-recouple';
import { VehicleChecksComponent } from '../components/vehicle-checks/vehicle-checks';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { configureTestSuite } from 'ng-bullet';
import { ReverseLeftPopoverComponent } from '../../components/reverse-left-popover/reverse-left-popover';
import { ReverseLeftComponent } from '../../components/reverse-left/reverse-left';

describe('TestReportCatCPage', () => {
  let fixture: ComponentFixture<TestReportCatCPage>;
  let component: TestReportCatCPage;
  let navController: NavController;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [TestReportCatCPage,
        MockComponent(TickIndicatorComponent),
        MockComponent(CompetencyComponent),
        MockComponent(CompetencyButtonComponent),
        MockComponent(LegalRequirementComponent),
        MockComponent(EtaComponent),
        MockComponent(DrivingFaultSummaryComponent),
        MockComponent(ToolbarComponent),
        MockComponent(EcoComponent),
        MockComponent(UncoupleRecoupleComponent),
        MockComponent(ReverseLeftComponent),
        MockComponent(ReverseLeftPopoverComponent),
        MockComponent(VehicleChecksComponent),
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
        { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestReportCatCPage);
    component = fixture.componentInstance;
    navController = TestBed.get(NavController);
  }));

  describe('Class', () => {
    describe('onModalDismiss', () => {
      it('should navigate to debrief page when passed a CONTINUE event', () => {
        component.onModalDismiss(ModalEvent.CONTINUE);
        const { calls } = navController.push as jasmine.Spy;

        expect(calls.argsFor(0)[0]).toBe(CAT_C.DEBRIEF_PAGE);
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

  describe('showUncoupleRecouple', () => {
    it('should return false when the test is a category C', () => {
      component.testCategory = TestCategory.C;
      expect(component.showUncoupleRecouple()).toBeFalsy();
    });

    it('should return false when the test is a category C1', () => {
      component.testCategory = TestCategory.C1;
      expect(component.showUncoupleRecouple()).toBeFalsy();
    });

    it('should return true when the test is a category C1E', () => {
      component.testCategory = TestCategory.C1E;
      expect(component.showUncoupleRecouple()).toBeTruthy();
    });

    it('should return true when the test is a category CE', () => {
      component.testCategory = TestCategory.CE;
      expect(component.showUncoupleRecouple()).toBeTruthy();
    });
  });
});
