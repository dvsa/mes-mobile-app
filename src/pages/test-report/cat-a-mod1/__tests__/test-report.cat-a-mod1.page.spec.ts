
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
import { TestReportCatAMod1Page } from '../test-report.cat-a-mod1.page';
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
import { StoreModule, Store } from '@ngrx/store';
import { testReportReducer } from '../../test-report.reducer';
import { LegalRequirementComponent } from '../../components/legal-requirement/legal-requirement';
import { EtaComponent } from '../../components/examiner-takes-action/eta';

// TODO - PREP-AMOD1: Use cat amod1 reducer
import { initialState } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { EcoComponent } from '../../components/eco/eco';
import { TestReportValidatorProvider } from '../../../../providers/test-report-validator/test-report-validator';
import {
  TestReportValidatorProviderMock,
} from '../../../../providers/test-report-validator/__mocks__/test-report-validator.mock';
import { ModalEvent } from '../../test-report.constants';
import { CAT_A_MOD1 } from '../../../page-names.constants';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { configureTestSuite } from 'ng-bullet';
import { SpeedCheckHeaderComponent } from '../components/speed-check-header/speed-check-header';
import { SpeedCheckComponent } from '../components/speed-check/speed-check';
import { SetActivityCode } from '../../../../modules/tests/activity-code/activity-code.actions';
import { StoreModel } from '../../../../shared/models/store.model';
import { CalculateTestResult, TerminateTestFromTestReport } from '../../test-report.actions';
import { SpeedCheckState } from '../../../../providers/test-report-validator/test-report-validator.constants';
import { speedCheckLabels } from '../../../../shared/constants/competencies/cata-mod1-competencies';
import { ModalReason } from '../components/activity-code-4-modal/activity-code-4-modal.constants';

describe('TestReportCatAMod1Page', () => {
  let fixture: ComponentFixture<TestReportCatAMod1Page>;
  let component: TestReportCatAMod1Page;
  let navController: NavController;
  let modalController: ModalController;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [TestReportCatAMod1Page,
        MockComponent(TickIndicatorComponent),
        MockComponent(CompetencyComponent),
        MockComponent(CompetencyButtonComponent),
        MockComponent(LegalRequirementComponent),
        MockComponent(EtaComponent),
        MockComponent(DrivingFaultSummaryComponent),
        MockComponent(ToolbarComponent),
        MockComponent(EcoComponent),
        MockComponent(SpeedCheckHeaderComponent),
        MockComponent(SpeedCheckComponent),
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
    fixture = TestBed.createComponent(TestReportCatAMod1Page);
    component = fixture.componentInstance;
    navController = TestBed.get(NavController);
    modalController = TestBed.get(ModalController);
    store$ = TestBed.get(Store);
  }));

  describe('Class', () => {
    describe('onModalDismiss', () => {
      it('should navigate to debrief page when passed a CONTINUE event', () => {
        component.onModalDismiss(ModalEvent.CONTINUE);
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_A_MOD1.DEBRIEF_PAGE);
      });

      it('should navigate to debrief page when passed a TERMINATE event', () => {
        component.onModalDismiss(ModalEvent.TERMINATE);
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_A_MOD1.DEBRIEF_PAGE);
      });

      it('should navigate to debrief page when passed a END_WITH_ACTIVITY_CODE_4', () => {
        component.onModalDismiss(ModalEvent.END_WITH_ACTIVITY_CODE_4);
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_A_MOD1.DEBRIEF_PAGE);
      });

      it('should set activity code to 4 when passed an END_WITH_ACTIVITY_CODE_4 event', () => {
        spyOn(component.store$, 'dispatch');
        component.onModalDismiss(ModalEvent.END_WITH_ACTIVITY_CODE_4);
        expect(component.store$.dispatch).toHaveBeenCalledWith(new SetActivityCode('4'));
      });

      it('should dispatch CalculateTestResult action', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');

        component.onModalDismiss(ModalEvent.CONTINUE);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new CalculateTestResult());
      });

      it('should dispatch TerminateTestFromTestReport action', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');

        component.onModalDismiss(ModalEvent.TERMINATE);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new TerminateTestFromTestReport());
      });
    });

    describe('createEtaInvalidModal', () => {
      it('should create an EtaInvalidModal when isEtaValid is false', () => {
        component.isEtaValid = false;

        const options = {
          optionProperty: 'optionProperty',
        };
        const modalName = 'EtaInvalidModal';
        const { calls } = modalController.create as jasmine.Spy;

        component.createEtaInvalidModal(options);

        expect(calls.count()).toBe(1);
        expect(calls.argsFor(0)[0]).toBe(modalName);
        expect(calls.argsFor(0)[1]).toEqual({});
        expect(calls.argsFor(0)[2]).toEqual(options);
      });

      it('should return null when isEtaValid is true', () => {
        component.isEtaValid = true;
        const options = {
          optionProperty: 'optionProperty',
        };

        const result = component.createEtaInvalidModal(options);

        expect(result).toBeNull();
      });
    });

    describe('createEndTestModal', () => {
      it('should create an EndTestModal when speedCheckState is VALID', () => {
        component.speedCheckState = SpeedCheckState.VALID;

        const options = {
          optionProperty: 'optionProperty',
        };
        const modalName = 'EndTestModal';
        const { calls } = modalController.create as jasmine.Spy;

        component.createEndTestModal(options);

        expect(calls.count()).toBe(1);
        expect(calls.argsFor(0)[0]).toBe(modalName);
        expect(calls.argsFor(0)[1]).toEqual({});
        expect(calls.argsFor(0)[2]).toEqual(options);
      });

      it('should return null when speedCheckState is not VALID', () => {
        component.speedCheckState = SpeedCheckState.NOT_MET;
        const options = {
          optionProperty: 'optionProperty',
        };

        const result = component.createEndTestModal(options);

        expect(result).toBeNull();
      });
    });

    describe('createSpeedCheckModal', () => {
      it('should create the right SpeedCheckModal when EMERGENCY_STOP_AND_AVOIDANCE_MISSING', () => {
        component.speedCheckState = SpeedCheckState.EMERGENCY_STOP_AND_AVOIDANCE_MISSING;

        const options = {
          optionProperty: 'optionProperty',
        };
        const modalName = 'SpeedCheckModal';
        const { calls } = modalController.create as jasmine.Spy;

        component.createSpeedCheckModal(options);

        expect(calls.count()).toBe(1);
        expect(calls.argsFor(0)[0]).toBe(modalName);
        expect(calls.argsFor(0)[1]).toEqual({
          speedChecksNeedCompleting: [
            speedCheckLabels.speedCheckEmergency,
            speedCheckLabels.speedCheckAvoidance,
          ],
        });
        expect(calls.argsFor(0)[2]).toEqual(options);
      });

      it('should create the right SpeedCheckModal when EMERGENCY_STOP_MISSING', () => {
        component.speedCheckState = SpeedCheckState.EMERGENCY_STOP_MISSING;

        const options = {
          optionProperty: 'optionProperty',
        };
        const modalName = 'SpeedCheckModal';
        const { calls } = modalController.create as jasmine.Spy;

        component.createSpeedCheckModal(options);

        expect(calls.count()).toBe(1);
        expect(calls.argsFor(0)[0]).toBe(modalName);
        expect(calls.argsFor(0)[1]).toEqual({
          speedChecksNeedCompleting: [
            speedCheckLabels.speedCheckEmergency,
          ],
        });
        expect(calls.argsFor(0)[2]).toEqual(options);
      });

      it('should create the right SpeedCheckModal when AVOIDANCE_MISSING', () => {
        component.speedCheckState = SpeedCheckState.AVOIDANCE_MISSING;

        const options = {
          optionProperty: 'optionProperty',
        };
        const modalName = 'SpeedCheckModal';
        const { calls } = modalController.create as jasmine.Spy;

        component.createSpeedCheckModal(options);

        expect(calls.count()).toBe(1);
        expect(calls.argsFor(0)[0]).toBe(modalName);
        expect(calls.argsFor(0)[1]).toEqual({
          speedChecksNeedCompleting: [
            speedCheckLabels.speedCheckAvoidance,
          ],
        });
        expect(calls.argsFor(0)[2]).toEqual(options);
      });

      it('should return null when nor emergency stop nor avoidance is missing', () => {
        component.speedCheckState = SpeedCheckState.VALID;
        const options = {
          optionProperty: 'optionProperty',
        };

        const result = component.createSpeedCheckModal(options);

        expect(result).toBeNull();
      });
    });

    describe('createActivityCode4Modal', () => {
      it('should create the right ActivityCode4Modal when speedCheckState is NOT_MET', () => {
        component.speedCheckState = SpeedCheckState.NOT_MET;

        const options = {
          optionProperty: 'optionProperty',
        };
        const modalName = 'ActivityCode4Modal';
        const { calls } = modalController.create as jasmine.Spy;

        component.createActivityCode4Modal(options);

        expect(calls.count()).toBe(1);
        expect(calls.argsFor(0)[0]).toBe(modalName);
        expect(calls.argsFor(0)[1]).toEqual({
          modalReason: ModalReason.SPEED_REQUIREMENTS,
        });
        expect(calls.argsFor(0)[2]).toEqual(options);
      });

      it('should create the right ActivityCode4Modal when speedCheckState is EMERGENCY_STOP_DANGEROUS_FAULT', () => {
        component.speedCheckState = SpeedCheckState.EMERGENCY_STOP_DANGEROUS_FAULT;

        const options = {
          optionProperty: 'optionProperty',
        };
        const modalName = 'ActivityCode4Modal';
        const { calls } = modalController.create as jasmine.Spy;

        component.createActivityCode4Modal(options);

        expect(calls.count()).toBe(1);
        expect(calls.argsFor(0)[0]).toBe(modalName);
        expect(calls.argsFor(0)[1]).toEqual({
          modalReason: ModalReason.EMERGENCY_STOP_DANGEROUS,
        });
        expect(calls.argsFor(0)[2]).toEqual(options);
      });

      it('should create the right ActivityCode4Modal whe speedCheckState is EMERGENCY_STOP_SERIOUS_FAULT', () => {
        component.speedCheckState = SpeedCheckState.EMERGENCY_STOP_SERIOUS_FAULT;

        const options = {
          optionProperty: 'optionProperty',
        };
        const modalName = 'ActivityCode4Modal';
        const { calls } = modalController.create as jasmine.Spy;

        component.createActivityCode4Modal(options);

        expect(calls.count()).toBe(1);
        expect(calls.argsFor(0)[0]).toBe(modalName);
        expect(calls.argsFor(0)[1]).toEqual({
          modalReason: ModalReason.EMERGENCY_STOP_SERIOUS,
        });
        expect(calls.argsFor(0)[2]).toEqual(options);
      });

      it('should return null speed req is met and not serious or dangerous fault on Emergency Stop', () => {
        component.speedCheckState = SpeedCheckState.VALID;
        const options = {
          optionProperty: 'optionProperty',
        };

        const result = component.createActivityCode4Modal(options);

        expect(result).toBeNull();
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
