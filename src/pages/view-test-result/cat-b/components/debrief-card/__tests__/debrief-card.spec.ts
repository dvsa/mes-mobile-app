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
import { configureTestSuite } from 'ng-bullet';
import { DataRowWithListComponent } from '../../../../components/data-row-with-list/data-list-with-row';
import { FaultsDataRowComponent } from '../../../../components/faults-data-row/faults-data-row';

describe('DebriefCardComponent', () => {
  let fixture: ComponentFixture<DebriefCardComponent>;
  let component: DebriefCardComponent;

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
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DebriefCardComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });

  });
});
