
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { TestSummaryCardComponent } from '../test-summary-card';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../data-row/data-row';
import { DataRowCustomComponent } from '../../data-row-custom/data-row-custom';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';

describe('TestSummaryCardComponent', () => {
  let fixture: ComponentFixture<TestSummaryCardComponent>;
  let component: TestSummaryCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestSummaryCardComponent,
        MockComponent(DataRowComponent),
        MockComponent(DataRowCustomComponent),
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
        fixture = TestBed.createComponent(TestSummaryCardComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    describe('getAccompaniedBy', () => {
      it('should return the correct data', () => {
        const data = {
          accompaniment: {
            ADI: true,
            interpreter: true,
            other: true,
            supervisor: true,
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getAccompaniedBy()).toEqual('ADI, Interpreter, Supervisor and Other');
      });
      it('should return None when there is no data ', () => {
        expect(component.getAccompaniedBy()).toEqual('None');
      });
    });
    describe('getProvisionalLicenceProvided', () => {
      it('should return yes if the licence has been provided', () => {
        const data = {
          passCompletion: {
            provisionalLicenceProvided: true,
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getProvisionalLicenceProvided()).toEqual('Yes');
      });
      it('should return no if the licence has not been provided', () => {
        const data = {
          passCompletion: {
            provisionalLicenceProvided: false,
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getProvisionalLicenceProvided()).toEqual('No');
      });
      it('should return no if there is no data', () => {
        expect(component.getProvisionalLicenceProvided()).toEqual('No');
      });
    });
    describe('getPassCertificateNumber', (() => {
      it('should return the correct data', () => {
        const data = {
          passCompletion: {
            passCertificateNumber: 'A123456X',
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getPassCertificateNumber()).toEqual('A123456X');
      });
      it('should return undefined if the data is missing', () => {
        expect(component.getPassCertificateNumber()).toEqual(undefined);
      });
    }));
    describe('getRouteNumber', () => {
      it('should return the correct data', () => {
        const data = {
          testSummary: {
            routeNumber: 57,
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getRouteNumber()).toEqual(57);
      });
      it('should return None if the data is missing', () => {
        expect(component.getRouteNumber()).toEqual('None');
      });
    });
    describe('getIndependentDriving', () => {
      it('should return the correct data', () => {
        const data = {
          testSummary: {
            independentDriving: 'Diagram',
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getIndependentDriving()).toEqual('Diagram');
      });
      it('should return None if the data is missing', () => {
        expect(component.getIndependentDriving()).toEqual('None');
      });
    });
    describe('getCandidateDescription', () => {
      it('should return the correct data', () => {
        const data = {
          testSummary: {
            candidateDescription: 'Test Description',
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getCandidateDescription()).toEqual('Test Description');
      });
      it('should return None if the data is missing', () => {
        expect(component.getCandidateDescription()).toEqual('None');
      });
    });
    describe('getDebriefWitnessed', () => {
      it('should return yes if the debrief was witnessed ', () => {
        const data = {
          testSummary: {
            debriefWitnessed: true,
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getDebriefWitnessed()).toEqual('Yes');
      });
      it('should return no if the debrief was not witnessed ', () => {
        const data = {
          testSummary: {
            debriefWitnessed: false,
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getDebriefWitnessed()).toEqual('No');
      });
      it('should return no if the data is missing', () => {
        expect(component.getDebriefWitnessed()).toEqual('No');
      });
    });
    describe('getWeatherConditions', () => {
      it('should return the correct data', () => {
        const data = {
          testSummary: {
            weatherConditions: [
              'Icy',
              'Showers',
              'Windy',
            ],
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getWeatherConditions()).toEqual('Icy, Showers and Windy');
      });
      it('should return None if the data is missing', () => {
        expect(component.getWeatherConditions()).toEqual('None');
      });
    });
    describe('getD255', () => {
      it('should return yes if a D255 was needed ', () => {
        const data = {
          testSummary: {
            D255: true,
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getD255()).toEqual('Yes');
      });
      it('should return no if a D255 was not needed ', () => {
        const data = {
          testSummary: {
            D255: false,
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getDebriefWitnessed()).toEqual('No');
      });
      it('should return no if the data is missing', () => {
        expect(component.getDebriefWitnessed()).toEqual('No');
      });
    });
    describe('getAdditionalInformation', () => {
      it('should return the correct data', () => {
        const data = {
          testSummary: {
            additionalInformation: 'Test Additional Information',
          },
        };
        component.data = data as TestResultSchemasUnion;
        fixture.detectChanges();
        expect(component.getAdditionalInformation()).toEqual('Test Additional Information');
      });
      it('should return None if the data is missing', () => {
        expect(component.getAdditionalInformation()).toEqual('None');
      });
    });
  });
});
