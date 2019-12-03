
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { RekeyReasonCardComponent } from '../rekey-reason';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../components/data-row/data-row';

describe('ExaminerDetailsCardComponent', () => {
  let fixture: ComponentFixture<RekeyReasonCardComponent>;
  let component: RekeyReasonCardComponent;

  beforeEach(async(() => {
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
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RekeyReasonCardComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });
});
