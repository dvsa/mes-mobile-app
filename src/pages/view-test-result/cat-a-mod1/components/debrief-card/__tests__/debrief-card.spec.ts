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
import { VehicleChecksDataRowComponent } from '../../../../components/vehicle-checks-data-row/vehicle-checks-data-row';
import { FaultSummaryProvider } from '../../../../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
import { configureTestSuite } from 'ng-bullet';
import { TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { SpeedCardComponent } from '../../speed-card/speed-card';

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
        MockComponent(VehicleChecksDataRowComponent),
        MockComponent(SpeedCardComponent),
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
  }));

  describe('Class', () => {
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
        const data: TestData = {
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
        const data: TestData = {
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
  });
});
