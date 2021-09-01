import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { DebriefCardComponent } from '../debrief-card';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { TickIndicatorComponent } from '../../../../../../components/common/tick-indicator/tick-indicator';
import {
  DangerousFaultBadgeComponent,
} from '../../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import {
  SeriousFaultBadgeComponent,
} from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import {
  DrivingFaultsBadgeComponent,
} from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { DataRowComponent } from '../../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../../components/common/data-row-custom/data-row-custom';
import { DataRowWithListComponent } from '../../../../components/data-row-with-list/data-list-with-row';
import { FaultsDataRowComponent } from '../../../../components/faults-data-row/faults-data-row';
import { FaultSummaryProvider } from '../../../../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
import { TestData } from '@dvsa/mes-test-schema/categories/AM2';
import {
  DataRowListItem,
  TestRequirementsLabels,
  ViewTestResultLabels,
} from '../../../../components/data-row-with-list/data-list-with-row.model';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { configureTestSuite } from 'ng-bullet';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  SafetyAndBalanceDataRowComponent,
} from '../../../../components/safety-and-balance-data-row/safety-and-balance-data-row';

describe('DebriefCardComponent', () => {
  let fixture: ComponentFixture<DebriefCardComponent>;
  let component: DebriefCardComponent;
  let faultSummaryProvider: FaultSummaryProvider;
  let faultCountProvider: FaultCountProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DebriefCardComponent,
        MockComponent(TickIndicatorComponent),
        MockComponent(DangerousFaultBadgeComponent),
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DrivingFaultsBadgeComponent),
        MockComponent(DataRowComponent),
        MockComponent(DataRowCustomComponent),
        MockComponent(DataRowWithListComponent),
        MockComponent(FaultsDataRowComponent),
        MockComponent(SafetyAndBalanceDataRowComponent),
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
        FaultSummaryProvider,
        FaultCountProvider,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DebriefCardComponent);
    component = fixture.componentInstance;
    faultSummaryProvider = TestBed.get(FaultSummaryProvider);
    faultCountProvider = TestBed.get(FaultCountProvider);
    component.testCategory = TestCategory.EUAM2;
  }));

  describe('Class', () => {
    describe('getTestRequirements', () => {
      it('should return the correct values for all test requirements', () => {
        const data: TestData = {
          testRequirements: {
            normalStart1: true,
            hillStart: false,
            angledStart: true,
          },
        };
        component.data = data;
        fixture.detectChanges();
        const result: DataRowListItem[] = component.getTestRequirements();

        expect(result.length).toEqual(3);
        expect(result).toContain({ label: TestRequirementsLabels.normalStart1, checked: true });
        expect(result).toContain({ label: TestRequirementsLabels.hillStart, checked: false });
        expect(result).toContain({ label: TestRequirementsLabels.angledStart, checked: true });
      });
    });

    describe('getEco', () => {
      it('should return the correct data for eco', () => {
        const data: TestData = {
          eco: {
            adviceGivenControl: true,
          },
        };
        component.data = data;
        fixture.detectChanges();
        const result: DataRowListItem[] = component.getEco();

        expect(result.length).toEqual(2);
        expect(result).toContain({ label: ViewTestResultLabels.control, checked: true });
        expect(result).toContain({ label: ViewTestResultLabels.planning, checked: false });
      });
    });

    describe('getDrivingFaults', () => {
      it('should call the fault summary provider and return the result', () => {
        spyOn(faultSummaryProvider, 'getDrivingFaultsList').and.returnValue([]);
        const result = component.getDrivingFaults();
        expect(faultSummaryProvider.getDrivingFaultsList).toHaveBeenCalled();
        expect(result).toEqual([]);
      });
    });

    describe('getSeriousFaults', () => {
      it('should call the fault summary provider and return the result', () => {
        spyOn(faultSummaryProvider, 'getSeriousFaultsList').and.returnValue([]);
        const result = component.getSeriousFaults();
        expect(faultSummaryProvider.getSeriousFaultsList).toHaveBeenCalled();
        expect(result).toEqual([]);
      });
    });

    describe('getDangerousFaults', () => {
      it('should call the fault summary provider and return the result', () => {
        spyOn(faultSummaryProvider, 'getDangerousFaultsList').and.returnValue([]);
        const result = component.getDangerousFaults();
        expect(faultSummaryProvider.getDangerousFaultsList).toHaveBeenCalled();
        expect(result).toEqual([]);
      });
    });

    describe('getDrivingFaultCount', () => {
      it('should call the fault summary provider and return the result', () => {
        spyOn(faultCountProvider, 'getDrivingFaultSumCount').and.returnValue(1);
        const result = component.getDrivingFaultCount();
        expect(faultCountProvider.getDrivingFaultSumCount).toHaveBeenCalled();
        expect(result).toEqual(1);
      });
    });

    describe('getETA', () => {
      it('should return the correct data if only a verbal eta has been selected', () => {
        const data: TestData = {
          ETA: {
            verbal: true,
          },
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getETA()).toEqual('Verbal');
      });
      it('should return None if no ETA is present', () => {
        expect(component.getETA()).toEqual('None');
      });
    });

    describe('getSafetyQuestions', () => {
      it('should return an empty array if no data is present', () => {
        component.data = null;
        expect(component.getSafetyQuestions()).toEqual([]);
      });
      it('should return the correct data when present', () => {
        const data: TestData = {
          safetyAndBalanceQuestions: {
            safetyQuestions: [
              {
                code: 'SQ2',
                description: 'Horn working',
                outcome: 'P',
              },
            ],
            balanceQuestions: [
              {
                code: 'BQ2',
                description: 'Carrying a passenger',
                outcome: 'DF',
              },
            ],
          },
        };
        component.data = data;
        fixture.detectChanges();
        const result: QuestionResult[] = component.getSafetyQuestions();
        expect(result.length).toEqual(1);
        expect(result).toContain({ code: 'SQ2', description: 'Horn working', outcome: 'P' });
      });
    });

    describe('getBalanceQuestions', () => {
      it('should return an empty array if no data is present', () => {
        component.data = null;
        expect(component.getBalanceQuestions()).toEqual([]);
      });
      it('should return the correct data when present', () => {
        const data: TestData = {
          safetyAndBalanceQuestions: {
            safetyQuestions: [
              {
                code: 'SQ2',
                description: 'Horn working',
                outcome: 'P',
              },
            ],
            balanceQuestions: [
              {
                code: 'BQ2',
                description: 'Carrying a passenger',
                outcome: 'DF',
              },
            ],
          },
        };
        component.data = data;
        fixture.detectChanges();
        const result: QuestionResult[] = component.getBalanceQuestions();
        expect(result.length).toEqual(1);
        expect(result).toContain({ code: 'BQ2', description: 'Carrying a passenger', outcome: 'DF' });
      });
    });
  });
});
