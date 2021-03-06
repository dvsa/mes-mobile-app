
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { RekeyReasonCardComponent } from '../rekey-reason';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { configureTestSuite } from 'ng-bullet';

describe('ExaminerDetailsCardComponent', () => {
  let fixture: ComponentFixture<RekeyReasonCardComponent>;
  let component: RekeyReasonCardComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        RekeyReasonCardComponent,
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
    fixture = TestBed.createComponent(RekeyReasonCardComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    describe('getIPadIssue', () => {
      it('should return none if iPad Issue is not selected', () => {
        component.data = {
          ipadIssue: {
            selected: false,
          },
        };
        fixture.detectChanges();
        expect(component.getIPadIssue()).toEqual('None');
      });
      it('should return the correct value if the reason for rekey is due to the iPad being broken', () => {
        component.data = {
          ipadIssue: {
            selected: true,
            broken: true,
          },
        };
        fixture.detectChanges();
        expect(component.getIPadIssue()).toEqual('Broken');
      });
      it('should return the correct value if the reason for rekey is due to the iPad having a technical fault', () => {
        component.data = {
          ipadIssue: {
            selected: true,
            technicalFault: true,
          },
        };
        fixture.detectChanges();
        expect(component.getIPadIssue()).toEqual('Technical fault');
      });
      it('should return the correct value if the reason for rekey is due to the iPad being lost', () => {
        component.data = {
          ipadIssue: {
            selected: true,
            lost: true,
          },
        };
        fixture.detectChanges();
        expect(component.getIPadIssue()).toEqual('Lost');
      });
      it('should return the correct value if the reason for rekey is due to the iPad being stolen', () => {
        component.data = {
          ipadIssue: {
            selected: true,
            stolen: true,
          },
        };
        fixture.detectChanges();
        expect(component.getIPadIssue()).toEqual('Stolen');
      });
    });
    describe('getTransfer', () => {
      it('should return Yes if transfer is selected', () => {
        component.data = {
          transfer: {
            selected: true,
          },
        };
        fixture.detectChanges();
        expect(component.getTransfer()).toEqual('Yes');
      });
      it('should return No if transfer is not selected', () => {
        component.data = {
          transfer: {
            selected: false,
          },
        };
        fixture.detectChanges();
        expect(component.getTransfer()).toEqual('No');
      });
    });
    describe('getOther', () => {
      it('should show the reason if other is selected', () => {
        component.data = {
          other: {
            selected: true,
            reason: 'Other Reason',
          },
        };
        fixture.detectChanges();
        expect(component.getOther()).toEqual('Other Reason');
      });
      it('should show N/A if other is not selected', () => {
        component.data = {
          other: {
            selected: false,
          },
        };
        fixture.detectChanges();
        expect(component.getOther()).toEqual('N/A');
      });
    });
  });
});
