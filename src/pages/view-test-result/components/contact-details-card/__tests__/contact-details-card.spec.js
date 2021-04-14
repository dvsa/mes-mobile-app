import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { ContactDetailsCardComponent } from '../contact-details-card';
import { DataRowCustomComponent } from '../../../../../components/common/data-row-custom/data-row-custom';
import { DisplayAddressComponent } from '../../../../../components/common/display-address/display-address';
import { configureTestSuite } from 'ng-bullet';
describe('ContactDetailsCardComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ContactDetailsCardComponent,
                MockComponent(DataRowComponent),
                MockComponent(DataRowCustomComponent),
                MockComponent(DisplayAddressComponent),
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
        fixture = TestBed.createComponent(ContactDetailsCardComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('getTestResultPreference', function () {
            it('should return the correct data', function () {
                var data = {
                    communicationMethod: 'Email',
                    updatedEmail: '',
                    conductedLanguage: 'English',
                };
                component.communicationPreferencesData = data;
                fixture.detectChanges();
                expect(component.getTestResultPreference()).toEqual('Email');
            });
            it('should return None if the data is missing', function () {
                expect(component.getTestResultPreference()).toEqual('None');
            });
        });
        describe('getPhoneNumber', function () {
            it('should return the correct data', function () {
                var data = {
                    primaryTelephone: 'Test Phone Number',
                };
                component.candidateData = data;
                fixture.detectChanges();
                expect(component.getPhoneNumber()).toEqual('Test Phone Number');
            });
            it('should return None if the data is missing', function () {
                expect(component.getPhoneNumber()).toEqual('None');
            });
        });
        describe('getEmailAddress', function () {
            it('should show the email address from the journal data if the comms meathod is not email', function () {
                var candidateData = {
                    emailAddress: 'Test@Test.com',
                };
                var commsData = {
                    communicationMethod: 'Post',
                    conductedLanguage: 'English',
                    updatedEmail: 'not-this@test.com',
                };
                component.candidateData = candidateData;
                component.communicationPreferencesData = commsData;
                fixture.detectChanges();
                expect(component.getEmailAddress()).toEqual('Test@Test.com');
            });
            it('should show the email address from the comms data if the comms meathod is email', function () {
                var candidateData = {
                    emailAddress: 'not-this@test.com',
                };
                var commsData = {
                    communicationMethod: 'Email',
                    conductedLanguage: 'English',
                    updatedEmail: 'Test@Test.com',
                };
                component.candidateData = candidateData;
                component.communicationPreferencesData = commsData;
                fixture.detectChanges();
                expect(component.getEmailAddress()).toEqual('Test@Test.com');
            });
            it('should show the email address from the journal data when there is no comms data', function () {
                var candidateData = {
                    emailAddress: 'Test@Test.com',
                };
                component.candidateData = candidateData;
                fixture.detectChanges();
                expect(component.getEmailAddress()).toEqual('Test@Test.com');
            });
            it('should show none when there is no data', function () {
                expect(component.getEmailAddress()).toEqual('None');
            });
        });
        describe('getAddress', function () {
            it('should return the correct data', function () {
                var data = {
                    candidateAddress: {
                        addressLine1: 'Test1',
                        addressLine2: 'Test2',
                        addressLine3: 'Test3',
                        addressLine4: 'Test4',
                        addressLine5: 'Test5',
                        postcode: 'Test6',
                    },
                };
                component.candidateData = data;
                fixture.detectChanges();
                expect(component.getAddress()).toEqual(data.candidateAddress);
            });
            it('should return undefined if there is no data', function () {
                expect(component.getAddress()).toEqual(undefined);
            });
        });
    });
});
//# sourceMappingURL=contact-details-card.spec.js.map