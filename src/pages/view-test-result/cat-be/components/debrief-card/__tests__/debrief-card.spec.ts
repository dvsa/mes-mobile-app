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
import { DataRowComponent } from '../../../../components/data-row/data-row';
import { DataRowCustomComponent } from '../../../../components/data-row-custom/data-row-custom';
import { DataRowWithListComponent } from '../../../../components/data-row-with-list/data-list-with-row';
import { FaultsDataRowComponent } from '../../../../components/faults-data-row/faults-data-row';
import { VehicleChecksDataRowComponent } from '../../../../components/vehicle-checks-data-row/vehicle-checks-data-row';
import { FaultSummaryProvider } from '../../../../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import {
  DataRowListItem,
  TestRequirementsLabels,
  ViewTestResultLabels,
} from '../../../../components/data-row-with-list/data-list-with-row.model';
import { manoeuvreTypeLabels } from '../../../../../../shared/constants/competencies/catbe-manoeuvres';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/Common';

describe('DebriefCardComponent', () => {
  let fixture: ComponentFixture<DebriefCardComponent>;
  let component: DebriefCardComponent;
  let faultSummaryProvider: FaultSummaryProvider;
  let faultCountProvider: FaultCountProvider;

  beforeEach(async(() => {
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
        MockComponent(VehicleChecksDataRowComponent),
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
        FaultSummaryProvider,
        FaultCountProvider,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DebriefCardComponent);
        component = fixture.componentInstance;
        faultSummaryProvider = TestBed.get(FaultSummaryProvider);
        faultCountProvider = TestBed.get(FaultCountProvider);
      });
  }));

  describe('Class', () => {
    describe('getTestRequirements', () => {
      it('should return the correct values for all test requirements', () => {
        const data: CatBEUniqueTypes.TestData = {
          testRequirements: {
            angledStartControlledStop: true,
            downhillStart: false,
            normalStart1: true,
            normalStart2: false,
          },
        };
        component.data = data;
        fixture.detectChanges();
        const result: DataRowListItem[] = component.getTestRequirements();

        expect(result.length).toEqual(5);
        expect(result).toContain({ label: TestRequirementsLabels.normalStart1, checked: true });
        expect(result).toContain({ label: TestRequirementsLabels.normalStart2, checked: false });
        expect(result).toContain({ label: TestRequirementsLabels.uphillStart, checked: false });
        expect(result).toContain({ label: TestRequirementsLabels.downhillStart, checked: false });
        expect(result).toContain({ label: TestRequirementsLabels.angledStartControlledStop, checked: true });
      });
    });
    describe('getManoeuvre', () => {
      it('should return Reverse Left if the manoeuvre has been completed', () => {
        const data: CatBEUniqueTypes.TestData = {
          manoeuvres: {
            reverseLeft: {
              selected: true,
            },
          },
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getManoeuvre()).toEqual(manoeuvreTypeLabels.reverseLeft);
      });
      it('should return None if the manoeuvre has not been completed', () => {
        const data: CatBEUniqueTypes.TestData = {
          manoeuvres: {
            reverseLeft: {
              selected: false,
            },
          },
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getManoeuvre()).toEqual('None');
      });
      it('should return None if the data does not exist', () => {
        expect(component.getManoeuvre()).toEqual('None');
      });
    });
    describe('getEco', () => {
      it('should return the correct data for eco', () => {
        const data: CatBEUniqueTypes.TestData = {
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
      it('should return the correct data if all eta options have been selected', () => {
        const data: CatBEUniqueTypes.TestData = {
          ETA: {
            physical: true,
            verbal: true,
          },
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getETA()).toEqual('Physical and Verbal');
      });
      it('should return the correct data if only a physical eta has been selected', () => {
        const data: CatBEUniqueTypes.TestData = {
          ETA: {
            physical: true,
            verbal: false,
          },
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getETA()).toEqual('Physical');
      });
      it('should return the correct data if only a verbal eta has been selected', () => {
        const data: CatBEUniqueTypes.TestData = {
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
    describe('getShowMeQuestions', () => {
      it('should return an empty array if no data is present', () => {
        expect(component.getShowMeQuestions()).toEqual([]);
      });
      it('should return the correct data when present', () => {
        const data: CatBEUniqueTypes.TestData = {
          vehicleChecks: {
            showMeQuestions: [
              {
                code: '1',
                description: '2',
                outcome: 'P',
              },
            ],
          },
        };
        component.data = data;
        fixture.detectChanges();
        const result: QuestionResult[] = component.getShowMeQuestions();
        expect(result.length).toEqual(1);
        expect(result).toContain({ code: '1', description: '2', outcome: 'P' });
      });
    });
    describe('getTellMeQuestions', () => {
      it('should return an empty array if no data is present', () => {
        expect(component.getTellMeQuestions()).toEqual([]);
      });
      it('should return the correct data when present', () => {
        const data: CatBEUniqueTypes.TestData = {
          vehicleChecks: {
            tellMeQuestions: [
              {
                code: '1',
                description: '2',
                outcome: 'P',
              },
            ],
          },
        };
        component.data = data;
        fixture.detectChanges();
        const result: QuestionResult[] = component.getTellMeQuestions();
        expect(result.length).toEqual(1);
        expect(result).toContain({ code: '1', description: '2', outcome: 'P' });
      });
    });
  });
});
