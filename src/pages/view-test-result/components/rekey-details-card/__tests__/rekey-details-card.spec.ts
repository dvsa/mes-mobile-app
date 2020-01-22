
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { RekeyDetailsCardComponent } from '../rekey-details';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';
import { configureTestSuite } from 'ng-bullet';

describe('ExaminerDetailsCardComponent', () => {
  let fixture: ComponentFixture<RekeyDetailsCardComponent>;
  let component: RekeyDetailsCardComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        RekeyDetailsCardComponent,
        MockComponent(DataRowComponent),
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
    fixture = TestBed.createComponent(RekeyDetailsCardComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    describe('getScheduledStaffNumber', () => {
      it('should return the correct data', () => {
        const data = {
          examinerBooked: 123456,
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getScheduledStaffNumber()).toEqual(123456);
      });
      it('should return undefined if the data does not exist', () => {
        expect(component.getScheduledStaffNumber()).toEqual(undefined);
      });
    });
    describe('getConductedStaffNumber', () => {
      it('should return the correct data', () => {
        const data = {
          examinerConducted: 123456,
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getConductedStaffNumber()).toEqual(123456);
      });
      it('should return undefined if the data does not exist', () => {
        expect(component.getConductedStaffNumber()).toEqual(undefined);
      });
    });
    describe('getRekeyedStaffNumber', () => {
      it('should return the correct data', () => {
        const data = {
          examinerKeyed: 123456,
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getRekeyedStaffNumber()).toEqual(123456);
      });
      it('should return undefined if the data does not exist', () => {
        expect(component.getRekeyedStaffNumber()).toEqual(undefined);
      });
    });
    describe('getTestDate', () => {
      it('should return the correct data', () => {
        const data = {
          journalData: {
            testSlotAttributes: {
              start: '2019-01-12T09:14:00',
            },
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getTestDate()).toEqual('Saturday 12th January 2019');
      });
    });
    describe('getRekeyDate', () => {
      it('should return the correct data', () => {
        const data = {
          rekeyDate: '2019-01-12T09:14:00',
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getRekeyDate()).toEqual('Saturday 12th January 2019');
      });
    });
  });
});
