import { PersonalCommitmentSlotComponent } from './personal-commitment';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { PersonalCommitment } from '@dvsa/mes-journal-schema';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../providers/app-config/__mocks__/app-config.mock';
import { Config, IonicModule } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { TimeComponent } from '../components/time/time';
import { LocationComponent } from '../components/location/location';

describe('PersonalCommitmentSlotComponent', () => {
  let fixture: ComponentFixture<PersonalCommitmentSlotComponent>;
  let component: PersonalCommitmentSlotComponent;
  const mockCommitment: PersonalCommitment = {
    commitmentId: 12345,
    slotId: 1001,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    activityCode: '091',
    activityDescription: 'Annual Leave',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonalCommitmentSlotComponent,
        MockComponent(TimeComponent),
        MockComponent(LocationComponent),
      ],
      providers: [
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
      imports: [IonicModule],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(PersonalCommitmentSlotComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('Class', () => {
    describe('formatActivityCode', () => {
      it('should strip leading zeros from activityCode', () => {
        const activityCodeWithZeroRemoved = '91';
        expect(component.formatActivityCode(mockCommitment.activityCode)).toBe(activityCodeWithZeroRemoved);
      });
      it('should return 0 if activityCode is null', () => {
        const zeroActivityCode = '0';
        const nullActivityCode = null;
        expect(component.formatActivityCode(nullActivityCode)).toBe(zeroActivityCode);
      });
    });
  });
});
