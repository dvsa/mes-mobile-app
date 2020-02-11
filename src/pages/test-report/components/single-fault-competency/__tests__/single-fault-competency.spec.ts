import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { SingleFaultCompetencyComponent } from '../single-fault-competency';
import { AppModule } from '../../../../../app/app.module';
import { SingleFaultCompetencyNames } from '../../../../../modules/tests/test-data/test-data.constants';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../../components/competency-button/competency-button';
import {
  DrivingFaultsBadgeComponent,
} from '../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { SeriousFaultBadgeComponent } from '../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { IonicModule } from 'ionic-angular';
import {
  DangerousFaultBadgeComponent,
} from '../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { testReportReducer } from '../../../test-report.reducer';
import { NavigationStateProvider } from '../../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { configureTestSuite } from 'ng-bullet';

describe('SingleFaultCompetencyComponent', () => {
  let fixture: ComponentFixture<SingleFaultCompetencyComponent>;
  let component: SingleFaultCompetencyComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SingleFaultCompetencyComponent,
        MockComponent(CompetencyButtonComponent),
        MockComponent(DrivingFaultsBadgeComponent),
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DangerousFaultBadgeComponent),
      ],
      imports: [
        AppModule,
        IonicModule,
        StoreModule.forRoot({
          journal: () => ({
            isLoading: false,
            lastRefreshed: null,
            slots: {},
            selectedDate: '',
            examiner: {
              staffNumber: '1234567',
            },
          }),
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                vehicleDetails: {},
                accompaniment: {},
                testData: {
                  dangerousFaults: {},
                  drivingFaults: {},
                  manoeuvres: {},
                  seriousFaults: {},
                  testRequirements: {},
                  ETA: {},
                  eco: {},
                  vehicleChecks: {
                    showMeQuestion: {
                      code: 'S3',
                      description: '',
                      outcome: '',
                    },
                    tellMeQuestion: {
                      code: '',
                      description: '',
                      outcome: '',
                    },
                  },
                  eyesightTest: {},
                },
                activityCode: '28',
                journalData: {
                  candidate: {
                    candidateName: 'Joe Bloggs',
                    driverNumber: '123',
                  },
                },
                rekey: false,
              },
            },
          }),
          testReport : testReportReducer,
        }),
      ],
      providers: [
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SingleFaultCompetencyComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    describe('getLabel', () => {
      it('should get the correct label for a competency', () => {
        component.competency = SingleFaultCompetencyNames.useOfStand;
        expect(component.getLabel()).toBe('Use of stand');
      });
    });
  });

  describe('DOM', () => {
  });
});
