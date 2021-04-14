import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, AlertController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, AlertControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { Store, StoreModule } from '@ngrx/store';
import { HealthDeclarationViewDidEnter, HealthDeclarationValidationError, } from '../../health-declaration.actions';
import { DeviceAuthenticationProvider } from '../../../../providers/device-authentication/device-authentication';
import { DeviceAuthenticationProviderMock, } from '../../../../providers/device-authentication/__mocks__/device-authentication.mock';
import * as postTestDeclarationsActions from '../../../../modules/tests/post-test-declarations/post-test-declarations.actions';
import * as passCompletionActions from '../../../../modules/tests/pass-completion/pass-completion.actions';
import { of, Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import * as welshTranslations from '../../../../assets/i18n/cy.json';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { MockComponent } from 'ng-mocks';
import { Language } from '../../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../../shared/helpers/translation.helpers';
import { SignatureComponent } from '../../components/signature/signature';
import { HealthDeclarationComponent } from '../../components/health-declaration/health-declaration';
import { ReceiptDeclarationComponent } from '../../components/receipt-declaration/receipt-declaration';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { HealthDeclarationCatHomeTestPage } from '../health-declaration.cat-home-test.page';
describe('HealthDeclarationCatHomeTestPage', function () {
    var fixture;
    var component;
    var store$;
    var deviceAuthenticationProvider;
    var translate;
    var testSlotAttributes = {
        welshTest: false,
        extendedTest: false,
        slotId: 123,
        specialNeeds: false,
        start: '',
        vehicleTypeCode: '',
    };
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                HealthDeclarationCatHomeTestPage,
                MockComponent(SignatureComponent),
                MockComponent(HealthDeclarationComponent),
                MockComponent(ReceiptDeclarationComponent),
            ],
            imports: [
                IonicModule,
                AppModule,
                ComponentsModule,
                StoreModule.forRoot({
                    tests: function () { return ({
                        currentTest: {
                            slotId: '123',
                        },
                        testStatus: {},
                        startedTests: {
                            123: {
                                postTestDeclarations: {
                                    healthDeclarationAccepted: false,
                                    passCertificateNumberReceived: false,
                                    postTestSignature: '',
                                },
                                journalData: {
                                    testSlotAttributes: testSlotAttributes,
                                    candidate: candidateMock,
                                },
                            },
                        },
                    }); },
                }),
                TranslateModule,
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: AlertController, useFactory: function () { return AlertControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                { provide: DeviceAuthenticationProvider, useClass: DeviceAuthenticationProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(HealthDeclarationCatHomeTestPage);
        component = fixture.componentInstance;
        deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch').and.callThrough();
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
        component.subscription = new Subscription();
    }));
    describe('Class', function () {
        describe('ionViewDidEnter', function () {
            it('should dispatch HealthDeclarationViewDidEnter', function () {
                component.ionViewDidEnter();
                expect(store$.dispatch).toHaveBeenCalledWith(new HealthDeclarationViewDidEnter());
            });
            describe('clickBack', function () {
                it('should should trigger the lock screen', function () {
                    component.clickBack();
                    expect(deviceAuthenticationProvider.triggerLockScreen).toHaveBeenCalled();
                });
            });
            describe('healthDeclarationChanged', function () {
                it('should dispatch a ToggleHealthDeclaration action', function () {
                    component.healthDeclarationChanged();
                    expect(store$.dispatch).toHaveBeenCalledWith(new postTestDeclarationsActions.ToggleHealthDeclaration());
                });
            });
            describe('receiptDeclarationChanged', function () {
                it('should dispatch a ToggleReceiptDeclaration action', function () {
                    component.receiptDeclarationChanged();
                    expect(store$.dispatch).toHaveBeenCalledWith(new postTestDeclarationsActions.ToggleReceiptDeclaration());
                });
            });
            describe('persistAndNavigate', function () {
                it('should dispatch a ProvisionalLicenseNotReceived if passed true and licenseProvided is true', function () {
                    component.licenseProvided = true;
                    component.persistAndNavigate(true);
                    expect(store$.dispatch).not.toHaveBeenCalledWith(new passCompletionActions.ProvisionalLicenseNotReceived());
                });
            });
        });
        describe('onSubmit', function () {
            it('should call the persist and navigate method if all fields set', fakeAsync(function () {
                spyOn(component, 'persistAndNavigate');
                var form = component.form;
                fixture.detectChanges();
                component.pageState.healthDeclarationAccepted$ = of(true);
                component.pageState.receiptDeclarationAccepted$ = of(true);
                component.pageState.signature$ = of('sig');
                component.healthDeclarationAccepted = true;
                component.onSubmit();
                fixture.detectChanges();
                expect(form.valid).toEqual(true);
                expect(component.persistAndNavigate).toHaveBeenCalled();
            }));
            it('should show the confirmation modal if health checkbox not set', fakeAsync(function () {
                spyOn(component, 'showConfirmHealthDeclarationModal');
                var form = component.form;
                fixture.detectChanges();
                component.pageState.healthDeclarationAccepted$ = of(false);
                component.pageState.receiptDeclarationAccepted$ = of(true);
                component.pageState.signature$ = of('sig');
                component.onSubmit();
                fixture.detectChanges();
                expect(form.valid).toEqual(true);
                expect(component.showConfirmHealthDeclarationModal).toHaveBeenCalled();
            }));
            it('should dispatch the appropriate ValidationError actions', fakeAsync(function () {
                component.form = new FormGroup({
                    requiredControl1: new FormControl(null, [Validators.required]),
                    requiredControl2: new FormControl(null, [Validators.required]),
                    notRequiredControl: new FormControl(null),
                });
                component.onSubmit();
                tick();
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new HealthDeclarationValidationError('requiredControl1 is blank'));
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new HealthDeclarationValidationError('requiredControl2 is blank'));
                expect(store$.dispatch)
                    .not
                    .toHaveBeenCalledWith(new HealthDeclarationValidationError('notRequiredControl is blank'));
            }));
        });
    });
    describe('DOM', function () {
        describe('multi language support', function () {
            it('should render the page in English by default', function () {
                fixture.detectChanges();
                var declarationIntent = fixture.debugElement.query(By.css('h4')).nativeElement;
                expect(declarationIntent.innerHTML).toBe('I declare that:');
            });
            it('should render the page in Welsh for a Welsh test', function (done) {
                configureI18N(Language.CYMRAEG, translate);
                translate.onLangChange.subscribe(function () {
                    fixture.detectChanges();
                    var declarationIntent = fixture.debugElement.query(By.css('h4')).nativeElement;
                    expect(declarationIntent.innerHTML)
                        .toBe(welshTranslations.healthDeclaration.declarationIntent + ":");
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=health-declaration.cat-home-test.page.spec.js.map