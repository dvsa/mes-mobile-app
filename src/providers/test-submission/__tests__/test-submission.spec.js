import { TestBed } from '@angular/core/testing';
import { TestSubmissionProvider } from '../test-submission';
import { UrlProvider } from '../../url/url';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';
import { gunzipSync } from 'zlib';
import { HttpClient } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { LogHelper } from '../../logs/logsHelper';
import { DeviceMock } from '@ionic-native-mocks/device';
import { Device } from '@ionic-native/device';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
import { configureTestSuite } from 'ng-bullet';
describe('TestSubmissionProvider', function () {
    var testSubmissionProvider;
    var httpMock;
    var urlProvider;
    var httpClient;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({
                    appInfo: function () { return ({
                        versionNumber: '5',
                    }); },
                }),
            ],
            providers: [
                TestSubmissionProvider,
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                HttpClient,
                { provide: UrlProvider, useClass: UrlProviderMock },
                Store,
                LogHelper,
                { provide: Device, useClass: DeviceMock },
            ],
        });
    });
    beforeEach(function () {
        testSubmissionProvider = TestBed.get(TestSubmissionProvider);
        httpMock = TestBed.get(HttpTestingController);
        httpClient = TestBed.get(HttpClient);
        urlProvider = TestBed.get(UrlProvider);
        spyOn(testSubmissionProvider, 'compressData').and.callThrough();
        spyOn(testSubmissionProvider, 'removeNullFieldsDeep').and.callThrough();
        spyOn(testSubmissionProvider, 'submitTest').and.callThrough();
        spyOn(httpClient, 'post').and.callThrough();
    });
    describe('submitTests', function () {
        it('should attempt to submit a test', function () {
            testSubmissionProvider.submitTests([{
                    index: 0,
                    slotId: '',
                    payload: {},
                    status: TestStatus.Completed,
                }]).subscribe();
            httpMock.expectOne('https://www.example.com/api/v1/test-result');
            expect(httpClient.post).toHaveBeenCalledWith('https://www.example.com/api/v1/test-result', 
            // Compressed and base64 encoded string of and empty object
            'H4sIAAAAAAAAA6uuBQBDv6ajAgAAAA==', { observe: 'response' });
            expect(urlProvider.getTestResultServiceUrl).toHaveBeenCalled();
            expect(testSubmissionProvider.compressData).toHaveBeenCalled();
            expect(testSubmissionProvider.removeNullFieldsDeep).toHaveBeenCalled();
            expect(testSubmissionProvider.submitTest).toHaveBeenCalledTimes(1);
        });
    });
    describe('compressData', function () {
        it('should successfully compress the provided data', function () {
            // ARRANGE
            var mockData = {
                category: 'B',
                communicationPreferences: {
                    updatedEmail: 'test@test.com',
                    communicationMethod: 'Post',
                    conductedLanguage: 'English',
                },
            };
            // ACT
            var result = testSubmissionProvider.compressData(mockData);
            // ASSERT
            var gzippedBytes = Buffer.from(result, 'base64');
            var unzippedJson = gunzipSync(gzippedBytes).toString();
            var json = JSON.parse(unzippedJson);
            expect(json).toEqual(mockData);
        });
    });
    describe('removeNullFieldsDeep', function () {
        it('should successfully remove null props from the provided data', function () {
            // ARRANGE
            var mockData = {
                category: 'B',
                activityCode: null,
                communicationPreferences: {
                    updatedEmail: 'test@test.com',
                    communicationMethod: 'Post',
                    conductedLanguage: 'English',
                },
                instructorDetails: {
                    registrationNumber: null,
                },
            };
            var expected = {
                category: 'B',
                communicationPreferences: {
                    updatedEmail: 'test@test.com',
                    communicationMethod: 'Post',
                    conductedLanguage: 'English',
                },
                instructorDetails: {},
            };
            // ACT
            var result = testSubmissionProvider.removeNullFieldsDeep(mockData);
            // ASSERT
            expect(result).toEqual(expected);
        });
    });
    describe('isPartialSubmission', function () {
        it('should be a partial submission when the test status is WRITE_UP and test is not a rekey', function () {
            var result = testSubmissionProvider.isPartialSubmission({
                index: 0,
                slotId: '',
                payload: {
                    version: '0.0.1',
                    category: 'B',
                    rekey: false,
                    journalData: null,
                    activityCode: '1',
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
                status: TestStatus.WriteUp,
            });
            // ASSERT
            expect(result).toEqual(true);
        });
        it('should not be a partial submission when the test status is WRITE_UP and test is a rekey', function () {
            var result = testSubmissionProvider.isPartialSubmission({
                index: 0,
                slotId: '',
                payload: {
                    version: '0.0.1',
                    category: 'B',
                    rekey: true,
                    journalData: null,
                    activityCode: '1',
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
                status: TestStatus.WriteUp,
            });
            // ASSERT
            expect(result).toEqual(false);
        });
        it('should not be a partial submission when the test status is not WRITE_UP and test is not a rekey', function () {
            var result = testSubmissionProvider.isPartialSubmission({
                index: 0,
                slotId: '',
                payload: {
                    version: '0.0.1',
                    category: 'B',
                    rekey: false,
                    journalData: null,
                    activityCode: '1',
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
                status: TestStatus.Completed,
            });
            // ASSERT
            expect(result).toEqual(false);
        });
        it('should not be a partial submission when the test status is not WRITE_UP and test is a rekey', function () {
            var result = testSubmissionProvider.isPartialSubmission({
                index: 0,
                slotId: '',
                payload: {
                    version: '0.0.1',
                    category: 'B',
                    rekey: false,
                    journalData: null,
                    activityCode: '1',
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
                status: TestStatus.Completed,
            });
            // ASSERT
            expect(result).toEqual(false);
        });
    });
    describe('buildUrl', function () {
        it('build url should set partial query string as true if not a rekey and test status is write up', function () {
            var result = testSubmissionProvider.buildUrl({
                index: 0,
                slotId: '',
                payload: {
                    version: '0.0.1',
                    category: 'B',
                    rekey: false,
                    journalData: null,
                    activityCode: '1',
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
                status: TestStatus.WriteUp,
            });
            // ASSERT
            expect(result).toEqual('https://www.example.com/api/v1/test-result?partial=true');
        });
        it('url should not set partial query string as if its a rekey', function () {
            var result = testSubmissionProvider.buildUrl({
                index: 0,
                slotId: '',
                payload: {
                    version: '0.0.1',
                    category: 'B',
                    rekey: true,
                    journalData: null,
                    activityCode: '1',
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
                status: TestStatus.WriteUp,
            });
            // ASSERT
            expect(result).toEqual('https://www.example.com/api/v1/test-result');
        });
        it('should not have partial query string if its not rekey and test status is not writeup', function () {
            var result = testSubmissionProvider.buildUrl({
                index: 0,
                slotId: '',
                payload: {
                    version: '0.0.1',
                    category: 'B',
                    rekey: false,
                    journalData: null,
                    activityCode: '1',
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
                status: TestStatus.Completed,
            });
            // ASSERT
            expect(result).toEqual('https://www.example.com/api/v1/test-result');
        });
    });
    describe('removePassCompletionWhenTestIsNotPass', function () {
        it('should not remove the pass completion key if the activity code is a Pass', function () {
            var result = testSubmissionProvider.removePassCompletionWhenTestIsNotPass({
                activityCode: '1',
                category: 'B',
                accompaniment: {
                    ADI: true,
                },
                passCompletion: {
                    passCertificateNumber: 'A123456X',
                    provisionalLicenceProvided: true,
                },
            });
            expect(result).toEqual({
                activityCode: '1',
                category: 'B',
                accompaniment: {
                    ADI: true,
                },
                passCompletion: {
                    passCertificateNumber: 'A123456X',
                    provisionalLicenceProvided: true,
                },
            });
        });
        it('should remove the pass completion key if the activity code is not a pass', function () {
            var result = testSubmissionProvider.removePassCompletionWhenTestIsNotPass({
                activityCode: '3',
                category: 'B',
                accompaniment: {
                    ADI: true,
                },
                passCompletion: {
                    passCertificateNumber: 'A123456X',
                    provisionalLicenceProvided: true,
                },
            });
            expect(result).toEqual({
                activityCode: '3',
                category: 'B',
                accompaniment: {
                    ADI: true,
                },
            });
        });
    });
});
//# sourceMappingURL=test-submission.spec.js.map