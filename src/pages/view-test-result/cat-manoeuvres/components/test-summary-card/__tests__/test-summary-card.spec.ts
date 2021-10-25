
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { TestSummaryCardCatManoeuvreComponent } from '../test-summary-card';
import { MockComponent } from 'ng-mocks';
import { configureTestSuite } from 'ng-bullet';
import { DataRowComponent } from '../../../../../../components/common/data-row/data-row';

describe('TestSummaryCardCatManoeuvreComponent', () => {
  let fixture: ComponentFixture<TestSummaryCardCatManoeuvreComponent>;
  let component: TestSummaryCardCatManoeuvreComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestSummaryCardCatManoeuvreComponent,
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
    fixture = TestBed.createComponent(TestSummaryCardCatManoeuvreComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    describe('getPassCertificateNumber', (() => {
      it('should return the correct data', () => {
        const passCompletion = {
          passCertificateNumber: 'A123456X',
          provisionalLicenceProvided: false,
        };
        component.passCompletion = passCompletion;
        fixture.detectChanges();
        expect(component.getPassCertificateNumber()).toEqual('A123456X');
      });

      it('should return undefined if the passCompletion is missing', () => {
        expect(component.getPassCertificateNumber()).toEqual(undefined);
      });
    }));
  });
});
