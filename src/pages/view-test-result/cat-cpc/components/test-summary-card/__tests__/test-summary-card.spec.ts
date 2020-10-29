import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { configureTestSuite } from 'ng-bullet';
import { CPCTestSummaryCardComponent } from '../test-summary-card';
import { DataRowComponent } from '../../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../../components/common/data-row-custom/data-row-custom';
import { TestOutcome } from '../../../../../../modules/tests/tests.constants';

describe('TestSummaryCardComponent', () => {
  let fixture: ComponentFixture<CPCTestSummaryCardComponent>;
  let component: CPCTestSummaryCardComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CPCTestSummaryCardComponent,
        MockComponent(DataRowComponent),
        MockComponent(DataRowCustomComponent),
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
    fixture = TestBed.createComponent(CPCTestSummaryCardComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    describe('getAccompaniedBy', () => {
      it('should return the correct data', () => {
        const accompaniment = {
          ADI: true,
          interpreter: true,
          other: true,
          supervisor: true,
        };
        component.accompaniment = accompaniment;
        fixture.detectChanges();
        expect(component.getAccompaniedBy()).toEqual('ADI, Interpreter, Supervisor and Other');
      });

      it('should return None when there is no accompaniment ', () => {
        expect(component.getAccompaniedBy()).toEqual('None');
      });
    });

    describe('getProvisionalLicenceProvided', () => {
      it('should return yes if the licence has been provided', () => {
        const passCompletion = {
          provisionalLicenceProvided: true,
          passCertificateNumber: 'A123456X',
        };
        component.passCompletion = passCompletion;
        fixture.detectChanges();
        expect(component.getProvisionalLicenceProvided()).toEqual('Yes');
      });

      it('should return no if the licence has not been provided', () => {
        const passCompletion = {
          provisionalLicenceProvided: false,
          passCertificateNumber: 'A123456X',
        };
        component.passCompletion = passCompletion;
        fixture.detectChanges();
        expect(component.getProvisionalLicenceProvided()).toEqual('No');
      });

      it('should return no if there is no passCompletion', () => {
        expect(component.getProvisionalLicenceProvided()).toEqual('No');
      });
    });
    describe('shouldDisplayAssessmentReport', () => {
      it('should return true if the TestOutcome is Failed', () => {
        const testOutcome: TestOutcome = TestOutcome.Failed;
        component.testOutcome = testOutcome;
        expect(component.shouldDisplayAssessmentReport()).toEqual(true);
      });
      it('should return false if the TestOutcome is Passed', () => {
        const testOutcome: TestOutcome = TestOutcome.Passed;
        component.testOutcome = testOutcome;
        expect(component.shouldDisplayAssessmentReport()).toEqual(false);
      });
      it('should return false if the TestOutcome is Terminated', () => {
        const testOutcome: TestOutcome = TestOutcome.Terminated;
        component.testOutcome = testOutcome;
        expect(component.shouldDisplayAssessmentReport()).toEqual(false);
      });
    });

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

    describe('getCandidateDescription', () => {
      it('should return the correct data', () => {
        const testSummary = {
          candidateDescription: 'Test Description',
        };
        component.testSummary = testSummary;
        fixture.detectChanges();
        expect(component.getCandidateDescription()).toEqual('Test Description');
      });

      it('should return None if the testSummary is missing', () => {
        expect(component.getCandidateDescription()).toEqual('None');
      });
    });

    describe('getDebriefWitnessed', () => {
      it('should return yes if the debrief was witnessed ', () => {
        const testSummary = {
          debriefWitnessed: true,
        };
        component.testSummary = testSummary;
        fixture.detectChanges();
        expect(component.getDebriefWitnessed()).toEqual('Yes');
      });

      it('should return no if the debrief was not witnessed ', () => {
        const testSummary = {
          debriefWitnessed: false,
        };
        component.testSummary = testSummary;
        fixture.detectChanges();
        expect(component.getDebriefWitnessed()).toEqual('No');
      });

      it('should return no if the testSummary is missing', () => {
        expect(component.getDebriefWitnessed()).toEqual('No');
      });
    });

    describe('getD255', () => {
      it('should return yes if a D255 was needed ', () => {
        const testSummary = {
          D255: true,
        };
        component.testSummary = testSummary;
        fixture.detectChanges();
        expect(component.getD255()).toEqual('Yes');
      });

      it('should return no if a D255 was not needed ', () => {
        const testSummary = {
          D255: false,
        };
        component.testSummary = testSummary;
        fixture.detectChanges();
        expect(component.getDebriefWitnessed()).toEqual('No');
      });

      it('should return no if the testSummary is missing', () => {
        expect(component.getDebriefWitnessed()).toEqual('No');
      });
    });

    describe('getAdditionalInformation', () => {
      it('should return the correct data', () => {
        const testSummary = {
          additionalInformation: 'Test Additional Information',
        };
        component.testSummary = testSummary;
        fixture.detectChanges();
        expect(component.getAdditionalInformation()).toEqual('Test Additional Information');
      });

      it('should return None if the testSummary is missing', () => {
        expect(component.getAdditionalInformation()).toEqual('None');
      });
    });

    describe('getConductedLanguage', () => {
      it('should return the correct data', () => {
        component.communicationPreferences = {
          conductedLanguage: 'English',
          updatedEmail: 'value',
          communicationMethod: 'Email',
        };
        fixture.detectChanges();
        expect(component.getConductedLanguage()).toEqual('English');
      });

      it('should return None if the communicationPreferences is missing', () => {
        expect(component.getAdditionalInformation()).toEqual('None');
      });
    });

  });
});
