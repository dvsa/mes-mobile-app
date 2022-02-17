import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { DebriefCardManoeuvreComponent } from '../debrief-card';
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
import { configureTestSuite } from 'ng-bullet';
import { DataRowWithListComponent } from '../../../../components/data-row-with-list/data-list-with-row';
import { FaultsDataRowComponent } from '../../../../components/faults-data-row/faults-data-row';
import { FaultSummaryProvider } from '../../../../../../providers/fault-summary/fault-summary';
import { FaultSummaryProviderMock } from '../../../../../../providers/fault-summary/__mocks__/fault-summary.mock';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';

describe('DebriefCardManoeuvreComponent', () => {
  let fixture: ComponentFixture<DebriefCardManoeuvreComponent>;
  let component: DebriefCardManoeuvreComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DebriefCardManoeuvreComponent,
        MockComponent(TickIndicatorComponent),
        MockComponent(DangerousFaultBadgeComponent),
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DrivingFaultsBadgeComponent),
        MockComponent(DataRowComponent),
        MockComponent(DataRowCustomComponent),
        MockComponent(DataRowWithListComponent),
        MockComponent(FaultsDataRowComponent),
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: FaultSummaryProvider, useClass: FaultSummaryProviderMock },
        { provide: FaultCountProvider },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DebriefCardManoeuvreComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });
});
