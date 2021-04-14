import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { configureTestSuite } from 'ng-bullet';
import { CPCTestSummaryCardComponent } from '../test-summary-card';
import { DataRowComponent } from '../../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../../components/common/data-row-custom/data-row-custom';
import { TestOutcome } from '../../../../../../modules/tests/tests.constants';
describe('TestSummaryCardComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
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
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(CPCTestSummaryCardComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('getAccompaniedBy', function () {
            it('should return the correct data', function () {
                var accompaniment = {
                    ADI: true,
                    interpreter: true,
                    other: true,
                    supervisor: true,
                };
                component.accompaniment = accompaniment;
                fixture.detectChanges();
                expect(component.getAccompaniedBy()).toEqual('ADI, Interpreter, Supervisor and Other');
            });
            it('should return None when there is no accompaniment ', function () {
                expect(component.getAccompaniedBy()).toEqual('None');
            });
        });
        describe('getProvisionalLicenceProvided', function () {
            it('should return yes if the licence has been provided', function () {
                var passCompletion = {
                    provisionalLicenceProvided: true,
                    passCertificateNumber: 'A123456X',
                };
                component.passCompletion = passCompletion;
                fixture.detectChanges();
                expect(component.getProvisionalLicenceProvided()).toEqual('Yes');
            });
            it('should return no if the licence has not been provided', function () {
                var passCompletion = {
                    provisionalLicenceProvided: false,
                    passCertificateNumber: 'A123456X',
                };
                component.passCompletion = passCompletion;
                fixture.detectChanges();
                expect(component.getProvisionalLicenceProvided()).toEqual('No');
            });
            it('should return no if there is no passCompletion', function () {
                expect(component.getProvisionalLicenceProvided()).toEqual('No');
            });
        });
        describe('shouldDisplayAssessmentReport', function () {
            it('should return true if the TestOutcome is Failed', function () {
                var testOutcome = TestOutcome.Failed;
                component.testOutcome = testOutcome;
                expect(component.shouldDisplayAssessmentReport()).toEqual(true);
            });
            it('should return false if the TestOutcome is Passed', function () {
                var testOutcome = TestOutcome.Passed;
                component.testOutcome = testOutcome;
                expect(component.shouldDisplayAssessmentReport()).toEqual(false);
            });
            it('should return false if the TestOutcome is Terminated', function () {
                var testOutcome = TestOutcome.Terminated;
                component.testOutcome = testOutcome;
                expect(component.shouldDisplayAssessmentReport()).toEqual(false);
            });
        });
        describe('getPassCertificateNumber', (function () {
            it('should return the correct data', function () {
                var passCompletion = {
                    passCertificateNumber: 'A123456X',
                    provisionalLicenceProvided: false,
                };
                component.passCompletion = passCompletion;
                fixture.detectChanges();
                expect(component.getPassCertificateNumber()).toEqual('A123456X');
            });
            it('should return undefined if the passCompletion is missing', function () {
                expect(component.getPassCertificateNumber()).toEqual(undefined);
            });
        }));
        describe('getCandidateDescription', function () {
            it('should return the correct data', function () {
                var testSummary = {
                    candidateDescription: 'Test Description',
                };
                component.testSummary = testSummary;
                fixture.detectChanges();
                expect(component.getCandidateDescription()).toEqual('Test Description');
            });
            it('should return None if the testSummary is missing', function () {
                expect(component.getCandidateDescription()).toEqual('None');
            });
        });
        describe('getDebriefWitnessed', function () {
            it('should return yes if the debrief was witnessed ', function () {
                var testSummary = {
                    debriefWitnessed: true,
                };
                component.testSummary = testSummary;
                fixture.detectChanges();
                expect(component.getDebriefWitnessed()).toEqual('Yes');
            });
            it('should return no if the debrief was not witnessed ', function () {
                var testSummary = {
                    debriefWitnessed: false,
                };
                component.testSummary = testSummary;
                fixture.detectChanges();
                expect(component.getDebriefWitnessed()).toEqual('No');
            });
            it('should return no if the testSummary is missing', function () {
                expect(component.getDebriefWitnessed()).toEqual('No');
            });
        });
        describe('getD255', function () {
            it('should return yes if a D255 was needed ', function () {
                var testSummary = {
                    D255: true,
                };
                component.testSummary = testSummary;
                fixture.detectChanges();
                expect(component.getD255()).toEqual('Yes');
            });
            it('should return no if a D255 was not needed ', function () {
                var testSummary = {
                    D255: false,
                };
                component.testSummary = testSummary;
                fixture.detectChanges();
                expect(component.getDebriefWitnessed()).toEqual('No');
            });
            it('should return no if the testSummary is missing', function () {
                expect(component.getDebriefWitnessed()).toEqual('No');
            });
        });
        describe('getAdditionalInformation', function () {
            it('should return the correct data', function () {
                var testSummary = {
                    additionalInformation: 'Test Additional Information',
                };
                component.testSummary = testSummary;
                fixture.detectChanges();
                expect(component.getAdditionalInformation()).toEqual('Test Additional Information');
            });
            it('should return None if the testSummary is missing', function () {
                expect(component.getAdditionalInformation()).toEqual('None');
            });
        });
        describe('getConductedLanguage', function () {
            it('should return the correct data', function () {
                component.communicationPreferences = {
                    conductedLanguage: 'English',
                    updatedEmail: 'value',
                    communicationMethod: 'Email',
                };
                fixture.detectChanges();
                expect(component.getConductedLanguage()).toEqual('English');
            });
            it('should return None if the communicationPreferences is missing', function () {
                expect(component.getAdditionalInformation()).toEqual('None');
            });
        });
    });
});
//# sourceMappingURL=test-summary-card.spec.js.map