import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { CompetencyComponent } from '../../../../components/competency/competency';
import { ManoeuvresPopoverComponent } from '../manoeuvres-popover';
import { AppModule } from '../../../../../../app/app.module';
import { RecordManoeuvresSelection, AddManoeuvreDrivingFault, AddManoeuvreSeriousFault, AddManoeuvreDangerousFault, } from '../../../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { Store, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { ManoeuvreCompetencyComponent } from '../../../../components/manoeuvre-competency/manoeuvre-competency';
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../../../modules/tests/test-data/test-data.constants';
import { DrivingFaultsBadgeComponent, } from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { NavControllerMock } from 'ionic-mocks';
import { NavigationStateProvider } from '../../../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock, } from '../../../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { configureTestSuite } from 'ng-bullet';
describe('ManoeuvresPopoverComponent', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ManoeuvresPopoverComponent,
                MockComponent(CompetencyComponent),
                MockComponent(DrivingFaultsBadgeComponent),
                MockComponent(ManoeuvreCompetencyComponent),
            ],
            imports: [
                IonicModule,
                AppModule,
                StoreModule.forRoot({
                    tests: function () { return ({
                        currentTest: {
                            slotId: '123',
                        },
                        testStatus: {},
                        startedTests: {
                            123: {
                                testData: {
                                    dangerousFaults: {},
                                    drivingFaults: {},
                                    manoeuvres: {},
                                    seriousFaults: {},
                                    testRequirements: {},
                                    ETA: {},
                                    eco: {},
                                    vehicleChecks: {
                                        showMeQuestion: {
                                            code: 'S3',
                                            description: '',
                                            outcome: '',
                                        },
                                        tellMeQuestion: {
                                            code: '',
                                            description: '',
                                            outcome: '',
                                        },
                                    },
                                    eyesightTest: {},
                                },
                                postTestDeclarations: {
                                    healthDeclarationAccepted: false,
                                    passCertificateNumberReceived: false,
                                    postTestSignature: '',
                                },
                                journalData: {},
                                communicationPreferences: {
                                    updatedEmail: '',
                                    communicationMethod: 'Not provided',
                                    conductedLanguage: 'Not provided',
                                },
                            },
                        },
                    }); },
                }),
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ManoeuvresPopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch').and.callThrough();
    }));
    describe('Class', function () {
        it('should display the correct competencies against each manoeuvre', function () {
            component.recordManoeuvreSelection(ManoeuvreTypes.reverseParkRoad);
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#reverseParkRoad-controlFault'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('#reverseParkRoad-observationFault'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('#reverseRight-controlFault'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#reverseRight-observationFault'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#reverseParkCarpark-controlFault'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#reverseParkCarpark-observationFault'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#forwardPark-controlFault'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#forwardPark-observationFault'))).toBeNull();
        });
        describe('record manoeuvre', function () {
            it('should dispatch a RECORD_MANOEUVRES_SELECTION action', function () {
                component.recordManoeuvreSelection(ManoeuvreTypes.reverseParkRoad);
                expect(store$.dispatch).toHaveBeenCalledWith(new RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad));
            });
        });
        describe('disabling manoeuvres', function () {
            it('should not disable manoeuvres when a manoeuvre is selected', function () {
                component.recordManoeuvreSelection(ManoeuvreTypes.reverseParkRoad);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-road-radio'))
                    .nativeElement.disabled).toBe(false);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-carpark-radio'))
                    .nativeElement.disabled).toBe(false);
                expect(fixture.debugElement.query(By.css('#manoeuvres-forward-park-radio'))
                    .nativeElement.disabled).toBe(false);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-right-radio'))
                    .nativeElement.disabled).toBe(false);
            });
            it('should disable other manoeuvres from being selected when a driving fault is added', function () {
                store$.dispatch(new AddManoeuvreDrivingFault({
                    manoeuvre: ManoeuvreTypes.reverseRight,
                    competency: ManoeuvreCompetencies.controlFault,
                }));
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-road-radio'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-carpark-radio'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-forward-park-radio'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-right-radio'))
                    .nativeElement.disabled).toBe(false);
            });
            it('should disable other manoeuvres from being selected when a serious fault is added', function () {
                store$.dispatch(new AddManoeuvreSeriousFault({
                    manoeuvre: ManoeuvreTypes.reverseRight,
                    competency: ManoeuvreCompetencies.controlFault,
                }));
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-road-radio'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-carpark-radio'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-forward-park-radio'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-right-radio'))
                    .nativeElement.disabled).toBe(false);
            });
            it('should disable other manoeuvres from being selected when a dangerous fault is added', function () {
                store$.dispatch(new AddManoeuvreDangerousFault({
                    manoeuvre: ManoeuvreTypes.reverseRight,
                    competency: ManoeuvreCompetencies.controlFault,
                }));
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-road-radio'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-carpark-radio'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-forward-park-radio'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-right-radio'))
                    .nativeElement.disabled).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=manoeuvres-popover.spec.js.map