import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { TestSummaryCardComponent } from '../test-summary-card';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../components/common/data-row-custom/data-row-custom';
import { configureTestSuite } from 'ng-bullet';
describe('TestSummaryCardComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
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
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TestSummaryCardComponent);
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
        describe('getCode78', function () {
            it('should return null if the data does not exist', function () {
                var passCompletion = {
                    provisionalLicenceProvided: false,
                    passCertificateNumber: 'A123456X',
                };
                component.passCompletion = passCompletion;
                fixture.detectChanges();
                expect(component.getCode78()).toEqual(null);
            });
            it('should return yes if code78 is true', function () {
                var passCompletion = {
                    provisionalLicenceProvided: false,
                    passCertificateNumber: 'A123456X',
                    code78Present: true,
                };
                component.passCompletion = passCompletion;
                fixture.detectChanges();
                expect(component.getCode78()).toEqual('Yes');
            });
            it('should return no if code78 is false', function () {
                var passCompletion = {
                    provisionalLicenceProvided: false,
                    passCertificateNumber: 'A123456X',
                    code78Present: false,
                };
                component.passCompletion = passCompletion;
                fixture.detectChanges();
                expect(component.getCode78()).toEqual('No');
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
        describe('getRouteNumber', function () {
            it('should return the correct data', function () {
                var testSummary = {
                    routeNumber: 57,
                };
                component.testSummary = testSummary;
                fixture.detectChanges();
                expect(component.getRouteNumber()).toEqual(57);
            });
            it('should return None if the testSummary is missing', function () {
                expect(component.getRouteNumber()).toEqual('None');
            });
        });
        describe('getIndependentDriving', function () {
            it('should return the correct data', function () {
                var testSummary = {
                    independentDriving: 'Diagram',
                };
                component.testSummary = testSummary;
                fixture.detectChanges();
                expect(component.getIndependentDriving()).toEqual('Diagram');
            });
            it('should return None if the testSummary is missing', function () {
                expect(component.getIndependentDriving()).toEqual('None');
            });
        });
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
        describe('getWeatherConditions', function () {
            it('should return the correct data', function () {
                var testSummary = {
                    weatherConditions: [
                        'Icy',
                        'Showers',
                        'Windy',
                    ],
                };
                component.testSummary = testSummary;
                fixture.detectChanges();
                expect(component.getWeatherConditions()).toEqual('Icy, Showers and Windy');
            });
            it('should return None if the testSummary is missing', function () {
                expect(component.getWeatherConditions()).toEqual('None');
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
        describe('shouldDisplayTestConductedOn', function () {
            it('should return true if mode of transport', function () {
                var mode = 'Bike to bike';
                component.testSummary = {
                    modeOfTransport: mode,
                };
                expect(component.shouldDisplayTestConductedOn()).toEqual(true);
            });
            it('should return false if no mode of transport', function () {
                component.testSummary = {
                    additionalInformation: 'Test Additional Information',
                };
                expect(component.shouldDisplayTestConductedOn()).toEqual(false);
            });
        });
        describe('getTestConductedOn', function () {
            it('should return the mode of transport if populated', function () {
                var mode = 'Bike to bike';
                component.testSummary = {
                    modeOfTransport: mode,
                };
                expect(component.getTestConductedOn()).toEqual(mode);
            });
            it('should return None if not populated', function () {
                component.testSummary = {
                    additionalInformation: 'Test Additional Information',
                };
                expect(component.getTestConductedOn()).toEqual('None');
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